import React, { CSSProperties } from 'react';
import * as Space from 'react-spaces';
import { Tabs, Menu, Button} from 'antd';
import 'antd/dist/antd.css';
import SyntaxHighlighter from 'react-syntax-highlighter';
import './App.scss';

const darkStyle: CSSProperties = { backgroundColor: '#333', color: 'white' };
const darkStyleWithPadding: CSSProperties = { ...darkStyle, ...{ padding: 13 } };

const Description = (props: string) => (
  <Space.Centered>
    <strong>{props}</strong>
    <Space.Info>{info => <div>{info.width} x {info.height}</div> }</Space.Info>
  </Space.Centered>
)

const App: React.FC = () => {
  const [ secondSideBarVisible, setSecondBarVisible ] = React.useState(false);

  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ textAlign: 'left', width: 1000, marginLeft: 'auto', marginRight: 'auto' }}>

      <h1>React Spaces</h1>

      <p>
        React Spaces allows you to divide a page or container into spaces. These spaces know how
        to behave in relation to each other and can also be divided into further nested spaces.
      </p>

      <h2>Top level spaces</h2>

      <p>These are supposed to be used at the top level of all spaces.</p>

      <ul>
        <li>
          <strong>ViewPort</strong> - a top level space. This space will take over the 
          full viewport of the browser window. Resizing the browser window will automatically
          adjust the size of this space and all the nested spaces.
        </li>
        <li>
          <strong>Fixed</strong> - this space can be given a height and optionally
          a width (by default it will size to 100% of it's container). All nested spaces will be
          contained within this fixed size space.
        </li>
      </ul>

      <h2>Inner spaces</h2>

      <p>
        These can be used with the top-level spaces <strong>ViewPort</strong> and <strong>Fixed</strong>{" "}
        and within other inner spaces.
      </p>

      <ul>
        <li>
          <strong>Left</strong> - a space anchored to the left of the parent 
          container/space. A size can be specified in pixels to determine its width.
        </li>
        <li>
          <strong>Right</strong> - a space anchored to the right of the parent 
          container/space. A size can be specified in pixels to determine its width.
        </li>
        <li>
          <strong>Top</strong> - a space anchored to the top of the parent 
          container/space. A size can be specified in pixels to determine its height.
        </li>
        <li>
          <strong>Bottom</strong> - a space anchored to the bottom of the parent 
          container/space. A size can be specified in pixels to determine its height.
        </li>
        <li>
          <strong>Fill</strong> - a space which consumes any available area left in the 
          parent container/space taking into account any anchored spaces on every side.
        </li>
      </ul>

      <h2>Using spaces</h2>

      <p>
        Spaces can be used by importing the spaces using the following:
      </p>

      <SyntaxHighlighter language="html">
        {
          "import * as Spaces from 'react-spaces';"
        }
      </SyntaxHighlighter>

      <h2>Non-resizable spaces</h2>

      <p>
        Non-resizable spaces provide layout but can not be resized by user interaction.
      </p>

      <h3>Left and right spaces</h3>

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

      <Space.Fixed height={400} style={{ border: "1px solid navy", margin: 25 }}>
        <Space.Left size={200} style={{ backgroundColor: '#eee' }}>
          {Description("Left")}
        </Space.Left>
        <Space.Fill>
          {Description("Fill")}
        </Space.Fill>
        <Space.Right size={200} style={{ backgroundColor: '#eee' }}>
          {Description("Right")}
        </Space.Right>
      </Space.Fixed>

      <h3>Top and bottom spaces</h3>

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

      <Space.Fixed height={400} style={{ border: "1px solid navy", margin: 25 }}>
        <Space.Top size={100} style={{ backgroundColor: '#eee' }}>
          {Description("Top")}
        </Space.Top>t5 cf
        <Space.Fill>
          {Description("Fill")}
        </Space.Fill>
        <Space.Bottom size={100} style={{ backgroundColor: '#eee' }}>
          {Description("Bottom")}
        </Space.Bottom>
      </Space.Fixed>

      <h2>Resizable spaces</h2>

      <p>
        Resizable spaces allow the space to be resized by dragging with the mouse. The size specified is
        the initial width/height of the space. There are resizable variations of the spaces above called
        <strong>LeftResizable</strong>, <strong>RightResizable</strong>, <strong>TopResizable</strong>,
        and <strong>BottomResizable</strong>.
      </p>

      <h3>Left and right resizable spaces</h3>

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

      <Space.Fixed height={400} style={{ border: "1px solid navy", margin: 25 }}>
        <Space.LeftResizable size={200} style={{ backgroundColor: '#eee' }}>
          {Description("Left resizable")}
        </Space.LeftResizable>
        <Space.Fill>
          {Description("Fill")}
        </Space.Fill>
        <Space.RightResizable size={200} style={{ backgroundColor: '#eee' }}>
          {Description("Right resizable")}
        </Space.RightResizable>
      </Space.Fixed>

      <h3>Top and bottom resizable spaces</h3>

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

      <Space.Fixed height={400} style={{ border: "1px solid navy", margin: 25 }}>
        <Space.TopResizable size={100} style={{ backgroundColor: '#eee' }}>
          {Description("Top resizable")}
        </Space.TopResizable>
        <Space.Fill>
          {Description("Fill")}
        </Space.Fill>
        <Space.BottomResizable size={100} style={{ backgroundColor: '#eee' }}>
          {Description("Bottom resizable")}
        </Space.BottomResizable>
      </Space.Fixed>
      
      <p>
        Additional properties can be specified to constrain the resizing:
      </p>

      <ul>
        <li><strong>minimumSize</strong> - minimum size the space can be resized (default is 10px)</li>
        <li><strong>maximumSize</strong> - maximum size the space can be resized</li>
      </ul>

      <h3>Resizable spaces with constrained minimum and maximum sizes</h3>

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

      <Space.Fixed height={400} style={{ border: "1px solid navy", margin: 25 }}>
        <Space.LeftResizable size={200} minimumSize={150} maximumSize={250} style={{ backgroundColor: '#eee' }}>
          {Description("Left resizable")}
        </Space.LeftResizable>
        <Space.Fill>
          {Description("Fill")}
        </Space.Fill>
        <Space.RightResizable size={200} minimumSize={150} maximumSize={250} style={{ backgroundColor: '#eee' }}>
          {Description("Right resizable")}
        </Space.RightResizable>
      </Space.Fixed>

      <h2>Nested spaces</h2>

      <p>
        Spaces can be nested within other spaces to create complex layouts.
      </p>

      <h3>Left/right spaces nested within top/full/bottom spaces</h3>

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

      <Space.Fixed height={400} style={{ border: "1px solid navy", margin: 25 }}>
        <Space.TopResizable size={100} style={{ backgroundColor: '#eee' }}>
          {Description("Top resizable")}
        </Space.TopResizable>
        <Space.Fill>
          <Space.LeftResizable size={150} style={{ backgroundColor: '#e0eeee' }}>
            {Description("Left resizable")}
          </Space.LeftResizable>
          <Space.Fill>
            {Description("Fill")}
          </Space.Fill>
          <Space.RightResizable size={150} style={{ backgroundColor: '#e0eeee' }}>
            {Description("Right resizable")}
          </Space.RightResizable>
        </Space.Fill>
        <Space.BottomResizable size={100} style={{ backgroundColor: '#eee' }}>
          {Description("Bottom resizable")}
        </Space.BottomResizable>
      </Space.Fixed>

      <h3>Top/bottom spaces nested within left/full/right spaces</h3>

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

      <Space.Fixed height={400} style={{ border: "1px solid navy", margin: 25 }}>
        <Space.LeftResizable size={150} style={{ backgroundColor: '#e0eeee' }}>
          {Description("Left resizable")}
        </Space.LeftResizable>
        <Space.Fill>
          <Space.TopResizable size={100} style={{ backgroundColor: '#eee' }}>
            {Description("Top resizable")}
          </Space.TopResizable>
          <Space.Fill>
            {Description("Fill")}
          </Space.Fill>
          <Space.BottomResizable size={100} style={{ backgroundColor: '#eee' }}>
            {Description("Bottom resizable")}
          </Space.BottomResizable>
        </Space.Fill>
        <Space.RightResizable size={150} style={{ backgroundColor: '#e0eeee' }}>
          {Description("Right resizable")}
        </Space.RightResizable>
      </Space.Fixed>
      
      <h2>Stacked spaces</h2>

      <p>
        Anchored spaces can be stacked to provide more than one space on each side. To
        guarantee ordering from the outside of the container / parent space, you should
        specify an order.
      </p>

      <h3>Stacked Left/right spaces</h3>

      <SyntaxHighlighter language="html">
        {
          "const App = () => (\r\n" +
          "  <Space.Fixed height={400}>\r\n" +
          "    <Space.LeftResizable size={125} />\r\n" +
          "    <Space.LeftResizable size={125} />\r\n" +
          "    <Space.Fill />\r\n" +
          "  </Space.Fixed>\r\n" +
          ")"
        }
      </SyntaxHighlighter>

      <Space.Fixed height={400} style={{ border: "1px solid navy", margin: 25 }}>
        <Space.LeftResizable size={125} order={1} style={{ backgroundColor: '#eee' }}>
          {Description("Left resizable 1")}
        </Space.LeftResizable>
        <Space.LeftResizable size={125} order={2} style={{ backgroundColor: '#e0eeee' }}>
          {Description("Left resizable 2")}
        </Space.LeftResizable>
        <Space.Fill>
          {Description("Fill")}
        </Space.Fill>
        <Space.RightResizable size={125} order={1} style={{ backgroundColor: '#eee' }}>
          {Description("Right resizable 1")}
        </Space.RightResizable>
        <Space.RightResizable size={125} order={2} style={{ backgroundColor: '#e0eeee' }}>
          {Description("Right resizable 2")}
        </Space.RightResizable>
      </Space.Fixed>
      
      <h2>UI</h2>

      <p>
        Spaces provide no styling or output any content within themselves. They are purely provide layout
        and sub-division of a page. You can place any components you like within the spaces. Here is an
        example using some <strong>antd</strong> components.
      </p>

      <Space.Fixed height={400} style={{ margin: 25 }}>

          <Space.Left order={1} size={50} style={{ backgroundColor: 'maroon' }} />

          <Space.Fill>
              
            <Space.TopResizable size={65} minimumSize={65} maximumSize={120} style={darkStyleWithPadding}>
              
              <Space.Centered>
                <h1 style={{ color: 'white' }}>Header</h1>
              </Space.Centered>
              
              <Space.Right size={160}>

                <Space.Centered>
                  <Button onClick={() => setSecondBarVisible(!secondSideBarVisible)}>Toggle sidebar</Button>
                </Space.Centered>

              </Space.Right>
                
            </Space.TopResizable>

            <Space.Fill>

              <Space.LeftResizable scrollable={true} order={2} size={300} minimumSize={100} maximumSize={500} style={darkStyle}>
                <Menu theme="dark">
                  <Menu.Item>Item 1</Menu.Item>
                  <Menu.Item>Item 2</Menu.Item>
                  <Menu.Item>Item 1</Menu.Item>
                  <Menu.Item>Item 2</Menu.Item>
                  <Menu.Item>Item 3</Menu.Item>
                  <Menu.Item>Item 1</Menu.Item>
                  <Menu.Item>Item 2</Menu.Item>
                  <Menu.Item>Item 1</Menu.Item>
                  <Menu.Item>Item 2</Menu.Item>
                  <Menu.Item>Item 3</Menu.Item>
                  <Menu.Item>Item 1</Menu.Item>
                  <Menu.Item>Item 2</Menu.Item>
                  <Menu.Item>Item 1</Menu.Item>
                  <Menu.Item>Item 2</Menu.Item>
                  <Menu.Item>Item 3</Menu.Item>
                  <Menu.Item>Item 1</Menu.Item>
                  <Menu.Item>Item 2</Menu.Item>
                  <Menu.Item>Item 1</Menu.Item>
                  <Menu.Item>Item 2</Menu.Item>
                  <Menu.Item>Item 3</Menu.Item>
                  <Menu.Item>Item 1</Menu.Item>
                  <Menu.Item>Item 2</Menu.Item>
                  <Menu.Item>Item 1</Menu.Item>
                  <Menu.Item>Item 2</Menu.Item>
                  <Menu.Item>Item 3</Menu.Item>
                  <Menu.Item>Item 1</Menu.Item>
                  <Menu.Item>Item 2</Menu.Item>
                  <Menu.Item>Item 1</Menu.Item>
                  <Menu.Item>Item 2</Menu.Item>
                  <Menu.Item>Item 3</Menu.Item>
                </Menu>
              </Space.LeftResizable>

              {
                secondSideBarVisible ?
                  <Space.LeftResizable order={3} size={200} minimumSize={100} maximumSize={500} style={darkStyle}>
                    <Menu theme="dark">
                      <Menu.Item>Item 1</Menu.Item>
                      <Menu.Item>Item 2</Menu.Item>
                      <Menu.Item>Item 3</Menu.Item>
                    </Menu>
                  </Space.LeftResizable> :
                  null
              }

              <Space.Fill>

                <Space.TopResizable size={500} scrollable={true} style={{ padding: 15 }}>

                  <Tabs defaultActiveKey="1">
                    <Tabs.TabPane tab="Tab 1" key="1">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae pariatur reiciendis officia magni ipsa suscipit! Laboriosam, ex voluptas. Perspiciatis et harum placeat dignissimos magnam neque in molestias adipisci obcaecati ipsum! Laboriosam aperiam hic veniam dicta nemo sapiente fugiat tempore maxime at consequatur voluptates, perferendis iure quaerat sequi aliquam quas deleniti officiis, quam pariatur in. Corporis incidunt repudiandae voluptatibus praesentium vitae alias, veniam ea quis dolor, iure officiis deserunt ab libero voluptatem dignissimos similique nam excepturi nisi perferendis temporibus. Officia, laudantium! Qui aliquam voluptatibus deleniti nostrum enim reprehenderit sapiente quam ducimus beatae quaerat laborum facere cum alias dignissimos, aliquid iusto accusamus voluptatum adipisci hic sint voluptas omnis provident. Libero alias quasi aliquam ipsum eveniet ipsa voluptates, doloremque tempora neque nihil magnam explicabo dignissimos atque, placeat magni necessitatibus vitae voluptatum? Tenetur praesentium nisi atque ea iusto nesciunt consectetur, quod eveniet, modi adipisci expedita. Accusamus nihil temporibus mollitia facilis voluptatibus architecto. Accusantium veniam ratione dolorem totam, illo deserunt porro provident, adipisci culpa voluptatibus, ab rem quos cupiditate dolor! Harum voluptatem ex sed temporibus quas maiores, cumque deleniti, nihil, sint molestias ad magni maxime perferendis accusantium debitis nulla. Quisquam sunt eum eaque repellendus cupiditate architecto in ex corporis corrupti consequuntur possimus nisi doloribus facere deleniti, tempora nam nobis repellat amet iusto dolor dolorem enim ullam! Perspiciatis eaque eum saepe aut nihil adipisci nisi modi nostrum distinctio quidem! Iste eius modi dolorum hic enim laborum praesentium. Magnam, incidunt reprehenderit fugit facilis maxime, voluptatem non possimus placeat iste voluptate dolorem fuga necessitatibus temporibus sint itaque neque illum. Consequatur consequuntur ipsam, corrupti unde eius amet pariatur sint hic nisi aliquid dolorem quasi doloremque quam, obcaecati eligendi error nesciunt accusamus, asperiores veniam minus! Cumque impedit voluptate quibusdam corporis non eligendi et inventore aliquid! Fugit nesciunt repellendus repellat esse, quibusdam nulla officia nam recusandae doloribus minus labore suscipit itaque ad consequatur quae debitis atque, quasi fugiat ratione magnam quis! Repellat animi laudantium nemo impedit reiciendis cum molestias est numquam dolores, dolorem autem corrupti id, accusantium rem ab optio pariatur? Iure deleniti consequuntur aut, necessitatibus, enim error, amet quod asperiores repellat eius inventore ad magni vel! Nobis tempora quos dolor repudiandae. In consectetur cum natus blanditiis. Praesentium unde sapiente ipsa at assumenda? Tempora corrupti unde ducimus culpa eius nostrum. A, sit sunt earum doloribus voluptates quia est ullam illum voluptatem unde, porro impedit rem hic. Sit ipsa necessitatibus aspernatur tempore porro reprehenderit aliquam architecto iste ea magnam ex quam nihil nostrum asperiores illo beatae, labore nisi aliquid inventore. Mollitia odit pariatur saepe a atque repellendus? Labore sapiente eum fugit officia magni optio ea aut quia inventore! Sequi, harum? Dolor amet quam nihil excepturi distinctio, recusandae, ducimus quasi, soluta deleniti qui aliquid! Expedita quisquam quos repellat odit labore consequuntur commodi possimus mollitia incidunt nulla, magni esse voluptatum assumenda cum quam laudantium debitis eius veniam ipsum illum perferendis, sint distinctio officiis. Eveniet adipisci doloribus aspernatur, iure similique repudiandae quo, reiciendis harum voluptas sint eligendi? Deleniti eos asperiores porro quidem, a iusto cumque ab praesentium voluptas velit quod, dolorum, sequi non veritatis. Excepturi dolore dolorum distinctio ipsum porro omnis cupiditate doloremque maiores vero? Inventore mollitia odio vitae expedita harum magnam, aspernatur officiis doloribus error minus dolorum praesentium fugit earum dolorem itaque deserunt nulla! Illo quos dolorum iusto fuga impedit magni quas qui excepturi ratione commodi? Nesciunt quos natus distinctio illo, omnis architecto molestias in, consectetur provident earum ipsum voluptates voluptatum explicabo esse nam cum sequi veritatis amet exercitationem rem repellendus obcaecati neque nobis quis. Commodi asperiores vitae dolores molestiae molestias, labore eius sint corrupti blanditiis quas. Fugiat, non odio maxime quam eligendi velit reprehenderit obcaecati optio et voluptas ratione est ex maiores! Libero explicabo quaerat cumque nihil consequatur voluptates in distinctio odit animi maiores eaque, corrupti quo repudiandae, temporibus, omnis suscipit nesciunt asperiores debitis nostrum aliquam commodi. Ducimus vero molestias nulla sunt ad qui officiis molestiae animi mollitia praesentium architecto consequuntur asperiores illo, rem nisi quidem quae esse minus ea sit cum laboriosam modi corrupti impedit. Ut, hic, recusandae quia alias porro dolorum vel sit rem tempore excepturi reiciendis consequatur necessitatibus, ipsa dolores maxime placeat. Numquam dolores ut nam, voluptatibus, earum dolor velit labore quis ipsa esse eligendi et id? Eum ratione tempore laborum nihil beatae voluptate minima qui repellat quo, delectus alias reprehenderit excepturi facilis vero rem temporibus quam voluptas velit! Temporibus odio fuga eos quasi eligendi rem excepturi dignissimos officiis magnam minus deserunt quis laborum mollitia quaerat earum et, voluptates veritatis recusandae ducimus amet non ad aliquam laudantium? Cumque eos fugiat quasi porro, pariatur dolore vitae beatae repellat rerum voluptatibus, sed aut eum quas. Repudiandae corporis ad veritatis similique doloremque praesentium esse dolorum atque odio explicabo dicta architecto reiciendis incidunt voluptates veniam, reprehenderit sed possimus nulla. Ullam obcaecati quas, sapiente illum unde aspernatur iste magni neque rem quis non laborum voluptas doloribus tempora exercitationem sed modi rerum iure quae, atque ut. Magni doloremque velit ea odit commodi quidem quos, cumque dignissimos exercitationem cum laborum possimus sapiente porro excepturi consectetur, deleniti doloribus animi ad iusto. Odit quaerat iure optio harum labore? Commodi natus ea autem at similique voluptatum dolore temporibus neque quod necessitatibus officia ipsa quidem vitae, eligendi non excepturi illo corporis, itaque nulla! Perferendis eligendi expedita ea repellendus, sapiente, consequatur voluptates laborum perspiciatis laboriosam voluptatem a accusantium maxime quidem. Voluptatum ipsam dolores illum magnam quisquam placeat atque cum, nulla quod autem nisi dolorum exercitationem! Earum aspernatur nulla unde quisquam aliquam delectus facere esse eos soluta accusantium ullam iure, autem sapiente totam praesentium accusamus. Autem vero doloremque facilis, laborum consequuntur voluptatibus? Cum deleniti assumenda nihil nemo impedit eligendi sint corporis, necessitatibus quisquam asperiores sequi voluptatum veritatis nulla est dignissimos alias eos officia voluptatibus velit nam repellendus tempora maiores voluptas repudiandae. Quis fugit quo, explicabo eligendi, exercitationem qui voluptatum quisquam corporis harum beatae sit? Nulla qui maxime fuga repellat doloremque esse illum repellendus inventore, minima fugiat molestias numquam dolores id est voluptatem cupiditate rem eos deserunt expedita! Voluptatum, suscipit fuga et odit ab voluptate rem officia quidem repudiandae eligendi! Minima ullam aut temporibus iure, aperiam unde in illum velit quam atque facilis provident?
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Tab 2" key="2">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae pariatur reiciendis officia magni ipsa suscipit! Laboriosam, ex voluptas. Perspiciatis et harum placeat dignissimos magnam neque in molestias adipisci obcaecati ipsum! Laboriosam aperiam hic veniam dicta nemo sapiente fugiat tempore maxime at consequatur voluptates, perferendis iure quaerat sequi aliquam quas deleniti officiis, quam pariatur in. Corporis incidunt repudiandae voluptatibus praesentium vitae alias, veniam ea quis dolor, iure officiis deserunt ab libero voluptatem dignissimos similique nam excepturi nisi perferendis temporibus. Officia, laudantium! Qui aliquam voluptatibus deleniti nostrum enim reprehenderit sapiente quam ducimus beatae quaerat laborum facere cum alias dignissimos, aliquid iusto accusamus voluptatum adipisci hic sint voluptas omnis provident. Libero alias quasi aliquam ipsum eveniet ipsa voluptates, doloremque tempora neque nihil magnam explicabo dignissimos atque, placeat magni necessitatibus vitae voluptatum? Tenetur praesentium nisi atque ea iusto nesciunt consectetur, quod eveniet, modi adipisci expedita. Accusamus nihil temporibus mollitia facilis voluptatibus architecto. Accusantium veniam ratione dolorem totam, illo deserunt porro provident, adipisci culpa voluptatibus, ab rem quos cupiditate dolor! Harum voluptatem ex sed temporibus quas maiores, cumque deleniti, nihil, sint molestias ad magni maxime perferendis accusantium debitis nulla. Quisquam sunt eum eaque repellendus cupiditate architecto in ex corporis corrupti consequuntur possimus nisi doloribus facere deleniti, tempora nam nobis repellat amet iusto dolor dolorem enim ullam! Perspiciatis eaque eum saepe aut nihil adipisci nisi modi nostrum distinctio quidem! Iste eius modi dolorum hic enim laborum praesentium. Magnam, incidunt reprehenderit fugit facilis maxime, voluptatem non possimus placeat iste voluptate dolorem fuga necessitatibus temporibus sint itaque neque illum. Consequatur consequuntur ipsam, corrupti unde eius amet pariatur sint hic nisi aliquid dolorem quasi doloremque quam, obcaecati eligendi error nesciunt accusamus, asperiores veniam minus! Cumque impedit voluptate quibusdam corporis non eligendi et inventore aliquid! Fugit nesciunt repellendus repellat esse, quibusdam nulla officia nam recusandae doloribus minus labore suscipit itaque ad consequatur quae debitis atque, quasi fugiat ratione magnam quis! Repellat animi laudantium nemo impedit reiciendis cum molestias est numquam dolores, dolorem autem corrupti id, accusantium rem ab optio pariatur? Iure deleniti consequuntur aut, necessitatibus, enim error, amet quod asperiores repellat eius inventore ad magni vel! Nobis tempora quos dolor repudiandae. In consectetur cum natus blanditiis. Praesentium unde sapiente ipsa at assumenda? Tempora corrupti unde ducimus culpa eius nostrum. A, sit sunt earum doloribus voluptates quia est ullam illum voluptatem unde, porro impedit rem hic. Sit ipsa necessitatibus aspernatur tempore porro reprehenderit aliquam architecto iste ea magnam ex quam nihil nostrum asperiores illo beatae, labore nisi aliquid inventore. Mollitia odit pariatur saepe a atque repellendus? Labore sapiente eum fugit officia magni optio ea aut quia inventore! Sequi, harum? Dolor amet quam nihil excepturi distinctio, recusandae, ducimus quasi, soluta deleniti qui aliquid! Expedita quisquam quos repellat odit labore consequuntur commodi possimus mollitia incidunt nulla, magni esse voluptatum assumenda cum quam laudantium debitis eius veniam ipsum illum perferendis.
                    </Tabs.TabPane>
                  </Tabs>

                </Space.TopResizable>

                <Space.Fill scrollable={true} style={{ padding: 15 }}>

                  <Tabs defaultActiveKey="1">
                    <Tabs.TabPane tab="Tab 1" key="1">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae pariatur reiciendis officia magni ipsa suscipit! Laboriosam, ex voluptas. Perspiciatis et harum placeat dignissimos magnam neque in molestias adipisci obcaecati ipsum! Laboriosam aperiam hic veniam dicta nemo sapiente fugiat tempore maxime at consequatur voluptates, perferendis iure quaerat sequi aliquam quas deleniti officiis, quam pariatur in. Corporis incidunt repudiandae voluptatibus praesentium vitae alias, veniam ea quis dolor, iure officiis deserunt ab libero voluptatem dignissimos similique nam excepturi nisi perferendis temporibus. Officia, laudantium! Qui aliquam voluptatibus deleniti nostrum enim reprehenderit sapiente quam ducimus beatae quaerat laborum facere cum alias dignissimos, aliquid iusto accusamus voluptatum adipisci hic sint voluptas omnis provident. Libero alias quasi aliquam ipsum eveniet ipsa voluptates, doloremque tempora neque nihil magnam explicabo dignissimos atque, placeat magni necessitatibus vitae voluptatum? Tenetur praesentium nisi atque ea iusto nesciunt consectetur, quod eveniet, modi adipisci expedita. Accusamus nihil temporibus mollitia facilis voluptatibus architecto. Accusantium veniam ratione dolorem totam, illo deserunt porro provident, adipisci culpa voluptatibus, ab rem quos cupiditate dolor! Harum voluptatem ex sed temporibus quas maiores, cumque deleniti, nihil, sint molestias ad magni maxime perferendis accusantium debitis nulla. Quisquam sunt eum eaque repellendus cupiditate architecto in ex corporis corrupti consequuntur possimus nisi doloribus facere deleniti, tempora nam nobis repellat amet iusto dolor dolorem enim ullam! Perspiciatis eaque eum saepe aut nihil adipisci nisi modi nostrum distinctio quidem! Iste eius modi dolorum hic enim laborum praesentium. Magnam, incidunt reprehenderit fugit facilis maxime, voluptatem non possimus placeat iste voluptate dolorem fuga necessitatibus temporibus sint itaque neque illum. Consequatur consequuntur ipsam, corrupti unde eius amet pariatur sint hic nisi aliquid dolorem quasi doloremque quam, obcaecati eligendi error nesciunt accusamus, asperiores veniam minus! Cumque impedit voluptate quibusdam corporis non eligendi et inventore aliquid! Fugit nesciunt repellendus repellat esse, quibusdam nulla officia nam recusandae doloribus minus labore suscipit itaque ad consequatur quae debitis atque, quasi fugiat ratione magnam quis! Repellat animi laudantium nemo impedit reiciendis cum molestias est numquam dolores, dolorem autem corrupti id, accusantium rem ab optio pariatur? Iure deleniti consequuntur aut, necessitatibus, enim error, amet quod asperiores repellat eius inventore ad magni vel! Nobis tempora quos dolor repudiandae. In consectetur cum natus blanditiis. Praesentium unde sapiente ipsa at assumenda? Tempora corrupti unde ducimus culpa eius nostrum. A, sit sunt earum doloribus voluptates quia est ullam illum voluptatem unde, porro impedit rem hic. Sit ipsa necessitatibus aspernatur tempore porro reprehenderit aliquam architecto iste ea magnam ex quam nihil nostrum asperiores illo beatae, labore nisi aliquid inventore. Mollitia odit pariatur saepe a atque repellendus? Labore sapiente eum fugit officia magni optio ea aut quia inventore! Sequi, harum? Dolor amet quam nihil excepturi distinctio, recusandae, ducimus quasi, soluta deleniti qui aliquid! Expedita quisquam quos repellat odit labore consequuntur commodi possimus mollitia incidunt nulla, magni esse voluptatum assumenda cum quam laudantium debitis eius veniam ipsum illum perferendis, sint distinctio officiis. Eveniet adipisci doloribus aspernatur, iure similique repudiandae quo, reiciendis harum voluptas sint eligendi? Deleniti eos asperiores porro quidem, a iusto cumque ab praesentium voluptas velit quod, dolorum, sequi non veritatis. Excepturi dolore dolorum distinctio ipsum porro omnis cupiditate doloremque maiores vero? Inventore mollitia odio vitae expedita harum magnam, aspernatur officiis doloribus error minus dolorum praesentium fugit earum dolorem itaque deserunt nulla! Illo quos dolorum iusto fuga impedit magni quas qui excepturi ratione commodi? Nesciunt quos natus distinctio illo, omnis architecto molestias in, consectetur provident earum ipsum voluptates voluptatum explicabo esse nam cum sequi veritatis amet exercitationem rem repellendus obcaecati neque nobis quis. Commodi asperiores vitae dolores molestiae molestias, labore eius sint corrupti blanditiis quas. Fugiat, non odio maxime quam eligendi velit reprehenderit obcaecati optio et voluptas ratione est ex maiores! Libero explicabo quaerat cumque nihil consequatur voluptates in distinctio odit animi maiores eaque, corrupti quo repudiandae, temporibus, omnis suscipit nesciunt asperiores debitis nostrum aliquam commodi. Ducimus vero molestias nulla sunt ad qui officiis molestiae animi mollitia praesentium architecto consequuntur asperiores illo, rem nisi quidem quae esse minus ea sit cum laboriosam modi corrupti impedit. Ut, hic, recusandae quia alias porro dolorum vel sit rem tempore excepturi reiciendis consequatur necessitatibus, ipsa dolores maxime placeat. Numquam dolores ut nam, voluptatibus, earum dolor velit labore quis ipsa esse eligendi et id? Eum ratione tempore laborum nihil beatae voluptate minima qui repellat quo, delectus alias reprehenderit excepturi facilis vero rem temporibus quam voluptas velit! Temporibus odio fuga eos quasi eligendi rem excepturi dignissimos officiis magnam minus deserunt quis laborum mollitia quaerat earum et, voluptates veritatis recusandae ducimus amet non ad aliquam laudantium? Cumque eos fugiat quasi porro, pariatur dolore vitae beatae repellat rerum voluptatibus, sed aut eum quas. Repudiandae corporis ad veritatis similique doloremque praesentium esse dolorum atque odio explicabo dicta architecto reiciendis incidunt voluptates veniam, reprehenderit sed possimus nulla. Ullam obcaecati quas, sapiente illum unde aspernatur iste magni neque rem quis non laborum voluptas doloribus tempora exercitationem sed modi rerum iure quae, atque ut. Magni doloremque velit ea odit commodi quidem quos, cumque dignissimos exercitationem cum laborum possimus sapiente porro excepturi consectetur, deleniti doloribus animi ad iusto. Odit quaerat iure optio harum labore? Commodi natus ea autem at similique voluptatum dolore temporibus neque quod necessitatibus officia ipsa quidem vitae, eligendi non excepturi illo corporis, itaque nulla! Perferendis eligendi expedita ea repellendus, sapiente, consequatur voluptates laborum perspiciatis laboriosam voluptatem a accusantium maxime quidem. Voluptatum ipsam dolores illum magnam quisquam placeat atque cum, nulla quod autem nisi dolorum exercitationem! Earum aspernatur nulla unde quisquam aliquam delectus facere esse eos soluta accusantium ullam iure, autem sapiente totam praesentium accusamus. Autem vero doloremque facilis, laborum consequuntur voluptatibus? Cum deleniti assumenda nihil nemo impedit eligendi sint corporis, necessitatibus quisquam asperiores sequi voluptatum veritatis nulla est dignissimos alias eos officia voluptatibus velit nam repellendus tempora maiores voluptas repudiandae. Quis fugit quo, explicabo eligendi, exercitationem qui voluptatum quisquam corporis harum beatae sit? Nulla qui maxime fuga repellat doloremque esse illum repellendus inventore, minima fugiat molestias numquam dolores id est voluptatem cupiditate rem eos deserunt expedita! Voluptatum, suscipit fuga et odit ab voluptate rem officia quidem repudiandae eligendi! Minima ullam aut temporibus iure, aperiam unde in illum velit quam atque facilis provident?
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Tab 2" key="2">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae pariatur reiciendis officia magni ipsa suscipit! Laboriosam, ex voluptas. Perspiciatis et harum placeat dignissimos magnam neque in molestias adipisci obcaecati ipsum! Laboriosam aperiam hic veniam dicta nemo sapiente fugiat tempore maxime at consequatur voluptates, perferendis iure quaerat sequi aliquam quas deleniti officiis, quam pariatur in. Corporis incidunt repudiandae voluptatibus praesentium vitae alias, veniam ea quis dolor, iure officiis deserunt ab libero voluptatem dignissimos similique nam excepturi nisi perferendis temporibus. Officia, laudantium! Qui aliquam voluptatibus deleniti nostrum enim reprehenderit sapiente quam ducimus beatae quaerat laborum facere cum alias dignissimos, aliquid iusto accusamus voluptatum adipisci hic sint voluptas omnis provident. Libero alias quasi aliquam ipsum eveniet ipsa voluptates, doloremque tempora neque nihil magnam explicabo dignissimos atque, placeat magni necessitatibus vitae voluptatum? Tenetur praesentium nisi atque ea iusto nesciunt consectetur, quod eveniet, modi adipisci expedita. Accusamus nihil temporibus mollitia facilis voluptatibus architecto. Accusantium veniam ratione dolorem totam, illo deserunt porro provident, adipisci culpa voluptatibus, ab rem quos cupiditate dolor! Harum voluptatem ex sed temporibus quas maiores, cumque deleniti, nihil, sint molestias ad magni maxime perferendis accusantium debitis nulla. Quisquam sunt eum eaque repellendus cupiditate architecto in ex corporis corrupti consequuntur possimus nisi doloribus facere deleniti, tempora nam nobis repellat amet iusto dolor dolorem enim ullam! Perspiciatis eaque eum saepe aut nihil adipisci nisi modi nostrum distinctio quidem! Iste eius modi dolorum hic enim laborum praesentium. Magnam, incidunt reprehenderit fugit facilis maxime, voluptatem non possimus placeat iste voluptate dolorem fuga necessitatibus temporibus sint itaque neque illum. Consequatur consequuntur ipsam, corrupti unde eius amet pariatur sint hic nisi aliquid dolorem quasi doloremque quam, obcaecati eligendi error nesciunt accusamus, asperiores veniam minus! Cumque impedit voluptate quibusdam corporis non eligendi et inventore aliquid! Fugit nesciunt repellendus repellat esse, quibusdam nulla officia nam recusandae doloribus minus labore suscipit itaque ad consequatur quae debitis atque, quasi fugiat ratione magnam quis! Repellat animi laudantium nemo impedit reiciendis cum molestias est numquam dolores, dolorem autem corrupti id, accusantium rem ab optio pariatur? Iure deleniti consequuntur aut, necessitatibus, enim error, amet quod asperiores repellat eius inventore ad magni vel! Nobis tempora quos dolor repudiandae. In consectetur cum natus blanditiis. Praesentium unde sapiente ipsa at assumenda? Tempora corrupti unde ducimus culpa eius nostrum. A, sit sunt earum doloribus voluptates quia est ullam illum voluptatem unde, porro impedit rem hic. Sit ipsa necessitatibus aspernatur tempore porro reprehenderit aliquam architecto iste ea magnam ex quam nihil nostrum asperiores illo beatae, labore nisi aliquid inventore. Mollitia odit pariatur saepe a atque repellendus? Labore sapiente eum fugit officia magni optio ea aut quia inventore! Sequi, harum? Dolor amet quam nihil excepturi distinctio, recusandae, ducimus quasi, soluta deleniti qui aliquid! Expedita quisquam quos repellat odit labore consequuntur commodi possimus mollitia incidunt nulla, magni esse voluptatum assumenda cum quam laudantium debitis eius veniam ipsum illum perferendis.
                    </Tabs.TabPane>
                  </Tabs>
                  
                </Space.Fill>

              </Space.Fill>
            
            </Space.Fill>

          </Space.Fill>

      </Space.Fixed>

      </div>
    </div>
  );
}

export default App;
