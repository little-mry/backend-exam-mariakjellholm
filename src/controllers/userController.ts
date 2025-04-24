import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import { userSchema } from "../middleware/joiValidation.js";
import { addUser, fetchUser } from "../models/userModel.js";
import { NewUser } from "../utils/interface.js";
import {
  jwtSecret,
  refreshExpiry,
  refreshSecret,
  tokenExpiry,
} from "../config/config.js";

export const signupUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const existingUser = await fetchUser(email);
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "Denna e-post finns redan registrerad" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user: NewUser = {
      id: uuidv4(),
      email,
      password: hashedPassword,
      createdAt: new Date().toISOString(),
    };

    const savedUser = await addUser(user);
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ error: "Kunde inte spara användare" });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await fetchUser(email);
    if (!user) {
      return res.status(401).json({ error: "Ogiltig epost eller lösenord" });
    }

    const matchedPassword = await bcrypt.compare(password, user.password);
    if (!matchedPassword) {
      return res.status(401).json({ error: "Ogiltig epost eller lösenord" });
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
  } catch (error) {
    console.error("Inloggningsfel: ", error);
    res.status(500).json({ error: "Inloggningsfel" });
  }
};
