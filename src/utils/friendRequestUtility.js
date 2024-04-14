import FriendRequest from '../models/FriendRequest.js';

export const cleanupRejectedFriendRequests = async () => {
  try {
    const thresholdDate = new Date(); 
    thresholdDate.setDate(thresholdDate.getDate() - 30);
   /*  thresholdDate.setMinutes(thresholdDate.getMinutes() - 1); */

    await FriendRequest.deleteMany({ status: 'rejected', rejectedAt: { $lt: thresholdDate } });
  } catch (error) {
    console.error('Error during cleanup:', error);
  }
};