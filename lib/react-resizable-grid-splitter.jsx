import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

export class Splitter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      resizableElement: null,
      otherElement: null,
    };

    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
  }

  onMouseDown() {
    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onMouseUp);

    const node = ReactDOM.findDOMNode(this);
    const resizableElement = node.previousSibling;
    const otherElement = node.nextSibling;

    if (this.props.type === 'row') {
      resizableElement.style.maxWidth = resizableElement.clientWidth + otherElement.clientWidth;
    } else {
      resizableElement.style.maxHeight = resizableElement.clientHeight + otherElement.clientHeight;
    }

    this.setState({
      resizableElement,
      otherElement,
    });
  }

  onMouseUp() {
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onMouseUp);

    if (this.props.type === 'row') {
      this.state.resizableElement.style.maxWidth = '';
    } else {
      this.state.resizableElement.style.maxHeight = '';
    }
  }

  onMouseMove({ clientX, clientY }) {
    const { top, left } = this.state.resizableElement.getBoundingClientRect();
    const { type } = this.props;
    const { clientHeight, clientWidth } = ReactDOM.findDOMNode(this);

    if (type === 'column') {
      const newHeight = Math.max(0, Math.min(
        parseInt(this.state.resizableElement.style.maxHeight, 10),
        clientY - top - parseInt(clientHeight, 10) / 2
      ));
      const newOtherHeight = parseInt(this.state.resizableElement.style.maxHeight, 10) - newHeight;
      this.state.resizableElement.style.height = newHeight;
      this.state.otherElement.style.height = newOtherHeight;
    } else {
      const newWidth = Math.max(0, Math.min(
        parseInt(this.state.resizableElement.style.maxWidth, 10),
        clientX - left - parseInt(clientWidth, 10) / 2
      ));
      const newOtherWidth = parseInt(this.state.resizableElement.style.maxWidth, 10) - newWidth;
      this.state.resizableElement.style.width = newWidth;
      this.state.otherElement.style.width = newOtherWidth;
    }
  }

  render () {
    const { type, className = '', style } = this.props;
    const splitterClass = (type === 'row') ? 'vertical-splitter' : 'horizontal-splitter';

    return (
      <div
        className={`${splitterClass} ${className}`}
        style={{
          flex: '0 0 auto',
          [(type === 'column') ? 'width' : 'height']: '100%',
          cursor: (type === 'column') ? 'row-resize' : 'col-resize',
          ...style
        }}
        onMouseDown={this.onMouseDown}
      />
    );
  }
}

Splitter.propTypes = {
  type: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
};
