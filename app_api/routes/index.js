var express = require('express');
var router = express.Router();
var ctrlBlog = require('../controllers/blog');

/* GET, POST, PUT and DELETE API routes for blog pages */
router.get('/blog', ctrlBlog.blogList); // this is blogList
router.post('/blog', ctrlBlog.addOne); // this is addOne
router.get('/blog/:blogid', ctrlBlog.readOne); // this is readOne
router.put('/blog/:blogid', ctrlBlog.editOne); // this is editOne
router.delete('/blog/:blogid', ctrlBlog.deleteOne); // this is deleteOne

module.exports = router;