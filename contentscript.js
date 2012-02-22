/*!
 *    "I am rarely happier than when spending an entire day programming my computer to
 *    perform automatically a task that it would otherwise take me a good ten seconds 
 *    to do by hand." ~ Douglas Adams, just zis guy, you know
 */

var timeDelay = 400;
 
$(document).ready(function () {
    generateLinks();
	if (document.URL.indexOf("/flb/freeagency") != -1) {
		timeDelay = 1200;
	}
});

function generateLinks() {
    $('.FanGraphLink').remove();
    $('.playertablePlayerName').children(':first-child').each(function() {
        var newLink='<a class="FanGraphLink" href="http://www.fangraphs.com/players.aspx?lastname=' + $(this).text() + '" target="_blank"><img src="http://www.fangraphs.com/favicon.ico" height="12" width="12" border="0" style="margin:0 6px 0 6px" title="FanGraphs" /></a>';
        $(this).parent().append(newLink);
    });
}

$('#lastNameSubmit, #playerTableHeader, .playertablefiltersmenucontainer, .games-toolset').live('click', function() {
  setTimeout('generateLinks()', timeDelay);
});