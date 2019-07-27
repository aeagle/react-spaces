import React from 'react';
import * as Space from 'react-spaces';
import { Tabs, Anchor, Button, Icon } from 'antd';
import 'antd/dist/antd.css';
import SyntaxHighlighter from 'react-syntax-highlighter';
import './App.scss';
import ReactGA from 'react-ga';
import { UI } from './UI';

ReactGA.initialize("UA-144490437-1");
ReactGA.pageview(window.location.pathname + window.location.search);

const Description = (desc: string, mobileDesc: string) => (
  <Space.Centered>
    <span className="description">
      <strong className="desc">{desc}</strong>
      <strong className="mobileDesc">{mobileDesc}</strong>
      <Space.Info>{info => <div>{info.width.toFixed()} x {info.height.toFixed()}</div> }</Space.Info>
    </span>
  </Space.Centered>
)

const App: React.FC = () => {
  return (
    window.location.hash === "#ui-demo" ?
      <UI /> :
      <Space.ViewPort>
        <Space.Top size={80} style={{ backgroundColor: 'black', color: 'white', padding: 15 }}>
          <Space.CenteredVertically>
            <h1 style={{ color: 'white' }}>React Spaces</h1>
          </Space.CenteredVertically>
        </Space.Top>
        <Space.Fill className="all-content">
          <Space.Left className="sidebar" scrollable={true} size={250} style={{ padding: 30, borderRight: '2px solid #ddd' }}>

            <h3 className="sidebar-header">GitHub</h3>
            <div style={{ marginBottom: 15 }}>
              <Button type="primary" onClick={() => window.location.href = 'https://github.com/aeagle/react-spaces'}><Icon type="github" /> View on GitHub</Button>
            </div>

            <h3 className="sidebar-header">NPM <img style={{ position: 'relative', top: -2 }} alt="NPM version" src="https://img.shields.io/npm/v/react-spaces.svg" /></h3>

            <Anchor offsetTop={30}>
              <Anchor.Link href="#getting-started" title="Getting started" />
              <Anchor.Link href="#types" title="Types" />
              <Anchor.Link href="#non-resizable" title="Anchored" />
              <Anchor.Link href="#resizable" title="Resizable" />
              <Anchor.Link href="#nested" title="Nested" />
              <Anchor.Link href="#scrollable" title="Scrollable" />
              <Anchor.Link href="#stacked" title="Stacked" />
              <Anchor.Link href="#sizeinfo" title="Sizing information" />
              <Anchor.Link href="#changes" title="Version history" />
            </Anchor>

            <h2 className="sidebar-header"><a style={{ color: 'black', fontSize: 24 }} href="https://twitter.com/allaneagle">@allaneagle</a></h2>

          </Space.Left>
          <Space.Fill className="main" scrollable={true} style={{ padding: 30, paddingTop: 0 }}>

            <p id="intro" style={{ fontWeight: 400, paddingTop: 30, paddingBottom: 0, fontSize: 28, color: '#777' }}>
              React Spaces allow you to divide a page or container into nestable, anchored, scrollable and resizable spaces.
            </p>

            <p>
              <h2>Features</h2>

              <ul>
                <li>
                  No styling to achieve simple or complex layouts.
                </li>
                <li>
                  Spaces know how to behave in relation to each other and resize accordingly.
                </li>
                <li>
                  Spaces don't have any visual element to them (even padding or margins). You can fill them with whatever you want.
                </li>
              </ul>
            </p>

            <p>
              <img src="http://www.allaneagle.com/react-spaces/react-spaces-demo.gif" alt="Screen demo" width="100%" style={{ maxWidth: 1000 }} />
            </p>

            <h2 id="getting-started">Getting started</h2>

            <p>
              Spaces can be used by importing the spaces using the following:
            </p>

            <SyntaxHighlighter language="html">
              {
                "npm install react-spaces --save"
              }
            </SyntaxHighlighter>

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
                    <strong>&lt;ViewPort /&gt;</strong> - this space will take over the 
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
                    container/space. A size can be specified in pixels/percent to determine its width.
                  </li>
                  <li>
                    <strong>&lt;Right /&gt;</strong> a space anchored to the right of the parent 
                    container/space. A size can be specified in pixels/percent to determine its width.
                  </li>
                  <li>
                    <strong>&lt;Top /&gt;</strong> a space anchored to the top of the parent 
                    container/space. A size can be specified in pixels/percent to determine its height.
                  </li>
                  <li>
                    <strong>&lt;Bottom /&gt;</strong> a space anchored to the bottom of the parent 
                    container/space. A size can be specified in pixels/percent to determine its height.
                  </li>
                </ul>
              </Tabs.TabPane>
              <Tabs.TabPane tab="Other" key="3">
                <ul>
                  <li>
                    <strong>&lt;Fill /&gt;</strong> a space which consumes any available area left in the 
                    parent container/space taking into account any anchored spaces on every side.
                  </li>
                  <li>
                    <strong>&lt;Centered /&gt;</strong> centres the content of a space horizontally and 
                    vertically.
                  </li>
                  <li>
                    <strong>&lt;VerticallyCentered /&gt;</strong> centres the content of a space 
                    vertically.
                  </li>
                </ul>
              </Tabs.TabPane>
            </Tabs>

            <h2 id="non-resizable">Anchored spaces</h2>

            <p>
              Anchored spaces provide spaces which can be anchored to the side of a container space. For example,
              a <strong>&lt;Left /&gt;</strong> space might be used for a left sidebar and a <strong>&lt;Top /&gt;</strong>
              {" "}space might be used for a fixed heading or toolbar.
            </p>

            <Tabs defaultActiveKey="1">
              <Tabs.TabPane tab="Left and right" key="1">
              
                <SyntaxHighlighter language="html">
                  {
                    "const App = () => (\r\n" +
                    "  <Space.Fixed height={400}>\r\n" +
                    "    <Space.Left size=\"20%\" />\r\n" +
                    "    <Space.Fill />\r\n" +
                    "    <Space.Right size=\"20%\" />\r\n" +
                    "  </Space.Fixed>\r\n" +
                    ")"
                  }
                </SyntaxHighlighter>

                <Space.Fixed height={400}>
                  <Space.Left size="20%" style={{ backgroundColor: '#e0eae0' }}>
                    {Description("Left", "L")}
                  </Space.Left>
                  <Space.Fill style={{ backgroundColor: '#eee0e0' }}>
                    {Description("Fill", "F")}
                  </Space.Fill>
                  <Space.Right size="20%" style={{ backgroundColor: '#e0eee0' }}>
                    {Description("Right", "R")}
                  </Space.Right>
                </Space.Fixed>

              </Tabs.TabPane>
              <Tabs.TabPane tab="Top and bottom" key="2">
              
                <SyntaxHighlighter language="html">
                  {
                    "const App = () => (\r\n" +
                    "  <Space.Fixed height={400}>\r\n" +
                    "    <Space.Top size=\"20%\" />\r\n" +
                    "    <Space.Fill />\r\n" +
                    "    <Space.Bottom size=\"20%\" />\r\n" +
                    "  </Space.Fixed>\r\n" +
                    ")"
                  }
                </SyntaxHighlighter>

                <Space.Fixed height={400}>
                  <Space.Top size="20%" style={{ backgroundColor: '#e0eee0' }}>
                    {Description("Top", "T")}
                  </Space.Top>t5 cf
                  <Space.Fill style={{ backgroundColor: '#eee0e0' }}>
                    {Description("Fill", "F")}
                  </Space.Fill>
                  <Space.Bottom size="20%" style={{ backgroundColor: '#e0eee0' }}>
                    {Description("Bottom", "B")}
                  </Space.Bottom>
                </Space.Fixed>

              </Tabs.TabPane>
            </Tabs>

            <h2 id="resizable">Resizable spaces</h2>

            <p>
              Resizable spaces allow the space to be resized by dragging with the mouse. There are resizable variations of the spaces above called{" "}
              <strong>&lt;LeftResizable /&gt;</strong>, <strong>&lt;RightResizable /&gt;</strong>, <strong>&lt;TopResizable /&gt;</strong>,
              and <strong>&lt;BottomResizable /&gt;</strong>.
            </p>
            
            <p>The size specified is the initial width/height of the space.</p>

            <Tabs defaultActiveKey="1">
              <Tabs.TabPane tab="Left and right" key="1">

                <SyntaxHighlighter language="html">
                  {
                    "const App = () => (\r\n" +
                    "  <Space.Fixed height={400}>\r\n" +
                    "    <Space.LeftResizable size=\"20%\" />\r\n" +
                    "    <Space.Fill />\r\n" +
                    "    <Space.RightResizable size=\"20%\" />\r\n" +
                    "  </Space.Fixed>\r\n" +
                    ")"
                  }
                </SyntaxHighlighter>

                <Space.Fixed height={400}>
                  <Space.LeftResizable trackSize={true} size="20%" style={{ backgroundColor: '#e0eee0' }}>
                    {Description("Left", "L")}
                  </Space.LeftResizable>
                  <Space.Fill trackSize={true} style={{ backgroundColor: '#eee0e0' }}>
                    {Description("Fill", "F")}
                  </Space.Fill>
                  <Space.RightResizable trackSize={true} size="20%" style={{ backgroundColor: '#e0eee0' }}>
                    {Description("Right", "R")}
                  </Space.RightResizable>
                </Space.Fixed>

              </Tabs.TabPane>
              <Tabs.TabPane tab="Top and bottom" key="2">

                <SyntaxHighlighter language="html">
                  {
                    "const App = () => (\r\n" +
                    "  <Space.Fixed height={400}>\r\n" +
                    "    <Space.TopResizable size=\"20%\" />\r\n" +
                    "    <Space.Fill />\r\n" +
                    "    <Space.BottomResizable size=\"20%\" />\r\n" +
                    "  </Space.Fixed>\r\n" +
                    ")"
                  }
                </SyntaxHighlighter>

                <Space.Fixed height={400}>
                  <Space.TopResizable trackSize={true} size="20%" style={{ backgroundColor: '#e0eee0' }}>
                    {Description("Top", "T")}
                  </Space.TopResizable>
                  <Space.Fill trackSize={true} style={{ backgroundColor: '#eee0e0' }}>
                    {Description("Fill", "F")}
                  </Space.Fill>
                  <Space.BottomResizable trackSize={true} size="20%" style={{ backgroundColor: '#e0eee0' }}>
                    {Description("Bottom", "B")}
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
                    "    <Space.LeftResizable size={100} minimumSize={50} maximumSize={150} />\r\n" +
                    "    <Space.Fill />\r\n" +
                    "    <Space.RightResizable size={100} minimumSize={50} maximumSize={150} />\r\n" +
                    "  </Space.Fixed>\r\n" +
                    ")"
                  }
                </SyntaxHighlighter>

                <Space.Fixed height={400}>
                  <Space.LeftResizable trackSize={true} size={100} minimumSize={50} maximumSize={150} style={{ backgroundColor: '#e0eee0' }}>
                    {Description("Left", "L")}
                  </Space.LeftResizable>
                  <Space.Fill trackSize={true} style={{ backgroundColor: '#eee0e0' }}>
                    {Description("Fill", "F")}
                  </Space.Fill>
                  <Space.RightResizable trackSize={true} size={100} minimumSize={50} maximumSize={150} style={{ backgroundColor: '#e0eee0' }}>
                    {Description("Right", "R")}
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
                    "    <Space.TopResizable size=\"20%\" />\r\n" +
                    "    <Space.Fill>\r\n" +
                    "      <Space.LeftResizable size=\"20%\" />\r\n" +
                    "       <Space.Fill />\r\n" +
                    "      <Space.RightResizable size=\"20%\" />\r\n" +
                    "    </Space.Fill>\r\n" +
                    "    <Space.BottomResizable size=\"20%\" />\r\n" +
                    "  </Space.Fixed>\r\n" +
                    ")"
                  }
                </SyntaxHighlighter>

                <Space.Fixed height={400}>
                  <Space.TopResizable trackSize={true} size="25%" style={{ backgroundColor: '#e0eee0' }}>
                    {Description("Top", "T")}
                  </Space.TopResizable>
                  <Space.Fill>
                    <Space.LeftResizable trackSize={true} size="25%" style={{ backgroundColor: '#e0eeee' }}>
                      {Description("Left", "L")}
                    </Space.LeftResizable>
                    <Space.Fill trackSize={true} style={{ backgroundColor: '#eee0e0' }}>
                      {Description("Fill", "F")}
                    </Space.Fill>
                    <Space.RightResizable trackSize={true} size="25%" style={{ backgroundColor: '#e0eeee' }}>
                      {Description("Right", "R")}
                    </Space.RightResizable>
                  </Space.Fill>
                  <Space.BottomResizable trackSize={true} size="25%" style={{ backgroundColor: '#e0eee0' }}>
                    {Description("Bottom", "B")}
                  </Space.BottomResizable>
                </Space.Fixed>

              </Tabs.TabPane>
              <Tabs.TabPane tab="Top/bottom nested within left/fill/right" key="2">

                <SyntaxHighlighter language="html">
                  {
                    "const App = () => (\r\n" +
                    "  <Space.Fixed height={400}>\r\n" +
                    "    <Space.LeftResizable size=\"25%\" />\r\n" +
                    "    <Space.Fill>\r\n" +
                    "      <Space.TopResizable size=\"25%\" />\r\n" +
                    "       <Space.Fill />\r\n" +
                    "      <Space.BottomResizable size=\"25%\" />\r\n" +
                    "    </Space.Fill>\r\n" +
                    "    <Space.RightResizable size=\"25%\" />\r\n" +
                    "  </Space.Fixed>\r\n" +
                    ")"
                  }
                </SyntaxHighlighter>

                <Space.Fixed height={400}>
                  <Space.LeftResizable trackSize={true} size="25%" style={{ backgroundColor: '#e0eeee' }}>
                    {Description("Left", "L")}
                  </Space.LeftResizable>
                  <Space.Fill>
                    <Space.TopResizable trackSize={true} size="25%" style={{ backgroundColor: '#e0eee0' }}>
                      {Description("Top", "T")}
                    </Space.TopResizable>
                    <Space.Fill trackSize={true} style={{ backgroundColor: '#eee0e0' }}>
                      {Description("Fill", "F")}
                    </Space.Fill>
                    <Space.BottomResizable trackSize={true} size="25%" style={{ backgroundColor: '#e0eee0' }}>
                      {Description("Bottom", "B")}
                    </Space.BottomResizable>
                  </Space.Fill>
                  <Space.RightResizable trackSize={true} size="25%" style={{ backgroundColor: '#e0eeee' }}>
                    {Description("Right", "R")}
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
            

            <SyntaxHighlighter language="html">
              {
                "const App = () => (\r\n" +
                "  <Space.Fixed height={400}>\r\n" +
                "    <Space.LeftResizable size=\"20%\" />\r\n" +
                "    <Space.Fill scrollable={true} />\r\n" +
                "  </Space.Fixed>\r\n" +
                ")"
              }
            </SyntaxHighlighter>

            <Space.Fixed height={400}>
              <Space.LeftResizable size="20%" trackSize={true} style={{ backgroundColor: '#e0eee0' }}>
                {Description("Left", "L")}
              </Space.LeftResizable>
              <Space.Fill scrollable={true} style={{ backgroundColor: '#eee0e0' }}>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatum iure atque nostrum officiis soluta! Vero eum dicta nemo sed nesciunt. Hic provident vero ratione deleniti, nemo dicta eaque eveniet fugiat. Nulla beatae porro commodi mollitia. Sed repellendus sapiente minus nulla possimus deleniti quibusdam corrupti consequuntur quo atque et voluptatibus veritatis eius soluta tempora vero totam, molestias sequi natus eligendi id porro est. Sunt maxime saepe quisquam alias esse illum necessitatibus consequatur deleniti illo eligendi reprehenderit, provident neque dolores fugiat voluptatum debitis. Enim mollitia voluptatem neque odio animi accusamus recusandae sapiente, illum ullam. Temporibus cum, magni laudantium, atque voluptates assumenda labore reiciendis suscipit inventore porro a perferendis necessitatibus quas nostrum blanditiis excepturi similique vero aut dicta vitae odio praesentium unde. Id eaque iure ipsum cumque quia accusantium similique quae, unde eos aliquam, eius quasi voluptate odio explicabo officia placeat ab itaque dicta laboriosam reiciendis ratione, magni ducimus nam neque. Omnis, beatae perferendis. Autem unde doloremque repudiandae perspiciatis iusto placeat eos recusandae ad quis eaque, itaque sed! Pariatur perferendis ea reiciendis blanditiis placeat autem nulla et alias consectetur suscipit, eius ex quam modi dignissimos odit nesciunt commodi architecto quas! Reiciendis expedita excepturi labore modi quis, suscipit, alias, tempore assumenda consequatur incidunt aut fuga iste atque harum magnam commodi tenetur culpa maiores tempora ullam. Ad temporibus dicta, perferendis voluptatibus accusamus dolore molestias quos repellendus consequuntur. Ipsum qui labore, optio debitis temporibus cum tempore at iure fuga nostrum voluptatem deleniti corporis praesentium voluptate a minus itaque animi molestias reprehenderit velit rem quos, magni iste ullam. Quos voluptas inventore aliquam. Beatae soluta, quos eos provident natus asperiores nesciunt eum excepturi nulla. Labore nostrum quasi id cumque dolores fuga dignissimos explicabo pariatur eos repudiandae dolorem sapiente atque corrupti, esse quidem asperiores vel minima harum reiciendis voluptatibus ea doloremque eligendi saepe. Expedita quisquam numquam quos facere tempora quidem sunt, iste maiores, minima similique ratione! Quaerat culpa facere aliquid quisquam in recusandae veritatis, ea odit doloremque impedit adipisci consequatur expedita sed, ducimus blanditiis voluptates cumque quos. Non, qui obcaecati quas ab quasi aperiam facilis accusantium assumenda necessitatibus dolorem. Beatae enim ab assumenda iusto blanditiis quo consequuntur dignissimos? Nobis distinctio neque doloribus sequi non sit consequatur, mollitia temporibus illo quo magni similique, tenetur inventore dolore alias? Laborum ducimus alias, non debitis dolore fuga ratione consectetur quae tempora! Aliquid quaerat cupiditate vero aperiam dolor! Esse exercitationem facere sed nam iste et velit, eum autem, ratione soluta repellendus, corporis eaque veniam amet hic aliquid fugiat eligendi consequuntur at itaque. Temporibus, magnam. Enim laborum iste fuga, doloribus ipsam quasi aliquid dolorum, blanditiis omnis molestiae sunt dolorem? Dolore est delectus eos quam, eius nisi possimus quaerat inventore doloremque quo eum omnis temporibus unde velit suscipit consectetur magni libero tenetur iure? Iste accusantium, id quod libero fugit omnis nobis hic velit, quam enim eius recusandae minima doloremque earum veritatis voluptatibus numquam? Neque similique omnis odit dolore eos error, saepe aperiam? Cupiditate, pariatur qui quam ut illo natus amet beatae! Pariatur quam iure nulla eum ducimus possimus odio cupiditate! Itaque aperiam magnam, beatae totam obcaecati provident quasi cum doloremque dolorum recusandae. Voluptates quo maxime perferendis, ut consectetur quis minus quidem dicta aut possimus perspiciatis dolorum corrupti tempore incidunt veritatis adipisci neque asperiores doloremque officiis fuga? Perferendis et perspiciatis labore hic quasi doloremque dolore dolorem nihil dolorum nobis quidem delectus unde dicta voluptate aspernatur veniam, doloribus obcaecati? Eveniet, esse maxime voluptatum accusantium rerum voluptatem voluptatibus? Quae nostrum, nulla eius eum accusantium labore voluptatum beatae natus fugiat, quasi illum voluptatem ullam laudantium soluta dolorum dolor mollitia. Enim voluptas odit blanditiis animi. Error deserunt facilis magni accusantium harum fuga, aperiam nemo. Labore quis delectus fuga, similique, amet pariatur dolores dolorum dolor obcaecati provident nemo cumque id explicabo ab odio. Voluptas enim pariatur distinctio exercitationem, repellendus atque animi sapiente quisquam eius accusamus, soluta in quam! Dolorum facere impedit architecto, error adipisci officiis voluptas asperiores dolores praesentium fugiat, rerum blanditiis ut nesciunt iure, earum maxime omnis? Quisquam aperiam facere libero numquam, earum ex natus tempore ad distinctio nobis rem nostrum modi, totam quo ipsam porro officiis. Quisquam cumque necessitatibus tempore esse voluptatum aliquid dicta, non nostrum, blanditiis dolorum minus officiis, corporis eligendi. Commodi tempora dolores consectetur quas deserunt, est et saepe aspernatur at earum nam alias facilis in! Quisquam error corporis facere sapiente repellat neque quaerat illo aliquam perferendis porro suscipit dolorum enim nulla deserunt asperiores rerum, sit voluptate quasi quis inventore optio provident! Asperiores, obcaecati! Amet ullam, esse laborum aperiam placeat provident vero id atque dignissimos adipisci? Molestias eveniet totam facere hic placeat est tempora consectetur praesentium! Velit fuga aliquid voluptatibus ipsum blanditiis quod, mollitia repellendus hic eos expedita? Eius nemo non deleniti itaque eum pariatur, odit, accusamus laudantium velit similique accusantium. Vero beatae recusandae, aspernatur, ipsa fuga quaerat minima rerum magnam perferendis dicta error hic at voluptate laudantium. Aspernatur mollitia cupiditate vero esse reprehenderit atque! Ad quibusdam vitae, commodi laboriosam possimus nisi modi quaerat corporis rem atque, perspiciatis iusto sunt harum repellat reiciendis. Minima sequi corporis earum, libero ut fugit nemo, recusandae ipsa, sunt atque ducimus eius odit. Minima, expedita maiores. Nemo, iste corrupti adipisci soluta, maiores blanditiis tenetur magnam voluptate non, deleniti saepe veritatis vero reprehenderit nostrum harum itaque possimus fuga? Quo, culpa rem ipsa nemo soluta alias praesentium dolore voluptatem quas doloribus dolorum, sed est quod. Facere obcaecati repellat, iusto molestias quasi illum nostrum laborum. Consequuntur quas ipsam obcaecati nulla vitae ullam quasi harum unde. Deserunt vitae suscipit est, delectus molestias a, explicabo officia quia perferendis modi sint illo, magnam similique dicta maiores tempore temporibus? Ad earum porro ab, natus facilis alias non explicabo quis minus adipisci, molestias ipsa facere perferendis, quidem quod veritatis. Expedita consequatur magni officia inventore explicabo dolore harum, ut voluptatem placeat, cumque iste deleniti cupiditate adipisci non, asperiores quas optio deserunt ipsam magnam culpa qui molestias aspernatur esse? Laudantium, id. Minima eligendi cupiditate deleniti quisquam dolores. Soluta quos hic quas, dignissimos natus enim iusto repellendus distinctio voluptates dolor perspiciatis recusandae ut deserunt! Suscipit ducimus dolore rem molestias voluptate ea doloribus temporibus ipsum, dicta consequuntur quaerat. Commodi facilis aut aliquid, asperiores id nihil!
              </Space.Fill>
            </Space.Fixed>

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
                    "    <Space.LeftResizable size=\"10%\" order={1} />\r\n" +
                    "    <Space.LeftResizable size=\"10%\" order={2} />\r\n" +
                    "    <Space.Fill />\r\n" +
                    "    <Space.RightResizable size=\"10%\" order={2} />\r\n" +
                    "    <Space.RightResizable size=\"10%\" order={1} />\r\n" +
                    "  </Space.Fixed>\r\n" +
                    ")"
                  }
                </SyntaxHighlighter>

                <Space.Fixed height={400}>
                  <Space.LeftResizable trackSize={true} size="10%" order={1} style={{ backgroundColor: '#e0eee0' }}>
                    {Description("Left 1", "L1")}
                  </Space.LeftResizable>
                  <Space.LeftResizable trackSize={true} size="10%" order={2} style={{ backgroundColor: '#e0eeee' }}>
                    {Description("Left 2", "L2")}
                  </Space.LeftResizable>
                  <Space.Fill trackSize={true} style={{ backgroundColor: '#eee0e0' }}>
                    {Description("Fill", "F")}
                  </Space.Fill>
                  <Space.RightResizable trackSize={true} size="10%" order={2} style={{ backgroundColor: '#e0eeee' }}>
                    {Description("Right 2", "R2")}
                  </Space.RightResizable>
                  <Space.RightResizable trackSize={true} size="10%" order={1} style={{ backgroundColor: '#e0eee0' }}>
                    {Description("Right 1", "R1")}
                  </Space.RightResizable>
                </Space.Fixed>

              </Tabs.TabPane>
            </Tabs>

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

            <div>
                  <h3>0.1.4</h3> 
                  <ul>
                    <li>Add support for percentage sizing on anchored spaces</li>
                  </ul>
            </div>
            <div>
                  <h3>0.1.3</h3> 
                  <ul>
                    <li>Added readme</li>
                    <li>Updated documentation</li>
                  </ul>
            </div>
            <div>
                  <h3>0.1.2</h3> 
                  <ul>
                    <li>Removed ResizeSensor from spaces by default and now optionally allow live size updates with <strong>trackSize</strong> property</li>
                    <li>Added <strong>VerticallyCentered</strong> component to vertically centre content within a space</li>
                    <li>Allow class names to be specified on top-level spaces <strong>ViewPort</strong> and <strong>Fixed</strong></li>
                  </ul>
            </div>
            <div>
                  <h3>0.1.1</h3>
                  <ul>
                    <li>Initial version</li>
                  </ul>
            </div>

          </Space.Fill>

        </Space.Fill>
      </Space.ViewPort>
  );
}

export default App;
