angular.module('app')
    .factory('configAPI', [function () {
        'use strict';

        /**
         *
         */
        function init() {
            if (!window.config) {
                window.config = {};
            }

            _.each(_getStoredConfig(), function (value, key) {
                config[key] = value;
            });
        }

        /**
         *
         * @param key
         * @param value
         */
        function set(key, value) {
            config[key] = value;

            // Long term storage
            var storedConfig = _getStoredConfig();
            storedConfig[key] = value;
            localStorage.config = JSON.stringify(storedConfig);
        }

        /**
         *
         * @param key
         */
        function remove(key) {
            var storedConfig = _getStoredConfig();
            delete storedConfig[key];
            delete config[key];
            localStorage.config = JSON.stringify(storedConfig);
        }

        /**
         *
         * @returns {*}
         */
        function _getStoredConfig() {
            if (!localStorage.config) {
                return {};
            }

            try {
                var result = JSON.parse(localStorage.config);
                return result;
            } catch (e) {
                return {};
            }
        }

        init();

        return {
            init: init,
            set: set,
            remove: remove
        };
    }]);