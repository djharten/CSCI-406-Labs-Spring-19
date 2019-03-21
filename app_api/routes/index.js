var express = require('express');
var router = express.Router();
var ctrlBlog = require('../controllers/blog');

/* GET, POST, PUT and DELETE API routes for blog pages */
router.get('/blog', ctrlBlog.blogReadAll); // this is blogList
router.post('/blog', ctrlBlog.blogAddOne); // this is addOne
router.get('/blog/:blogid', ctrlBlog.blogReadOne); // this is readOne
router.put('/blog/:blogid', ctrlBlog.blogEditOne); // this is editOne
router.delete('/blog/:blogid', ctrlBlog.blogDeleteOne); // this is deleteOne

module.exports = router;