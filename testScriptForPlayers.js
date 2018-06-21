var activePlayers = [];
var allServers = document.querySelector('tbody').children;
for(var i = 0; i < allServers.length; i++) {
    test = 0;
    if(typeof allServers[i].querySelectorAll('td')[1] !== 'undefined') {
        test = parseInt(allServers[i].querySelectorAll('td')[1].innerHTML);
    }
    if(test !== 0) {
        console.log('Players in ' + allServers[i].querySelectorAll('td')[0].innerHTML.substring(0,10) + '...');
        activePlayers.push('Players in ' + allServers[i].querySelectorAll('td')[0].innerHTML.substring(0,10) + '...')
    }
}