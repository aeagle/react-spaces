import * as React from 'react';
import * as Space from 'react-spaces';
import 'antd/dist/antd.css';
import './UI.scss';
import { CodeEditor } from './CodeEditor';
import { Resizable } from './Resizable';
import { ScrollableDemo } from './Scrollable';

export const UI = () => {
	const [ selectedDemo, setSelectedDemo ] = React.useState(1);
	const [ showSpaces, setShowSpaces ] = React.useState(false);
	const [ sidebarVisible, setSidebarVisible ] = React.useState(true);

	return (
			<Space.ViewPort className="ui-demo">
				<DemoSelection 
					sidebarVisible={sidebarVisible}
					setSidebarVisible={setSidebarVisible}
					selectedDemo={selectedDemo} 
					setSelectedDemo={setSelectedDemo}
					showSpaces={showSpaces}
					setShowSpaces={setShowSpaces} />
				<Main selectedDemo={selectedDemo} showSpaces={showSpaces} />
			</Space.ViewPort>
	)
}

const DemoSelection = (props: { 
	sidebarVisible: boolean,
	setSidebarVisible: (state: boolean) => void,
	selectedDemo: number, 
	setSelectedDemo: (demo: number) => void,
	showSpaces: boolean,
	setShowSpaces: (state: boolean) => void }) => {

	return (
		props.sidebarVisible ?
			<Space.LeftResizable className="ui-list" size={300} minimumSize={150} style={{ backgroundColor: '#193549' }}>
				<Space.Fill scrollable={true}>
					<ul>
						<li className={props.selectedDemo === 1 ? "active" : undefined}>
							<a onClick={() => props.setSelectedDemo(1)}>
								Nested / resizable spaces
								<span>
									Example with nested and resizable spaces
								</span>
							</a>
						</li>
						<li className={props.selectedDemo === 2 ? "active" : undefined}>
							<a onClick={() => props.setSelectedDemo(2)}>
								Sidebar / header layout
								<span>
									antd components with a header, sidebar and scrollable main layout
								</span>
							</a>
						</li>
						<li className={props.selectedDemo === 3 ? "active" : undefined}>
							<a onClick={() => props.setSelectedDemo(3)}>
								Code editor
								<span>
									A code editor interface with docked panels, menu bars and tabs
								</span>
							</a>
						</li>
					</ul>
				</Space.Fill>
				<Space.Bottom size={60} className="tools">
					<Space.Fill centerContent={Space.CenterType.Vertical}>
						{
							props.showSpaces ?
								<a title="Show space borders" onClick={() => props.setShowSpaces(!props.showSpaces)}>
									<i className="fa fa-eye-slash" />
									<span>Hide</span>
								</a> :
								<a title="Hide space borders" onClick={() => props.setShowSpaces(!props.showSpaces)}>
									<i className="fa fa-eye" />
									<span>Highlight</span>
								</a>
						}
						<a title="View code">
							<i className="fa fa-code" />
							<span>Code</span>
						</a>
					</Space.Fill>
					<Space.Right size={70} centerContent={Space.CenterType.Vertical}>
						<a title="View code" className="highlight" onClick={() => props.setSidebarVisible(!props.sidebarVisible)}>
							<i className="fa fa-arrow-left" />
							<span>Hide</span>
						</a>
					</Space.Right>
				</Space.Bottom>
			</Space.LeftResizable> :
			null
	)
}

const Main = (props: { selectedDemo: number, showSpaces: boolean }) => {
	return (
		<Space.Fill debug={props.showSpaces}>
			{ props.selectedDemo === 1 ? <Resizable /> : null }
			{ props.selectedDemo === 2 ? <ScrollableDemo /> : null }
			{ props.selectedDemo === 3 ? <CodeEditor /> : null }
		</Space.Fill>
	)
}