(function(){
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController)
        .controller("NewPageController", NewPageController)
        .controller("EditPageController", EditPageController);

    function PageListController($routeParams, PageService) {
        var vm = this;
        vm.uid = parseInt($routeParams.uid);
        vm.wid = parseInt($routeParams.wid);

        function init() {
            vm.pages = PageService.findPagesByWebsiteId(vm.wid);
        }

        init();
    }

    function NewPageController($location, $routeParams, PageService) {
        var vm = this;
        vm.uid = parseInt($routeParams.uid);
        vm.wid = parseInt($routeParams.wid);
        vm.createPage = createPage;

        function init() {
            vm.pages = PageService.findPagesByWebsiteId(vm.wid);
        }
        init();

        function createPage(name, title) {
            var page = { "_id": 135, "name": name, "websiteId": vm.wid };

            if(PageService.createPage(vm.wid, page)) {
                $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page");
            } else {
                vm.error = "Unable to create page";
            }
        }
    }

    function EditPageController($location, $routeParams, PageService) {
        var vm = this;
        vm.uid = parseInt($routeParams.uid);
        vm.wid = parseInt($routeParams.wid);
        vm.pid = parseInt($routeParams.pid);
        vm.deletePage = deletePage;
        vm.updatePage = updatePage;

        function init() {
            vm.pages = PageService.findPagesByWebsiteId(vm.wid);
            vm.page = PageService.findPageById(vm.pid);
        }
        init();

        function deletePage(pageId) {
            var result = PageService.deletePage(pageId);
            if(result) {
                $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page");
            } else {
                vm.error = "Unable to delete page";
            }
        }

        function updatePage(pageId, name, title) {
            var page = { "_id": pageId, "name": name, "websiteId": vm.wid };
            var result = PageService.updatePage(pageId, page);
            if(result) {
                $location.url("/user/" + vm.uid + "/website/" + vm.wid +  "/page");
            } else {
                vm.error = "Unable to edit page";
            }
        }
    }
})();