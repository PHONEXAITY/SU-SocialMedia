import { Router } from "express";
import { createComment, getAllCommentsForPost, updateCommentById, deleteCommentById } from '../controllers/commentController.js';
import { authenticateToken } from "../middleware/authMiddleware.js";
const router = Router();

router.post('/', authenticateToken, createComment);

router.get('/:postId', getAllCommentsForPost);

router.put('/:id', authenticateToken, updateCommentById);

router.delete('/:id', authenticateToken, deleteCommentById);

export default router;