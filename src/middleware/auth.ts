import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { jwtSecret } from "../config/config.js";

const auth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: "Åtkomst nekad, token saknas!" });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Åtkomst nekad, token saknas!" });
  }

  try {
    interface TokenPayload extends JwtPayload {
        id: string
    }

    const raw = jwt.verify(
      token, jwtSecret
    );

    const decoded = raw as TokenPayload

    req.user = { id: decoded.id };
    next();
  } catch (error) {
    console.error("Error vid token-verifiering: ", error);
    return res.status(401).json({ error: "Ogiltig token." });
  }
};

export default auth;