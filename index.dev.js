'use strict';
module.exports = function () {
  throw new Error("Don't instantiate Resizable directly! Use require('react-resizable-grid')");
};

module.exports.Rows = require('./lib/react-resizable-grid-rows').Rows;
module.exports.Columns = require('./lib/react-resizable-grid-columns').Columns;
module.exports.Cell = require('./lib/react-resizable-grid-cell').Cell;
module.exports.Splitter = require('./lib/react-resizable-grid-splitter').Splitter;
