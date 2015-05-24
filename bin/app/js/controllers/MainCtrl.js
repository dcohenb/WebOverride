angular.module('app')
    .controller('MainCtrl', ['$scope', '$rootScope',
        function ($scope, $rootScope) {

            $scope.popout = function () {
                if (!$rootScope.fullmode) {
                    window.open(window.location.href + "?full=true");
                }
            };
        }]);