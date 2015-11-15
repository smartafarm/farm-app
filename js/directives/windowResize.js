.directive('resize', function ($window) {
    return function (scope, elm, attr) {

        var w = angular.element($window);
           if($window.innerWidth < attr.hvalue ){
                
                    elm.addClass('collapse')
                }else
                {
                    elm.removeClass('collapse')
                }

        w.bind('resize', function () {
            
          if($window.innerWidth < attr.hvalue ){
                
                    elm.addClass('collapse')

                }else
                {
                    elm.removeClass('collapse')
                }
            //scope.$apply();
        });
    }
})