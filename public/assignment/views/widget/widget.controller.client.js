(function(){
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController)
        .controller("NewWidgetController", NewWidgetController)
        .controller("EditWidgetController", EditWidgetController);

    function WidgetListController($routeParams, WidgetService, $sce) {
        var vm = this;
        vm.uid = parseInt($routeParams.uid);
        vm.wid = parseInt($routeParams.wid);
        vm.pid = parseInt($routeParams.pid);
        vm.wgid = parseInt($routeParams.wgid);
        vm.getSafeHtml = getSafeHtml;
        vm.getSafeUrl = getSafeUrl;

        function init() {
            vm.widgets = WidgetService.findWidgetsByPageId(vm.pid);
        }
        init();

        function getSafeHtml(widget) {
            return $sce.trustAsHtml(widget.text);
        }

        function getSafeUrl(widget) {
            var urlParts = widget.url.split("/");
            var id = urlParts[urlParts.length - 1];
            var url = "https://www.youtube.com/embed/" + id;
            return $sce.trustAsResourceUrl(url);
        }
    }

    function NewWidgetController($location, $routeParams, WidgetService) {
        var vm = this;
        vm.uid = parseInt($routeParams.uid);
        vm.wid = parseInt($routeParams.wid);
        vm.pid = parseInt($routeParams.pid);
        vm.wgid = parseInt($routeParams.wgid);
        vm.createWidget = createWidget;

        function createWidget(widgetType) {
            var widget = { "_id": 135, "pageId": vm.pid, "widgetType": widgetType, "size": null, "text": "sample", "width": null, "url": null};
            if(WidgetService.createWidget(vm.pid, widget)) {
                $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget/135");
            } else {
                vm.error = "Unable to create widget";
            }
        }
    }

    function EditWidgetController($location, $routeParams, WidgetService) {
        var vm = this;
        vm.uid = parseInt($routeParams.uid);
        vm.wid = parseInt($routeParams.wid);
        vm.pid = parseInt($routeParams.pid);
        vm.wgid = parseInt($routeParams.wgid);
        vm.deleteWidget = deleteWidget;
        vm.updateWidget = updateWidget;

        function init() {
            vm.widget = WidgetService.findWidgetById(vm.wgid);
            console.log(vm.widget);
        }
        init();

        function deleteWidget(widgetId) {
            var result = WidgetService.deleteWidget(widgetId);
            if(result) {
                $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget");
            } else {
                vm.error = "Unable to delete widget";
            }
        }

        function updateWidget(widgetId, text, size, width, url) {
            var widget = { "_id": widgetId, "pageId": vm.widget.pageId, "size": size, "text": text, "width": width, "url": url};
            var result = WidgetService.updateWidget(widgetId, widget);
            if(result) {
                $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget");
            } else {
                vm.error = "Unable to edit widget";
            }
        }
    }
})();