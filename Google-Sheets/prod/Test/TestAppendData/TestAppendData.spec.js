"use strict";

var _sheetsConfig = _interopRequireDefault(require("../../config/sheets-config.js"));

var _api = _interopRequireDefault(require("../../api.js"));

var _TestData = _interopRequireDefault(require("./TestData.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var assert = require('chai').assert;

//internal_files
describe('Append Data to Google Sheet', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
  var _loop, sheetIndex;

  return regeneratorRuntime.wrap(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          this.timeout(50000);

          _loop = function _loop(sheetIndex) {
            var sheet = _sheetsConfig["default"][sheetIndex];
            it('append Data to ' + sheet.SHEET_IDENTIFIER + ' ' + sheet.SHEET_NAME, /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
              var sheetData;
              return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      if (!Object.keys(_TestData["default"]).includes(sheetIndex)) {
                        _context.next = 7;
                        break;
                      }

                      _context.next = 3;
                      return _api["default"].appendGoogleSheet(sheetIndex, _TestData["default"][sheetIndex].TestCases);

                    case 3:
                      sheetData = _context.sent;
                      if (_TestData["default"][sheetIndex].Assert) assert.isOk(sheetData);else assert.isNotOk(sheetData);
                      _context.next = 7;
                      break;

                    case 7:
                    case "end":
                      return _context.stop();
                  }
                }
              }, _callee);
            })));
          };

          for (sheetIndex in _sheetsConfig["default"]) {
            _loop(sheetIndex);
          }

        case 3:
        case "end":
          return _context2.stop();
      }
    }
  }, _callee2, this);
})));