import React, { PropTypes, Children } from 'react';

function Resizable({ type, style, children }) {

  const childrenWithProps = Children.map(children, (child, idx) => {
    const props = { type };

    if (1 + idx === Children.count(children)) {
      props.style = { ...child.props.style, flex: '1 1 auto' };
    }

    return React.cloneElement(child, props);
  });

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: type,
        overflow: 'hidden',
        minHeight: '100%',
        maxHeight: '100%',
        ...style
      }}
    >
      {childrenWithProps}
    </div>
  );
}

Resizable.propTypes = {
  type: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.any,
};

export default Resizable;
