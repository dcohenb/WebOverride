/**
 * Initialize th angular application
 */
var app = angular.module('app', [
    'ngSanitize',
    'ui.router',
    'ui.ace',
    'cfp.hotkeys',
    'MassAutoComplete'
])
    .config(['$urlRouterProvider', '$compileProvider',
        function ($urlRouterProvider, $compileProvider) {
            // For any unmatched url, redirect to default state
            $urlRouterProvider.otherwise("/all-overrides");

            // Allow the app to load assets from the extension
            var sanitizeWhitelist = /^\s*(https?|ftp|mailto|chrome-extension):/;
            $compileProvider.aHrefSanitizationWhitelist(sanitizeWhitelist);
            $compileProvider.imgSrcSanitizationWhitelist(sanitizeWhitelist);
        }])
    .run(['$rootScope', 'configAPI',
        function ($rootScope, configAPI) {
            configAPI.init();

            $rootScope.config = config;
            $rootScope._ = _;

            $rootScope.fullmode = window.location.hash.indexOf('full') !== -1;

            $rootScope.$on('$stateChangeSuccess', function (e, newState) {
                $rootScope.currentState = newState.name;
            });
        }]);