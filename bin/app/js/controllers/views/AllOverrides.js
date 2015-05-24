angular.module('app')
    .config(['$stateProvider',
        function ($stateProvider) {
            $stateProvider.state('allOverrides', {
                url: "/all-overrides",
                templateUrl: "/app/partials/views/AllOverrides.html",
                resolve: {
                    overrides: function (scripts) {
                        return scripts.getAll();
                    }
                },
                controller: 'AllOverridesCtrl'
            });
        }])
    .controller('AllOverridesCtrl', ['$scope', '$state', '$q', 'scripts', 'overrides',
        function ($scope, $state, $q, scripts, overrides) {

            $scope.scripts = overrides;

            $scope.update = function (id, script) {
                scripts.set(id, script);
            };

            $scope.removeOverride = function (id) {
                if (confirm('Are you sure you want to remove this override?')) {
                    scripts.remove(id).then(function () {
                        delete $scope.scripts[id];
                    });
                }
            };

            $scope.downloadBackup = function (script, id) {
                var filename = 'web_override_backup_' + script.title + '_(' + new Date().toISOString() + ').json';
                if (id) {
                    var obj = {};
                    obj[id] = overrides[id];
                }
                var contents = JSON.stringify(obj, null, 2);
                _.downloadFileFromText(filename, contents);
            };
        }
    ]);