(function(){
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);

    var websites = [
        { "_id": 123, "name": "Facebook",    "developerId": 456 },
        { "_id": 234, "name": "Tweeter",     "developerId": 456 },
        { "_id": 456, "name": "Gizmodo",     "developerId": 456 },
        { "_id": 567, "name": "Tic Tac Toe", "developerId": 123 },
        { "_id": 678, "name": "Checkers",    "developerId": 123 },
        { "_id": 789, "name": "Chess",       "developerId": 234 }
    ];

    function WebsiteService($http) {
        var api = {
            createWebsite: createWebsite,
            findWebsitesByUser: findWebsitesByUser,
            findWebsiteById: findWebsiteById,
            updateWebsite: updateWebsite,
            deleteWebsite: deleteWebsite
        };
        return api;

        function createWebsite(userId, website) {
            for(var i in websites) {
                if(websites[i].name === website.name) {
                    return false;
                }
            }
            website.developerId = userId;
            websites.push(website);
            return true;
        }

        function findWebsitesByUser(userId) {
            var resultSet = [];
            for(var i in websites) {
                if(websites[i].developerId === userId) {
                    resultSet.push(websites[i]);
                }
            }
            return resultSet;
        }

        function findWebsiteById(websiteId) {
            for(var i in websites) {
                if(websites[i]._id === websiteId) {
                    return websites[i];
                }
            }
            return null;
        }

        function updateWebsite(websiteId, website) {
            for(var i in websites) {
                if(websites[i]._id === websiteId) {
                    websites[i].name = website.name;
                    websites[i].developerId = website.developerId;
                    return true;
                }
            }
            return false;
        }
        
        function deleteWebsite(websiteId) {
            for(var i in websites) {
                if(websites[i]._id === websiteId) {
                    websites.splice(i, 1);
                    return true;
                }
            }
            return false;
        }
    }
})();