var express = require('express');
var router = express.Router();
var ctrlBlog = require('../controllers/blog');

/* GET blog pages */
router.get('/blog', ctrlBlog.blogReadAll);
router.post('/blog', ctrlBlog.blogAddOne);
//router.get('/blog/blog-add', ctrlBlog.blogReadAll);
//router.post('/blog/blog-add', ctrlBlog.blogAddOne);
router.get('/blog/:blog-id', ctrlBlog.blogReadOne);
router.put('/blog/:blog-id', ctrlBlog.blogEditOne);
router.delete('/blog/:blog-id', ctrlBlog.blogDeleteOne);

module.exports = router;

// NOTES: Do I need to remove one level of the directory for everything that is not the blog
// home page? I.E. should it be router.delete('/blog/:blog-id . . . or is it okay thw way it is?

// Do I need router.get for blog-add ???

// NOTE: I MAY BE MISSING SOME GETS / THINGS IN THE router. - KEEP IN MIND.