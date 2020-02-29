import * as React from "react";
import * as Space from "react-spaces";
import "./Windows.scss";
import { Button } from "antd";

interface IWindow {
	id: number;
}

export const WindowsDemo = () => {
	const [windows, setWindows] = React.useState<IWindow[]>([]);

	const addWindow = () => {
		setWindows((prev) => [...prev, { id: prev.length + 1 }]);
	};

	const bringToFront = (window: IWindow) => {
		setWindows((prev) => [...prev.filter((w) => w.id !== window.id), window]);
	};

	return (
		<Space.Fill className="windows-demo">
			<Space.Top size={40} centerContent={Space.CenterType.HorizontalVertical}>
				<Button onClick={addWindow}>Add window</Button>
			</Space.Top>
			<Space.Fill className="desktop">
				{windows.map((w, idx) => (
					<Window window={w} key={idx} zIndex={idx} onClick={bringToFront} />
				))}
			</Space.Fill>
		</Space.Fill>
	);
};

interface IWindowProps {
	window: IWindow;
	zIndex?: number;
	onClick?: (window: IWindow) => void;
}

const Window: React.FC<IWindowProps> = (props) => {
	return (
		<Space.Positioned
			className="window"
			onClick={() => props.onClick && props.onClick(props.window)}
			zIndex={props.zIndex}
			left={"25%"}
			top={"25%"}
			width={"50%"}
			height={"50%"}>
			<WindowInner onClick={() => props.onClick && props.onClick(props.window)} />
		</Space.Positioned>
	);
};

const WindowInner: React.FC<{ onClick?: () => void }> = (props) => {
	const parentSpace = Space.useParentSpace();

	return (
		<>
			<Space.Top
				className="title-bar"
				onMouseDown={(e) => {
					props.onClick && props.onClick();
					parentSpace.startMouseDrag(e);
				}}
				size={40}>
				{Description(`Window title`)}
			</Space.Top>
			<Space.Fill className="content" centerContent={Space.CenterType.HorizontalVertical}>
				{Description(`Window content`)}
			</Space.Fill>
		</>
	);
};

const Description = (props: string) => (
	<Space.Centered>
		<div className="description">
			<strong>{props}</strong>
		</div>
	</Space.Centered>
);
