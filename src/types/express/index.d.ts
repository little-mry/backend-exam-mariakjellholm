export {};
import "express";

declare module 'express-serve-static-core' {
  interface Request {
    user: { id: string };
  }
}

declare module 'express' {
  interface Request {
    user: { id: string };
  }
}