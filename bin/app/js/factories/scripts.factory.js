angular.module('app')
    .factory('scripts', ['$q',
        function ($q) {

            /**
             *
             * @returns {*}
             */
            function getAll() {
                return $q(function (resolve) {
                    chrome.storage.sync.get(function (scripts) {
                        if (_.size(scripts) === 0) {
                            scripts = null;
                        }
                        resolve(scripts);
                    });
                });
            }

            /**
             *
             * @param id
             * @returns {*}
             */
            function get(id) {
                return $q(function (resolve) {
                    chrome.storage.sync.get(id, function (result) {
                        resolve(result[id]);
                    });
                });
            }

            /**
             *
             * @param id
             * @returns {*}
             */
            function remove(id) {
                return $q(function (resolve) {
                    chrome.storage.sync.remove(id, function () {
                        resolve();
                    });
                });
            }

            /**
             *
             * @param id
             * @param script
             * @returns {*}
             */
            function set(id, script) {
                id = id || _.guid();

                script = angular.copy(script);

                if (!script.createdAt) {
                    script.createdAt = Date.now();
                }
                script.updatedAt = Date.now();

                var obj = {};
                obj[id] = script;

                return $q(function (resolve) {
                    chrome.storage.sync.set(obj, function () {
                        resolve(id, script);
                    });
                });
            }

            return {
                getAll: getAll,
                get: get,
                remove: remove,
                set: set
            };
        }]);