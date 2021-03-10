# React Spaces

![NPM](https://img.shields.io/npm/v/react-spaces.svg) ![Azure Pipelines](https://allan-eagle.visualstudio.com/All%20projects/_apis/build/status/aeagle.react-spaces?branchName=master)

An easy to understand and nestable layout system, React Spaces allow you to divide a page or container into anchored, scrollable and resizable spaces enabling you to build desktop/mobile type user interfaces in the browser. 

Rather than a library of visual UI components, Spaces are intended to be the reusable foundational blocks for laying out a UI which responds neatly to view port resizes leaving you to fill them with whatever components you want.

- No styling to achieve simple or complex layouts.
- Spaces know how to behave in relation to each other and resize accordingly.
- Spaces don't have any visual element to them (even padding or margins). You can fill them with whatever you want.

**Version 0.2.0 release - read [release notes here](https://www.allaneagle.com/react-spaces/release-0.2.0).**

View full documentation [here](https://www.allaneagle.com/react-spaces/demo/).

<img src="https://www.allaneagle.com/react-spaces/react-spaces-demo.gif" width="100%" />

### Top level spaces

Used at the top level of all other spaces.

**\<ViewPort \/>**

This space will take over the full viewport of the browser window. Resizing the browser window will automatically adjust the size of this space and all the nested spaces.

**\<Fixed /\>**

This space can be given a height and optionally a width (by default it will size to 100% of it's container). All nested spaces will be contained within this fixed size space.

### Anchored spaces

These can be used within the top-level spaces **\<ViewPort /\>** and **\<Fixed /\>** or nested within other spaces.

**\<Left /\>** and **\<Right /\>**

A space anchored to the left or right of the parent container/space. A size can be specified in pixels or as a percentage to determine its width.

**\<Top /\>** and **\<Bottom /\>**

A space anchored to the top or bottom of the parent container/space. A size can be specified in pixels or as a percentage to determine its height.

There are resizable versions of these components called **\<LeftResizable /\>**, **\<RightResizable /\>**, **\<TopResizable /\>** and **\<BottomResizable /\>** which allow the spaces to be resized from the outer edge by dragging with the mouse.

### Other

**\<Fill /\>**

A space which consumes any available area left in the parent container/space taking into account any anchored spaces on every side.

**\<Layer /\>**

Layers allow you to create layers within a parent space, for example:

```html
<ViewPort>
  <Layer zIndex="{0}">
    <LeftResizable size="20%" /> // floating sidebar
  </Layer>
  <Layer zIndex="{1}">
    <Fill />
  </Layer>
</ViewPort>
```

**\<Centered /\>**

Centres the content of a space horizontally and vertically.

**\<CenteredVertically /\>**

Centres the content of a space vertically.

## Getting started

To get started with React Spaces you need:

```typescript
npm install react-spaces --save
```

```typescript
import * as Spaces from "react-spaces";
```

View full documentation [here](https://www.allaneagle.com/react-spaces/demo/).

## Donation

If you find this library useful, consider making a small donation to fund a cup of coffee:

<a href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=AAYPWGUQBUDAA" 
    title="If you find this library useful, consider making a small donation to fund a cup of coffee" alt="Make Donation" style="text-decoration: none;">
<img src="https://www.allaneagle.com/donation.png" />
</a>
