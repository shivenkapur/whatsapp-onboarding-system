"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = authorize;

var _getNewToken = _interopRequireDefault(require("./getNewToken.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var fs = require('fs');

var _require = require('googleapis'),
    google = _require.google;

function authorize(_x, _x2) {
  return _authorize.apply(this, arguments);
}

function _authorize() {
  _authorize = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(SCOPES, TOKEN_PATH) {
    var credentials, _credentials$installe, client_secret, client_id, redirect_uris, oAuth2Client, token;

    return regeneratorRuntime.wrap(function _callee$(_context) {
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