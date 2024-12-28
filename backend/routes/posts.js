const express = require('express');
const router = express.Router();
const Post = require('../models/post');

// Lấy tất cả các bài đăng
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Tạo một bài đăng mới
router.post('/', async (req, res) => {
    const post = new Post(req.body);
    try {
        const newPost = await post.save();
        res.status(201).json(newPost);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Lấy một bài đăng theo ID
router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.json(post);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Tìm kiếm bài đăng
router.get('/search', async (req, res) => {
    const { query } = req.query;
    try {
        const posts = await Post.find({
            $or: [
                { diaChi: { $regex: query, $options: 'i' } },
                { moTaThem: { $regex: query, $options: 'i' } }
            ]
        });
        res.json(posts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;