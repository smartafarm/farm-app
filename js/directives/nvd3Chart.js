.directive('flexibleDiv', function () {
        return {
            scope: {
                opts: '=' 
            },
            link: function (scope, element, attr) {

                // Watching height of parent div
                scope.$watch(function () {
                    return element.parent(0).height();
                }, updateHeight);

                // Watching width of parent div
                scope.$watch(function () {
                    return element.parent(0).width();
                }, updateWidth);

                function updateHeight() {
                    scope.opts.chart.height = element.parent(0).height()-150; //150 custom padding
                }

                function updateWidth() {
                    scope.opts.chart.width = element.parent(0).width()-50; //50 custom padding
                }
            }
        }
    })