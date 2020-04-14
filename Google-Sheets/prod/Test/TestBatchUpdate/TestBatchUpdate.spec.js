"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _sheetsConfig = _interopRequireDefault(require("../../config/sheets-config.js"));

var _api = _interopRequireDefault(require("../../api.js"));

var _TestData = _interopRequireWildcard(require("./TestData.js"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var assert = require('chai').assert;

//internal_files
describe('Batch Data to Google Sheet', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
  var _loop, sheetIndex;

  return regeneratorRuntime.wrap(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          this.timeout(50000);

          _loop = function _loop(sheetIndex) {
            var sheet = _sheetsConfig["default"][sheetIndex];
            it('batch update Data to ' + sheet.SHEET_IDENTIFIER + ' ' + sheet.SHEET_NAME, /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
              var sheetData, testCases, testCaseIndex, testCase, confirmData, result;
              return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      if (!Object.keys(_TestData["default"]).includes(sheetIndex)) {
                        _context.next = 22;
                        break;
                      }

                      _context.next = 3;
                      return _api["default"].batchUpdateGoogleSheet(sheetIndex, _TestData["default"][sheetIndex].TestCases);

                    case 3:
                      sheetData = _context.sent;

                      if (!_TestData["default"][sheetIndex].Assert) {
                        _context.next = 21;
                        break;
                      }

                      testCases = _TestData["default"][sheetIndex].TestCases;
                      _context.t0 = regeneratorRuntime.keys(testCases);

                    case 7:
                      if ((_context.t1 = _context.t0()).done) {
                        _context.next = 19;
                        break;
                      }

                      testCaseIndex = _context.t1.value;
                      testCase = testCases[testCaseIndex];
                      _context.next = 12;
                      return _api["default"].getGoogleSheetData(sheetIndex, '!' + testCase.range.split('!')[1]);

                    case 12:
                      confirmData = _context.sent;
                      _context.next = 15;
                      return validate(confirmData);

                    case 15:
                      result = _context.sent;
                      assert.isOk(result);
                      _context.next = 7;
                      break;

                    case 19:
                      _context.next = 22;
                      break;

                    case 21:
                      assert.isNotOk(sheetData);

                    case 22:
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

function validate(sheetData) {
  for (var rowIndex in sheetData) {
    var row = sheetData[rowIndex];
    console.log(row[0], _TestData.date);
    if (new Date(row[0]) - _TestData.date != 0) return false;
  }

  return true;
}