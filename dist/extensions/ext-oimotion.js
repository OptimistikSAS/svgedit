/* eslint-disable */
var svgEditorExtension_oimotion = (function () {
  'use strict';

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArrayLimit(arr, i) {
    if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) {
      return;
    }

    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
  }

  var extOimotion = {
    name: 'oimotion',
    init: function init(_ref) {
      var $, importLocale, strings, svgEditor, svgCanvas;

      function getFileNameFromTitle() {
        var title = svgCanvas.getDocumentTitle();
        return title.trim();
      }

      this.setCustomHandlers({
        save: function save(win, data) {
          var svg = '<?xml version="1.0" encoding="UTF-8"?>\n' + data,
              filename = getFileNameFromTitle();

          window.parent.postMessage({
            outputSvg: svg,
            filename: filename
          }, '*');
        }
      });

      return regeneratorRuntime.async(function init$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              $ = _ref.$, importLocale = _ref.importLocale;
              _context.next = 3;
              return regeneratorRuntime.awrap(importLocale());

            case 3:
              strings = _context.sent;
              svgEditor = this;
              svgCanvas = svgEditor.canvas;
              return _context.abrupt("return", {
                name,
              });

            case 7:
            case "end":
              return _context.stop();
          }
        }
      }, null, this);
    }
  };

  return extOimotion;

}());
