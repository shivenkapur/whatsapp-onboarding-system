"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = updateMessageQueue;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _googlesheets = _interopRequireDefault(require("googlesheets"));

var _convertSheetDatatoDict = _interopRequireDefault(require("../utils/convertSheetDatatoDict.js"));

var _cellData = _interopRequireDefault(require("../utils/cellData.js"));

var INTERNAL_TOKEN = '700o2k0hnl7fvwv8kb0o6p';
var MAX_REMINDERS = 3;

function updateMessageQueue(_x, _x2) {
  return _updateMessageQueue.apply(this, arguments);
}

function _updateMessageQueue() {
  _updateMessageQueue = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(newMessages, messagePriority) {
    var messageQueueData, columns, batchUpdate, append, newMessageIndex, newMessage, found, messageQueueIndex, messageQueueRow;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _googlesheets["default"].getGoogleSheetData(INTERNAL_TOKEN, "", test = global.test);

          case 2:
            messageQueueData = _context.sent;
            columns = {
              'Old #': -1,
              'Name': -1,
              'Message Type': -1,
              'Phone': -1,
              'Sent': -1,
              'Reminder Number': -1
            };
            _context.next = 6;
            return (0, _convertSheetDatatoDict["default"])(messageQueueData, columns);

          case 6:
            messageQueueData = _context.sent;
            batchUpdate = {};
            append = {};

            for (newMessageIndex in newMessages) {
              newMessage = newMessages[newMessageIndex];
              found = false;

              if (!Object.keys(batchUpdate).includes(newMessage['Old #']) || messagePriority[newMessage['messageType']] > messagePriority[batchUpdate[newMessage['Old #']]['messageType']]) {
                for (messageQueueIndex in messageQueueData) {
                  messageQueueRow = messageQueueData[messageQueueIndex];

                  if (messageQueueRow['Old #'] == newMessage['Old #']) {
                    newMessage['Row'] = (parseInt(messageQueueIndex) + 1).toString();
                    newMessage['Message Type from MQ'] = messageQueueRow['Message Type'];
                    newMessage['Reminder Number'] = messageQueueRow['Reminder Number'];
                    batchUpdate[newMessage['Old #']] = newMessage;
                    found = true;
                  }
                }

                if (!found && (!Object.keys(append).includes(newMessage['Old #']) || messagePriority[newMessage['messageType']] > messagePriority[append[newMessage['Old #']]['messageType']])) append[newMessage['Old #']] = newMessage;
              }
            }

            batchUpdateSheet(batchUpdate);
            appendSheet(append);

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _updateMessageQueue.apply(this, arguments);
}

function batchUpdateSheet(_x3) {
  return _batchUpdateSheet.apply(this, arguments);
}

function _batchUpdateSheet() {
  _batchUpdateSheet = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(batchUpdate) {
    var sheetData, mesageIndex, message, sentNumber, update;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            sheetData = [];

            for (mesageIndex in batchUpdate) {
              message = batchUpdate[mesageIndex];
              sentNumber = message['Reminder Number'];
              update = true;
              if (_cellData["default"].hasNoData(message['Reminder Number'])) sentNumber = 1;else if (message['messageType'] != message['Message Type from MQ']) sentNumber = 1;else if (parseInt(message['Reminder Number']) < MAX_REMINDERS) sentNumber = (parseInt(message['Reminder Number']) + 1).toString();else update = false;

              if (update) {
                sheetData.push({
                  range: global.test + 'Message Queue!E' + message['Row'],
                  values: [['']]
                });
                sheetData.push({
                  range: global.test + 'Message Queue!C' + message['Row'],
                  values: [[message['messageType']]]
                });
                sheetData.push({
                  range: global.test + 'Message Queue!F' + message['Row'],
                  values: [[sentNumber]]
                });
              }
            }

            _googlesheets["default"].batchUpdateGoogleSheet(INTERNAL_TOKEN, sheetData);

          case 3:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _batchUpdateSheet.apply(this, arguments);
}

function appendSheet(_x4) {
  return _appendSheet.apply(this, arguments);
}

function _appendSheet() {
  _appendSheet = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(append) {
    var sheetData, mesageIndex, message;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            sheetData = [];

            for (mesageIndex in append) {
              message = append[mesageIndex];
              sheetData.push([message['Old #'], message['searchName'], message['messageType'], message['Phone'], '', '1']);
            }

            _googlesheets["default"].appendGoogleSheet(INTERNAL_TOKEN, sheetData, test = global.test);

          case 3:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _appendSheet.apply(this, arguments);
}