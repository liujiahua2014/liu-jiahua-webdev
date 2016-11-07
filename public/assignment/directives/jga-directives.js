(function() {
    angular
        .module("jgaDirectives", [])
        .directive("sortable", sortable);

    function sortable($routeParams) {

        function linker(scope, element) {
            var start = -1;
            var end = -1;

            element.sortable({
                start: function(event, ui) {
                    start = $(ui.item).index();
                },
                stop: function(event, ui) {
                    end = $(ui.item).index();
                    scope.sortableController.sort($routeParams.pid, start, end);
                }
            });
        }

        return {
            scope: {},
            link: linker,
            controller: sortableController,
            controllerAs: 'sortableController'
        }
    }

    function sortableController(WidgetService, $routeParams) {
        var vm = this;
        vm.sort = sort;

        function sort(pid, start, end) {
            WidgetService.sort(pid, start, end);
        }
    }
})();