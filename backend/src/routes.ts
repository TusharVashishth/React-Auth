import { Router } from "express";
import authMiddleware from "./middleware/Authenticate.js";
import UserController from "./controller/UserController.js";

const router: Router = Router();

router.get("/user", authMiddleware, UserController.index);
router.post("/refresh", authMiddleware, UserController.refreshToken);
router.post("/login", UserController.login);
router.post("/register", UserController.register);

export default router;
