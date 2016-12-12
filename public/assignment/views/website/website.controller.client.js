(function(){
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController)
        .controller("NewWebsiteController", NewWebsiteController)
        .controller("EditWebsiteController", EditWebsiteController);

    function WebsiteListController($routeParams, WebsiteService) {
            var vm = this;
            vm.uid = $routeParams.uid;

            function init() {
                WebsiteService
                    .findWebsitesByUser(vm.uid)
                    .success(function(websites){
                        vm.websites = websites;
                    });
            }

            init();
        }

        function NewWebsiteController($location, $routeParams, WebsiteService) {
            var vm = this;
            vm.uid = $routeParams.uid;
            vm.createWebsite = createWebsite;

            function init() {
                WebsiteService
                    .findWebsitesByUser(vm.uid)
                    .success(function(websites){
                        vm.websites = websites;
                    });
            }

            init();

            function createWebsite(name, description) {
                var website = {
                    name: name,
                    description: description
                };
                WebsiteService
                    .createWebsite(vm.uid, website)
                    .success(function () {
                        $location.url("/user/"+vm.uid+"/website");
                    })
                    .error(function(error) {
                        vm.error = error;
                    });
            }
        }

        function EditWebsiteController($location, $routeParams, WebsiteService) {
            var vm = this;
            vm.uid = $routeParams.uid;
            vm.wid = $routeParams.wid;
            vm.deleteWebsite = deleteWebsite;
            vm.updateWebsite = updateWebsite;

            function init() {
                WebsiteService
                    .findWebsitesByUser(vm.uid)
                    .success(function(websites){
                        vm.websites = websites;
                    });
                WebsiteService
                    .findWebsiteById(vm.wid)
                    .success(function(website) {
                        vm.website = website;
                    });
            }
            init();

            function deleteWebsite() {
                WebsiteService
                    .deleteWebsite(vm.wid)
                    .then(
                        function(response) {
                            $location.url ("/user/"+vm.uid+"/website");
                        },
                        function(err) {
                            vm.error = err;
                        }
                    );
            }

            function updateWebsite() {
                if(vm.website.name == null) {
                    vm.error = "Error!";
                    return;
                }
                WebsiteService
                    .updateWebsite(vm.website)
                    .then(
                        function(response) {
                            $location.url ("/user/"+vm.uid+"/website");
                        },
                        function(err) {
                            vm.error = err;
                        }
                    );
            }
    }
})();