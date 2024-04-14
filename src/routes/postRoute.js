import { Router } from "express";
import { authenticateToken } from "../middleware/authMiddleware.js";
import { createPost, deletePostById, getAllPosts, getPostById, updatePostById } from "../controllers/postController.js";
const router = Router();

router.post('/', authenticateToken, createPost);

router.get('/', getAllPosts);

router.get('/:id', getPostById);

router.put('/:id', authenticateToken, updatePostById);

router.delete('/:id', authenticateToken, deletePostById);
export default router;
