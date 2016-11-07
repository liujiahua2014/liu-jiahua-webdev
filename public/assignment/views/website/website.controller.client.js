(function(){
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController)
        .controller("NewWebsiteController", NewWebsiteController)
        .controller("EditWebsiteController", EditWebsiteController);

    function WebsiteListController($routeParams, WebsiteService) {
            var vm = this;
            vm.uid = parseInt($routeParams.uid);

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
            vm.uid = parseInt($routeParams.uid);
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
                    _id : (new Date()).getTime(),
                    name: name,
                    uid: vm.uid
                };
                WebsiteService
                    .createWebsite(vm.uid, website)
                    .success(function () {
                        $location.url("/user/"+vm.uid+"/website");
                    });
            }
        }

        function EditWebsiteController($location, $routeParams, WebsiteService) {
            var vm = this;
            vm.uid = parseInt($routeParams.uid);
            vm.wid = parseInt($routeParams.wid);
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
                WebsiteService.deleteWebsite(vm.wid);
                $location.url("/user/"+vm.uid+"/website");
            }

            function updateWebsite() {
                WebsiteService.updateWebsite(vm.website);
                $location.url("/user/"+vm.uid+"/website");
            }
    }
})();