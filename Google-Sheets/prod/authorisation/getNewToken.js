"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = getNewToken;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var fs = require('fs');

var readline = require('readline');

function getNewToken(_x, _x2, _x3) {
  return _getNewToken.apply(this, arguments);
}

function _getNewToken() {
  _getNewToken = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(oAuth2Client, SCOPES, TOKEN_PATH) {
    var authUrl, rl;
    return _regenerator["default"].wrap(function _callee$(_context) {
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