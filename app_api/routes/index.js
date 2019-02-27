var express = require('express');
var router = express.Router();
var ctrlBlog = require('../controllers/blog');

/* GET blog pages */
router.get('/blog', ctrlBlog.blogListApi);
router.post('/blog/blog-add', ctrlBlog.blogAddOne);
router.get('/blog/blog-add/:blog-id', ctrlBlog.blogReadOne);
router.put('/blog/blog-edit/:blog-id', ctrlBlog.blogEditOne);
router.delete('/blog/blog-delete/:blog-id', ctrlBlog.blogDeleteOne);

module.exports = router;

// NOTES: Do I need to remove one level of the directory for everything that is not the blog
// home page? I.E. should it be router.delete('/blog/:blog-id . . . or is it okay thw way it is?

// Do I need router.get for blog-add ???