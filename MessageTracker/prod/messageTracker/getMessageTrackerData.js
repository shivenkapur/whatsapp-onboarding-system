"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = getMessageTrackerData;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _googlesheets = _interopRequireDefault(require("googlesheets"));

var _convertSheetDatatoDict = _interopRequireDefault(require("../utils/convertSheetDatatoDict.js"));

var INTERNAL_TOKEN = 'hldv5rft1d60szrdox1ryvf';

function getMessageTrackerData() {
  return _getMessageTrackerData.apply(this, arguments);
}

function _getMessageTrackerData() {
  _getMessageTrackerData = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var _columns;

    var identifier,
        messageTrackerData,
        columns,
        _args = arguments;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            identifier = _args.length > 0 && _args[0] !== undefined ? _args[0] : "";
            _context.next = 3;
            return _googlesheets["default"].getGoogleSheetData(INTERNAL_TOKEN, "", global.test);

          case 3:
            messageTrackerData = _context.sent;
            columns = (_columns = {
              'Old #': -1,
              'Sent HKID Message to MQ': -1,
              'Sent CERT Message to MQ': -1,
              'Sent Schedule Interview Message to MQ': -1,
              'Sent Video Call Reminder Message to MQ': -1
            }, (0, _defineProperty2["default"])(_columns, "Sent Video Call Reminder Message to MQ", -1), (0, _defineProperty2["default"])(_columns, 'Sent Next Steps to MQ', -1), _columns);
            _context.next = 7;
            return (0, _convertSheetDatatoDict["default"])(messageTrackerData, columns, identifier);

          case 7:
            messageTrackerData = _context.sent;
            return _context.abrupt("return", messageTrackerData);

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _getMessageTrackerData.apply(this, arguments);
}