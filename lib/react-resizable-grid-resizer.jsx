import React, { Component } from 'react';
import ReactDOM from 'react-dom';

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
