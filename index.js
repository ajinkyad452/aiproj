// Copyright 2016, Google, Inc.
// Licensed under the Apache License, Version 2.0 (the 'License');
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an 'AS IS' BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

process.env.DEBUG = 'actions-on-google:*';

// We need the Assistant client for all the magic here
const Assistant = require('actions-on-google').ApiAiAssistant;
// To make our http request (a bit nicer)
const request = require('request');
const functions = require('firebase-functions');

// the actions we are supporting (get them from api.ai)
const ACTION_PRICE = 'price';
const ACTION_RAJESH = 'rajesh';
const ACTION_AAKU = 'aaku';
const ACTION_SHYAM = 'shyam';
const ACTION_TOTAL = 'total';
const ACTION_BLOCK = 'block';
const ACTION_MARKET = 'marketcap';
const ACTION_INTERVAL = 'interval';
const ACTION_TESTDATA = 'testdata';

// The end-points to our calls
const EXT_BITCOIN_API_URL = "https://blockchain.info";
const EXT_PRICE = "/q/24hrprice";
const EXT_TOTAL = "/q/totalbc";
const EXT_BLOCK_COUNT = "/q/getblockcount";
const EXT_MARKET_CAP = "/q/marketcap";
const EXT_INTERVAL = "/q/interval";

// [START Bitcoin Info]
/**
 * Set up app.data for use in the action
 * @param {ApiAiApp} app ApiAiApp instance
 */
const initData = app => {
  /** @type {AppData} */
  const data = app.data;
  if (!data.facts) {
    data.facts = {
      content: {},
      cats: null
    };
  }
  return data;
};

  // Fulfill price action business logic
  function priceHandler (assistant) {
    request(EXT_BITCOIN_API_URL + EXT_PRICE, function(error, response, body) {
      // The fulfillment logic for returning the bitcoin current price
      console.log("priceHandler response: " + JSON.stringify(response) + " Body: " + body + " | Error: " + error);
      const msg = "Ajinkya, Right now the price of a bitcoin is " + body + " USD. What else would you like to know?";
      assistant.ask(msg);
    });
  }

  // Fulfill price action business logic
  function rajeshHandler (assistant) {
	    const msg = "Happy Diwali Bandal Raja?";
    	assistant.ask(msg);
  }

  // Fulfill price action business logic
  /*function testdataHandler (assistant) {
	    const msg = "Happy Diwali Test Data?";
    	console.log('Ajinkya1',assistant.ApiAiApp);
    	console.log('Ajinkya2',assistant.ApiAiApp.request_);
    	console.log('Ajinkya3',assistant.ApiAiApp.request_.body);
    	assistant.ask(msg);
  }*/

  const testdataHandler = assistant => {
  	const data = assistant.data;
  	console.log('Ajinkya5',data);
  	assistant.ask('Hello Ajinkya4');
  };

  // Fulfill price action business logic
  function aakuHandler (assistant) {
	    const msg = "Aakanksha is mother of Adhira. Happy Diwali Aakanksha.";
    	assistant.ask(msg);
  }

  // Fulfill price action business logic
  function shyamHandler (assistant) {
	    const msg = "Shyam is father of Adhira. He is also known as Aadi. Happy Diwali Aadi.";
    	assistant.ask(msg);
  }

  // Fulfill total bitcoin action 
  function totalHandler (assistant) {
    request(EXT_BITCOIN_API_URL + EXT_TOTAL, function(error, response, body) {
      console.log("totalHandler response: " + JSON.stringify(response) + " Body: " + body + " | Error: " + error);
      // The fulfillment logic for returning the amount of bitcoins in the world
      const billionsBitcoins = body / 1000000000;
      const msg = "Right now there are " + billionsBitcoins + " billion bitcoins around the world. What else would you like to know?";
      assistant.ask(msg);
    });
  }
  
  // Fulfill block count action
  function blockCountHandler (assistant) {
    request(EXT_BITCOIN_API_URL + EXT_BLOCK_COUNT, function(error, response, body) {
      console.log("blockCountHandler response: " + JSON.stringify(response) + " Body: " + body + " | Error: " + error);
      const msg = "Right now there are " + body + " blocks. What else would you like to know? the price?";
      assistant.ask(msg);
    });
  }

  // Fulfill market cap action
  function marketCaptHandler (assistant) {
    request(EXT_BITCOIN_API_URL + EXT_MARKET_CAP, function(error, response, body) {
      console.log("marketCaptHandler response: " + JSON.stringify(response) + " Body: " + body + " | Error: " + error);
      const marketCapB = Math.round((body / 1000000000) * 100) / 100
      const msg = "Right now market cap is " + marketCapB + " billions. What else would you like to know?";
      assistant.ask(msg);
    });
  }
  
  // Fulfill interval action
  function intervalHandler (assistant) {
    request(EXT_BITCOIN_API_URL + EXT_INTERVAL, function(error, response, body) {
      console.log("interval response: " + JSON.stringify(response) + " Body: " + body + " | Error: " + error);
      const msg = "Right now the interval between blocks is " + body + " seconds. What else would you like to know?";
      assistant.ask(msg);
    });
  }

  // The Entry point to all our actions
  const actionMap = new Map();
  actionMap.set(ACTION_PRICE, priceHandler);
  actionMap.set(ACTION_RAJESH, rajeshHandler);
  actionMap.set(ACTION_AAKU, aakuHandler);
  actionMap.set(ACTION_SHYAM, shyamHandler);
  actionMap.set(ACTION_TOTAL, totalHandler);
  actionMap.set(ACTION_BLOCK, blockCountHandler);
  actionMap.set(ACTION_MARKET, marketCaptHandler);
  actionMap.set(ACTION_INTERVAL, intervalHandler);
  actionMap.set(ACTION_TESTDATA, testdataHandler);

//exports.bitcoinInfo = (req, res) => {
const bitcoinInfo = functions.https.onRequest((req, res) => {
  const assistant = new Assistant({request: req, response: res});
  console.log('bitcoinInfoAction Request headers: ' + JSON.stringify(req.headers));
  console.log('bitcoinInfoAction Request body: ' + JSON.stringify(req.body));

  
  assistant.handleRequest(actionMap);
});
// [END Bitcoin Info]


module.exports = {
  bitcoinInfo
};
