import React, { Component } from 'react';
import ReactDOM from 'react-dom';



export class Splitter extends Component {
  constructor(props) {
    super(props);

    if (this.props.type == 'column') {
      var style = {
        flex: '0 0 auto',
        width: '100%',
        cursor: 'row-resize',
      //  background: 'black',
      //  height: 18,

      };
    } else { //type != column
      var style = {
        flex: '0 0 auto',
        height: '100%',
        cursor: 'col-resize',
        //background: 'black',
        //width: 18,

      };
    }

    var comparedStyle = {
      ...{},
      ...style,
      ...this.props.style,
    };

    //console.log('comparedStyle', comparedStyle);
    var className = ( this.props.type == 'row' ) ? "vertival-splitter" : "horisontal-splitter";
    if (this.props.className != undefined) className += " " + this.props.className;
    this.state = {
      dragging: false,
      resizableElement: null,
      otherElement: null,
      style: comparedStyle,
      hideble: this.props.hideble,
      hidden: false,
      hiddenElemSize: 0,
      className: className,
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
      resizebleElement.style.maxWidth = maxWidth + 'px';
    } else {
      var maxHeight = resizebleElement.clientHeight + otherElement.clientHeight;
      resizebleElement.style.maxHeight = maxHeight + 'px';
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
        this.state.resizableElement.style.height = newHeight + 'px';
        this.state.otherElement.style.height = newOtherHeight + 'px';
      }
    } else {
      var rootElemWith = ReactDOM.findDOMNode(this).clientWidth;
      var newWidth = e.clientX - offset.left - parseInt(rootElemWith) / 2;
      var newOtherWidth = parseInt(this.state.resizableElement.style.maxWidth) - newWidth;
      if (newOtherWidth >= 0 && newWidth >= 0) {
        this.state.resizableElement.style.width = newWidth + 'px';
        this.state.otherElement.style.width = newOtherWidth + 'px';
      }
    }
  }

  render () {
    return (
      <div className={this.state.className} style={this.state.style} onMouseDown={this.mouseDown} onMouseUp={this.onMouseUp} />
    );
  }
}
