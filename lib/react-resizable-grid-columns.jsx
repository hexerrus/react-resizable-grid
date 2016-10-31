import React, { PropTypes } from 'react';
import Resizable from './react-resizable-grid-resizer';

export function Columns({ style, children }) {
  return (
    <Resizable type="column" style={style}>{children}</Resizable>
  );
}

Columns.propTypes = {
  style: PropTypes.object,
  children: PropTypes.any,
};
