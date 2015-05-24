angular.module('app')
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('editOverride', {
            url: "/edit-override/:id",
            controller: 'EditOverrideCtrl',
            templateUrl: '/app/partials/views/EditOverride.html',
            resolve: {
                activeTab: function (chrome) {
                    return chrome.activeTab();
                },
                scriptID: function ($stateParams) {
                    return $stateParams.id;
                },
                data: function (scripts, $stateParams) {
                    return scripts.get($stateParams.id);
                }
            }
        });
    }])
    .controller('EditOverrideCtrl', ['$scope', '$http', '$q', '$state', 'scriptID', 'scripts', 'data', 'activeTab', 'chrome', 'hotkeys',
        function ($scope, $http, $q, $state, scriptID, scripts, data, activeTab, chrome, hotkeys) {

            $scope.data = data;

            $scope.tabsMenu = [
                {
                    id: 'settings',
                    icon: 'fa fa-wrench',
                    title: 'Settings'
                },
                {
                    id: 'html',
                    icon: 'fa fa-html5',
                    title: 'HTML'
                },
                {
                    id: 'css',
                    icon: 'fa fa-css3',
                    title: 'CSS'
                },
                {
                    id: 'js',
                    icon: 'fa fa-jsfiddle',
                    title: 'Javascript'
                }
            ];

            $scope.ac_options = {
                suggest: function (term) {
                    return $q(function (resolve) {
                        $http({
                            url: 'http://api.cdnjs.com/libraries',
                            params: {
                                fields: 'version',
                                search: term
                            }
                        }).success(function (results) {
                            results = results.results.map(function (result) {
                                return {
                                    label: result.name + ' (' + result.version + ')',
                                    value: result.latest.replace('http://', 'https://')
                                }
                            });
                            resolve(results.reverse());
                        });
                    });
                },
                on_select: function (selected_item) {
                    if (!$scope.data.libs) {
                        $scope.data.libs = [];
                    }
                    $scope.data.libs.push(selected_item);
                    document.getElementsByClassName('mass-ac-input')[0].value = null;
                    $scope.form.$setDirty();
                }
            };

            function init() {
                hotkeys.bindTo($scope)
                    .add({
                        combo: 'ctrl+s',
                        callback: $scope.submitHandler
                    });
            }

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
                $scope.saving = true;

                scripts.set(scriptID, $scope.data).then(function () {
                    chrome.messageTabs({
                        request: "overrideUpdated",
                        urlQueries: $scope.data.urlQueries
                    });

                    // Reset the save button
                    $scope.form.$setPristine();
                    $scope.saving = false;
                });
            };

            /**
             *
             */
            $scope.removeOverride = function () {
                if (confirm('Are you sure you want to remove this override?')) {
                    scripts.remove(scriptID).then(function () {
                        $state.go('allOverrides');
                    });
                }
            };

            /**
             *
             * @param arr
             * @param index
             */
            $scope.remove = function (arr, index) {
                arr.splice(index, 1);
                $scope.form.$setDirty();
            };

            init();
        }
    ]);