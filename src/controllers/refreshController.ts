import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import {
  refreshSecret,
  refreshExpiry,
  jwtSecret,
  tokenExpiry,
} from "../config/config.js";
import type { JwtPayload } from "jsonwebtoken";

interface MyTokenPayload extends JwtPayload {
  id: string;
  email: string;
}

export const refreshToken = async (req: Request, res: Response) => {
  const refresh = req.body.refreshToken;
  if (!refresh) throw new Error("Refresh-token saknas!");

  try {
    const payload = jwt.verify(refresh, refreshSecret) as MyTokenPayload;
    if (typeof payload === "string") {
      return res.status(401).json({ error: "Ogiltig refresh-token" });
    }

    const newAccessToken = jwt.sign(
      { id: payload.id, email: payload.email },
      jwtSecret,
      { expiresIn: tokenExpiry }
    );
    res.status(201).json({ newAccessToken });
  } catch (error) {
    res.status(401).json({ error: "Ogiltig refresh-token" });
  }
};
