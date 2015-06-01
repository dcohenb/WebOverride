/**
 * @author Daniel Cohen <dcohenb@dcohenb.com>
 * @date 6/1/2015
 */
var win;

// Listen for clicks on the extension button
chrome.browserAction.onClicked.addListener(function () {

    // Focus the window if there is one already open in the background
    if (win) {
        // Window still exists, just focus.
        chrome.windows.update(win.id, {
            focused: true
        }, function (_win) {

        });
        return;
    }

    // Create a popup window of the app
    chrome.windows.create({
        url: 'app/app.html',
        left: 10,
        top: 10,
        width: 800,
        height: 600,
        focused: true,
        type: 'popup'
    }, function (_win) {
        win = _win;
    });
});

// Listen for closing windows and reset the win object when the app is closed
chrome.windows.onRemoved.addListener(function (windowId) {
    if (win && win.id === windowId) {
        win = null;
    }
});