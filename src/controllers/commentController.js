import Models from '../models/index.js';

export const createComment = async (req, res) => {
  try {
    const { post_id, content } = req.body;
    const comment = new Models.Comment({ post_id, user_id: req.user._id, content }); // Use authenticated user's ID
    await comment.save();
    res.status(201).json(comment);
  } catch (error) { 
    res.status(500).json({ message: error.message });
  }
};

export const getAllCommentsForPost = async (req, res) => {
  try {
    const post_id = req.params.postId;
    const comments = await Models.Comment.find({ post_id }).sort({ createdAt: -1 });
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateCommentById = async (req, res) => {
  try {
    const commentId = req.params.id;
    const { content } = req.body;
    const updatedComment = await Models.Comment.findOneAndUpdate({ _id: commentId, user_id: req.user._id }, { content }, { new: true }); // Use authenticated user's ID
    if (!updatedComment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    res.status(200).json(updatedComment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteCommentById = async (req, res) => {
  try {
    const commentId = req.params.id;
    const deletedComment = await Models.Comment.findOneAndDelete({ _id: commentId, user_id: req.user._id }); // Use authenticated user's ID
    if (!deletedComment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    res.status(200).json(deletedComment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};