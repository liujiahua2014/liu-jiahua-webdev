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
            PageService
                .findPagesByWebsite(vm.wid)
                .success(function(pages){
                    vm.pages = pages;
                });
        }

        init();
    }

    function NewPageController($location, $routeParams, PageService) {
        var vm = this;
        vm.uid = parseInt($routeParams.uid);
        vm.wid = parseInt($routeParams.wid);
        vm.createPage = createPage;

        function init() {
            PageService
                .findPagesByWebsite(vm.wid)
                .success(function(pages){
                    vm.pages = pages;
                });
        }

        init();

        function createPage(name, description) {
            var page = {
                _id : (new Date()).getTime(),
                name: name,
                wid: vm.wid
            };
            PageService
                .createPage(vm.wid, page)
                .success(function () {
                    $location.url("/user/"+vm.uid+"/website/"+vm.wid+"/page");
                });
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
            PageService
                .findPagesByWebsite(vm.wid)
                .success(function(pages){
                    vm.pages = pages;
                });
            PageService
                .findPageById(vm.pid)
                .success(function(page) {
                    vm.page = page;
                });
        }
        init();

        function deletePage() {
            PageService.deletePage(vm.pid);
            $location.url("/user/"+vm.uid+"/website/"+vm.wid+"/page");
        }

        function updatePage() {
            PageService.updatePage(vm.page);
            $location.url("/user/"+vm.uid+"/website/"+vm.wid+"/page");
        }
    }
})();