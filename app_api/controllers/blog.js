var mongoose = require('mongoose');
var blogModel = mongoose.model('Blog');

var sendJsonResponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports.blogList = function(req, res) {
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

module.exports.readOne = function(req, res) {
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





module.exports.addOne = function(req, res) {
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
                    console.log(blogger);
                    sendJsonResponse(res,201,blogger);
                }
            });
};

module.exports.editOne = function(req, res) {
    console.log("Updating blog with id: " + req.params.blogid);
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

module.exports.deleteOne = function(req, res) {
    console.log("Deleting blog entry: " + req.params.blogid);
    console.log(req.body);
    blogModel
        .findByIdAndRemove(req.params.blogid)
        .exec(
            function(err) {
                if(err) {
                    sendJsonResponse(res, 404, err);
                } else {
                    sendJsonResponse(res, 204, null);
                }
            });
};