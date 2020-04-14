"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _auth = _interopRequireDefault(require("../authorisation/auth.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _require = require('googleapis'),
    google = _require.google;

var _default = {
  getGoogleSheetData: function () {
    var _getGoogleSheetData = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(sheetDetails) {
      var range,
          SCOPES,
          oAuthToken,
          sheets,
          sheetData,
          _args = arguments;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              range = _args.length > 1 && _args[1] !== undefined ? _args[1] : "";
              SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
              _context.next = 4;
              return (0, _auth["default"])(SCOPES, sheetDetails['TOKEN_PATH_READ']);

            case 4:
              oAuthToken = _context.sent;

              if (!oAuthToken) {
                _context.next = 14;
                break;
              }

              _context.next = 8;
              return google.sheets('v4');

            case 8:
              sheets = _context.sent;
              _context.next = 11;
              return sheets.spreadsheets.values.get({
                spreadsheetId: sheetDetails.SHEET_ID,
                range: sheetDetails.SHEET_NAME + range,
                auth: oAuthToken
              });

            case 11:
              sheetData = _context.sent;
              sheetData = sheetData.data.values;
              return _context.abrupt("return", sheetData);

            case 14:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function getGoogleSheetData(_x) {
      return _getGoogleSheetData.apply(this, arguments);
    }

    return getGoogleSheetData;
  }(),
  appendGoogleSheet: function () {
    var _appendGoogleSheet = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(sheetDetails, rows) {
      var SCOPES, oAuthToken, resource, sheets, result;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

              if (!(sheetDetails['TOKEN_PATH_WRITE'] == undefined)) {
                _context2.next = 3;
                break;
              }

              return _context2.abrupt("return", false);

            case 3:
              _context2.next = 5;
              return (0, _auth["default"])(SCOPES, sheetDetails['TOKEN_PATH_WRITE']);

            case 5:
              oAuthToken = _context2.sent;
              resource = {
                values: rows
              };

              if (!oAuthToken) {
                _context2.next = 13;
                break;
              }

              sheets = google.sheets('v4');
              _context2.next = 11;
              return sheets.spreadsheets.values.append({
                spreadsheetId: sheetDetails.SHEET_ID,
                range: sheetDetails.SHEET_NAME,
                valueInputOption: 'USER_ENTERED',
                resource: resource,
                auth: oAuthToken
              });

            case 11:
              result = _context2.sent;
              return _context2.abrupt("return", result);

            case 13:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    function appendGoogleSheet(_x2, _x3) {
      return _appendGoogleSheet.apply(this, arguments);
    }

    return appendGoogleSheet;
  }(),
  batchUpdateGoogleSheet: function () {
    var _batchUpdateGoogleSheet = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(sheetDetails, data) {
      var SCOPES, resource, oAuthToken, sheets, result;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

              if (!(sheetDetails['TOKEN_PATH_WRITE'] == undefined)) {
                _context3.next = 3;
                break;
              }

              return _context3.abrupt("return", false);

            case 3:
              resource = {
                data: data,
                valueInputOption: 'USER_ENTERED'
              };
              _context3.next = 6;
              return (0, _auth["default"])(SCOPES, sheetDetails['TOKEN_PATH_WRITE']);

            case 6:
              oAuthToken = _context3.sent;

              if (!oAuthToken) {
                _context3.next = 13;
                break;
              }

              sheets = google.sheets('v4');
              _context3.next = 11;
              return sheets.spreadsheets.values.batchUpdate({
                spreadsheetId: sheetDetails.SHEET_ID,
                resource: resource,
                auth: oAuthToken
              });

            case 11:
              result = _context3.sent;
              return _context3.abrupt("return", result);

            case 13:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    function batchUpdateGoogleSheet(_x4, _x5) {
      return _batchUpdateGoogleSheet.apply(this, arguments);
    }

    return batchUpdateGoogleSheet;
  }(),
  batchGetGoogleSheetData: function () {
    var _batchGetGoogleSheetData = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(sheetDetails, data) {
      var SCOPES, oAuthToken, sheets, result;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
              _context4.next = 3;
              return (0, _auth["default"])(SCOPES, sheetDetails['TOKEN_PATH_WRITE']);

            case 3:
              oAuthToken = _context4.sent;

              if (!oAuthToken) {
                _context4.next = 10;
                break;
              }

              sheets = google.sheets('v4');
              _context4.next = 8;
              return sheets.spreadsheets.values.batchGet({
                spreadsheetId: sheetDetails.SHEET_ID,
                ranges: data,
                auth: oAuthToken
              });

            case 8:
              result = _context4.sent;
              return _context4.abrupt("return", result);

            case 10:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));

    function batchGetGoogleSheetData(_x6, _x7) {
      return _batchGetGoogleSheetData.apply(this, arguments);
    }

    return batchGetGoogleSheetData;
  }()
};
exports["default"] = _default;