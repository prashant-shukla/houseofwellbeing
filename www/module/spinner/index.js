angular.module('ngSpinner', [])

.constant('ngSpinnerPath', 'module/spinner/svg')


.controller('spinnerController', ['ngSpinnerPath', function(path) {
  var _this = this;
  _this.contentUrl = function(type) {
      if (_this.theme) {
          return path + "/" + _this.theme + '.svg';
      }
  };

}])

.directive('spinner', ['ngSpinnerPath', function(path){
    return {
        restrict: 'E',
        scope: {
            theme  : '=theme'
        },
        bindToController : true,
        controllerAs: "spinnerController",
        controller: "spinnerController",
        template: '<img data-ng-src="{{spinnerController.contentUrl()}}" />'
    };
}]);
