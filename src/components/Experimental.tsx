import * as React from "react";
import "../styles.css";
import { SizeUnit, Type, Anchor, ICommonProps, ISpaceProps } from "../core-types";
import { LayerContext, useSpace, ParentContext, DOMRectContext } from "../core-react";

interface IFixedProps extends ICommonProps {
	width?: SizeUnit;
	height: SizeUnit;
}

export const Fixed: React.FC<IFixedProps> = ({ width, height, children, ...commonProps }) => (
	<Space {...commonProps} type={Type.Fixed} position={{ width: width, height: height }}>
		{children}
	</Space>
);

interface IViewPortProps extends ICommonProps {
	left?: SizeUnit;
	right?: SizeUnit;
	top?: SizeUnit;
	bottom?: SizeUnit;
}

export const ViewPort: React.FC<IViewPortProps> = ({ left, top, right, bottom, children, ...commonProps }) => (
	<Space {...commonProps} type={Type.ViewPort} position={{ left: left || 0, top: top || 0, right: right || 0, bottom: bottom || 0 }}>
		{children}
	</Space>
);

interface IAnchorProps extends ICommonProps {
	id?: string;
	size: SizeUnit;
	order?: number;
	resizable?: boolean;
}

export const LeftResizable: React.FC<Omit<IAnchorProps, "resizable">> = ({ children, ...props }) => (
	<Left {...props} resizable={true}>
		{children}
	</Left>
);

export const Left: React.FC<IAnchorProps> = ({ size, children, resizable, ...commonProps }) => (
	<Space
		{...commonProps}
		type={Type.Anchored}
		anchor={Anchor.Left}
		position={{ left: 0, top: 0, bottom: 0, rightResizable: resizable, width: size }}>
		{children}
	</Space>
);

export const TopResizable: React.FC<Omit<IAnchorProps, "resizable">> = ({ children, ...props }) => (
	<Top {...props} resizable={true}>
		{children}
	</Top>
);

export const Top: React.FC<IAnchorProps> = ({ size, children, resizable, ...commonProps }) => (
	<Space
		{...commonProps}
		type={Type.Anchored}
		anchor={Anchor.Top}
		position={{ left: 0, top: 0, right: 0, bottomResizable: resizable, height: size }}>
		{children}
	</Space>
);

export const RightResizable: React.FC<Omit<IAnchorProps, "resizable">> = ({ children, ...props }) => (
	<Right {...props} resizable={true}>
		{children}
	</Right>
);

export const Right: React.FC<IAnchorProps> = ({ size, children, resizable, ...commonProps }) => (
	<Space
		{...commonProps}
		type={Type.Anchored}
		anchor={Anchor.Right}
		position={{ bottom: 0, top: 0, right: 0, leftResizable: resizable, width: size }}>
		{children}
	</Space>
);

export const BottomResizable: React.FC<Omit<IAnchorProps, "resizable">> = ({ children, ...props }) => (
	<Bottom {...props} resizable={true}>
		{children}
	</Bottom>
);

export const Bottom: React.FC<IAnchorProps> = ({ size, children, resizable, ...commonProps }) => (
	<Space
		{...commonProps}
		type={Type.Anchored}
		anchor={Anchor.Bottom}
		position={{ bottom: 0, left: 0, right: 0, topResizable: resizable, height: size }}>
		{children}
	</Space>
);

export const Fill: React.FC<ICommonProps> = (props) => (
	<Space {...props} type={Type.Fill} position={{ left: 0, top: 0, right: 0, bottom: 0 }}>
		{props.children}
	</Space>
);

export const Centered: React.FC = (props) => <div className={`spaces-centered`}>{props.children}</div>;

export const CenteredVertically: React.FC = (props) => <div className={`spaces-centered-vertically`}>{props.children}</div>;

export const Layer: React.FC<{ zIndex: number }> = (props) => <LayerContext.Provider value={props.zIndex}>{props.children}</LayerContext.Provider>;

const Space: React.FC<ISpaceProps> = (props) => {
	const { style, className, onClick } = props;
	let { children } = props;
	const { space, domRect, elementRef, resizeHandles } = useSpace(props);

	if (props.centerContent === "vertical") {
		children = <CenteredVertically>{children}</CenteredVertically>;
	} else if (props.centerContent === "horizontalVertical") {
		children = <Centered>{children}</Centered>;
	}

	return (
		<>
			{React.createElement(
				props.as || "div",
				{
					id: space.id,
					ref: elementRef,
					style: style,
					className: `spaces-space${className ? ` ${className}` : ""}${space.children.find((s) => s.resizing) ? " spaces-resizing" : ""}`,
					onClick: onClick,
				},
				<ParentContext.Provider value={space.id}>
					<LayerContext.Provider value={undefined}>
						{resizeHandles.map((r) => r)}
						<DOMRectContext.Provider value={domRect}>{children}</DOMRectContext.Provider>
					</LayerContext.Provider>
				</ParentContext.Provider>,
			)}
		</>
	);
};

interface ISpaceInfoProps {
	children: (info: DOMRect) => JSX.Element;
}

export const Info: React.FC<ISpaceInfoProps> = (props) => {
	const domRect = React.useContext(DOMRectContext);

	if (domRect) {
		return props.children(domRect);
	}

	return props.children({ left: 0, top: 0, right: 0, bottom: 0, width: 0, height: 0, x: 0, y: 0, toJSON: () => "" });
};
