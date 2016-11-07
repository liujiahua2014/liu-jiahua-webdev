(function () {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);

    function WidgetService($http) {
        var api = {
            createWidget: createWidget,
            findWidgetsByPage: findWidgetsByPage,
            findWidgetById: findWidgetById,
            updateWidget: updateWidget,
            deleteWidget: deleteWidget,
            sort: sort
        };
        return api;

        function createWidget(pid, widget) {
            var url = "/api/page/"+pid+"/widget";
            return $http.post(url, widget);
        }

        function findWidgetsByPage(pid) {
            var url = "/api/page/"+pid+"/widget";
            return $http.get(url);
        }

        function findWidgetById(wgid) {
            var url = "/api/widget/"+wgid;
            return $http.get(url);
        }

        function updateWidget(widget) {
            var url = "/api/widget/" + widget._id;
            return $http.put(url, widget);
        }

        function deleteWidget(wgid) {
            var url = "/api/widget/" + wgid;
            return $http.delete(url);
        }

        function sort(pid, start, end) {
            var url = "/api/page/"+pid+"/widget?initial="+start+"&final="+end;
            return $http.put(url);
        }
    }
})();