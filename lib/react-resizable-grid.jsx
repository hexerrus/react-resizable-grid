import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

export class Cell extends Component {
  constructor(props) {
    super(props);

    if (this.props.type == 'column') {
      var style = {
        flex: '0 0 auto',
        width: '100%',
        height: this.props.height || '30%',
        whiteSpace: 'nowrap',
      };
    } else {
      var style = {
        flex: '0 0 auto',
        height: this.props.height || '',
        width: this.props.width || '30%',
        whiteSpace: 'nowrap',
      };
    }

    var comparedStyle = {
      ...style,
      ...this.props.style,
    };

    this.state = {
      dragging: false,
      resizableElement: null,
      style: comparedStyle,
    };
  }

  render () {
    return (
      <div style={this.state.style}>
          {this.props.children}
      </div>
    );
  }
};

export class Splitter extends Component {
  constructor(props) {
    super(props);

    if (this.props.type == 'column') {
      var style = {
        flex: '0 0 auto',
        width: '100%',
        height: 18,
        background: 'black',
        cursor: 'row-resize',

      };
    } else { //type != column
      var style = {
        flex: '0 0 auto',
        width: 18,
        height: '100%',
        background: 'black',
        cursor: 'col-resize',

      };
    }

    var comparedStyle = {
      ...{},
      ...style,
      ...this.props.style,
    };

    console.log('comparedStyle', comparedStyle);

    this.state = {
      dragging: false,
      resizableElement: null,
      otherElement: null,
      style: comparedStyle,
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
      var rootElemHeight = ReactDOM.findDOMNode(this).style.height;
      var newHeight = e.clientY - offset.top - parseInt(rootElemHeight) / 2;
      var newOtherHeight = parseInt(this.state.resizableElement.style.maxHeight) - newHeight;
      if (newHeight >= 0 && newOtherHeight >= 0) {
        this.state.resizableElement.style.height = newHeight;
        this.state.otherElement.style.height = newOtherHeight;
      }
    } else {
      var rootElemWith = ReactDOM.findDOMNode(this).style.width;
      var newWidth = e.clientX - offset.left - parseInt(rootElemWith) / 2;
      var newOtherWidth = parseInt(this.state.resizableElement.style.maxWidth) - newWidth;
      if (newOtherWidth >= 0 && newWidth >= 0) {
        this.state.resizableElement.style.width = newWidth;
        this.state.otherElement.style.width = newOtherWidth;
      }
    }
  }

  render () {
    return (
      <div style={this.state.style} onMouseDown={this.mouseDown} onMouseUp={this.onMouseUp} />
    );
  }
}

export class Resizable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      style: {
        display: 'flex',
        flexDirection: this.props.type || 'row',
        overflow: 'hidden',
        minHeight: this.props.height || '100%',
        maxHeight: this.props.height || '100%',
      },
    };
    if (this.props.type == 'column' && this.props.fullScreen == true) {
      window.addEventListener('resize', () => {this.updateComponentMaxHeight();});
    }
  }

  componentDidMount(props, state) {
    var childs = ReactDOM.findDOMNode(this).childNodes;
    var e = childs[childs.length - 1];
    if (e !== undefined) e.style.flex = '1 1 auto';
    if (this.props.fullScreen == true) {
      this.updateComponentMaxHeight();
    }
  }

  updateComponentMaxHeight() {
    var h = window.innerHeight;
    var w = window.innerWidth;
    var top = ReactDOM.findDOMNode(this).getBoundingClientRect().top;
    var left = ReactDOM.findDOMNode(this).getBoundingClientRect().left;
    ReactDOM.findDOMNode(this).style.maxWidth = w - left;
    ReactDOM.findDOMNode(this).style.minWidth = w - left;
    ReactDOM.findDOMNode(this).style.maxHeight = h - top;
    ReactDOM.findDOMNode(this).style.minHeight = h - top;
  }

  render() {
    const childrenWithProps = React.Children.map(this.props.children,
      (child) => React.cloneElement(child, {
        type: this.props.type,
      })
    );

    return (
      <div style={this.state.style}>
            {childrenWithProps}
        </div>
    );
  }
};

export class Rows extends Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <Resizable type='row' style={this.props.style} >{this.props.children}</Resizable>
    );
  }

}

export class Columns extends Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <Resizable type='column' style={this.props.style} >{this.props.children}</Resizable>
    );
  }

}
