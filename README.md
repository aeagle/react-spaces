# React Spaces

![NPM](https://img.shields.io/npm/v/react-spaces.svg) ![Azure Pipelines](https://allan-eagle.visualstudio.com/All%20projects/_apis/build/status/React-Spaces)

React Spaces allow you to divide a page or container HTML element into spaces. These spaces know how to behave in relation to each other and can also be divided into further nested spaces.

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

### Other

**\<Fill /\>** 

A space which consumes any available area left in the parent container/space taking into account any anchored spaces on every side.

**\<Centered /\>** 

Centres the content of a space horizontally and vertically.

**\<VerticallyCentered /\>**

Centres the content of a space vertically.

## Getting started

To get started with React Spaces you need:

```typescript
npm install react-spaces --save
```

```typescript
import * as Spaces from 'react-spaces';
```

View full documentation [here](https://www.allaneagle.com/react-spaces/demo/).

## Give back
If you find this library useful, consider making a small donation:

<a href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=AAYPWGUQBUDAA" 
    title="Find this library useful? Consider making a small donation." alt="Make Donation" style="text-decoration: none;">
	<img src="https://www.allaneagle.com/donation.png" />
</a>
