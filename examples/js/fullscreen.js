import * as React from 'react';
import * as ReactDOM from 'react-dom';

var page = React.createClass({
  render() {
    return (
      <div>i'm page fullscreen =).</div>
    );
  },
});

ReactDOM.render(React.createElement(page),
  document.getElementById('root')
);
