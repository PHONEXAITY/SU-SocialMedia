import mongoose from "mongoose";
const connectionSchema = new mongoose.Schema({
    user_id: { 
        type: mongoose.Schema.Types.ObjectId,
         ref: 'User',
          required: true 
        },
    user_id2: {
         type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
           required: true 
        },
  },
  {timestamps: true}
  );
  const Connection = mongoose.model('Connection', connectionSchema);
  export default Connection;