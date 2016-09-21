### react-resizable-grid


[Demo](https://hexerrus.github.io/react-resizable-grid/examples/simple-grids.html)

Pretty simple react component to create resizable grid.

### install


### Usage

```javascript
import { Rows, Columns, Cell, Splitter } from 'react-resizable-grid';

...
render: function() {
  return (
    <Columns>
      <Cell height="20%">Top</Cell>
      <Splitter />
      <Cell height="60%">
        <Rows>
          <Cell width="20%">left</Cell>
          <Splitter />
          <Cell>center</Cell>
          <Splitter />
          <Cell>right</Cell>
        </Rows>
      </Cell>
      <Splitter />
      <Cell>
        Bottom
      </Cell>
    </Columns>
  );
}
```


### Components

###### `<Columns>...</Columns>` Сontainer for vertical position





### Styling
All splitters inside `<Rows>...</Rows>` have class `horisontal-splitter` and  splitters inside `<Rows>...</Rows>` have class `vertival-splitter` by default.

You can add you own classes to splitters or Cells through `className` prop.

````javascript
render: function() {
  return (
    <Columns>
      <Cell height="50%">
        Top
      </Cell>
      <Splitter className="{this.props.className}"/>
      <Cell>
        Bottom
      </Cell>
    </Columns>
  );
}
````

Also you can use React inline style system like this:

````javascript
render: function() {
  var style = {
    height: 3,
    backgroundColor:'black',
  };
  return (
    <Columns>
      <Cell height="50%">
        Top
      </Cell>
      <Splitter style="{style}"/>
      <Cell>
        Bottom
      </Cell>
    </Columns>
  );
}
````
