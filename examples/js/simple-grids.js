import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Rows, Columns, Cell, Splitter } from '../../index.dev';

var elem1 = React.createClass({
  render() {
    return (
      <div>
        <div style={{ width: 400, height: 250, border: '1px solid black', }}>
          <Rows>
                <Cell width="50%" style={{backgroundColor: 'pink',}}>left</Cell>
                <Splitter />
                <Cell style={{backgroundColor: 'green',}}>right</Cell>
          </Rows>

        </div>
      </div>
    );
  },
});

var elem2 = React.createClass({
  render() {
    return (
      <div>
        <div style={{ width: 400, height: 250, border: '1px solid black', }}>
          <Columns>
                <Cell height="50%" style={{backgroundColor: 'pink',}}>Top</Cell>
                <Splitter />
                <Cell style={{backgroundColor: 'green',}}>Bottom</Cell>
          </Columns>
        </div>
      </div>
    );
  },
});

var elem3 = React.createClass({
  render() {
    return (
      <div>
        <div style={{ width: 400, height: 500, border: '1px solid black', }}>
          <Columns >
            <Cell height="20%" style={{backgroundColor: 'Brown',}}>Top</Cell>
            <Splitter />
            <Cell height="60%">
              <Rows>
                <Cell width="20%" style={{backgroundColor: 'pink',}}>left</Cell>
                <Splitter />
                <Cell style={{backgroundColor: 'green',}}>center</Cell>
                <Splitter />
                <Cell style={{backgroundColor: 'yellow',}}>right</Cell>
              </Rows>
            </Cell>
            <Splitter />
            <Cell style={{backgroundColor: 'Chocolate',}}>
              Bottom
            </Cell>
          </Columns>
        </div>
      </div>
    );
  },
});

ReactDOM.render(React.createElement(elem1),  document.getElementById('elem1'));
ReactDOM.render(React.createElement(elem2),  document.getElementById('elem2'));
ReactDOM.render(React.createElement(elem3),  document.getElementById('elem3'));
