import mongoose from "mongoose";

const reactionSchema = new mongoose.Schema({
    post_id: {
         type: mongoose.Schema.Types.ObjectId,
          ref: 'Post',
           required: true 
        },
    user_id: {
         type: mongoose.Schema.Types.ObjectId, 
         ref: 'User',
          required: true 
        },
    type: { 
        type: String, 
        enum: ['like', 'love', 'haha', 'wow', 'sad', 'angry'],
         required: true 
        },
  },
  {timestamps: true}
  );
  const Reaction = mongoose.model('Reaction', reactionSchema);
  export default Reaction;