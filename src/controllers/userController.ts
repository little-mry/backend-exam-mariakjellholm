import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";
import { RequestHandler } from "express";
import { addUser, fetchUser } from "../models/userModel.js";
import { DBUser, NewUser } from "../utils/interface.js";
import {
  jwtSecret,
  refreshExpiry,
  refreshSecret,
  tokenExpiry,
} from "../config/config.js";

export const signupUser: RequestHandler = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const existingUser = await fetchUser(email);
    if (existingUser) {
      res.status(400).json({ error: "Denna e-post finns redan registrerad" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user: NewUser = {
      _id: uuidv4(),
      email,
      password: hashedPassword,
      createdAt: new Date().toISOString(),
    };

    const savedUser = await addUser(user);
    if (!savedUser) {
      res.status(500).json({ error: "Kunde inte spara användare" });
      return;
    }

    res.status(201).json({
      success: true,
      message: "Användare skapad",
      data: {
        id:      savedUser._id,
        email:   savedUser.email,
        password: savedUser.password,
        createdAt: savedUser.createdAt
      }
    })   

  } catch (error) {
    res.status(500).json({ error: "Kunde inte spara användare" });
    return;
  }
};

export const loginUser: RequestHandler = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await fetchUser(email);
    if (!user) {
      res.status(401).json({ error: "Ogiltig epost eller lösenord" });
      return;
    }

    const matchedPassword = await bcrypt.compare(password, user.password);
    if (!matchedPassword) {
      res.status(400).json({ error: "Ogiltig epost eller lösenord" });
      return;
    }

    const token = jwt.sign({ id: user.id, email: user.email }, jwtSecret, {
      expiresIn: tokenExpiry,
    });
    const refreshToken = jwt.sign(
      { id: user.id, email: user.email },
      refreshSecret,
      { expiresIn: refreshExpiry }
    );

    res.status(200).json({
      success: true,
      message: "Inloggningen lyckades",
      data: {
        user: {
          id: user.id,
          email: user.email,
        },
        accessToken: token,
        refreshToken: refreshToken,
      },
    });
    return;
  } catch (error) {
    console.error("Inloggningsfel: ", error);
    res.status(500).json({ error: "Inloggningsfel" });
    return;
  }
};
