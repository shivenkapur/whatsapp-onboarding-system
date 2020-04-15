"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _index = _interopRequireDefault(require("./messageTracker/index.js"));

var _index2 = _interopRequireDefault(require("./messageQueue/index.js"));

/*
    Message Format:
    {
        'Old #': caregiverMessage['Old #'], 
        'searchName': searchName, 'messageType': 'videoCallReminder', 
        'Phone': caregiverMessage['Phone']
    }
*/
var _default = {
  updateMessageTracker: _index["default"].updateMessageTracker,
  getMessageTrackerData: _index["default"].getMessageTrackerData,
  updateMessageQueue: _index2["default"].updateMessageQueue
};
exports["default"] = _default;