/*!
 *    "I am rarely happier than when spending an entire day programming my computer to
 *    perform automatically a task that it would otherwise take me a good ten seconds 
 *    to do by hand." ~ Douglas Adams, just zis guy, you know
 */

var timeDelay = 1200;
 
$(document).ready(function () {
    if(document.URL.indexOf("espn") != -1){
		addESPNResetEvents();
        addESPNLinks();
    } else if (document.URL.indexOf("cbssports") != -1){
		addCBSResetEvents();
		addCBSLinks();       
    }
});

function addESPNLinks() {
    $('.FanGraphLink').remove();
    $('.playertablePlayerName').children(':first-child').each(function() {
        $(this).parent().append(getFanGraphLink($(this).text()));
    });
}

function addESPNResetEvents(){
    if (document.URL.indexOf("/flb/freeagency") == -1) {
        timeDelay = 400;
    }
	$('#lastNameSubmit, #playerTableHeader, .playertablefiltersmenucontainer, .games-toolset').click(function() {
		setTimeout('addSPNLinks()', timeDelay);
	});
}

function addCBSResetEvents(){
	$('.fantasyTabGroup').find('a').click(function() {
		setTimeout('generateCBSLinks()', timeDelay);
	});
	$('table.filter').find('a').click(function() {
		setTimeout('addCBSLinks()', timeDelay);
	});
}

function addCBSLinks(){
    $('.FanGraphLink').remove();
	$('a.playerLink').each(function() {
		if($(this).parent().is('td')){
			var splitIndex = $(this).text().indexOf(', ');
			var originalName = $(this).text()
			$(this).parent().append(getFanGraphLink(originalName.substring(splitIndex + 2, originalName.length) + ' ' + 
				originalName.substring(0, splitIndex)));
		}
	});
}

function getFanGraphLink(playerName){
	return '<a class="FanGraphLink" href="http://www.fangraphs.com/players.aspx?lastname=' + playerName + 
		'" target="_blank"><img src="http://www.fangraphs.com/favicon.ico" height="12" width="12" border="0"' +
		' style="margin:0 6px 0 6px" title="FanGraphs" /></a>';
}