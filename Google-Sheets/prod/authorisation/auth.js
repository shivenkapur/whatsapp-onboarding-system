"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = authorize;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _getNewToken = _interopRequireDefault(require("./getNewToken.js"));

var fs = require('fs');

var _require = require('googleapis'),
    google = _require.google;

function authorize(_x, _x2) {
  return _authorize.apply(this, arguments);
}

function _authorize() {
  _authorize = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(SCOPES, TOKEN_PATH) {
    var credentials, _credentials$installe, client_secret, client_id, redirect_uris, oAuth2Client, token;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return fs.readFileSync(__dirname + '/../credentials/credentials.json');

          case 2:
            credentials = _context.sent;
            credentials = JSON.parse(credentials);
            _credentials$installe = credentials.installed, client_secret = _credentials$installe.client_secret, client_id = _credentials$installe.client_id, redirect_uris = _credentials$installe.redirect_uris;
            oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
            _context.prev = 6;
            _context.next = 9;
            return fs.readFileSync(TOKEN_PATH);

          case 9:
            token = _context.sent;
            _context.next = 12;
            return oAuth2Client.setCredentials(JSON.parse(token));

          case 12:
            return _context.abrupt("return", oAuth2Client);

          case 15:
            _context.prev = 15;
            _context.t0 = _context["catch"](6);
            console.log(_context.t0);
            _context.next = 20;
            return (0, _getNewToken["default"])(oAuth2Client, SCOPES, TOKEN_PATH);

          case 20:
            return _context.abrupt("return", false);

          case 21:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[6, 15]]);
  }));
  return _authorize.apply(this, arguments);
}