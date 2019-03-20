var mongoose = require('mongoose');
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
                    console.log(err);
                    sendJsonResponse(res, 404, err);
                    return;
                }
                console.log(blogger);
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
            createdOn: obj.createdOn,
            blogid: obj._id
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
    blogModel
        .create({
            blogTitle: req.body.blogTitle,
            blogText: req.body.blogText
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

module.exports.blogEditOne = function(req, res) {
    console.log("Updating blog with id: " + req.params.id);
    console.log(req.body);
    blogModel
        .findOneAndUpdate(
            { _id: req.params.id },
            { $set: { "blogTitle" : req.body.blogTitle ,"blogText" : req.body.blogText } },
            function(err, blogger) {
                if(err) {
                    sendJsonResponse(res, 400, err);
                } else {
                    sendJsonResponse(res, 201, blogger);
                }
            }
        );
};

module.exports.blogDeleteOne = function(req, res) {
    var blogid = req.params.blogid;
    if(blogid){
        blogModel
            .findByIdAndRemove(req.params.id)
            .exec(
                function(err) {
                    if (err) {
                        console.log(err);
                        sendJsonResponse(res, 404, err);
                        return;
                    }
                    console.log("blog id " + blogid + " deleted");
                    sendJSONresponse(res, 204, null);
                });
    }
    else {
        sendJsonResponse(res, 404, {
            "message": "no blogid"
        });
    }
};