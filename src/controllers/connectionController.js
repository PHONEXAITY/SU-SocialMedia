import Models from '../models/index.js';

export const updateUserOnlineStatus = async (req, res) => {
  try {
    const userId = req.user._id;
     
    await Models.User.findByIdAndUpdate(userId, { online: true });

    res.status(200).json({ message: 'User online status updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getOnlineFriends = async (req, res) => {
  try {
    const userId = req.user._id;

    const onlineConnections = await Models.Connection.find({ user_id: userId, is_online: true }).populate('friend_id');

    const onlineFriends = onlineConnections.map(connection => ({
      _id: connection.friend_id._id,
      firstName: connection.friend_id.firstName,
      lastName: connection.friend_id.lastName,
    }));

    res.status(200).json(onlineFriends);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};