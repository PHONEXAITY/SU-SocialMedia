import Models from '../models/index.js';

export const createPost = async (req, res) => {
    try {
      const { content, image } = req.body;
      const post = new Models.Post({ user_id: req.user._id, content, image });
      await post.save();
      res.status(201).json(post);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Models.Post.find().sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPostById = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Models.Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updatePostById = async (req, res) => {
    try {
      const postId = req.params.id;
      const { content, image } = req.body;
      const updatedPost = await Models.Post.findOneAndUpdate({ _id: postId, user_id: req.user._id }, { content, image }, { new: true });
      if (!updatedPost) {
        return res.status(404).json({ message: 'Post not found' });
      }
      res.status(200).json(updatedPost);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  export const deletePostById = async (req, res) => {
    try {
      const postId = req.params.id;
      const deletedPost = await Models.Post.findOneAndDelete({ _id: postId, user_id: req.user._id });
      if (!deletedPost) {
        return res.status(404).json({ message: 'Post not found' });
      }
      res.status(200).json("deleted post successful", deletedPost);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
