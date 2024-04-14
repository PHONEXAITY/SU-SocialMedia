import mongoose from 'mongoose';

const friendRequestSchema = new mongoose.Schema({
  sender: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
     required: true
     },
  recipient: { 
    type: mongoose.Schema.Types.ObjectId,
     ref: 'User', 
     required: true
     },
  status: { 
    type: String, 
    enum: ['pending', 'accepted', 'rejected'], 
    default: 'pending' },
  createdAt: { 
    type: Date, 
    default: Date.now
 },
 rejectedAt: {
  type: Date 
}

});
friendRequestSchema.pre('save', async function (next) {
  if (this.isModified('status') && this.status === 'rejected') {
    this.rejectedAt = new Date();
  }
  next();
});

const FriendRequest = mongoose.model('FriendRequest', friendRequestSchema);

export default FriendRequest;