var express = require('express');
var router = express.Router();
var ctrlBlog = require('../controllers/blog');

/* GET, POST, PUT and DELETE API routes for blog pages */
router.get('/blog', ctrlBlog.blogList);
router.post('/blog', ctrlBlog.addOne);
router.get('/blog/:blogid', ctrlBlog.readOne);
router.put('/blog/:blogid', ctrlBlog.editOne);
router.delete('/blog/:blogid', ctrlBlog.deleteOne);

module.exports = router;