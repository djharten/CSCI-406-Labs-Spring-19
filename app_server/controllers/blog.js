var request = require('request');
var apiOptions = { server: 'http://18.235.2.183' };
var path, requestOptions;




/* GET blog page */
module.exports.blogList = function(req, res) {
    path = '/api/blog';
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

var createBlogList = function(req, res, responseBody) {
    res.render('blogList', {
        title: 'Blog List',
        pageHeader: 'Blog List',
        blogs: responseBody
    });
};


/* GET blog add page */
module.exports.blogAdd = function(req, res) {
    res.render('blog-add', { title: 'Blog Add' });
};

/* GET blog edit page */
module.exports.blogEdit = function(req, res) {
    res.render('blog-edit', { title: 'Edit Your Blog' });
};

/* GET blog delete page */
module.exports.blogDelete = function(req, res) {
    res.render('blog-delete', { title: 'Delete Your Blog' });
};
