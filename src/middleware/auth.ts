import jwt, { JwtPayload } from "jsonwebtoken";
import { RequestHandler } from "express";
import { jwtSecret } from "../config/config.js";

const auth: RequestHandler = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(401).json({ error: "Åtkomst nekad, token saknas!" });
    return 
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    res.status(401).json({ error: "Åtkomst nekad, token saknas!" });
    return 
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


    const currentTime = Math.floor(Date.now() / 1000);
    if (decoded.exp && decoded.exp < currentTime) {
      res.status(401).json({ error: "Token har gått ut." });
      return 
    }

    next();
    return
  } catch (error) {
    console.error("Error vid token-verifiering: ", error);
    res.status(401).json({ error: "Ogiltig token." });
    return 
  }
};

export default auth;