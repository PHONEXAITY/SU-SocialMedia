import { Router } from "express";
import { addFriend, blockUser, getUserDetails, getUserFriendList, getUserProfile, removeFriend, resetPassword, resetPasswordRequest, searchUsers, updateFriendRequestStatus, updateUserProfile } from "../controllers/userController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = Router();

router.get('/profile', authenticateToken, getUserProfile);
router.put('/profile', authenticateToken, updateUserProfile);
router.get('/friends', authenticateToken, getUserFriendList);
router.get('/search', authenticateToken, searchUsers);
router.post('/friends/add', authenticateToken, addFriend);
router.post('/friends/remove', authenticateToken, removeFriend);
router.post('/block', authenticateToken, blockUser);
router.post('/reset-password/request', resetPasswordRequest);
router.post('/reset-password', resetPassword);
router.get('/:userId', authenticateToken, getUserDetails);
router.post('/friend-requests/:requestId', authenticateToken, updateFriendRequestStatus);

export default router;