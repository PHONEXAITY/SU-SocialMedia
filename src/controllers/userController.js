import Models from "../models/index.js";
import { generateOTP, sendOTPEmail } from "../utils/Otpmail.js";
import { generateResetToken, sendPasswordResetEmail,verifyResetToken } from '../utils/passwordReset.js';

export const getUserProfile = async (req, res) => {
    try {
      const userProfile = await Models.User.findById(req.user._id).select('-password');
  
      if (!userProfile) {
        return res.status(404).json({ message: 'User profile not found' });
      }

      res.status(200).json(userProfile);
    } catch (error) {
      console.error('Error fetching user profile:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  export const updateUserProfile = async (req, res) => {
    try {
      const { firstName, lastName, dateOfBirth, gender, profilePic, coverPic } = req.body;
  
      const updatedFields = {};
      if (firstName !== undefined) updatedFields.firstName = firstName;
      if (lastName !== undefined) updatedFields.lastName = lastName;
      if (dateOfBirth !== undefined) updatedFields.dateOfBirth = dateOfBirth;
      if (gender !== undefined) updatedFields.gender = gender;
      if (profilePic !== undefined) updatedFields.profilePic = profilePic;
      if (coverPic !== undefined) updatedFields.coverPic = coverPic;
  
      const updatedUserProfile = await Models.User.findByIdAndUpdate(
        req.user._id,
        updatedFields,
        { new: true, select: '-password' }
      );
  
      if (!updatedUserProfile) {
        return res.status(404).json({ message: 'User profile not found' });
      }
  
      res.status(200).json(updatedUserProfile);
    } catch (error) {
      console.error('Error updating user profile:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  export const getUserFriendList = async (req, res) => {
    try {
      const user = await Models.User.findById(req.user._id).populate('friendList', '-password');
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json(user.friendList);
    } catch (error) {
      console.error('Error fetching user friend list:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  export const searchUsers = async (req, res) => {
    try {
      const { q } = req.query;

      if (!q || typeof q !== 'string') {
        return res.status(400).json({ message: 'Invalid search query' });
      }
      const blockedUsers = currentUser.blockedUsers || [];
      
      const searchResults = await Models.User.find({
        _id: { $nin: blockedUsers },
        $or: [
          { firstName: { $regex: q, $options: 'i' } }, 
          { lastName: { $regex: q, $options: 'i' } },
          { email: { $regex: q, $options: 'i' } }, 
        ],
      }).select('-password'); 
  
      res.status(200).json(searchResults);
    } catch (error) {
      console.error('Error searching users:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  export const addFriend = async (req, res) => {
    try {
      const { userId } = req.body;

      if (!userId) {
        return res.status(400).json({ message: 'userId is required' });
      }

      const senderId = req.user._id;
      if (senderId === userId) {
        return res.status(400).json({ message: 'Cannot add yourself as a friend' });
      }

      const user = await Models.User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      if (user.friendList.includes(senderId)) {
        return res.status(400).json({ message: 'User is already your friend' });
      }

      const existingRequest = await Models.FriendRequest.findOne({ sender: senderId, recipient: userId });
      if (existingRequest) {
        if (existingRequest.status === 'accepted') {
          return res.status(400).json({ message: 'User is already your friend' });
        } else {
          return res.status(400).json({ message: 'Friend request already sent' });
        }
      }

      const friendRequest = new Models.FriendRequest({ sender: senderId, recipient: userId });
      await friendRequest.save();
  
      res.status(200).json({ message: 'Friend request sent successfully' });
    } catch (error) {
      console.error('Error sending friend request:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  // Remove friend
export const removeFriend = async (req, res) => {
    try {
      const { userId } = req.body;
      const currentUser = req.user;
  
      await Models.User.findByIdAndUpdate(currentUser._id, { $pull: { friendList: userId } });
  
      res.status(200).json({ message: 'Friend removed successfully' });
    } catch (error) {
      console.error('Error removing friend:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  // Block user
  export const blockUser = async (req, res) => {
    try {
      const { userId } = req.body;
      const currentUser = req.user;
  
      await Models.User.findByIdAndUpdate(currentUser._id, { $addToSet: { blockedUsers: userId } });
  
      res.status(200).json({ message: 'User blocked successfully' });
    } catch (error) {
      console.error('Error blocking user:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  export const resetPasswordRequest = async (req, res) => {
    try {
      const { email } = req.body;
      
      const user = await Models.User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const resetToken = generateResetToken(user);
      await sendPasswordResetEmail(user.email, resetToken);
  
      res.status(200).json({ message: 'Password reset email sent successfully' });
    } catch (error) {
      console.error('Error sending password reset email:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  export const resetPassword = async (req, res) => {
    try {
      const { token, newPassword } = req.body;
  
      const decodedToken = verifyResetToken(token);
      if (!decodedToken) {
        return res.status(400).json({ message: 'Invalid or expired reset token' });
      }
  
      const user = await Models.User.findById(decodedToken.userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      user.password = newPassword;
      await user.save();
  
      res.status(200).json({ message: 'Password reset successfully' });
    } catch (error) {
      console.error('Error resetting password:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  export const getUserDetails = async (req, res) => {
    try {
      const user = await Models.User.findById(req.params.userId).select('-password');
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json(user);
    } catch (error) {
      console.error('Error fetching user details:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  export const acceptFriendRequest = async (req, res) => {
    const requestId = req.params.requestId;
  try {
    const friendRequest = await Models.FriendRequest.findById(requestId);
    if (!friendRequest) {
      return res.status(404).json({ error: 'Friend request not found' });
    }

    if (friendRequest.status !== 'pending') {
      return res.status(400).json({ error: 'Friend request has already been processed' });
    }

    friendRequest.status = 'accepted';
    await friendRequest.save();

    await Models.User.findByIdAndUpdate(friendRequest.sender, { $push: { friendList: friendRequest.recipient } });

    await Models.User.findByIdAndUpdate(friendRequest.recipient, { $push: { friendList: friendRequest.sender } });

    return res.status(200).json({ message: 'Friend request accepted successfully' });
  } catch (error) {
    return res.status(500).json({ error: `Error accepting friend request: ${error.message}` });
  }
  };
  
  export const rejectFriendRequest = async (req,res) => {
    const requestId = req.params.requestId;
  try {
    const friendRequest = await Models.FriendRequest.findById(requestId);
    if (!friendRequest) {
      return res.status(404).json({ error: 'Friend request not found' });
    }

    if (friendRequest.status !== 'pending') {
      return res.status(400).json({ error: 'Friend request has already been processed' });
    }

    friendRequest.status = 'rejected';
    await friendRequest.save();

    return res.status(200).json({ message: 'Friend request rejected successfully' });
  } catch (error) {
    return res.status(500).json({ error: `Error rejecting friend request: ${error.message}` });
  }
};

const deleteUserAccount = async (userId) => {
  await User.findByIdAndDelete(userId);
};


export const sendOTPViaEmailController = async (req, res) => {
  try {
    const { userId, email } = req.params;
    const generatedOTP = generateOTP();
    await sendOTPEmail(email, generatedOTP);

    res.status(200).json({ message: 'OTP sent successfully' });
  } catch (error) {
    console.error('Error sending OTP via email:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


export const verifyOTPAndDeleteAccountController = async (req, res) => {
  try {
    const { userId, otp } = req.params;

    const user = await Models.User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!user.otp || !user.otp.code || !user.otp.expiresAt) {
      return res.status(400).json({ message: 'OTP not found or expired' });
    }

    const currentTimestamp = new Date().getTime();
    if (otp !== user.otp.code || currentTimestamp > user.otp.expiresAt) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    await deleteUserAccount(userId);

    res.status(200).json({ message: 'User account deleted successfully' });
  } catch (error) {
    console.error('Error deleting user account:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



