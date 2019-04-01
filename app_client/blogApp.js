var app = angular.module('blogApp' , ['ngRoute']);

// Router Provider
app.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'pages/home.html',
            controller: 'homeController',
            controllerAs: 'vm'
        })

        .when('/blog', {
            templateUrl: 'pages/blog.html',
            controller : 'blogController',
            controllerAs: 'vm'
        })

        .when('/blogadd', {
            templateUrl: 'pages/blogadd.html',
            controller: 'addController',
            controllerAs: 'vm'
        })

        .when('/blogdelete/:blogid', {
            templateUrl: 'pages/blogdelete.html',
            controller: 'deleteController',
            controllerAs: 'vm'
        })

        .when('/blogedit/:blogid', {
            templateUrl: 'pages/blogedit.html',
            controller: 'editController',
            controllerAs: 'vm'
        })
        .otherwise({ redirectTo: '/' });
});

var allTitle = "Daniel Hartenstine's Blog Site";

// Controllers
app.controller('homeController', function homeController() {
    var vm = this;
    vm.title = allTitle;
    vm.message = "Welcome to my Blog. My name is Dan. I love studying Computer Science, and in addition to " +
        "taking classes I currently work part time as a Web Developer for the Income Store in Millersville, PA. " +
        "I also have a Software Engineering Internship with MD Ally. I have two cats, a lovely wife and love the Ravens.";
});


app.controller('blogController', function blogController($http) {
    var vm = this;
    vm.title = allTitle;
    vm.pageHeader = "List of Blogs";

    listOfBlogs($http)
        .success(function(data) {
            vm.blog = data;
            vm.message ="Blog(s) found";
        })
        .error(function(e) {
            vm.message = "No blog list found"
        });
});

app.controller('addController', [ '$http', '$location', function addController($http, $location) {
    var vm = this;
    vm.blog = {};
    vm.title = allTitle;
    vm.pageHeader = "Add a Blog";

    vm.onSubmit = function() {
        var blogData = vm.blog;
        blogData.blogTitle = userForm.blogTitle.value;
        blogData.blogText = userForm.blogText.value;

        addOneBlog($http, blogData)
            .success(function(blogData) {
                console.log(blogData);
                $location.path('/blog').replace();
            })
            .error(function(e) {
                console.log(e);
            });
    };
}]);

app.controller('deleteController', [ '$http', '$routeParams', '$location', function deleteController($http, $routeParams, $location) {
    var vm = this;
    vm.blog = {};
    vm.title = allTitle;
    vm.pageHeader = "Delete a Blog entry";
    vm.id = $routeParams.blogid;

    readOneBlog($http, vm.id)
        .success(function(blogData) {
            vm.blog = blogData;
            vm.message = "Confirm Deletion";
        })
        .error(function(e) {
            vm.message = vm.id + " not found.";
        })

    vm.onSubmit = function() {
        var blogData = vm.blog;

        deleteOneBlog($http, vm.id)
            .success(function(blogData) {
                vm.message = "Blog successfully deleted";
                $location.path('/blog').replace();
            })
            .error(function(e) {
                vm.message = vm.id + " not found.";
            });
    }
}]);

app.controller('editController', [ '$http', '$routeParams', '$location', function editController($http, $routeParams, $location) {
    var vm = this;
    vm.title = allTitle;
    vm.pageHeader = "Edit a Blog entry";
    vm.blog = {};
    vm.id = $routeParams.blogid;

    readOneBlog($http, vm.id)
        .success(function(blogData) {
            vm.blog = blogData;
        })
        .error(function(e) {
            vm.message = vm.id + " not found.";
        })

    vm.onSubmit = function() {
        var blogData = {};
        blogData.blogTitle = userForm.blogTitle.value;
        blogData.blogText = userForm.blogText.value;

        editOneBlog($http, blogData, vm.id)
            .success(function(blogData) {
                vm.message = "Blog successfuly updated";
                $location.path('/blog').replace();
            })
            .error(function(e) {
                vm.message = vm.id + " not found.";
            });
    }
}]);


// function calls
function listOfBlogs($http) {
    return $http.get('/api/blog');
}

function addOneBlog($http, blogData) {
    return $http.post('/api/blog', blogData);
}

function deleteOneBlog($http, blogid) {
    return $http.delete('/api/blog/' + blogid);
}

function readOneBlog($http, blogid) {
    return $http.get('/api/blog/' + blogid);
}

function editOneBlog($http, blogData, blogid) {
    return $http.put('/api/blog/' + blogid , blogData);
}