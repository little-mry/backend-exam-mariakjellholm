import { Router } from "express";
import { refreshToken } from "../controllers/refreshController.js";

const router = Router();

router.post("/signup");
router.post("/login");
router.post('/refresh')

export default router;
