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
            vm.websites = WebsiteService.findWebsitesByUser(vm.uid);
        }

        init();
    }
    
    function NewWebsiteController($location, $routeParams, WebsiteService) {
        var vm = this;
        vm.uid = parseInt($routeParams.uid);
        vm.createWebsite = createWebsite;

        function init() {
            vm.websites = WebsiteService.findWebsitesByUser(vm.uid);
        }

        init();

        function createWebsite(name, description) {
            var website = { "_id": 135, "name": name, "developerId": vm.uid };

            if(WebsiteService.createWebsite(vm.uid, website)) {
                $location.url("/user/" + vm.uid + "/website");
            } else {
                vm.error = "Unable to create website";
            }
        }
    }

    function EditWebsiteController($location, $routeParams, WebsiteService) {
        var vm = this;
        vm.uid = parseInt($routeParams.uid);
        vm.wid = parseInt($routeParams.wid);
        vm.deleteWebsite = deleteWebsite;
        vm.updateWebsite = updateWebsite;

        function init() {
            vm.websites = WebsiteService.findWebsitesByUser(vm.uid);
            vm.website = WebsiteService.findWebsiteById(vm.wid);
        }
        init();

        function deleteWebsite(websiteId) {
            var result = WebsiteService.deleteWebsite(websiteId);
            if(result) {
                $location.url("/user/" + vm.uid + "/website");
            } else {
                vm.error = "Unable to delete website";
            }
        }

        function updateWebsite(websiteId, name, description) {
            var website = { "_id": websiteId, "name": name, "developerId": vm.uid };
            var result = WebsiteService.updateWebsite(websiteId, website);
            if(result) {
                $location.url("/user/" + vm.uid + "/website");
            } else {
                vm.error = "Unable to edit website";
            }
        }
    }
})();