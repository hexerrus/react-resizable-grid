import React, { Component } from 'react';
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
    if (this.props.type == 'row') {
      this.state.resizableElement.style.maxWidth = '';
    } else {
      this.state.resizableElement.style.maxHeight = '';
    }
  }

  onMouseMove(e) {

    var offset = this.state.resizableElement.getBoundingClientRect();
    if (this.props.type == 'column') {
      var rootElemHeight = ReactDOM.findDOMNode(this).clientHeight;
      var newHeight = e.clientY - offset.top - parseInt(rootElemHeight) / 2;
      var newOtherHeight = parseInt(this.state.resizableElement.style.maxHeight) - newHeight;
      if (newHeight >= 0 && newOtherHeight >= 0) {
        this.state.resizableElement.style.height = newHeight;
        this.state.otherElement.style.height = newOtherHeight;
      }
    } else {
      var rootElemWith = ReactDOM.findDOMNode(this).clientWidth;
      var newWidth = e.clientX - offset.left - parseInt(rootElemWith) / 2;
      var newOtherWidth = parseInt(this.state.resizableElement.style.maxWidth) - newWidth;
      if (newOtherWidth >= 0 && newWidth >= 0) {
        this.state.resizableElement.style.width = newWidth;
        this.state.otherElement.style.width = newOtherWidth;
      }
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
