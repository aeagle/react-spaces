import * as React from 'react';
import * as Space from 'react-spaces';
import 'antd/dist/antd.css';
import './UI.scss';
import MonacoEditor from 'react-monaco-editor';
import { CenterType } from 'react-spaces';

export const UI = () => {
	return (
		<div className="ui-demo">
			<Space.ViewPort>
				<Header />
				<Main />
			</Space.ViewPort>
		</div>
	)
}

const Header = () => {
	return (
		<Space.Top className="title-bar" centerContent={CenterType.HorizontalVertical} size={30} style={{ backgroundColor: '#333', color: '#c5c5c5' }}>
			<Space.Left className="menu-bar">

			</Space.Left>
			UI Demo - Example UI interface
		</Space.Top>
	)
}

const Main = () => {
	return (
		<Space.Fill style={{ backgroundColor: '#1E1E1E' }}>
			<Space.Fill>
				<IconPane />
				<SideBar />
				<Editor />
			</Space.Fill>
		</Space.Fill>
	)
}

const Editor = () => {
	const [ code, setCode ] = React.useState('import * as React from \'react\';\r\nimport * as Space from \'react-spaces\';\r\n\r\nexport const App = () => {\r\n    <Space.ViewPort>\r\n        <Space.Top size={30}>\r\n            Hello!\r\n        </Space.Top>\r\n        <Space.Fill>\r\n            World!\r\n        </Space.Fill>\r\n    </Space.ViewPort>\r\n}');

    const options = {
		selectOnLineNumbers: true,
		automaticLayout: true
	};

	return  (
		<Space.Fill>
			<Space.Fill>
				<Space.Top className="editor-tabs" size={40}>
				</Space.Top>
				<Space.Fill className="editor-main">
					<MonacoEditor
						value={code} 
						onChange={(newValue: string) => setCode(newValue)} 
						options={options}
						language="javascript" 
						theme="vs-dark" />
				</Space.Fill>
			</Space.Fill>
			<BottomPane />
		</Space.Fill>
	)
}

const IconPane = () => {
	return (
		<Space.Left order={1} className="side-bar-icons" size={50} style={{ backgroundColor: '#333' }}>
		</Space.Left>
	)
}

const SideBar = () => {
	return (
		<Space.LeftResizable order={2} className="side-bar" size={300} handleSize={2} overlayHandle={false} style={{ backgroundColor: '#252526' }}>
			<SideBarPane order={1} title="Open editors" height={200}>

			</SideBarPane>
			<SideBarPane order={2} title="Demo" height={300}>
				
			</SideBarPane>
			<SideBarPane fill={true} title="Outline">
				
			</SideBarPane>
		</Space.LeftResizable>
	)
}

const SideBarPane: React.FC<{ order?: number, title: string, height?: number, fill?: boolean }> = (props) => {
	return (
		props.fill ?
			<Space.Fill className="sidebar-pane">
				<SideBarPaneInner title={props.title}>{props.children}</SideBarPaneInner>
			</Space.Fill>
			:
			<Space.TopResizable className="sidebar-pane" order={props.order} size={props.height}>
				<SideBarPaneInner title={props.title}>{props.children}</SideBarPaneInner>
			</Space.TopResizable>
	)
}

const SideBarPaneInner: React.FC<{ title: string }> = (props) => {
	return (
		<>
			<Space.Top className="title" size={28} style={{ backgroundColor: '#383838', color: '#c5c5c5' }}>
				<Space.CenteredVertically>
					{props.title}
				</Space.CenteredVertically>
			</Space.Top>
			<Space.Fill className="content">
				{props.children}
			</Space.Fill>
		</>
	)
}

const BottomPane = () => {
	return (
		<Space.BottomResizable className="bottom-pane" size="25%" handleSize={2}>
		</Space.BottomResizable>
	)
}