angular.module('ngSplashScreen', [])

.constant('ngSplashScreenPath', 'module/splashScreen/themes')

.controller('splashScreenController', ['$scope', 'ngSplashScreenPath', '$timeout', '$location', function($scope, path, $timeout, $location) {
    var _this = this;

    $timeout(function(){
      $location.path(_this.data.redirectTo);
    }, (_this.data.duration || 10000));

    $scope.$on('$includeContentLoaded', function(){
      $timeout(function() {
        _this.centerLogo('img.logo-down');
      }, 100);
    });

  _this.centerLogo = function(selector) {
      var $imageSelector = angular.element(selector);
      if ($imageSelector) {
        var width = ($imageSelector.width()/2*(-1)) + "px";
        $imageSelector.css({'margin-left': width});
      }
  };

  _this.contentUrl = function(type) {
      if (_this.theme) {
          if (type === "html") {
              return path + "/" + _this.theme + '/index.html';
          } else if (type === "css") {
              return path + "/" + _this.theme + "/style.css";
          }
      }
  };
}])

.directive('splashScreen', ['ngSplashScreenPath', function(){
    return {
        restrict: 'E',
        scope: {
            theme  : '=theme',
            data   : '=data',
            events : '=events'
        },
        bindToController : true,
        controllerAs: "splashScreenController",
        controller: "splashScreenController",
        template: '<link data-ng-href="{{splashScreenController.contentUrl(\'css\')}}" rel="stylesheet"/><div ng-include="splashScreenController.contentUrl(\'html\')"></div>'
    };
}]);
