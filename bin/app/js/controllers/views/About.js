angular.module('app')
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('about', {
            url: "/about",
            controller: 'AboutCtrl',
            templateUrl: "/app/partials/views/About.html"
        });
    }])
    .controller('AboutCtrl', ['$scope', 'configAPI',
        function ($scope, configAPI) {

            $scope.version = chrome.app.getDetails().version;
            $scope.year = new Date().getFullYear();

            $scope.updateConfig = function (key, val) {
                configAPI.set(key, val);
            };
        }
    ]);