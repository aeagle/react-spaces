import * as React from 'react';
import * as Space from 'react-spaces';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { Tabs } from 'antd';
import { Description } from './Docs';

export const Resizable = () => {
	return (
		<>
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
				"    <Space.LeftResizable size=\"20%\" minimumSize={50} maximumSize={150} />\r\n" +
				"    <Space.Fill />\r\n" +
				"    <Space.RightResizable size=\"20%\" minimumSize={50} maximumSize={150} />\r\n" +
				"  </Space.Fixed>\r\n" +
				")"
			  }
			</SyntaxHighlighter>

			<Space.Fixed height={400}>
			  <Space.LeftResizable trackSize={true} size="20%" minimumSize={50} maximumSize={150} style={{ backgroundColor: '#e0eee0' }}>
					{Description("Left", "L")}
			  </Space.LeftResizable>
				<Space.Fill>
					<Space.TopResizable trackSize={true} size="20%" minimumSize={50} maximumSize={150} style={{ backgroundColor: '#e0eeee' }}>
						{Description("Top", "T")}
					</Space.TopResizable>
					<Space.Fill trackSize={true} style={{ backgroundColor: '#eee0e0' }}>
						{Description("Fill", "F")}
					</Space.Fill>
					<Space.BottomResizable trackSize={true} size="20%" minimumSize={50} maximumSize={150} style={{ backgroundColor: '#e0eeee' }}>
						{Description("Bottom", "B")}
					</Space.BottomResizable>
				</Space.Fill>
			  <Space.RightResizable trackSize={true} size="20%" minimumSize={50} maximumSize={150} style={{ backgroundColor: '#e0eee0' }}>
					{Description("Right", "R")}
			  </Space.RightResizable>
			</Space.Fixed>

		  </Tabs.TabPane>
		</Tabs>	

		<h3>Extra properties</h3>

		<table>
			<thead>
				<tr>
					<th>Property</th>
					<th>Description</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td><strong>minimumSize</strong></td>
					<td>
			  			Optionally sets the minimum size the space can be resized to in pixels. 
					</td>
				</tr>
				<tr>
					<td><strong>maximumSize</strong></td>
					<td>
			  			Optionally sets the mazimum size the space can be resized to in pixels. 
					</td>
				</tr>
				<tr>
					<td><strong>overlayHandle</strong></td>
					<td>
			  			By default, the resize handle is overlayed on top of the spaces content. This might cause issues if a clickable element
						sits underneath the resize handle. You can optionally set this to <strong>false</strong> to make the resize handle sit
						next to the space content.
					</td>
				</tr>
			</tbody>
		</table>

		</>	
	)
}