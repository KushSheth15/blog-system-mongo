const multer = require('multer');
const path = require('path');
const Blog = require('../models/blog');
const Comment = require('../models/comments');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve(`./public/uploads/`));
    },
    filename: function (req, file, cb) {
        const fileName = `${Date.now()}-${file.originalname}`;
        cb(null, fileName);
    }
});

const upload = multer({ storage: storage });

exports.upload = upload;

exports.getAddNew = (req, res) => {
    return res.render("addBlog", {
        user: req.user
    });
};

exports.getBlogById = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id).populate("createdBy");
        const comments = await Comment.find({ blogId: req.params.id }).populate("createdBy");
        return res.render("blog", {
            user: req.user,
            blog,
            comments
        });
    } catch (error) {
        return res.status(500).send("Error fetching blog details");
    }
};

exports.createBlog = async (req, res) => {
    try {
        const { title, body } = req.body;

        const blog = await Blog.create({
            body,
            title,
            createdBy: req.user._id,
            coverImageURL: `/uploads/${req.file.filename}`
        });
        return res.redirect(`/blog/${blog._id}`);
    } catch (error) {
        return res.status(500).send("Error creating blog");
    }
};

exports.createComment = async (req, res) => {
    try {
        await Comment.create({
            content: req.body.content,
            blogId: req.params.blogId,
            createdBy: req.user._id,
        });
        return res.redirect(`/blog/${req.params.blogId}`);
    } catch (error) {
        return res.status(500).send("Error creating comment");
    }
};