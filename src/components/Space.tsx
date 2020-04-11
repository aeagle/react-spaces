import * as React from "react";
import {
	IPublicProps,
	IAnchoredProps,
	AnchorType,
	IResizableProps,
	AllProps,
	IPositionedProps,
	CenterType,
	publicProps,
	anchoredProps,
	resizableProps,
	positionedProps,
	allProps,
	ResizeType,
	AnchorToResizeTypeMap,
} from "../types";
import { SpaceContext, SpaceInfoContext } from "./Contexts";
import { CenteredVertically, Centered } from "./Centered";
import { useSpace } from "../hooks/useSpace";
import { HeadStyles } from "./HeadStyles";
import { ResizeHandle } from "./ResizeHandle";
import "../styles.css";

export const Fill: React.FC<IPublicProps> = (props) => <SpaceInternal {...props} isPositioned={false} />;
Fill.propTypes = publicProps;

export const Top: React.FC<IPublicProps & IAnchoredProps> = (props) => (
	<SpaceInternal {...props} isPositioned={false} anchor={AnchorType.Top} anchorSize={props.size} />
);
Top.propTypes = { ...publicProps, ...anchoredProps };

export const Left: React.FC<IPublicProps & IAnchoredProps> = (props) => (
	<SpaceInternal {...props} isPositioned={false} anchor={AnchorType.Left} anchorSize={props.size} />
);
Left.propTypes = { ...publicProps, ...anchoredProps };

export const Bottom: React.FC<IPublicProps & IAnchoredProps> = (props) => (
	<SpaceInternal {...props} isPositioned={false} anchor={AnchorType.Bottom} anchorSize={props.size} />
);
Bottom.propTypes = { ...publicProps, ...anchoredProps };

export const Right: React.FC<IPublicProps & IAnchoredProps> = (props) => (
	<SpaceInternal {...props} isPositioned={false} anchor={AnchorType.Right} anchorSize={props.size} />
);
Right.propTypes = { ...publicProps, ...anchoredProps };

export const TopResizable: React.FC<IPublicProps & IAnchoredProps & IResizableProps> = (props) => (
	<SpaceInternal {...props} isPositioned={false} anchor={AnchorType.Top} anchorSize={props.size} resizable={true} />
);
TopResizable.propTypes = { ...publicProps, ...anchoredProps, ...resizableProps };

export const LeftResizable: React.FC<IPublicProps & IAnchoredProps & IResizableProps> = (props) => (
	<SpaceInternal {...props} isPositioned={false} anchor={AnchorType.Left} anchorSize={props.size} resizable={true} />
);
LeftResizable.propTypes = { ...publicProps, ...anchoredProps, ...resizableProps };

export const BottomResizable: React.FC<IPublicProps & IAnchoredProps & IResizableProps> = (props) => (
	<SpaceInternal {...props} isPositioned={false} anchor={AnchorType.Bottom} anchorSize={props.size} resizable={true} />
);
BottomResizable.propTypes = { ...publicProps, ...anchoredProps, ...resizableProps };

export const RightResizable: React.FC<IPublicProps & IAnchoredProps & IResizableProps> = (props) => (
	<SpaceInternal {...props} isPositioned={false} anchor={AnchorType.Right} anchorSize={props.size} resizable={true} />
);
RightResizable.propTypes = { ...publicProps, ...anchoredProps, ...resizableProps };

export const Positioned: React.FC<IPublicProps & IResizableProps & IPositionedProps> = (props) => <SpaceInternal {...props} isPositioned={true} />;
Positioned.propTypes = { ...publicProps, ...resizableProps, ...positionedProps };

export const Custom: React.FC<AllProps> = (props) => <SpaceInternal {...props} />;
Custom.propTypes = allProps;

const isResizable = (props: AllProps) => props.resizable && props.anchor;

export const SpaceInternal: React.FC<AllProps> = React.memo((props) => {
	const spaceElement = React.useRef<HTMLElement>();
	const { space, parentContext, currentContext, currentSize, resizing } = useSpace(props, spaceElement);

	const overlayHandle = props.overlayHandle !== undefined ? props.overlayHandle : true;
	const handleSize = props.handleSize === undefined ? 5 : props.handleSize;
	const resizeType: ResizeType | undefined = props.anchor ? AnchorToResizeTypeMap[props.anchor] : undefined;

	const innerStyle = {
		...props.style,
		...{
			left: resizeType === ResizeType.Left && !overlayHandle ? handleSize : undefined,
			top: resizeType === ResizeType.Top && !overlayHandle ? handleSize : undefined,
			right: resizeType === ResizeType.Right && !overlayHandle ? handleSize : undefined,
			bottom: resizeType === ResizeType.Bottom && !overlayHandle ? handleSize : undefined,
		},
	};

	const userClasses = props.className ? props.className.split(" ").map((c) => c.trim()) : [];

	const outerClasses = [
		...[
			"spaces-space",
			props.scrollable ? (isResizable(props) ? "scrollable" : "scrollable-a") : undefined,
			resizing ? "spaces-resizing" : undefined,
		],
		...(isResizable(props) && props.scrollable ? userClasses.map((c) => `${c}-container`) : userClasses),
	].filter((c) => c);

	const innerClasses = ["spaces-space-inner", ...userClasses].filter((c) => c);

	let children = props.children;

	if (props.centerContent === CenterType.Vertical) {
		children = <CenteredVertically>{children}</CenteredVertically>;
	} else if (props.centerContent === CenterType.HorizontalVertical) {
		children = <Centered>{children}</Centered>;
	}

	const passThroughEvents = {
		onMouseDown: props.onMouseDown,
		onMouseEnter: props.onMouseEnter,
		onMouseLeave: props.onMouseLeave,
		onMouseMove: props.onMouseMove,
		onTouchStart: props.onTouchStart,
		onTouchMove: props.onTouchMove,
		onTouchEnd: props.onTouchEnd,
		onClick: props.onClick,
		onDoubleClick: props.onDoubleClick,
	};

	return props.resizable && props.scrollable
		? React.createElement(
				props.as || "div",
				{
					...{
						id: space.id,
						ref: spaceElement,
						className: outerClasses.join(" "),
					},
					...passThroughEvents,
				},
				<>
					<HeadStyles spaces={currentContext.children} />
					<ResizeHandle
						resizable={props.resizable}
						anchor={props.anchor}
						parentContext={parentContext}
						space={space}
						spaceElement={spaceElement.current}
						minimumSize={props.minimumSize}
						maximumSize={props.maximumSize}
					/>
					<div className={innerClasses.join(" ")} style={innerStyle}>
						<SpaceContext.Provider value={currentContext}>
							<SpaceInfoContext.Provider value={{ width: Math.floor(currentSize.width), height: Math.floor(currentSize.height) }}>
								{children}
							</SpaceInfoContext.Provider>
						</SpaceContext.Provider>
					</div>
				</>,
		  )
		: React.createElement(
				props.as || "div",
				{
					...{
						id: space.id,
						ref: spaceElement,
						className: outerClasses.join(" "),
						style: innerStyle,
					},
					...passThroughEvents,
				},
				<>
					<HeadStyles spaces={currentContext.children} />
					<ResizeHandle
						resizable={props.resizable}
						anchor={props.anchor}
						parentContext={parentContext}
						space={space}
						spaceElement={spaceElement.current}
						minimumSize={props.minimumSize}
						maximumSize={props.maximumSize}
					/>
					<SpaceContext.Provider value={currentContext}>
						<SpaceInfoContext.Provider value={{ width: Math.floor(currentSize.width), height: Math.floor(currentSize.height) }}>
							{children}
						</SpaceInfoContext.Provider>
					</SpaceContext.Provider>
				</>,
		  );
});

SpaceInternal.propTypes = allProps;
