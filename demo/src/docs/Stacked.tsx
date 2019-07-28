import * as React from 'react';
import * as Space from 'react-spaces';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { Description } from './Docs';
import { Tabs } from 'antd';

export const Stacked = () => {
	return (
		<>
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
		</>
	)
}