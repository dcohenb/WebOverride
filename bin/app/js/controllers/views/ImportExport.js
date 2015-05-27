angular.module('app')
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('importExport', {
            url: "/import-export",
            controller: 'ImportExportCtrl',
            templateUrl: "/app/partials/views/ImportExport.html"
        });
    }])
    .controller('ImportExportCtrl', ['$scope', '$state', 'scripts',
        function ($scope, $state, scripts) {

            $scope.export = function () {
                var filename = 'web_override_backup_(' + new Date().toISOString() + ').json';
                scripts.getAll().then(function (overrides) {
                    var contents = JSON.stringify(overrides || []);
                    _.downloadFileFromText(filename, contents);
                });
            };

            $scope.onContent = function (content) {
                if (!content) {
                    return alert('Invalid Backup file was provided.');
                }

                var newOverrides = {};
                _.map(content, function (override, id) {
                    if (!_.isUUID(id)) return;
                    if (!override.title) return;
                    newOverrides[id] = {
                        title: override.title,
                        urlQueries: override.urlQueries || [],
                        active: override.active || true,
                        libs: override.libs || [],
                        jsContent: override.jsContent || '',
                        cssContent: override.cssContent || '',
                        htmlContent: override.htmlContent || ''
                    }
                });

                if (_.size(newOverrides) === 0) return alert('Backup file has no valid overrides in it');

                scripts.getAll().then(function (overrides) {
                    // Skip user verification if there are no scripts
                    if (_.size(overrides) > 0) {
                        var existingOverrides = _.compact(_.map(newOverrides, function (a, id) {
                            return _.result(overrides[id], 'title');
                        }));

                        // Notify the user about existing scripts that will be replaced
                        if (existingOverrides.length > 0) {
                            var message = ['The following scripts will be overridden:', existingOverrides.join('\n'), 'continue?'].join('\n\n');
                            if (!confirm(message)) return;
                        }
                    }

                    // Import the scripts
                    _.each(newOverrides, function (override, id) {
                        scripts.set(id, override);
                    });

                    // Go back to the main view
                    $state.go('allOverrides');
                });
            };
        }
    ]);