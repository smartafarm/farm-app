.directive('resize', function ($window) {
    //directive to collapse panel header on window resize
    //receives horizontal value from html element to trigger collapse
    return function (scope, elm, attr) {

        var w = angular.element($window);
        //when elements are initialized
           if($window.innerWidth < attr.hvalue ){
                
                    elm.addClass('collapse')
                }else
                {
                    elm.removeClass('collapse')
                }

        w.bind('resize', function () {
            
        //resize done on the fly            
          if($window.innerWidth < attr.hvalue ){
                
                    elm.addClass('collapse')

                }else
                {
                    elm.removeClass('collapse')
                }
            
        });
    }
})