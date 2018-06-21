const jsdom = require("jsdom");
const {
    JSDOM
} = jsdom;
var express = require('express')
var app = express();
var request = require('request');
var path = require('path');

app.use(express.static(__dirname + '/resources'));
app.get('/',  function(req, res) {
    res.sendFile(path.join(__dirname + '/avp2ServerChecker.html'));
});

app.post('/endpoint', function(req, res){
	// var obj = {};
	// console.log('body: ' + JSON.stringify(req.body));
    // res.send("zlot has 3 servers");
    request('https://www.avp2.us/MasterServer/' , function (error, response, body) {
        const dom = new JSDOM(String(body));
        var d = dom.window.document;
        var activePlayers = [];
        var allServers = d.querySelector('tbody').children;
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
        res.send(activePlayers);


        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        // console.log('body:', body); // Print the HTML for the Google homepage.

    });
});

app.set('port', (process.env.PORT || 5000));
app.listen(app.get('port'), function() {
    console.log('Example app listening on port ' + app.get('port') );
});

// app.get('/', function (req, res) {
//     // Push.Permission.request(onGranted, onDenied);
//     // res.send('Leave window open to recieve notifcations');
//     // request('https://www.avp2.us/MasterServer/' , function (error, response, body) {
//     //     // const dom = new JSDOM(String(body));
//     //     // var d = dom.window.document;

        

//     //     // res.send(JSON.stringify(CCJSON, null, 2));

//     //     console.log('error:', error); // Print the error if one occurred
//     //     console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
//     //     console.log('body:', body); // Print the HTML for the Google homepage.

//     // });
// });



// request('http://www.google.com', function (error, response, body) {
// console.log('error:', error); // Print the error if one occurred
// console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
// console.log('body:', body); // Print the HTML for the Google homepage.
// });

// app.listen(3000);

app.listen(3000);


// const dom = new JSDOM(``);
// dom.window.document.querySelectorAll('section').forEach(function(elem) {
//     console.log(elem.className.includes('required'));
// });