var express = require('express');
var router = express.Router();
var ctrlIndex = require('../controllers/home');
var ctrlBlog = require('../controllers/blog');

/* GET home page */
router.get('/', ctrlIndex.home);

/* GET blog pages */
router.get('/blog', ctrlBlog.blogList);
router.get('/blogadd', ctrlBlog.blogAdd);
router.post('/blogadd', ctrlBlog.addBlog);
router.get('/blogedit/:blogid', ctrlBlog.blogReadOne); // this is readOne
router.post('/blogedit/:blogid', ctrlBlog.blogEditOne); // this is editPost
router.get('/blogdelete/:blogid', ctrlBlog.blogDelete); // this is del
router.post('/blogdelete/:blogid', ctrlBlog.deletePost);


module.exports = router;