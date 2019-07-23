import React from 'react';
import * as Space from 'react-spaces';
import { Tabs, Anchor, Button, Icon } from 'antd';
import 'antd/dist/antd.css';
import SyntaxHighlighter from 'react-syntax-highlighter';
import './App.scss';
import ReactGA from 'react-ga';

ReactGA.initialize("UA-144490437-1");
ReactGA.pageview(window.location.pathname + window.location.search);

const Description = (props: string) => (
  <Space.Centered>
    <strong>{props}</strong>
    <Space.Info>{info => <div>{info.width.toFixed()} x {info.height.toFixed()}</div> }</Space.Info>
  </Space.Centered>
)

const App: React.FC = () => {
  return (
    <Space.ViewPort>
      <span id="forkongithub"><a href="https://github.com/aeagle/react-spaces">View on GitHub</a></span>

      <Space.Top size={80} style={{ backgroundColor: 'black', color: 'white', padding: 15 }}>
        <Space.CenteredVertically>
          <h1 style={{ color: 'white' }}>React Spaces</h1>
        </Space.CenteredVertically>
      </Space.Top>
      <Space.Fill className="all-content">
        <Space.Left className="sidebar" size={250} style={{ padding: 30, borderRight: '2px solid #ddd' }}>

          <h3 className="sidebar-header">GitHub</h3>
          <div style={{ marginBottom: 15 }}>
            <Button type="primary" onClick={() => window.location.href = 'https://github.com/aeagle/react-spaces'}><Icon type="github" /> View on GitHub</Button>
          </div>

          <h3 className="sidebar-header">NPM <img style={{ position: 'relative', top: -2 }} alt="NPM version" src="https://img.shields.io/npm/v/react-spaces.svg" /></h3>

          <Anchor offsetTop={30}>
            <Anchor.Link href="#getting-started" title="Getting started" />
            <Anchor.Link href="#types" title="Types" />
            <Anchor.Link href="#non-resizable" title="Non-resizable" />
            <Anchor.Link href="#resizable" title="Resizable" />
            <Anchor.Link href="#nested" title="Nested" />
            <Anchor.Link href="#stacked" title="Stacked" />
            <Anchor.Link href="#scrollable" title="Scrollable" />
            <Anchor.Link href="#sizeinfo" title="Sizing information" />
            <Anchor.Link href="#changes" title="Version history" />
          </Anchor>

          <h2 className="sidebar-header"><a style={{ color: 'black', fontSize: 24 }} href="https://twitter.com/allaneagle">@allaneagle</a></h2>

        </Space.Left>
        <Space.Fill className="main" scrollable={true} style={{ padding: 30, paddingTop: 0 }}>

          <p id="intro" style={{ fontWeight: 400, paddingTop: 30, paddingBottom: 0, fontSize: 28, color: '#777' }}>
            React Spaces allow you to divide a page or container into spaces. These spaces know how
            to behave in relation to each other and can also be divided into further nested spaces.
          </p>

          <h2 id="getting-started">Getting started</h2>

          <p>
            Spaces can be used by importing the spaces using the following:
          </p>

          <SyntaxHighlighter language="html">
            {
              "import * as Space from 'react-spaces';"
            }
          </SyntaxHighlighter>

          <h2 id="types">Types</h2>

          <Tabs defaultActiveKey="1">
            <Tabs.TabPane tab="Top level" key="1">
              <p>These are supposed to be used at the top level of all spaces.</p>

              <ul>
                <li>
                  <strong>&lt;ViewPort /&gt;</strong> a top level space. This space will take over the 
                  full viewport of the browser window. Resizing the browser window will automatically
                  adjust the size of this space and all the nested spaces.
                </li>
                <li>
                  <strong>&lt;Fixed /&gt;</strong> - this space can be given a height and optionally
                  a width (by default it will size to 100% of it's container). All nested spaces will be
                  contained within this fixed size space.
                </li>
              </ul>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Anchored" key="2">
              <p>
                These can be used with the top-level spaces <strong>ViewPort</strong> and <strong>Fixed</strong>{" "}
                and within other inner spaces.
              </p>

              <ul>
                <li>
                  <strong>&lt;Left /&gt;</strong> a space anchored to the left of the parent 
                  container/space. A size can be specified in pixels to determine its width.
                </li>
                <li>
                  <strong>&lt;Right /&gt;</strong> a space anchored to the right of the parent 
                  container/space. A size can be specified in pixels to determine its width.
                </li>
                <li>
                  <strong>&lt;Top /&gt;</strong> a space anchored to the top of the parent 
                  container/space. A size can be specified in pixels to determine its height.
                </li>
                <li>
                  <strong>&lt;Bottom /&gt;</strong> a space anchored to the bottom of the parent 
                  container/space. A size can be specified in pixels to determine its height.
                </li>
              </ul>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Other" key="3">
              <ul>
                <li>
                  <strong>&lt;Fill /&gt;</strong> a space which consumes any available area left in the 
                  parent container/space taking into account any anchored spaces on every side.
                </li>
              </ul>
            </Tabs.TabPane>
          </Tabs>

          <h2 id="non-resizable">Non-resizable spaces</h2>

          <p>
            Non-resizable spaces provide layout but can not be resized by user interaction.
          </p>

          <Tabs defaultActiveKey="1">
            <Tabs.TabPane tab="Left and right" key="1">
            
              <SyntaxHighlighter language="html">
                {
                  "const App = () => (\r\n" +
                  "  <Space.Fixed height={400}>\r\n" +
                  "    <Space.Left size={200} />\r\n" +
                  "    <Space.Fill />\r\n" +
                  "    <Space.Right size={200} />\r\n" +
                  "  </Space.Fixed>\r\n" +
                  ")"
                }
              </SyntaxHighlighter>

              <Space.Fixed height={400}>
                <Space.Left size={100} style={{ backgroundColor: '#e0eae0' }}>
                  {Description("Left")}
                </Space.Left>
                <Space.Fill style={{ backgroundColor: '#eee0e0' }}>
                  {Description("Fill")}
                </Space.Fill>
                <Space.Right size={200} style={{ backgroundColor: '#e0eee0' }}>
                  {Description("Right")}
                </Space.Right>
              </Space.Fixed>

            </Tabs.TabPane>
            <Tabs.TabPane tab="Top and bottom" key="2">
            
              <SyntaxHighlighter language="html">
                {
                  "const App = () => (\r\n" +
                  "  <Space.Fixed height={400}>\r\n" +
                  "    <Space.Top size={100} />\r\n" +
                  "    <Space.Fill />\r\n" +
                  "    <Space.Bottom size={100} />\r\n" +
                  "  </Space.Fixed>\r\n" +
                  ")"
                }
              </SyntaxHighlighter>

              <Space.Fixed height={400}>
                <Space.Top size={100} style={{ backgroundColor: '#e0eee0' }}>
                  {Description("Top")}
                </Space.Top>t5 cf
                <Space.Fill style={{ backgroundColor: '#eee0e0' }}>
                  {Description("Fill")}
                </Space.Fill>
                <Space.Bottom size={100} style={{ backgroundColor: '#e0eee0' }}>
                  {Description("Bottom")}
                </Space.Bottom>
              </Space.Fixed>

            </Tabs.TabPane>
          </Tabs>

          <h2 id="resizable">Resizable spaces</h2>

          <p>
            Resizable spaces allow the space to be resized by dragging with the mouse. There are resizable variations of the spaces above called{" "}
            <strong>LeftResizable</strong>, <strong>RightResizable</strong>, <strong>TopResizable</strong>,
            and <strong>BottomResizable</strong>.
          </p>
          
          <p>The size specified is the initial width/height of the space.</p>

          <Tabs defaultActiveKey="1">
            <Tabs.TabPane tab="Left and right" key="1">

              <SyntaxHighlighter language="html">
                {
                  "const App = () => (\r\n" +
                  "  <Space.Fixed height={400}>\r\n" +
                  "    <Space.LeftResizable size={200} />\r\n" +
                  "    <Space.Fill />\r\n" +
                  "    <Space.RightResizable size={200} />\r\n" +
                  "  </Space.Fixed>\r\n" +
                  ")"
                }
              </SyntaxHighlighter>

              <Space.Fixed height={400}>
                <Space.LeftResizable trackSize={true} size={200} style={{ backgroundColor: '#e0eee0' }}>
                  {Description("Left resizable")}
                </Space.LeftResizable>
                <Space.Fill trackSize={true} style={{ backgroundColor: '#eee0e0' }}>
                  {Description("Fill")}
                </Space.Fill>
                <Space.RightResizable trackSize={true} size={200} style={{ backgroundColor: '#e0eee0' }}>
                  {Description("Right resizable")}
                </Space.RightResizable>
              </Space.Fixed>

            </Tabs.TabPane>
            <Tabs.TabPane tab="Top and bottom" key="2">

              <SyntaxHighlighter language="html">
                {
                  "const App = () => (\r\n" +
                  "  <Space.Fixed height={400}>\r\n" +
                  "    <Space.TopResizable size={100} />\r\n" +
                  "    <Space.Fill />\r\n" +
                  "    <Space.BottomResizable size={100} />\r\n" +
                  "  </Space.Fixed>\r\n" +
                  ")"
                }
              </SyntaxHighlighter>

              <Space.Fixed height={400}>
                <Space.TopResizable trackSize={true} size={100} style={{ backgroundColor: '#e0eee0' }}>
                  {Description("Top resizable")}
                </Space.TopResizable>
                <Space.Fill trackSize={true} style={{ backgroundColor: '#eee0e0' }}>
                  {Description("Fill")}
                </Space.Fill>
                <Space.BottomResizable trackSize={true} size={100} style={{ backgroundColor: '#e0eee0' }}>
                  {Description("Bottom resizable")}
                </Space.BottomResizable>
              </Space.Fixed>

            </Tabs.TabPane>
            <Tabs.TabPane tab="Constrained resizing" key="3">

              <p>
                Additional properties can be specified to constrain the resizing:
              </p>

              <ul>
                <li><strong>minimumSize</strong> - minimum size the space can be resized (default is 10px)</li>
                <li><strong>maximumSize</strong> - maximum size the space can be resized</li>
              </ul>

              <SyntaxHighlighter language="html">
                {
                  "const App = () => (\r\n" +
                  "  <Space.Fixed height={400}>\r\n" +
                  "    <Space.LeftResizable size={200} minimumSize={150} maximumSize={250} />\r\n" +
                  "    <Space.Fill />\r\n" +
                  "    <Space.RightResizable size={200} minimumSize={150} maximumSize={250} />\r\n" +
                  "  </Space.Fixed>\r\n" +
                  ")"
                }
              </SyntaxHighlighter>

              <Space.Fixed height={400}>
                <Space.LeftResizable trackSize={true} size={200} minimumSize={150} maximumSize={250} style={{ backgroundColor: '#e0eee0' }}>
                  {Description("Left resizable")}
                </Space.LeftResizable>
                <Space.Fill trackSize={true} style={{ backgroundColor: '#eee0e0' }}>
                  {Description("Fill")}
                </Space.Fill>
                <Space.RightResizable trackSize={true} size={200} minimumSize={150} maximumSize={250} style={{ backgroundColor: '#e0eee0' }}>
                  {Description("Right resizable")}
                </Space.RightResizable>
              </Space.Fixed>

            </Tabs.TabPane>
          </Tabs>

          <h2 id="nested">Nested spaces</h2>

          <p>
            Spaces can be nested within other spaces to create complex layouts.
          </p>

          <Tabs defaultActiveKey="1">
            <Tabs.TabPane tab="Left/right nested within top/fill/bottom" key="1">

              <SyntaxHighlighter language="html">
                {
                  "const App = () => (\r\n" +
                  "  <Space.Fixed height={400}>\r\n" +
                  "    <Space.TopResizable size={100} />\r\n" +
                  "    <Space.Fill>\r\n" +
                  "      <Space.LeftResizable size={150} />\r\n" +
                  "       <Space.Fill />\r\n" +
                  "      <Space.RightResizable size={150} />\r\n" +
                  "    </Space.Fill>\r\n" +
                  "    <Space.BottomResizable size={100} />\r\n" +
                  "  </Space.Fixed>\r\n" +
                  ")"
                }
              </SyntaxHighlighter>

              <Space.Fixed height={400}>
                <Space.TopResizable trackSize={true} size={100} style={{ backgroundColor: '#e0eee0' }}>
                  {Description("Top resizable")}
                </Space.TopResizable>
                <Space.Fill>
                  <Space.LeftResizable trackSize={true} size={150} style={{ backgroundColor: '#e0eeee' }}>
                    {Description("Left resizable")}
                  </Space.LeftResizable>
                  <Space.Fill trackSize={true} style={{ backgroundColor: '#eee0e0' }}>
                    {Description("Fill")}
                  </Space.Fill>
                  <Space.RightResizable trackSize={true} size={150} style={{ backgroundColor: '#e0eeee' }}>
                    {Description("Right resizable")}
                  </Space.RightResizable>
                </Space.Fill>
                <Space.BottomResizable trackSize={true} size={100} style={{ backgroundColor: '#e0eee0' }}>
                  {Description("Bottom resizable")}
                </Space.BottomResizable>
              </Space.Fixed>

            </Tabs.TabPane>
            <Tabs.TabPane tab="Top/bottom nested within left/fill/right" key="2">

              <SyntaxHighlighter language="html">
                {
                  "const App = () => (\r\n" +
                  "  <Space.Fixed height={400}>\r\n" +
                  "    <Space.LeftResizable size={150} />\r\n" +
                  "    <Space.Fill>\r\n" +
                  "      <Space.TopResizable size={100} />\r\n" +
                  "       <Space.Fill />\r\n" +
                  "      <Space.BottomResizable size={100} />\r\n" +
                  "    </Space.Fill>\r\n" +
                  "    <Space.RightResizable size={150} />\r\n" +
                  "  </Space.Fixed>\r\n" +
                  ")"
                }
              </SyntaxHighlighter>

              <Space.Fixed height={400}>
                <Space.LeftResizable trackSize={true} size={150} style={{ backgroundColor: '#e0eeee' }}>
                  {Description("Left resizable")}
                </Space.LeftResizable>
                <Space.Fill>
                  <Space.TopResizable trackSize={true} size={100} style={{ backgroundColor: '#e0eee0' }}>
                    {Description("Top resizable")}
                  </Space.TopResizable>
                  <Space.Fill trackSize={true} style={{ backgroundColor: '#eee0e0' }}>
                    {Description("Fill")}
                  </Space.Fill>
                  <Space.BottomResizable trackSize={true} size={100} style={{ backgroundColor: '#e0eee0' }}>
                    {Description("Bottom resizable")}
                  </Space.BottomResizable>
                </Space.Fill>
                <Space.RightResizable trackSize={true} size={150} style={{ backgroundColor: '#e0eeee' }}>
                  {Description("Right resizable")}
                </Space.RightResizable>
              </Space.Fixed>

            </Tabs.TabPane>
          </Tabs>
          
          <h2 id="stacked">Stacked spaces</h2>

          <p>
            Anchored spaces can be stacked to provide more than one space on each side. To
            guarantee ordering from the outside of the container / parent space, you should
            specify an order.
          </p>

          <Tabs defaultActiveKey="1">
            <Tabs.TabPane tab="Stacked left/right" key="1">

              <SyntaxHighlighter language="html">
                {
                  "const App = () => (\r\n" +
                  "  <Space.Fixed height={400}>\r\n" +
                  "    <Space.LeftResizable size={75} order={1} />\r\n" +
                  "    <Space.LeftResizable size={75} order={2} />\r\n" +
                  "    <Space.Fill />\r\n" +
                  "    <Space.RightResizable size={75} order={2} />\r\n" +
                  "    <Space.RightResizable size={75} order={1} />\r\n" +
                  "  </Space.Fixed>\r\n" +
                  ")"
                }
              </SyntaxHighlighter>

              <Space.Fixed height={400}>
                <Space.LeftResizable trackSize={true} size={75} order={1} style={{ backgroundColor: '#e0eee0' }}>
                  {Description("Left 1")}
                </Space.LeftResizable>
                <Space.LeftResizable trackSize={true} size={75} order={2} style={{ backgroundColor: '#e0eeee' }}>
                  {Description("Left 2")}
                </Space.LeftResizable>
                <Space.Fill trackSize={true} style={{ backgroundColor: '#eee0e0' }}>
                  {Description("Fill")}
                </Space.Fill>
                <Space.RightResizable trackSize={true} size={75} order={2} style={{ backgroundColor: '#e0eeee' }}>
                  {Description("Right 2")}
                </Space.RightResizable>
                <Space.RightResizable trackSize={true} size={75} order={1} style={{ backgroundColor: '#e0eee0' }}>
                  {Description("Right 1")}
                </Space.RightResizable>
              </Space.Fixed>

            </Tabs.TabPane>
          </Tabs>

          <h2 id="scrollable">Scrollable spaces</h2>

          <p>
              By default, all spaces hide content that overflows the space. To make a particular space scrollable, 
              set the scrollable property to true. The space will then be scrollable horizontally or vertically if 
              the content overflows the space.
          </p>

          <h2 id="sizeinfo">Getting size information for a space</h2>
          
          <p>
            Using the Info component, you can get size information on the containing space. For live updates
            when the space size changes ensure that <strong>trackChanges</strong> is set to true on the space.
          </p>

          <SyntaxHighlighter language="html">
              {
                "const App = () => (\r\n" +
                "  <Space.Fixed height={400}>\r\n" +
                "    <Space.Fill trackSize={true}>\r\n" +
                "      <Space.Info>\r\n" +
                "         {info => <span>{info.width}px x {info.height}px</span>}\r\n" +
                "      </Space.Info>\r\n" +
                "    </Space.Fill>\r\n" +
                "  </Space.Fixed>\r\n" +
                ")"
              }
          </SyntaxHighlighter>

          <h2 id="changes">Version history</h2>

          <p>
                <strong>0.1.3</strong> 
                <ul>
                  <li>Added readme</li>
                  <li>Updated documentation</li>
                </ul>
          </p>
          <p>
                <strong>0.1.2</strong> 
                <ul>
                  <li>Removed ResizeSensor from spaces by default and now optionally allow live size updates with <strong>trackSize</strong> property</li>
                  <li>Added <strong>VerticallyCentered</strong> component to vertically centre content within space</li>
                  <li>Allow class names to be specified on top-level spaces <strong>ViewPort</strong> and <strong>Fixed</strong></li>
                </ul>
          </p>
          <p>
                <strong>0.1.0 - 0.1.1</strong>
                <ul>
                  <li>Initial version</li>
                </ul>
          </p>

        </Space.Fill>

      </Space.Fill>
    </Space.ViewPort>
  );
}

export default App;
