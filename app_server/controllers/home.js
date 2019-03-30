/* GET home page
module.exports.home = function(req, res) {
    res.render('home', { title: 'Daniel Hartenstine' });
};
*/

/* GET: Home page */
module.exports.homeList = function(req, res) {
    renderHomepage(req, res);
};

/* Homepage render for index.js routes page */
var renderHomepage = function(req, res) {
    res.render('home' , {
        title: "Daniel Hartenstine's Blog Page",
        pageHeader: {
            title:  "Daniel Hartenstine's Blog"
        },
        strapLine: "Welcome to my Blog. My name is Dan. I love studying Computer Science, and in addition to taking classes I currently work part time as a Web Developer for the Income Store in Millersville, PA. I also have a Software Engineering Internship with MD Ally. I have two cats, a lovely wife and love the Ravens."
    });
};