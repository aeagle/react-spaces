import * as React from 'react';
import * as Space from 'react-spaces';
import 'antd/dist/antd.css';
import './UI.scss';

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

const Header: React.FC = (props) => {
	return (
		<Space.Top className="title-bar" size={30} style={{ backgroundColor: '#333', color: '#c5c5c5' }}>
			<Space.Centered>
				<Space.Left className="menu-bar">

				</Space.Left>
				UI Demo - Example UI interface
			</Space.Centered>
		</Space.Top>
	)
}

const Main: React.FC = (props) => {
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

const Editor: React.FC = (props) => {
	return  (
		<Space.Fill>
			<Space.Fill>
				<Space.Top className="tabs" size={40}>

				</Space.Top>
				<Space.Fill className="main" scrollable={true}>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae soluta, repudiandae provident, maiores fugiat deleniti qui quidem quia perferendis aperiam vel itaque nostrum unde illo odit, molestiae consequatur quod culpa! Quo aut molestias, et officia inventore labore excepturi explicabo quis, dolore, reprehenderit dignissimos voluptates eligendi pariatur cupiditate expedita nihil quia doloremque praesentium nostrum eos. Exercitationem, natus quisquam delectus et, laboriosam voluptas perferendis culpa incidunt, cum blanditiis sint suscipit reprehenderit? Dolore laudantium pariatur quod maxime similique tempora recusandae voluptate aut veniam aliquam debitis magnam provident, vero repellendus perferendis labore esse quos animi enim porro quam nobis. Tenetur voluptas voluptates ut dolorum beatae dolore pariatur nesciunt quisquam dolor error! Aspernatur, adipisci! Vero consequatur aspernatur, odit modi fugit placeat? Quam, hic necessitatibus natus aut aperiam officiis error eligendi provident, perspiciatis deleniti placeat repellendus obcaecati nulla at fugit molestiae dicta optio neque officia laboriosam, temporibus itaque quae. Optio tenetur molestiae laborum iste quasi nesciunt minus voluptatum eveniet voluptates neque nobis pariatur at ipsa rem deleniti, qui necessitatibus praesentium itaque. Explicabo incidunt id eligendi quod alias consectetur repellat! Nisi est veniam minus vel perferendis natus totam, doloribus quidem repudiandae! Corporis, sint non eligendi neque vero at, dolores reiciendis officia voluptas eaque saepe nostrum sapiente obcaecati delectus voluptates pariatur nemo sed quis quo, eum perferendis illum? Non repudiandae culpa at voluptatibus corrupti qui, quae consequuntur itaque, minus deserunt maxime sed. Voluptates culpa vel delectus. 
				</Space.Fill>
			</Space.Fill>
			<BottomPane />
		</Space.Fill>
	)
}

const IconPane: React.FC = (props) => {
	return (
		<Space.Left order={1} className="side-bar-icons" size={50} style={{ backgroundColor: '#333' }}>

		</Space.Left>
	)
}

const SideBar: React.FC = (props) => {
	return (
		<Space.LeftResizable order={2} className="side-bar" size={300} style={{ backgroundColor: '#252526' }}>
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

const BottomPane: React.FC = (props) => {
	return (
		<Space.BottomResizable className="bottom-pane" size={300}>
		</Space.BottomResizable>
	)
}