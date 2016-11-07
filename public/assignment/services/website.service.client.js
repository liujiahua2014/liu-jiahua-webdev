(function(){
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);

    function WebsiteService($http) {
        var api = {
            createWebsite: createWebsite,
            findWebsitesByUser: findWebsitesByUser,
            findWebsiteById: findWebsiteById,
            updateWebsite: updateWebsite,
            deleteWebsite: deleteWebsite
        };
        return api;

        function createWebsite(uid, website) {
            var url = "/api/user/"+uid+"/website";
            return $http.post(url, website);
        }

        function findWebsitesByUser(uid) {
            var url = "/api/user/"+uid+"/website";
            return $http.get(url);
        }

        function findWebsiteById(wid) {
            var url = "/api/website/"+wid;
            return $http.get(url);
        }

        function updateWebsite(website) {
            var url = "/api/website/" + website._id;
            return $http.put(url, website);
        }
        
        function deleteWebsite(wid) {
            var url = "/api/website/" + wid;
            return $http.delete(url);
        }
    }
})();