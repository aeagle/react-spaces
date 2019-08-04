import * as React from 'react';
import { Tabs } from 'antd';

export const Types = () => {
	return (
		<>
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
			
		<h3>Properties</h3>

		<table>
			<thead>
				<tr>
					<th>Property</th>
					<th>Description</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td><strong>as</strong></td>
					<td>
						By default React Spaces will render a div to the DOM. You can override the element rendered by setting this property
						with the element name, i.e. <strong>as="article"</strong> or <strong>as="aside"</strong>.
					</td>
				</tr>
				<tr>
					<td><strong>centerContent</strong></td>
					<td>
						Instead of using the <strong>&lt;Centered /&gt;</strong> or <strong>&lt;CenteredVertically /&gt;</strong> components inside space
						you can specify the centering type here. Possible values are <strong>"Vertical"</strong> or <strong>"HorizontalVertical"</strong>.
					</td>
				</tr>
				<tr>
					<td><strong>scrollable</strong></td>
					<td>
						Makes the space scrollable. By default content that overflows the space will be hidden. This will allow the space to add a scroll bar if
						the content overflows.
					</td>
				</tr>
				<tr>
					<td><strong>trackSize</strong></td>
					<td>
						Tells the space to report it's size when it changes size to the <strong>&lt;Info /&gt;</strong> component. With this turned off
						the space will only report the initial size.
					</td>
				</tr>
			</tbody>
		</table>

		</>
	)
}