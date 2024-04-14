import { Router } from "express";
import { acceptFriendRequest, addFriend, blockUser, getUserDetails, getUserFriendList, getUserProfile, rejectFriendRequest, removeFriend, resetPassword, resetPasswordRequest, searchUsers, updateUserProfile } from "../controllers/userController.js";
import { sendOTPViaEmailController, verifyOTPAndDeleteAccountController } from '../controllers/userController.js';
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
router.put('/friend-requests/:requestId/accept',authenticateToken, acceptFriendRequest);
router.put('/friend-requests/:requestId/reject',authenticateToken, rejectFriendRequest);
//send OTP email
router.post('/:userId/send-otp/:email', sendOTPViaEmailController);
//verify OTP and delete user account
router.delete('/:userId/verify-otp/:otp', verifyOTPAndDeleteAccountController);


export default router;