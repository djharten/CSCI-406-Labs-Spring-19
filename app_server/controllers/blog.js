var request = require('request');
var apiOptions = { server: 'http://18.235.2.183' };
var path, requestOptions;




/* GET: Lists all blog pages */
module.exports.blogList = function(req, res) {
    path = "/api/blog";
    requestOptions = {
        url: apiOptions.server + path,
        method: "GET",
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
module.exports.blogReadOne = function(req, res) {
    path =  "/api/blog/" + req.params.id;
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
    res.render('blog-edit' , {
        title: 'Edit Blog',
        blogInfo : blogInfo,
        blogid : blogInfo._id,
        blogTitle : blogInfo.blogTitle,
        blogText : blogInfo.blogText
    });
};

/* Blog Edit */
module.exports.blogEditOne = function(req, res) {
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
    res.render('blog-add', { title: 'Blog Add' });
};

/* GET blog delete page */
module.exports.blogDelete = function(req, res) {
    res.render('blog-delete', { title: 'Delete Your Blog' });
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
