import {Router} from 'express';
import { updateUserOnlineStatus, getOnlineFriends } from '../controllers/connectionController.js';
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = Router();

router.put('/user/online', authenticateToken, updateUserOnlineStatus);

router.get('/user/online-friends', authenticateToken, getOnlineFriends);

export default router;
