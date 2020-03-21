app.directive('timePicker', function() {
  return {
    restrict: "E",
    require: 'ngModel',
    template: '<div class="input-group date" id="datetimepicker">' +
              '<input type="text" class="form-control" />' +
                  '<span class="input-group-addon">' +
                  '<span class="glyphicon glyphicon-calendar"></span>' +
                  '</span>' +
                '</div>',
    link: function(scope, element, attrs, ngModelCtrl) {
      if(!ngModelCtrl) return;
      ngModelCtrl.$render = function(){
        element.val( ngModelCtrl.$viewValue || '' );
      };
      var formatPattern = /(?:(?:([01]?\d|2[0-3]):)?([0-5]?\d):)?([0-5]?\d)/g;
      var options = {
        format: 'YYYY MM DD HH:mm:ss.SSS',
        debug: true,
        keyBinds: {
          enter: function() {
            read();
          },
        },
      };

      function read() {
        var value = element.find('input').val();
        if (value.match(formatPattern)) {
          ngModelCtrl.$setViewValue(value);
        } else {
          ngModelCtrl.$setViewValue(ngModelCtrl.$viewValue);
        }
      }

      var childElm = $(element).children();
      childElm.datetimepicker(options);
          
      childElm.on('dp.change', function(){
        scope.$apply(read);
      });

      read();
    },
  };
});

/**
 * Update a $scope variable when user is in an input 
 * field and presses enter
 * <input ng-enter="giftTotal"/>
 */
// app.directive('ngEnter', function() {
//   return function(scope, element, attrs) {
//     element.bind("keydown keypress", function(event) {
//       if(event.which === 13) {
//         scope.$apply(function(){
//           scope[attrs.ngEnter] = element.val();
//         });

//         event.preventDefault();
//       }
//     });
//   };
// });