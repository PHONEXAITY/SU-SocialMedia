import { Router } from "express";
import { createReaction, getAllReactionsForPost, getAllReactionsByUser, deleteReactionById } from '../controllers/reactionController.js';
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = Router();

router.post('/reactions', authenticateToken, createReaction);

router.get('/posts/:postId/reactions', getAllReactionsForPost);

router.get('/users/:userId/reactions', getAllReactionsByUser);

router.delete('/reactions/:reactionId', authenticateToken, deleteReactionById);

export default router;