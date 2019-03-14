var mongoose = require('mongoose');
// NOTE: name in model is what we named blog.js in the "models"
// directory  at the mongoose.model call at the bottom of the file
var blogModel = mongoose.model('blogList');

var sendJsonResponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports.blogReadOne = function(req, res) {
    blogModel
        .findById(req.params.blog-id)
        .exec(function(err, blog) {
            sendJsonResponse(res, 200, blog);
        });
};

module.exports.blogReadAll = function(req, res) {
    sendJsonResponse(res, 200, { "status" : "success"});
};

module.exports.blogAddOne = function(req, res) {
    sendJsonResponse(res, 201, { "status" : "success"});
};

module.exports.blogReadOne = function(req, res) {
    sendJsonResponse(res, 200, { "status" : "success"});
};

module.exports.blogEditOne = function(req, res) {
    sendJsonResponse(res, 200, { "status" : "success"});
};

module.exports.blogDeleteOne = function(req, res) {
    sendJsonResponse(res, 204, { "status" : "success"});
};