angular.module('ngLoginAndRegister', [])

.constant('ngLoginAndRegisterPath', 'module/loginAndRegister/themes/')

.directive('login', ['ngLoginAndRegisterPath', function(path) {
    return {
        restrict: 'E',
        scope: {
            theme  : '=theme',
            data   : '=data',
            events : '=events'
        },
        bindToController : true,
        controllerAs: 'loginController',
        controller: ['$scope', '$timeout', function($scope, $timeout) {
            var _this = this;

            $scope.$on('$includeContentLoaded', function(){
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

            _this.onClick = function(event) {
                var params = {
                    username : _this.username ? _this.username : '',
                    password : _this.password ? _this.password : ''
                };

                if (_this.events && _this.events[event]) {
                    this.events[event](params);
                }
            };

            _this.contentUrl = function(type) {
                if (_this.theme) {
                    if (type === 'html') {
                        return path + 'login/' + _this.theme + '/index.html';
                    } else if (type === 'css') {
                        return path + 'login/' + _this.theme + '/style.css';
                    }
                }
            };
        }],
       template: '<link data-ng-href="{{loginController.contentUrl(\'css\')}}" rel="stylesheet"/><div ng-include="loginController.contentUrl(\'html\')"></div>'
    };
}])

.directive('register', ['ngLoginAndRegisterPath', function(path) {
    return {
        restrict: 'E',
        scope: {
            theme  : '=theme',
            data   : '=data',
            events : '=events'
        },
        bindToController : true,
        controllerAs: 'registerController',
        controller: ['$scope', '$timeout', function($scope, $timeout) {
          var _this = this;

          $scope.$on('$includeContentLoaded', function(){
            $timeout(function() {
                if (_this.data) {
                    if (_this.data.headerImage) {
                        angular.element('.container-hearder-image')
                         .css({'background-image': 'url("'+ _this.data.headerImage + '")'});
                    }
                    if (_this.data.backgroundImage) {
                        angular.element('.container-background')
                         .css({'background-image': 'url("'+ _this.data.backgroundImage + '")'});
                    }
                    if (_this.data.containerBodyImage) {
                        angular.element('.container-background-full')
                         .css({'background-image': 'url("'+ _this.data.containerBodyImage + '")'});
                    }
                }
            });
          });

            _this.onClick = function(event) {
                var params = {
                    username : _this.username ? _this.username : '',
                    password : _this.password ? _this.password : '',
                    email    : _this.email ? _this.email : '',
                    country  : _this.country ? _this.country : '',
                    city     : _this.city ? _this.city : ''
                };

                if (_this.events && _this.events[event]) {
                    this.events[event](params);
                }
            };

            _this.contentUrl = function(type) {
                if (_this.theme) {
                    if (type === 'html') {
                        return path + 'register/' + _this.theme + '/index.html';
                    } else if (type === 'css') {
                        return path + 'register/' + _this.theme + '/style.css';
                    }
                }
            };
        }],
        template: '<link data-ng-href="{{registerController.contentUrl(\'css\')}}" rel="stylesheet"/><div ng-include="registerController.contentUrl(\'html\')"></div>'
    };
}]);
