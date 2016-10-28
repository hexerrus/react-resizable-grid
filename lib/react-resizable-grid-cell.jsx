import React, { PropTypes } from 'react';

export function Cell({ height, width, type, style, className, children }) {
  return (
    <div
      className={className}
      style={{
        flex: '0 0 auto',
        height: height || (type === 'column') ? '30%' : '',
        width: (type === 'column') ? '100%' : width || '30%',
        whiteSpace: 'nowrap',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

Cell.propTypes = {
  type: PropTypes.string,
  className: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.any,
};
