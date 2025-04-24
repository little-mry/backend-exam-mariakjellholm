import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { refreshSecret, jwtSecret, tokenExpiry } from "../config/config.js";
import type { JwtPayload } from "jsonwebtoken";

interface MyTokenPayload extends JwtPayload {
  id: string;
  email: string;
}

export const refreshToken: RequestHandler = async (req, res, next) => {
  const refresh = req.body.refreshToken;
  if (!refresh) throw new Error("Refresh-token saknas!");

  try {
    const payload = jwt.verify(refresh, refreshSecret) as MyTokenPayload;
    if (typeof payload === "string") {
      res.status(401).json({ error: "Ogiltig refresh-token" });
      return;
    }

    const newAccessToken = jwt.sign(
      { id: payload.id, email: payload.email },
      jwtSecret,
      { expiresIn: tokenExpiry }
    );
    res.status(201).json({
      success: true,
      accessToken: newAccessToken,
    });
    return
  } catch (error) {
    res.status(401).json({ error: "Ogiltig refresh-token" });
    return;
  }
};
