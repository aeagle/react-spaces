import * as React from 'react';
import * as Space from 'react-spaces';
import { Menu, Spin } from 'antd';
import './Scrollable.scss';

export const ScrollableDemo = () => {
	const [ selectedKey, setSelectedKey ] = React.useState('1');
	const [ html, setHtml ] = React.useState('');
	const [ loading, setLoading ] = React.useState(true);
	const [ sidebarSize, setSidebarSize] = React.useState(250);

	React.useEffect(() => {
		(async () => {
			setLoading(true);
			const response = await fetch('https://baconipsum.com/api/?type=all-meat&paras=20&start-with-lorem=1&format=html');
			setHtml(await response.text());
			setLoading(false);
		})();
	}, [selectedKey]);

	return (
	<Space.Fill as="main" className="scrollable-demo">
		<Space.Top as="header" size={50} centerContent={Space.CenterType.Vertical}>
			Header
		</Space.Top>
		<Space.Fill as="section">
			<Space.LeftResizable as="aside" size={sidebarSize} onResizeEnd={(newSize) => { setSidebarSize(newSize);}} handleSize={30}>
				<Menu defaultSelectedKeys={[ selectedKey ]} onSelect={e => setSelectedKey(e.key)}>
					<Menu.Item key="1">Menu item 1</Menu.Item>
					<Menu.Item key="2">Menu item 2</Menu.Item>
					<Menu.Item key="3">Menu item 3</Menu.Item>
				</Menu>
			</Space.LeftResizable>
			<Space.Fill as="article" scrollable={true}>
				{
					loading ? 
						<Space.Centered><Spin size="large" /><br />Loading stuff</Space.Centered> :
						<div>
							<h2>Some heading</h2>
							<div dangerouslySetInnerHTML={{ __html: html }} />
						</div>
				}
			</Space.Fill>
		</Space.Fill>
	</Space.Fill>
	)
}