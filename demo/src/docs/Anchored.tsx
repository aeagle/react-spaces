import * as React from 'react';
import * as Space from 'react-spaces';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { Tabs } from 'antd';
import { Description } from './Docs';

export const Anchored = () => {
	return (
		<>
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
		</>
	)
}