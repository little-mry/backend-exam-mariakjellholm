import dotenv from "dotenv";
dotenv.config();

if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET is missing in .env");
const jwtSecret = process.env.JWT_SECRET;

const tokenExpiry = process.env.JWT_EXPIRY || "1h";

export { jwtSecret, tokenExpiry };
