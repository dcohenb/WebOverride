angular.module('app')
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('addOverride', {
            url: "/add-override",
            controller: 'AddOverrideCtrl',
            templateUrl: "/app/partials/views/AddOverride.html",
            resolve: {
                activeTab: function (chrome) {
                    return chrome.activeTab();
                }
            }
        });
    }])
    .controller('AddOverrideCtrl', ['$scope', '$state', 'scripts', 'activeTab',
        function ($scope, $state, scripts, activeTab) {

            $scope.data = {
                title: null,
                active: true,
                urlQueries: [activeTab && activeTab.url]
            };

            /**
             *
             */
            $scope.resetURL = function () {
                $scope.data.urlQueries = [activeTab && activeTab.url];
            };

            /**
             *
             */
            $scope.submitHandler = function () {
                scripts.set(null, $scope.data).then(function (id) {
                    // Redirect to the edit page if this is a newly added override
                    $state.go('editOverride', {
                        id: id
                    });
                });
            };

            /**
             *
             * @param arr
             * @param index
             */
            $scope.remove = function (arr, index) {
                arr.splice(index, 1);
            };
        }
    ]);