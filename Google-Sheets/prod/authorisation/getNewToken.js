"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = getNewToken;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var fs = require('fs');

var readline = require('readline');

function getNewToken(_x, _x2, _x3) {
  return _getNewToken.apply(this, arguments);
}

function _getNewToken() {
  _getNewToken = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(oAuth2Client, SCOPES, TOKEN_PATH) {
    var authUrl, rl;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            authUrl = oAuth2Client.generateAuthUrl({
              access_type: 'offline',
              scope: SCOPES
            });
            console.log('Authorize this app by visiting this url:', authUrl);
            rl = readline.createInterface({
              input: process.stdin,
              output: process.stdout
            });
            rl.question('Enter the code from that page here: ', function (code) {
              rl.close();
              oAuth2Client.getToken(code, function (err, token) {
                if (err) return console.error('Error while trying to retrieve access token', err);
                oAuth2Client.setCredentials(token); // Store the token to disk for later program executions

                fs.writeFile(TOKEN_PATH, JSON.stringify(token), function (err) {
                  if (err) return console.error(err);
                  console.log('Token stored to', TOKEN_PATH);
                });
              });
            });

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _getNewToken.apply(this, arguments);
}