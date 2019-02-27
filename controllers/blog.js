/* GET blog page */
module.exports.blogList = function(req, res) {
    res.render('blog', { title: 'Blog List' });
};

/* GET blog add page */
module.exports.blogAdd = function(req, res) {
    res.render('blog-add', { title: 'Blog Add' });
};