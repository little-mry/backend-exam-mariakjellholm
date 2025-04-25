import { Router } from "express";
import { refreshToken } from "../controllers/refreshController.js";
import { signupUser, loginUser } from "../controllers/userController.js";
import validate from "../middleware/validate.js";
import { userSchema } from "../middleware/joiValidation.js";

const router = Router();

router.post("/user/signup", validate(userSchema, 'body'), signupUser);
router.post("/user/login", validate(userSchema, 'body'), loginUser);
router.post("/user/refresh", refreshToken);

export default router;
