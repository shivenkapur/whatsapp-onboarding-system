"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = updateMessageTracker;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _googlesheets = _interopRequireDefault(require("googlesheets"));

var INTERNAL_TOKEN = 'hldv5rft1d60szrdox1ryvf';

function updateMessageTracker(_x, _x2) {
  return _updateMessageTracker.apply(this, arguments);
}

function _updateMessageTracker() {
  _updateMessageTracker = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(messages, date) {
    var sheetData, messageIndex, message, rowNumber;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            sheetData = [];

            for (messageIndex in messages) {
              message = messages[messageIndex];
              rowNumber = (parseInt(message['Old #']) + 1).toString();

              if (message['messageType'] == 'welcomeMessage') {
                sheetData.push({
                  range: global.test + 'Main!B' + rowNumber + ':C' + rowNumber,
                  values: [[date, date]]
                });
              } else if (message['messageType'] == 'scheduleInterview') {
                sheetData.push({
                  range: global.test + 'Main!D' + rowNumber,
                  values: [[date]]
                });
              } else if (message['messageType'] == 'videoCallReminder') {
                sheetData.push({
                  range: global.test + 'Main!E' + rowNumber,
                  values: [[date]]
                });
              } else if (message['messageType'] == 'nextSteps') {
                sheetData.push({
                  range: global.test + 'Main!F' + rowNumber,
                  values: [[date]]
                });
              }
            }

            _googlesheets["default"].batchUpdateGoogleSheet(INTERNAL_TOKEN, sheetData);

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _updateMessageTracker.apply(this, arguments);
}