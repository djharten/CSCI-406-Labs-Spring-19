var request = require('request');
var apiOptions = { server: 'http://localhost:3000' };
var path, requestOptions;

/* GET: Lists all blog pages */
module.exports.blogList = function(req, res) {
    path = "/api/blog";
    requestOptions = {
        url: apiOptions.server + path,
        method: "GET",
        port: 80,
        json: {},
        qs: {}
    };
    request(
        requestOptions,
        function(err, response, blogs) {
            if(err){
                console.log(err);
            } else if(response.statusCode === 200){
                console.log("Number of blogs found: " + blogs.length);
                createBlogList(req, res, blogs);
            } else {
                console.log(response.statusCode);
            }
        }
    );
};

/* Creates the list of blogs from the database, prepping it to be printed to the web page */
var createBlogList = function(req, res, responseBody) {
    res.render('blog', {
        title: 'Blog List',
        pageHeader: 'Blog List',
        blogList: responseBody
    });
};


/* GET: Gets single blog page, editable */
module.exports.readOne = function(req, res) {
    path =  "/api/blog/" + req.params.blogid;
    requestOptions = {
        url : apiOptions.server + path,
        method : "GET",
        json: {}
    };
    request(
        requestOptions,
        function(err, response, blogs) {
            if(err){
                console.log(err);
            } else {
                console.log(response.statusCode);
                createBlogEdit(req, res, blogs);
            }
        }
    );
};

/* Renders the page to be edited */
var createBlogEdit = function(req, res, blogInfo) {
    res.render('blogedit' , {
        title: 'Edit Blog',
        blogInfo: blogInfo,
        blogid: blogInfo._id,
        blogText: blogInfo.blogText,
        blogTitle: blogInfo.blogTitle
    });
};

/* Blog Edit */
module.exports.editOne = function(req, res) {
    var postData;
    path = "/api/blog/" + req.params.blogid;
    postData = {
        blogTitle : req.body.blogTitle,
        blogText : req.body.blogText
    };
    requestOptions = {
        url : apiOptions.server + path,
        method: "PUT",
        json : postData
    };
    request (
        requestOptions,
        function(err, response, blog) {
            if(!err && response.statusCode === 201) {
                res.redirect('/blog');
            } else {
                _showError(req, res, response.statusCode);
            }
        }
    );
};

/* GET blog add page */
module.exports.blogAdd = function(req, res) {
    res.render('blogadd', { title: 'Blog Add Page' });
};

module.exports.addBlog = function(req, res) {
    var postData;
    path = '/api/blog';
    postData = {
        blogTitle: req.body.blogTitle,
        blogText: req.body.blogText,
        createdOn: Date.now()
    };
    requestOptions = {
        url : apiOptions.server + path,
        method : "POST",
        json : postData
    };
    request(
        requestOptions,
        function(err, response, blog) {
            if(response.statusCode === 201) {
                res.redirect('/blog');
            } else {
                _showError(req, res, response.statusCode);
            }
        }
    );
};

/* GET blog delete page */
module.exports.deleteOne = function(req, res) {
    path = '/api/blog/' + req.params.blogid;
    requestOptions = {
        url : apiOptions.server + path,
        method : "GET",
        json : {}
    };
    request(
        requestOptions,
        function(err, response, blog) {
            console.log(blog);
            createDeletePage(req, res, blog);

        }
    );
};

var createDeletePage = function(req, res, blogInfo) {
    res.render('blogdelete', {
        title : 'Delete Blog Page',
        blogInfo: blogInfo,
        blogid: blogInfo._id,
        blogText: blogInfo.blogText,
        blogTitle: blogInfo.blogTitle
    });
};

/* GET blog delete page */
module.exports.deletePost = function(req, res) {
    path = '/api/blog/' + req.params.blogid;
    requestOptions = {
        url : apiOptions.server + path,
        method : "DELETE",
        json : {}
    };
    request(
        requestOptions,
        function(err, response, blog) {
            if(response.statusCode === 204) {
                res.redirect('/blog');
            } else {
                _showError(req, res, response.statusCode);
            }
        }
    );
};

var _showError = function(req, res, status) {
    var title, content;
    if(status === 404) {
        title = "404, Page Not Found";
        content = "Sorry! Looks like your page cannot be found! (-_-)";
    }else if (status === 500) {
        title = "500, Internal Server Error";
        content = "Wow, our bad, there is a problem with our server.";
    } else {
        title = status + ", Something's Gone Wrong!";
        content = "Something has happened, Sorry!";
    }
    res.status(status);
    res.render('error', {
        title : title,
        content : content
    });
};
