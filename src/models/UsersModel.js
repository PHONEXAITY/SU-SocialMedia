import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
     firstName: {
         type: String,
          required: true 
        },
        lastName: {
         type: String,
          required: true 
        },
    email: { 
        type: String, 
        required: true,
         unique: true 
     },
    password: {
         type: String,
          required: true ,
          minlength: 8
        },
        dateOfBirth: { 
            type: Date,
             required: true
             },
        gender: {
             type: String,
              enum: ['male', 'female', 'other'],
               required: true 
          },
          profilePic: {
          type: String,
          default: ""
       },
       coverPic: {
          type: String,
          default: ""
       },
    status: {
         type: String,
          enum: ['active', 'inactive', 'suspended'],
           default: 'active'
         },
         friendList: [{
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User'
        }],  
  },
  
  {timestamps: true});
  const User = mongoose.model('User', userSchema);
  
  export default User;