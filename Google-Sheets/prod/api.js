"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _sheetsConfig = _interopRequireDefault(require("./config/sheets-config.js"));

var _callGoogleAPI = _interopRequireDefault(require("./callGoogleAPI/callGoogleAPI.js"));

var _default = {
  getGoogleSheetData: function () {
    var _getGoogleSheetData = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(internal_token) {
      var range,
          test,
          _args = arguments;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              range = _args.length > 1 && _args[1] !== undefined ? _args[1] : "";
              test = _args.length > 2 && _args[2] !== undefined ? _args[2] : "";
              _context.next = 4;
              return _callGoogleAPI["default"].getGoogleSheetData(_sheetsConfig["default"][internal_token], range, test);

            case 4:
              return _context.abrupt("return", _context.sent);

            case 5:
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
    var _appendGoogleSheet = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(internal_token, rows) {
      var test,
          _args2 = arguments;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              test = _args2.length > 2 && _args2[2] !== undefined ? _args2[2] : "";
              _context2.next = 3;
              return _callGoogleAPI["default"].appendGoogleSheet(_sheetsConfig["default"][internal_token], rows, test);

            case 3:
              return _context2.abrupt("return", _context2.sent);

            case 4:
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
    var _batchUpdateGoogleSheet = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(internal_token, data) {
      var test,
          _args3 = arguments;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              test = _args3.length > 2 && _args3[2] !== undefined ? _args3[2] : "";
              _context3.next = 3;
              return _callGoogleAPI["default"].batchUpdateGoogleSheet(_sheetsConfig["default"][internal_token], data, test);

            case 3:
              return _context3.abrupt("return", _context3.sent);

            case 4:
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
    var _batchGetGoogleSheetData = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(internal_token) {
      var test,
          _args4 = arguments;
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              test = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : "";
              _context4.next = 3;
              return _callGoogleAPI["default"].batchGetGoogleSheetData(_sheetsConfig["default"][internal_token], test);

            case 3:
              return _context4.abrupt("return", _context4.sent);

            case 4:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));

    function batchGetGoogleSheetData(_x6) {
      return _batchGetGoogleSheetData.apply(this, arguments);
    }

    return batchGetGoogleSheetData;
  }()
};
exports["default"] = _default;