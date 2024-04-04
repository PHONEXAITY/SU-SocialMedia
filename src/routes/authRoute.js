import { Router } from "express";
import { login, logout, register } from "../controllers/authController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', authenticateToken,logout);


export default router;