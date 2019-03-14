var mongoose = require('mongoose');

var blogSchema = new mongoose.Schema({
   blogTitle: String,
   blogText: String,
   createdOn: String
});

mongoose.model('blogList', blogSchema, 'blogSchema');