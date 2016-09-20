'use strict';
module.exports = function () {
  throw new Error("Don't instantiate Resizable directly! Use require('react-resizable-grid')");
};

module.exports.Rows = require('./build/react-resizable-grid').Rows;
module.exports.Columns = require('./build/react-resizable-grid').Columns;
module.exports.Cell = require('./build/react-resizable-grid').Cell;
module.exports.Splitter = require('./build/react-resizable-grid').Splitter;
