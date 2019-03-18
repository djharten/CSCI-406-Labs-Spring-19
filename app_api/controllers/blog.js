var mongoose = require('mongoose');
// NOTE: name in model is what we named blog.js in the "models"
// directory  at the mongoose.model call at the bottom of the file
var blogModel = mongoose.model('Blog');

var sendJsonResponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports.blogReadOne = function(req, res) {
    console.log('Finding blog details', req.params);
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

var buildBlogList = function(req, res, results) {
    var blogs = [];
    results.forEach(function (obj) {
        blogs.push({
            blogTitle: obj.blogTitle,
            blogText: obj.blogText,
            createdOn: obj.createdOn
        });
    });
    return blogs;
};

module.exports.blogReadAll = function(req, res) {
    console.log('Creating all blogs list');
    blogModel
        .find()
        .exec(function(err, blogger) {
            if(!blogger) {
                sendJsonResponse(res, 404 , {
                    "message" : "No blogs found"
                });
                return;
            }else if(err) {
                console.log(err);
                sendJsonResponse(res, 404, err);
                return;
            }
            console.log(blogger);
            sendJsonResponse(res, 200, buildBlogList(req, res, blogger));
        });
};

module.exports.blogAddOne = function(req, res) {
    console.log(req.body);
    blogSch
        .create({
            blogTitle: req.body.blogTitle1,
            blogText: req.body.blogText1
        }, function(err, blogger) {
                if(err) {
                    console.log(err);
                    sendJsonResponse(res,400,err);
                } else {
                    console.log(blog);
                    sendJsonResponse(res,201,blogger);
                }
            });
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