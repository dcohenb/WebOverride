/**
 * Get all the scripts and activate the relevant ones
 */
chrome.storage.sync.get(function (overrides) {
    // Filter out inactive and irrelevant overrides
    var relevantOverrides = [];
    for (var id in overrides) {
        if (overrides.hasOwnProperty(id) && overrides[id].active) {
            var query = overrides[id].urlQueries.filter(function (urlQuery) {
                return new RegExp(urlQuery).test(window.location.href);
            });
            if (query.length > 0) {
                relevantOverrides.push(overrides[id]);
            }
        }
    }

    // Activate all relevant overrides
    relevantOverrides.forEach(function (override) {
        if (override.htmlContent) {
            document.body.innerHTML += override.htmlContent;
        }
        if (override.cssContent) {
            document.head.innerHTML += '<style type="text/css">' + override.cssContent + '</style>';
        }
        if (override.libs) {
            override.libs.forEach(function (lib) {
                var s = document.createElement("script");
                s.type = "text/javascript";
                s.src = lib.value;
                document.head.appendChild(s);
            });
        }
        if (override.jsContent) {
            var s = document.createElement("script");
            s.type = "text/javascript";
            s.text = override.jsContent;
            document.head.appendChild(s);
        }
    });
});

/**
 * Listen for updates in overrides and reload the page if the updated override is relevant
 */
chrome.runtime.onMessage.addListener(function (message) {
    if (message.request == 'overrideUpdated' && message.urlQueries) {
        // Check if any of the overrides urls pass the regexp test
        var overrideRelevant = message.urlQueries.filter(function (urlQuery) {
            return new RegExp(urlQuery).test(window.location.href);
        });

        if (overrideRelevant.length > 0) {
            window.location.reload();
        }
    }
});