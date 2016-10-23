(function(){
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController)
        .controller("RegisterController", RegisterController)
        .controller("ProfileController", ProfileController);

    function LoginController($location, UserService) {
        var vm = this;
        var user = null;
        vm.login = login;

        function login(username, password) {
            user = UserService.findUserByCredentials(username, password);
            if(user) {
                $location.url("/user/" + user._id);
            } else {
                vm.alert = "Unable to login";
            }
        }
    }

    function RegisterController($location, UserService) {
        var vm = this;
        vm.register = register;
        vm.user = {_id: 135, username: "", password: "", firstName: "", lastName: ""};

        function register(user) {
            if(UserService.createUser(user)) {
                $location.url("/user/" + user._id);
        } else {
                vm.alert = "Unable to register";
            }
        }
    }

    function ProfileController($routeParams, UserService) {
        var vm = this;

        vm.uid = parseInt($routeParams["uid"]);
        vm.user = UserService.findUserById(vm.uid);

        vm.updateUser = updateUser;

        function updateUser(newUser) {
            var isSuccess = UserService.updateUser(vm.uid, newUser);
            if(isSuccess){
                vm.success = "Updated";
            } else {
                vm.error = "Unable to update.";
            }
        }
    }

})();