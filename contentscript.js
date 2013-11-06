/*!
 *    "I am rarely happier than when spending an entire day programming my computer to
 *    perform automatically a task that it would otherwise take me a good ten seconds 
 *    to do by hand." ~ Douglas Adams, just zis guy, you know
 */

var options;
var observerConfig = {
    childList: true,
    characterData: true,
    subtree: true
};

$(document).ready(function () {
    getOptions(function (opt) {
        options = opt
        if (options.toolbar) {
            chrome.extension.sendRequest("showPageAction");
        }
        if (options.enabled) {
            addSites();
        }
    });
});

function addSites() {
    if (options.espn && document.URL.indexOf("espn") != -1) {
        addESPNLinks();
        addESPNResetEvents();
    } else if (options.cbs && document.URL.indexOf("cbssports") != -1) {
        addCBSLinks();
        addCBSEvents();
    }
}

function addESPNLinks() {
    $('.FantasyGraphLink').remove();
    $('.playertablePlayerName').children(':first-child').each(function () {
        $(this).parent().append(getLinks($(this).text()));
    });
}

function addESPNResetEvents() {
    var target = document.querySelector('.playerTableContainerDiv');

    var observerESPN = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            observerESPN.disconnect();
            addESPNLinks();
            observerESPN.observe(target, observerConfig);
        });
    });
    observerESPN.observe(target, observerConfig);
}

function addCBSLinks() {
    $('.FantasyGraphLink').remove();
    $('a.playerLink').each(function () {
        if ($(this).parent().is('td')) {
            var splitIndex = $(this).text().indexOf(', ');
            var originalName = $(this).text()
            $(this).parent().append(getLinks(originalName.substring(splitIndex + 2, originalName.length) + ' ' +
                originalName.substring(0, splitIndex)));
        }
    });
}

function addCBSEvents() {
    var target = document.querySelector('#pageContainer');

    var observerCBS = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            observerCBS.disconnect();
            addCBSLinks();
            observerCBS.observe(target, observerConfig);
        });
    });
    observerCBS.observe(target, observerConfig);
}

function getLinks(playerName) {
    var returnString = '';
    if (options.fangraphs) {
        returnString += getLinkHTML(playerName, 'http://www.fangraphs.com/players.aspx?lastname=', 'http://www.fangraphs.com/favicon.ico');
    }
    if (options.baseballreference) {
        returnString += getLinkHTML(playerName, 'http://www.baseball-reference.com/pl/player_search.cgi?search=', 'http://www.baseball-reference.com/favicon.ico');
    }
    return returnString;
}

function getLinkHTML(playerName, playerProfileLink, favIconLink) {
    return '<a class="FantasyGraphLink" href="' + playerProfileLink + playerName +
        '" target="_blank"><img src="' + favIconLink + '" height="12" width="12" border="0"' +
        ' style="margin:0 6px 0 6px" title="' + playerName + '" /></a>';
}