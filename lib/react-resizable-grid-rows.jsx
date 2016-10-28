import React, { PropTypes } from 'react';
import Resizable from './react-resizable-grid-resizer';

export function Rows({ style, children }) {
  return (
    <Resizable type="row" style={style}>{children}</Resizable>
  );
}

Rows.propTypes = {
  style: PropTypes.object,
  children: PropTypes.any,
};
