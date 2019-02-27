/* GET blog page */
module.exports.blogList = function(req, res) {
    res.render('blog', {
        title: 'Blog List',
        blogList: [{
          blogTitle: 'My First Blog.',
          blogText: 'I really hate blogging. Yet here we are, blogging away in the blogosphere. Which is a really stupid word.',
          createdOn: '01-30-2019, 4:42PM'
        }, {
          blogTitle: 'My second blog.',
          blogText: 'I still do not enjoy blogging. And this ad revenue is next to nothing. It\'s probably because I don\'t have any ads. Gotta synergize it' +
                    ' to the cloud with the blockchain.',
          createdOn: '02-15-2019, 1:27PM'
	    }, {
          blogTitle: 'My third blog.',
          blogText: 'All work and no play make Dan a dull boy.',
          createdOn: '02-21-2019, 11:41AM'
	    }]
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
