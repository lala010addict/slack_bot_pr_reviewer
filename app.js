var ASSERT = require('assert');
ASSERT(process.env.SLACK_API_TOKEN || 'development');


var http = require('http');

// Configure our HTTP server to respond with Hello World to all requests.
var server = http.createServer(function (request, response) {
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.end("meow");
});


server.listen(process.env.PORT || 5000)


var key = require('./config')

var token = key.api.key || '';

var RtmClient = require('@slack/client').RtmClient;

var _ = require('lodash')

var rtm = new RtmClient(token, { logLevel: 'debug' });
rtm.start();



var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

var CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS;

rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, function(rtmStartData) {

  console.log(`Logged in as ${rtmStartData.self.name} of team ${rtmStartData.team.name}, but not yet connected to a channel`);

});


var RTM_EVENTS = require('@slack/client').RTM_EVENTS;

// Listens to all `message` events from the team
rtm.on(RTM_EVENTS.MESSAGE, function(message) {
  console.log(message, 'message')

  var str = message.text || '';
  // <@U22QZJNKA> is the my bot id. I am checking to see if someone @ my bot

  var n = str.includes("<@U22QZJNKA>")

  var array = str.split(', ');

  var splicedArray = array.splice(1);
  var lucky;
  var msg


  if (splicedArray.length > 1) {
    lucky = _.sampleSize(splicedArray, 2)
    msg = ':laser_cat: meow meow :thinking_face: ??? ' + lucky[0] + ' & ' + lucky[1] + ' today is your lucky day RUFFF RUFFFF :doge:!! :partyparrot: :beers::dealwithitparrot::hypnotoad: '

  }

  var params = {
    text: msg,
    channel_id: message.channel,
  }
  if (n) {
    // This will send the message to the channel identified by id 'G20TSFYAX'
    if (lucky) {
      rtm.sendMessage(params.text, params.channel_id, function messageSent() {
        // optionally, you can supply a callback to execute once the message has been sent
      });
    } else {
      params.text = 'meow meow :thinking_face: ???'
      rtm.sendMessage(params.text, params.channel_id, function messageSent() {
        // optionally, you can supply a callback to execute once the message has been sent
      });
    }

  }

});

































// @gemsrandomizer: 
// who will review my PR today GEMS-1637, @stevene, @greg, @quang, @kpostal




//private G20TSFYAX
// gems C0STU0NUD
