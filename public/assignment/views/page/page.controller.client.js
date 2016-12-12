(function(){
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController)
        .controller("NewPageController", NewPageController)
        .controller("EditPageController", EditPageController);

    function PageListController($routeParams, PageService) {
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;

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
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.createPage = createPage;

        function init() {
            PageService
                .findPagesByWebsite(vm.wid)
                .success(function(pages){
                    vm.pages = pages;
                });
        }

        init();

        function createPage(name, title) {
            var page = {
                name: name,
                title: title
            };
            PageService
                .createPage(vm.wid, page)
                .success(function () {
                    $location.url("/user/"+vm.uid+"/website/"+vm.wid+"/page");
                })
                .error(function(error) {
                    vm.error = error;
                });
        }
    }

    function EditPageController($location, $routeParams, PageService) {
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;
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
            if(vm.page.name == null) {
                vm.error = "Error!";
                return;
            }
            PageService
                .updatePage(vm.page)
                .success(function() {
                    $location.url("/user/"+vm.uid+"/website/"+vm.wid+"/page");
                })
                .error(function(err) {
                    vm.error = err;
                })

        }
    }
})();