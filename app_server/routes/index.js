var express = require('express');
var router = express.Router();
var ctrlIndex = require('../controllers/home');
var ctrlBlog = require('../controllers/blog');

/* GET home page */
router.get('/', ctrlIndex.home);

/* GET blog pages */
router.get('/blog', ctrlBlog.blogList);
router.get('/blog/blog-add', ctrlBlog.blogAdd);
router.get('/blog/blog-delete', ctrlBlog.blogDelete);
router.get('/blog/blog-edit/:blogid', ctrlBlog.blogReadOne);
router.put('/blog/blog-edit/:blogid', ctrlBlog.blogEdit);



module.exports = router;