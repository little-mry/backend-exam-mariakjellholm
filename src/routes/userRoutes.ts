import { Router } from "express";
import { refreshToken } from "../controllers/refreshController.js";
import { signupUser, loginUser } from "../controllers/userController.js";

const router = Router();

router.post("/signup", signupUser);
router.post("/login", loginUser);
router.post("/refresh", refreshToken);

export default router;
