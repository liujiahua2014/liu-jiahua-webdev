(function(){
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController)
        .controller("RegisterController", RegisterController)
        .controller("ProfileController", ProfileController);

    function LoginController($location, UserService) {
        var vm = this;
        vm.login = login;

        function login(user) {
            UserService
                .login(user)
                .success(function(user){
                    if(user === '0') {
                        vm.alert = "No such user";
                    } else {
                        $location.url("/user/" + user._id);
                    }
                })
                .error(function(msg){
                    vm.alert = msg;
                });
        }
    }

    function RegisterController($location, UserService) {
        var vm = this;
        vm.register = register;

        function register(user) {
            if(user.username == null || user.password == null || user.password !== user.password2) {
                vm.alert = "Error!";
                return;
            }

            UserService
                .createUser(user)
                .success(function(user){
                    $location.url("/user/"+user._id);
                })
                .error(function (error) {
                    vm.alert = error;
                });
        }
    }

    function ProfileController($location, $routeParams, UserService) {
        var vm = this;
        // vm.uid = $routeParams["uid"];
        vm.updateUser = updateUser;
        vm.logout = logout;

        function init() {
            UserService
                .findCurrentUser()
                .success(function(user){
                    if(user != '0') {
                        vm.user = user;
                    }
                })
                .error(function(msg){
                    vm.error = msg;
                });
        }
        init();

        function updateUser() {
            UserService.updateUser(vm.user);
        }

        function logout() {
            UserService.logout()
                .success(function(){
                    $location.url("/login");
                });
        }
    }
})();