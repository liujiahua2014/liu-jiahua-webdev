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
        vm.getSafeHtml = getSafeHtml;
        vm.getSafeUrl = getSafeUrl;

        function init() {
            WidgetService
                .findWidgetsByPage(vm.pid)
                .success(function(widgets) {
                    vm.widgets = widgets;
                    // $("tbody").sortable();
                });
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
        vm.createWidget = createWidget;

        function createWidget(widgetType) {
                var widget = {
                    _id : (new Date()).getTime(),
                    pid: vm.pid,
                    widgetType: widgetType,
                    size: null,
                    text: "sample",
                    width: null,
                    url: null
                };

                WidgetService
                    .createWidget(vm.pid, widget)
                    .success(function() {
                        $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget/" + widget._id);
                    })
                    .error(function(error) {
                        vm.error = "Unable to create widget";
                    });
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
            WidgetService
                .findWidgetById(vm.wgid)
                .success(function(widget) {
                    vm.widget = widget;
                })
        }
        init();

        function deleteWidget() {
            WidgetService
                .deleteWidget(vm.wgid)
                .success(function() {
                    $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget");
                })
                .error(function(error) {
                    vm.error = "Unable to delete widget";
                });
        }

        function updateWidget() {
            WidgetService
                .updateWidget(vm.widget)
                .success(function() {
                    $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget");
                })
                .error(function(error) {
                    vm.error = "Unable to edit widget";
                });
        }
    }
})();