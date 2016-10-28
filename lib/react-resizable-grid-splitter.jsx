import React, { Component } from 'react';
import ReactDOM from 'react-dom';



export class Splitter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dragging: false,
      resizableElement: null,
      otherElement: null,
      hideble: this.props.hideble,
      hidden: false,
      hiddenElemSize: 0,
    };
    this.mouseDown = this.mouseDown.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);

  }

  componentDidUpdate(props, state) {
    if (this.state.dragging && !state.dragging) {
      document.addEventListener('mousemove', this.onMouseMove);
      document.addEventListener('mouseup', this.onMouseUp);
    } else if (!this.state.dragging && state.dragging) {
      document.removeEventListener('mousemove', this.onMouseMove);
      document.removeEventListener('mouseup', this.onMouseUp);
    }
  }

  mouseDown(e) {
    console.log("123");
    var node = ReactDOM.findDOMNode(this);
    var parent = ReactDOM.findDOMNode(e.currentTarget).parentNode.childNodes;
    var resizebleElement;
    var otherElement;
    for (var i = 0; i < parent.length; i++) {
      if (parent[i] == node) {
        resizebleElement = parent[i - 1];
        otherElement = parent[i + 1];
        break;
      }
    }

    if (this.props.type == 'row') {
      var maxWidth = resizebleElement.clientWidth + otherElement.clientWidth;
      resizebleElement.style.maxWidth = maxWidth;
    } else {
      var maxHeight = resizebleElement.clientHeight + otherElement.clientHeight;
      resizebleElement.style.maxHeight = maxHeight;
    }

    this.setState({
          dragging: true,
          resizableElement: resizebleElement,
          otherElement: otherElement,
        });
  }

  onMouseUp(e) {
    this.setState({
          dragging: false,
        });
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
