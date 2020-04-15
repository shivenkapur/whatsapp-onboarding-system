"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = convertSheetDatatoDict;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

//converts a 2D array into an array of dicts
function convertSheetDatatoDict(_x, _x2) {
  return _convertSheetDatatoDict.apply(this, arguments);
}

function _convertSheetDatatoDict() {
  _convertSheetDatatoDict = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(data, columns) {
    var identifier,
        index,
        columnName,
        return_list,
        _loop,
        rowIndex,
        _args = arguments;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            identifier = _args.length > 2 && _args[2] !== undefined ? _args[2] : "";

            for (index = 0; index <= data[0].length; index++) {
              columnName = data[0][index];
              if (columns[columnName] == -1) columns[columnName] = index;
            }

            return_list = {};
            if (identifier == "") return_list = [];

            _loop = function _loop(rowIndex) {
              var row = data[rowIndex];
              var dict = {};
              Object.entries(columns).forEach(function (_ref) {
                var _ref2 = (0, _slicedToArray2["default"])(_ref, 2),
                    key = _ref2[0],
                    value = _ref2[1];

                dict[key] = "".concat(row[value]);
              });
              if (identifier == "") return_list.push(dict);else return_list[dict[identifier]] = dict;
            };

            for (rowIndex in data) {
              _loop(rowIndex);
            }

            return _context.abrupt("return", return_list);

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _convertSheetDatatoDict.apply(this, arguments);
}