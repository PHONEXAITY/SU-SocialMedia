import Models from '../models/index.js';

export const createReaction = async (req, res) => {
  try {
    const { post_id, type } = req.body;
    const user_id = req.user._id;
    const reaction = new Models.Reaction({ post_id, user_id, type });
    await reaction.save();
    res.status(201).json(reaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllReactionsForPost = async (req, res) => {
  try {
    const postId = req.params.postId;
    const reactions = await Models.Reaction.find({ post_id: postId });
    res.status(200).json(reactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllReactionsByUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const reactions = await Models.Reaction.find({ user_id: userId });
    res.status(200).json(reactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteReactionById = async (req, res) => {
  try {
    const reactionId = req.params.reactionId;
    const deletedReaction = await Models.Reaction.findByIdAndDelete(reactionId);
    if (!deletedReaction) {
      return res.status(404).json({ message: 'Reaction not found' });
    }
    res.status(200).json(deletedReaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
