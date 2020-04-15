"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _auth = _interopRequireDefault(require("../authorisation/auth.js"));

var _require = require('googleapis'),
    google = _require.google;

var _default = {
  getGoogleSheetData: function () {
    var _getGoogleSheetData = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(sheetDetails) {
      var range,
          test,
          SCOPES,
          oAuthToken,
          sheets,
          sheetData,
          _args = arguments;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              range = _args.length > 1 && _args[1] !== undefined ? _args[1] : "";
              test = _args.length > 2 && _args[2] !== undefined ? _args[2] : "";
              SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
              _context.next = 5;
              return (0, _auth["default"])(SCOPES, sheetDetails['TOKEN_PATH_READ']);

            case 5:
              oAuthToken = _context.sent;

              if (!oAuthToken) {
                _context.next = 15;
                break;
              }

              _context.next = 9;
              return google.sheets('v4');

            case 9:
              sheets = _context.sent;
              _context.next = 12;
              return sheets.spreadsheets.values.get({
                spreadsheetId: sheetDetails.SHEET_ID,
                range: test + sheetDetails.SHEET_NAME + range,
                auth: oAuthToken
              });

            case 12:
              sheetData = _context.sent;
              sheetData = sheetData.data.values;
              return _context.abrupt("return", sheetData);

            case 15:
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
    var _appendGoogleSheet = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(sheetDetails, rows) {
      var test,
          SCOPES,
          oAuthToken,
          resource,
          sheets,
          result,
          _args2 = arguments;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              test = _args2.length > 2 && _args2[2] !== undefined ? _args2[2] : "";
              SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

              if (!(sheetDetails['TOKEN_PATH_WRITE'] == undefined)) {
                _context2.next = 4;
                break;
              }

              return _context2.abrupt("return", false);

            case 4:
              _context2.next = 6;
              return (0, _auth["default"])(SCOPES, sheetDetails['TOKEN_PATH_WRITE']);

            case 6:
              oAuthToken = _context2.sent;
              resource = {
                values: rows
              };

              if (!oAuthToken) {
                _context2.next = 14;
                break;
              }

              sheets = google.sheets('v4');
              _context2.next = 12;
              return sheets.spreadsheets.values.append({
                spreadsheetId: sheetDetails.SHEET_ID,
                range: test + sheetDetails.SHEET_NAME,
                valueInputOption: 'USER_ENTERED',
                resource: resource,
                auth: oAuthToken
              });

            case 12:
              result = _context2.sent;
              return _context2.abrupt("return", result);

            case 14:
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
    var _batchUpdateGoogleSheet = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(sheetDetails, data) {
      var test,
          SCOPES,
          resource,
          oAuthToken,
          sheets,
          result,
          _args3 = arguments;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              test = _args3.length > 2 && _args3[2] !== undefined ? _args3[2] : "";
              SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

              if (!(sheetDetails['TOKEN_PATH_WRITE'] == undefined)) {
                _context3.next = 4;
                break;
              }

              return _context3.abrupt("return", false);

            case 4:
              resource = {
                data: data,
                valueInputOption: 'USER_ENTERED'
              };
              _context3.next = 7;
              return (0, _auth["default"])(SCOPES, sheetDetails['TOKEN_PATH_WRITE']);

            case 7:
              oAuthToken = _context3.sent;

              if (!oAuthToken) {
                _context3.next = 14;
                break;
              }

              sheets = google.sheets('v4');
              _context3.next = 12;
              return sheets.spreadsheets.values.batchUpdate({
                spreadsheetId: sheetDetails.SHEET_ID,
                resource: resource,
                auth: oAuthToken
              });

            case 12:
              result = _context3.sent;
              return _context3.abrupt("return", result);

            case 14:
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
    var _batchGetGoogleSheetData = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(sheetDetails, data) {
      var test,
          SCOPES,
          oAuthToken,
          sheets,
          result,
          _args4 = arguments;
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              test = _args4.length > 2 && _args4[2] !== undefined ? _args4[2] : "";
              SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
              _context4.next = 4;
              return (0, _auth["default"])(SCOPES, sheetDetails['TOKEN_PATH_WRITE']);

            case 4:
              oAuthToken = _context4.sent;

              if (!oAuthToken) {
                _context4.next = 11;
                break;
              }

              sheets = google.sheets('v4');
              _context4.next = 9;
              return sheets.spreadsheets.values.batchGet({
                spreadsheetId: sheetDetails.SHEET_ID,
                ranges: data,
                auth: oAuthToken
              });

            case 9:
              result = _context4.sent;
              return _context4.abrupt("return", result);

            case 11:
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