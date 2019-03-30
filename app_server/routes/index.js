var express = require('express');
var router = express.Router();
var ctrlIndex = require('../controllers/home');
var ctrlBlog = require('../controllers/blog');

/* GET home page */
router.get('/', ctrlIndex.homeList);

/* GET blog pages */
router.get('/blog', ctrlBlog.blogList);
router.get('/blogadd', ctrlBlog.blogAdd); // this is blogadd
router.post('/blogadd', ctrlBlog.addBlog);
router.get('/blogedit/:blogid', ctrlBlog.readOne);
router.post('/blogedit/:blogid', ctrlBlog.editOne); // this is editPost
router.get('/blogdelete/:blogid', ctrlBlog.deleteOne); // this is del
router.post('/blogdelete/:blogid', ctrlBlog.deletePost);


module.exports = router;