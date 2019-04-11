var app = angular.module('blogApp' , ['ngRoute']);

//*** Authentication Service and Methods **
app.service('authentication', authentication);
authentication.$inject = ['$window', '$http'];
function authentication ($window, $http) {

    var saveToken = function (token) {
        $window.localStorage['blog-token'] = token;
    };

    var getToken = function () {
        return $window.localStorage['blog-token'];
    };

    var register = function(user) {
        console.log('Registering user ' + user.email + ' ' + user.password);
        return $http.post('/api/register', user).success(function(data){
            saveToken(data.token);
        });
    };

    var login = function(user) {
        console.log('Attempting to login user ' + user.email + ' ' + user.password);
        return $http.post('/api/login', user).success(function(data) {
            saveToken(data.token);
        });
    };

    var logout = function() {
        $window.localStorage.removeItem('blog-token');
    };

    var isLoggedIn = function() {
        var token = getToken();

        if(token){
            var payload = JSON.parse($window.atob(token.split('.')[1]));

            return payload.exp > Date.now() / 1000;
        } else {
            return false;
        }
    };

    var currentUser = function() {
        if(isLoggedIn()){
            var token = getToken();
            var payload = JSON.parse($window.atob(token.split('.')[1]));
            return {
                email : payload.email,
                name : payload.name
            };
        }
    };

    return {
        saveToken : saveToken,
        getToken : getToken,
        register : register,
        login : login,
        logout : logout,
        isLoggedIn : isLoggedIn,
        currentUser : currentUser
    };
}

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

        .when('/register', {
            templateUrl: 'pages/register.html',
            controller: 'registerController',
            controllerAs: 'vm'
        })

        .when('/login', {
            templateUrl: 'pages/login.html',
            controller: 'loginController',
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


app.controller('blogController', [ '$http', 'authentication', function blogController($http, authentication) {
    var vm = this;
    vm.title = allTitle;
    vm.pageHeader = "List of Blogs";

    vm.isLoggedIn = function() {
        return authentication.isLoggedIn();
    }

    listOfBlogs($http)
        .success(function(data) {
            vm.blog = data;
            vm.message ="Blog(s) found";
        })
        .error(function(e) {
            vm.message = "No blog list found"
        });
}]);

app.controller('addController', [ '$http', '$location', 'authentication', function addController($http, $location, authentication) {
    var vm = this;
    vm.blog = {};
    vm.title = allTitle;
    vm.pageHeader = "Add a Blog";

    vm.onSubmit = function() {
        var blogData = vm.blog;
        blogData.blogTitle = userForm.blogTitle.value;
        blogData.blogText = userForm.blogText.value;

        addOneBlog($http, blogData, authentication)
            .success(function(blogData) {
                console.log(blogData);
                $location.path('/blog').replace();
            })
            .error(function(e) {
                console.log(e);
            });
    };
}]);

app.controller('deleteController', [ '$http', '$routeParams', '$location', 'authentication', function deleteController($http, $routeParams, $location, authentication) {
    var vm = this;
    vm.blog = {};
    vm.title = allTitle;
    vm.pageHeader = "Delete a Blog entry";
    vm.id = $routeParams.blogid;

    vm.isLoggedIn = function() {
        return authentication.isLoggedIn();
    }

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

        deleteOneBlog($http, vm.id, authentication)
            .success(function(blogData) {
                vm.message = "Blog successfully deleted";
                $location.path('/blog').replace();
            })
            .error(function(e) {
                vm.message = vm.id + " not found.";
            });
    }
}]);

app.controller('editController', [ '$http', '$routeParams', '$location', 'authentication', function editController($http, $routeParams, $location, authentication) {
    var vm = this;
    vm.title = allTitle;
    vm.pageHeader = "Edit a Blog entry";
    vm.blog = {};
    vm.id = $routeParams.blogid;

    vm.isLoggedIn = function() {
        return authentication.isLoggedIn();
    }

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

        editOneBlog($http, blogData, vm.id, authentication)
            .success(function(blogData) {
                vm.message = "Blog successfuly updated";
                $location.path('/blog').replace();
            })
            .error(function(e) {
                vm.message = vm.id + " not found.";
            });
    }
}]);

app.controller('loginController', [ '$http', '$location', 'authentication', function loginController($http, $location, authentication) {
    var vm = this;

    vm.pageHeader = 'Sign in to Blogger';

    vm.credentials = {
        email : "",
        password : ""
    };

    vm.returnPage = $location.search().page || '/blog';

    vm.onSubmit = function () {
        vm.formError = "";
        if (!vm.credentials.email || !vm.credentials.password) {
            vm.formError = "All fields required, please try again";
            return false;
        } else {
            vm.doLogin();
        }
    };

    vm.doLogin = function() {
        vm.formError = "";
        authentication
            .login(vm.credentials)
            .error(function(err){
                var obj = err;
                vm.formError = obj.message;
            })
            .then(function(){
                $location.search('page', null);
                $location.path(vm.returnPage);
            });
    };
}]);

app.controller('registerController', [ '$http', '$location', 'authentication', function registerController($http, $location, authentication) {
    var vm = this;

    vm.pageHeader = 'Create a new Blogger account';

    vm.credentials = {
        name : "",
        email : "",
        password : ""
    };

    vm.returnPage = $location.search().page || '/blog';

    vm.onSubmit = function () {
        vm.formError = "";
        if (!vm.credentials.name || !vm.credentials.email || !vm.credentials.password) {
            vm.formError = "All fields required, please try again";
            return false;
        } else {
            vm.doRegister();
        }
    };

    vm.doRegister = function() {
        vm.formError = "";
        authentication
            .register(vm.credentials)
            .error(function(err){
                vm.formError = "Error registering. Email already registered. Try again with a different email address."
                //vm.formError = err;
            })
            .then(function(){
                $location.search('page', null);
                $location.path(vm.returnPage);
            });
    };
}]);

// function calls
function listOfBlogs($http) {
    return $http.get('/api/blog');
}

function readOneBlog($http, blogid) {
    return $http.get('/api/blog/' + blogid);
}

function addOneBlog($http, blogData, authentication) {
    return $http.post('/api/blog', blogData, { headers: { Authorization: 'Bearer '+ authentication.getToken() }});
}

function deleteOneBlog($http, blogid, authentication) {
    return $http.delete('/api/blog/' + blogid, { headers: { Authorization: 'Bearer '+ authentication.getToken() }}) ;
}

function editOneBlog($http, blogData, blogid, authentication) {
    return $http.put('/api/blog/' + blogid , blogData, { headers: { Authorization: 'Bearer '+ authentication.getToken() }});
}

