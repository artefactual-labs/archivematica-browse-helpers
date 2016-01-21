'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.decode_browse_response = decode_browse_response;
exports.format_entries = format_entries;

var _base64Helpers = require('base64-helpers');

var _base64Helpers2 = _interopRequireDefault(_base64Helpers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function decode_browse_response(response) {
  var new_response = {};
  _extends(new_response, response);

  ['entries', 'directories'].forEach(function (key) {
    new_response[key] = response[key].map(_base64Helpers2.default.decode);
  });

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = Object.keys(response.properties)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var key = _step.value;

      new_response.properties[_base64Helpers2.default.decode(key)] = response.properties[key];
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return new_response;
};

function format_entries(data, parent_path) {
  var parent = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

  return data.entries.map(function (element) {
    var child = {
      title: element,
      path: parent_path ? parent_path + '/' + element : element,
      display: true,
      properties: data.properties[element]
    };

    if (parent !== null) {
      child.parent = parent;
    }

    if (data.directories.indexOf(element) > -1) {
      // directory
      child.has_children = true;
      child.children = [];
      child.children_fetched = false;
      child.directory = true;
    } else {
      // file
      child.has_children = false;
      child.directory = false;
    }

    return child;
  });
}
