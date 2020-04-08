"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = {
  hasData: function hasData(dataPoint) {
    if (dataPoint != '' && dataPoint != 'undefined' && dataPoint != undefined && dataPoint != '#N/A') return true;
    return false;
  },
  hasNoData: function hasNoData(dataPoint) {
    if (dataPoint == '' || dataPoint == 'undefined' || dataPoint == undefined || dataPoint == '#N/A') return true;
    return false;
  }
};
exports["default"] = _default;