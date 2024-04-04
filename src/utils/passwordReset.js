import jwt from "jsonwebtoken";
import nodemailer from 'nodemailer';

export const generateResetToken = (user) => {
    const resetToken = jwt.sign({ userId: user._id }, process.env.RESET_TOKEN_SECRET, { expiresIn: '1h' });
    return resetToken;
  };
  
  // Verify reset token
  export const verifyResetToken = (token) => {
    try {
      const decoded = jwt.verify(token, process.env.RESET_TOKEN_SECRET);
      return decoded;
    } catch (error) {
      return null;
    }
  };
  
  export const sendPasswordResetEmail = async (email, resetToken) => {
    try {

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER, 
          pass: process.env.EMAIL_PASSWORD, 
        },
      });
  
      const mailOptions = {
        from: 'SU Social Media',
        to: email,
        subject: 'Password Reset',
        html: `
          <p>Hello,</p>
          <p>You have requested to reset your password. Please click the link below to reset your password:</p>
          <a href="${process.env.CLIENT_URL}/reset-password/${resetToken}">Reset Password</a>
          <p>If you did not request a password reset, please ignore this email.</p>
          <p>Thank you,</p>
          <p>Your App Team</p>
        `,
      };
  
      // Send the email
      await transporter.sendMail(mailOptions);
      console.log('Password reset email sent successfully');
    } catch (error) {
      console.error('Error sending password reset email:', error);
      throw new Error('Failed to send password reset email');
    }
  };