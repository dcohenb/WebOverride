angular.module('app')
    .factory('chrome', ['$q',
        function ($q) {

            var EXTENSION_ID = chrome.app.getDetails().id;

            /**
             *
             * @returns {*}
             */
            function activeTab() {
                return $q(function (resolve) {
                    chrome.tabs.getSelected(null, function (tab) {
                        tab = !_.contains(tab.url, EXTENSION_ID) ? tab : null;
                        resolve(tab);
                    });
                });
            }

            /**
             *
             * @param message
             * @returns {*}
             */
            function messageTabs(message) {
                return $q(function (resolve) {
                    chrome.tabs.query({}, function (tabs) {
                        tabs.forEach(function (tab) {
                            chrome.tabs.sendMessage(tab.id, message);
                        });

                        resolve();
                    });
                });
            }

            return {
                activeTab: activeTab,
                messageTabs: messageTabs
            };
        }]);