import * as React from 'react';
import * as Space from 'react-spaces';
import 'antd/dist/antd.css';
import './UI.scss';
import { CodeEditor } from './CodeEditor';
import { Resizable } from './Resizable';
import { ResizableScrollable } from './ResizableScrollable';
import { ScrollableDemo } from './Scrollable';
import { LayersDemo } from './Layers';
import { WindowsDemo } from './Windows';
import { Pinnable } from './Pinnable';

export const UI = () => {
	const [ selectedDemo, setSelectedDemo ] = React.useState("resizable");
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
	selectedDemo: string, 
	setSelectedDemo: (demo: string) => void,
	showSpaces: boolean,
	setShowSpaces: (state: boolean) => void }) => {

	return (
		props.sidebarVisible ?
			<Space.LeftResizable as="aside" id="ui-list" className="ui-list" size={300} minimumSize={150} style={{ backgroundColor: '#193549' }} handleSize={30}>
				<Space.Fill scrollable={true}>
					<ul>
						<li className={props.selectedDemo === "resizable" ? "active" : undefined}>
							<a onClick={() => props.setSelectedDemo("resizable")}>
								Nested / resizable spaces
								<span>
									Example with nested and resizable spaces
								</span>
							</a>
						</li>
						<li className={props.selectedDemo === "resizablescrollable" ? "active" : undefined}>
							<a onClick={() => props.setSelectedDemo("resizablescrollable")}>
								Resizable / Scrollable
								<span>
									Resizable and scrollable spaces
								</span>
							</a>
						</li>
						<li className={props.selectedDemo === "scrollable" ? "active" : undefined}>
							<a onClick={() => props.setSelectedDemo("scrollable")}>
								Sidebar / header layout
								<span>
									antd components with a header, sidebar and scrollable main layout
								</span>
							</a>
						</li>
						<li className={props.selectedDemo === "layers" ? "active" : undefined}>
							<a onClick={() => props.setSelectedDemo("layers")}>
								Layers
								<span>
									Layered spaces demonstrating hover interaction to create drawer like
									elements
								</span>
							</a>
						</li>
						<li className={props.selectedDemo === "windows" ? "active" : undefined}>
							<a onClick={() => props.setSelectedDemo("windows")}>
								Windows
								<span>
									Positioned spaces used to create resizable / draggable floating windows
								</span>
							</a>
						</li>
						<li className={props.selectedDemo === "codeeditor" ? "active" : undefined}>
							<a onClick={() => props.setSelectedDemo("codeeditor" )}>
								Code editor
								<span>
									A code editor interface with docked panels, menu bars and tabs
								</span>
							</a>
						</li>
						<li className={props.selectedDemo === "pinnable" ? "active" : undefined}>
							<a onClick={() => props.setSelectedDemo("pinnable" )}>
								Pinnable
								<span>
									Pinnable anchored spaces using a combination of layers and
									anchored spaces.
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

const Main = (props: { selectedDemo: string, showSpaces: boolean }) => {
	return (
		<Space.Fill>
			{ props.selectedDemo === "resizable" ? <Resizable /> : null }
			{ props.selectedDemo === "resizablescrollable" ? <ResizableScrollable /> : null }
			{ props.selectedDemo === "scrollable" ? <ScrollableDemo /> : null }
			{ props.selectedDemo === "layers" ? <LayersDemo /> : null }
			{ props.selectedDemo === "windows" ? <WindowsDemo /> : null }
			{ props.selectedDemo === "codeeditor" ? <CodeEditor /> : null }
			{ props.selectedDemo === "pinnable" ? <Pinnable /> : null }
		</Space.Fill>
	)
}