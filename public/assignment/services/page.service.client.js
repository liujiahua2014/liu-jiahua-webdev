(function(){
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);

    function PageService($http) {
        var api = {
            createPage: createPage,
            findPagesByWebsite: findPagesByWebsite,
            findPageById: findPageById,
            updatePage: updatePage,
            deletePage: deletePage
        };
        return api;

        function createPage(wid, page) {
            var url = "/api/website/"+wid+"/page";
            return $http.post(url, page);
        }

        function findPagesByWebsite(wid) {
            var url = "/api/website/"+wid+"/page";
            return $http.get(url);
        }

        function findPageById(pid) {
            var url = "/api/page/"+pid;
            return $http.get(url);
        }

        function updatePage(page) {
            var url = "/api/page/" + page._id;
            return $http.put(url, page);
        }

        function deletePage(pid) {
            var url = "/api/page/" + pid;
            return $http.delete(url);
        }
    }
})();