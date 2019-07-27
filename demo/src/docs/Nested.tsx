import * as React from 'react';
import * as Space from 'react-spaces';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { Tabs } from 'antd';
import { Description } from './Docs';

export const Nested = () => {
	return (
		<>
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
		</>
	)
}