var express = require('express');
var router = express.Router();
var ctrlIndex = require('../controllers/home');
var ctrlBlog = require('../controllers/blog');

/* GET home page */
router.get('/', ctrlIndex.home);

/* GET blog pages */
router.get('/blog', ctrlBlog.blogList);
router.get('/blog/blog-add', ctrlBlog.blogAdd);


module.exports = router;