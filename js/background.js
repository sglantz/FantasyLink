chrome.pageAction.onClicked.addListener(function (tab) {
    getOptions(function (options) {
        if (options.enabled) {
            chrome.pageAction.setIcon({ tabId: tab.id, path: '/img/icon38_disabled.png'});
        } else {
            chrome.pageAction.setIcon({ tabId: tab.id, path: '/img/icon38.png'});
        }
        options.enabled = !options.enabled;
        setOptions(function () { });
    });
});

chrome.extension.onRequest.addListener(function (request, sender) {
    if (request == "showPageAction") {
        getOptions(function (options) {
            if (options.enabled) {
                chrome.pageAction.setIcon({ tabId: sender.tab.id, path: '/img/icon38.png' });
            } else {
                chrome.pageAction.setIcon({ tabId: sender.tab.id, path: '/img/icon38_disabled.png' });
            }
            chrome.pageAction.show(sender.tab.id);
        });
    }
});

chrome.runtime.onInstalled.addListener(function (object) {
    chrome.tabs.create({url: "html/options.html"}, function (tab) {
        options.installDate = new Date();
    });
});