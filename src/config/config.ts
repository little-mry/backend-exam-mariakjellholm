import dotenv from "dotenv";
import type { SignOptions } from "jsonwebtoken";
dotenv.config();


if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET is missing in .env");
const jwtSecret = process.env.JWT_SECRET;

const tokenExpiry = (process.env.JWT_EXPIRY ??
  "1h") as SignOptions["expiresIn"];

if (!process.env.JWT_REFRESH_SECRET) throw new Error("JWT_REFRESH_SECRET is missing in .env");
const refreshSecret = process.env.JWT_REFRESH_SECRET;

const refreshExpiry = (process.env.JWT_REFRESH_EXPIRY ??
  "5d") as SignOptions["expiresIn"];

export { jwtSecret, tokenExpiry, refreshSecret, refreshExpiry };
