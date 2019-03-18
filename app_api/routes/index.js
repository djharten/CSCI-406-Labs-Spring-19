var express = require('express');
var router = express.Router();
var ctrlBlog = require('../controllers/blog');

/* GET, POST, PUT and DELETE API routes for blog pages */
router.get('/blog', ctrlBlog.blogReadAll);
router.post('/blog', ctrlBlog.blogAddOne);
router.get('/blog/:blogid', ctrlBlog.blogReadOne);
router.put('/blog/:blogid', ctrlBlog.blogEditOne);
router.delete('/blog/:blogid', ctrlBlog.blogDeleteOne);

module.exports = router;