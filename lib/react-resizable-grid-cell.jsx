import React, { Component } from 'react';
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

    var className = '';
    if (this.props.className != undefined) className += '' + this.props.className;

    this.state = {
      dragging: false,
      resizableElement: null,
      style: comparedStyle,
      className: className,
    };
  }
// className={this.state.className}
  render () {
    return (
      <div style={this.state.style} >
          {this.props.children}
      </div>
    );
  }
};
