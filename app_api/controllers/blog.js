var mongoose = require('mongoose');
// NOTE: name in model is what we named blog.js in the "models"
// directory  at the mongoose.model call at the bottom of the file
var blogModel = mongoose.model('blogList');

var sendJsonResponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

/*
module.exports.blogReadOne = function(req, res) {
    console.log("This was attempted. 1: ", req.params);
    console.log(req.params.blogid);
    blogModel
        .findById(req.params.blogid)
        .exec(function(err, blogger) {
            console.log("This was attempted. 2");
            sendJsonResponse(res, 200, blogger);
        });
};
*/

module.exports.blogReadOne = function(req, res) {
    if(req.params && req.params.blogid) {
        blogModel
            .findById(req.params.blogid)
            .exec(function(err,blogger) {
                if(!blogger) {
                    sendJsonResponse(res, 404, {
                        "message": "blogid not found"
                    });
                    return;
                } else if(err) {
                    sendJsonResponse(res, 404, err);
                    return;
                }
                sendJsonResponse(res, 200, blogger);
            });
    } else {
        sendJsonResponse(res, 404, {
            "message": "No blogid in request"
        });
    }
};

module.exports.blogReadAll = function(req, res) {
    sendJsonResponse(res, 200, { "status" : "success"});
};

module.exports.blogAddOne = function(req, res) {
    sendJsonResponse(res, 201, { "status" : "success"});
};

/*
module.exports.blogReadOne = function(req, res) {
    sendJsonResponse(res, 200, { "status" : "success"});
};
*/

module.exports.blogEditOne = function(req, res) {
    sendJsonResponse(res, 200, { "status" : "success"});
};

module.exports.blogDeleteOne = function(req, res) {
    sendJsonResponse(res, 204, { "status" : "success"});
};