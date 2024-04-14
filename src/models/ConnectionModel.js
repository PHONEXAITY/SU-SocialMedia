import mongoose from 'mongoose';

const connectionSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  friend_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  is_online: {
    type: Boolean,
    default: false
  },
  last_online: {
    type: Date,
    default: null
  }
}, { timestamps: true });

const Connection = mongoose.model('Connection', connectionSchema);

export default Connection;
