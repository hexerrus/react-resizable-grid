'use strict';
module.exports = function () {
  throw new Error("Don't instantiate Resizable directly! Use require('react-resizable-grid')");
};

module.exports.Rows = require('./build/react-resizable-grid-resizer').Rows;
module.exports.Columns = require('./build/react-resizable-grid-resizer').Columns;
module.exports.Cell = require('./build/react-resizable-grid-cell').Cell;
module.exports.Splitter = require('./build/react-resizable-grid-splitter').Splitter;
