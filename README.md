# React Spaces

React Spaces allows you to divide a page or container into spaces. These spaces know how to behave in relation to each other and can also be divided into further nested spaces.

## Top level spaces

These are supposed to be used at the top level of all spaces.

ViewPort - a top level space. This space will take over the full viewport of the browser window. Resizing the browser window will automatically adjust the size of this space and all the nested spaces.

Fixed - this space can be given a height and optionally a width (by default it will size to 100% of it's container). All nested spaces will be contained within this fixed size space.

## Inner spaces

These can be used with the top-level spaces ViewPort and Fixed and within other inner spaces.

* **Left** - a space anchored to the left of the parent container/space. A size can be specified in pixels to determine its width.

* **Right** - a space anchored to the right of the parent container/space. A size can be specified in pixels to determine its width.

* **Top** - a space anchored to the top of the parent container/space. A size can be specified in pixels to determine its height.

* **Bottom** - a space anchored to the bottom of the parent container/space. A size can be specified in pixels to determine its height.

* **Fill** - a space which consumes any available area left in the parent container/space taking into account any anchored spaces on every side.

## Getting started

Spaces can be used by importing the spaces using the following:

```typescript
npm i react-spaces
```

```typescript
import * as Spaces from 'react-spaces';
```

## Non-resizable spaces

Non-resizable spaces provide layout but can not be resized by user interaction.

[Example on codesandbox.io](https://codesandbox.io/s/react-shapes-left-right-spaces-ml4kl?fontsize=14)

### Left and right spaces

```typescript
const App = () => (
  <Space.Fixed height={400}>
    <Space.Left size={200} />
    <Space.Fill />
    <Space.Right size={200} />
  </Space.Fixed>
)
```

### Top and bottom spaces

```typescript
const App = () => (
  <Space.Fixed height={400}>
    <Space.Top size={100} />
    <Space.Fill />
    <Space.Bottom size={100} />
  </Space.Fixed>
)
```

## Resizable spaces

Resizable spaces allow the space to be resized by dragging with the mouse. The size specified is the initial width/height of the space. There are resizable variations of the spaces above calledLeftResizable, RightResizable, TopResizable, and BottomResizable.

### Left and right resizable spaces

```typescript
const App = () => (
  <Space.ViewPort>
    <Space.LeftResizable size={200} />
    <Space.Fill />
    <Space.RightResizable size={200} />
  </Space.ViewPort>
)
```

### Top and bottom resizable spaces

```typescript
const App = () => (
  <Space.Fixed height={400}>
    <Space.TopResizable size={100} />
    <Space.Fill />
    <Space.BottomResizable size={100} />
  </Space.Fixed>
)
```

Additional properties can be specified to constrain the resizing:

* **minimumSize** - minimum size the space can be resized (default is 10px)
* **maximumSize** - maximum size the space can be resized

*** Resizable spaces with constrained minimum and maximum sizes

```typescript
const App = () => (
  <Space.Fixed height={400}>
    <Space.LeftResizable size={200} minimumSize={150} maximumSize={250} />
    <Space.Fill />
    <Space.RightResizable size={200} minimumSize={150} maximumSize={250} />
  </Space.Fixed>
)
```
** Nested spaces

Spaces can be nested within other spaces to create complex layouts.

*** Left/right spaces nested within top/full/bottom spaces

```typescript
const App = () => (
  <Space.Fixed height={400}>
    <Space.TopResizable size={100} />
    <Space.Fill>
      <Space.LeftResizable size={150} />
       <Space.Fill />
      <Space.RightResizable size={150} />
    </Space.Fill>
    <Space.BottomResizable size={100} />
  </Space.Fixed>
)
```

### Top/bottom spaces nested within left/full/right spaces

```typescript
const App = () => (
  <Space.Fixed height={400}>
    <Space.LeftResizable size={150} />
    <Space.Fill>
      <Space.TopResizable size={100} />
       <Space.Fill />
      <Space.BottomResizable size={100} />
    </Space.Fill>
    <Space.RightResizable size={150} />
  </Space.Fixed>
)
```

## Stacked spaces

Anchored spaces can be stacked to provide more than one space on each side. To guarantee ordering from the outside of the container / parent space, you should specify an order.

### Stacked Left/right spaces

```typescript
const App = () => (
  <Space.Fixed height={400}>
    <Space.LeftResizable size={125} />
    <Space.LeftResizable size={125} />
    <Space.Fill />
  </Space.Fixed>
)
```
