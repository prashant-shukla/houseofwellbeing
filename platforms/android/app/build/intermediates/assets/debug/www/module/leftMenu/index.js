angular.module('ngLeftMenu', [])

.constant('ngLeftMenuPath', 'module/leftMenu/themes/')

.controller('LeftMenuController', ['$scope', '$timeout', '$ionicSideMenuDelegate',
  'ngLeftMenuPath', '$location', '$ionicHistory',
  function($scope, $timeout, $ionicSideMenuDelegate, path, $location, $ionicHistory) {
    var _this = this;
    _this.templateUrl =  "";
    _this.templateTitle = "";
    _this.headerImage = "";
    _this.backgroundImage = "";

    $scope.$on('$includeContentLoaded', function(){
        if (_this.data && _this.data.items && _this.data.items.length > 0 && _this.data.items[0].pagePath && _this.templateUrl == "") {
           _this.templateUrl = _this.data.items[0].pagePath;
           _this.templateTitle = _this.data.items[0].title;
        }
        _this.addImageOnComponent(_this.data);
    });

    _this.addImageOnComponent = function(data) {
        $timeout(function() {
            if (data) {
                if (data.headerImage) {
                    angular.element('.container-hearder-image')
                     .css({'background-image': 'url("'+ data.headerImage + '")'});
                }
                if (data.backgroundImage) {
                    angular.element('.container-background')
                     .css({'background-image': 'url("'+ data.backgroundImage + '")'});
                }
                if (data.containerBodyImage) {
                    angular.element('.container-background-full')
                     .css({'background-image': 'url("'+ data.containerBodyImage + '")'});
                }
            }
        });
    };

    _this.clickEvent = function(item) {
        $ionicSideMenuDelegate.toggleLeft();
       _this.templateUrl = item.pagePath;
        _this.templateTitle = item.title;
    };


    _this.toggleLeft = function() {
      $ionicSideMenuDelegate.toggleLeft();
    };

    _this.goBack = function() {
      $ionicHistory.goBack();
    };

    if ($ionicSideMenuDelegate) {
      $ionicSideMenuDelegate.canDragContent(true);
    }

    _this.contentUrl = function(type) {
        if (_this.theme) {
            if (type === 'html') {
                return path + _this.theme + '/index.html';
            } else if (type === 'css') {
                return path + _this.theme + '/style.css';
            }
        }
    };
}])

.directive('leftMenu', ['ngLeftMenuPath', function (path) {
    return {
      restrict: 'E',
      scope: {
          theme : '=theme',
          data  : '=data',
          events: '=events'
      },
      bindToController : true,
      controllerAs: "leftMenuController",
      controller: "LeftMenuController",
      template: '<link data-ng-href="{{leftMenuController.contentUrl(\'css\')}}" rel="stylesheet"/><div ng-include="leftMenuController.contentUrl(\'html\')"></div>'
    };
}]);
