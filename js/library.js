var options = {
    enabled: true,
    fangraphs: true,
    baseballreference: true,
    cbs: true,
    espn: true,
    yahoo: true,
    toolbar: false
};

function getOptions(func) {
    chrome.storage.sync.get(options, function (data) {
        if (data !== undefined) {
            options = data;
        }
        func(options);
    });
}

function setOptions(func) {
    chrome.storage.sync.set(options, function () {
        func();
    });
}