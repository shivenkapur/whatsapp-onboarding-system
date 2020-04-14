"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sheetsConfig = _interopRequireDefault(require("./config/sheets-config.js"));

var _callGoogleAPI = _interopRequireDefault(require("./callGoogleAPI/callGoogleAPI.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _default = {
  getGoogleSheetData: function () {
    var _getGoogleSheetData = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(internal_token, range) {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _callGoogleAPI["default"].getGoogleSheetData(_sheetsConfig["default"][internal_token], range);

            case 2:
              return _context.abrupt("return", _context.sent);

            case 3:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function getGoogleSheetData(_x, _x2) {
      return _getGoogleSheetData.apply(this, arguments);
    }

    return getGoogleSheetData;
  }(),
  appendGoogleSheet: function () {
    var _appendGoogleSheet = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(internal_token, rows) {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return _callGoogleAPI["default"].appendGoogleSheet(_sheetsConfig["default"][internal_token], rows);

            case 2:
              return _context2.abrupt("return", _context2.sent);

            case 3:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    function appendGoogleSheet(_x3, _x4) {
      return _appendGoogleSheet.apply(this, arguments);
    }

    return appendGoogleSheet;
  }(),
  batchUpdateGoogleSheet: function () {
    var _batchUpdateGoogleSheet = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(internal_token, data) {
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return _callGoogleAPI["default"].batchUpdateGoogleSheet(_sheetsConfig["default"][internal_token], data);

            case 2:
              return _context3.abrupt("return", _context3.sent);

            case 3:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    function batchUpdateGoogleSheet(_x5, _x6) {
      return _batchUpdateGoogleSheet.apply(this, arguments);
    }

    return batchUpdateGoogleSheet;
  }(),
  batchGetGoogleSheetData: function () {
    var _batchGetGoogleSheetData = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(internal_token) {
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return _callGoogleAPI["default"].batchGetGoogleSheetData(_sheetsConfig["default"][internal_token]);

            case 2:
              return _context4.abrupt("return", _context4.sent);

            case 3:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));

    function batchGetGoogleSheetData(_x7) {
      return _batchGetGoogleSheetData.apply(this, arguments);
    }

    return batchGetGoogleSheetData;
  }()
};
exports["default"] = _default;