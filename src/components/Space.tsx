import { CenterType, ResizeHandlePlacement, AnchorType, Type } from "../core-types";
import { useSpace, ParentContext, LayerContext, DOMRectContext, IReactSpaceInnerProps, useEffectOnce } from "../core-react";
import * as React from "react";
import { Centered } from "./Centered";
import { CenteredVertically } from "./CenteredVertically";
import { shortuuid } from "../core-utils";

function applyCentering(children: React.ReactNode, centerType: CenterType | undefined) {
	switch (centerType) {
		case CenterType.Vertical:
			return <CenteredVertically>{children}</CenteredVertically>;
		case CenterType.HorizontalVertical:
			return <Centered>{children}</Centered>;
	}
	return children;
}

export class Space extends React.Component<IReactSpaceInnerProps> {
	public render() {
		return <SpaceInner {...this.props} wrapperInstance={this} />;
	}
}

const SpaceInner: React.FC<IReactSpaceInnerProps & { wrapperInstance: Space }> = (props) => {
	if (!props.id && !props.wrapperInstance["_react_spaces_uniqueid"]) {
		props.wrapperInstance["_react_spaces_uniqueid"] = `s${shortuuid()}`;
	}

	const {
		style,
		className,
		onClick,
		onDoubleClick,
		onMouseDown,
		onMouseEnter,
		onMouseLeave,
		onMouseMove,
		onTouchStart,
		onTouchMove,
		onTouchEnd,
		children,
		handleRender,
	} = props;

	const events = {
		onClick: onClick,
		onDoubleClick: onDoubleClick,
		onMouseDown: onMouseDown,
		onMouseEnter: onMouseEnter,
		onMouseLeave: onMouseLeave,
		onMouseMove: onMouseMove,
		onTouchStart: onTouchStart,
		onTouchMove: onTouchMove,
		onTouchEnd: onTouchEnd,
	};

	const { space, domRect, elementRef, resizeHandles } = useSpace({
		...props,
		...{ id: props.id || props.wrapperInstance["_react_spaces_uniqueid"] },
	});

	useEffectOnce(() => {
		space.element = elementRef.current!;
	});

	const userClasses = className ? className.split(" ").map((c) => c.trim()) : [];

	const outerClasses = [
		...["spaces-space", space.children.find((s) => s.resizing) ? "spaces-resizing" : undefined],
		...[space.type === Type.Fixed ? "spaces-fixedsize-layout" : undefined],
		...[space.type === Type.ViewPort ? "spaces-fullpage-layout" : undefined],
		...userClasses.map((c) => `${c}-container`),
	].filter((c) => c);

	const innerClasses = [...["spaces-space-inner"], ...userClasses];

	let innerStyle = style;
	if (space.handlePlacement === ResizeHandlePlacement.Inside) {
		innerStyle = {
			...style,
			...{
				left: space.anchor === AnchorType.Right ? space.handleSize : undefined,
				right: space.anchor === AnchorType.Left ? space.handleSize : undefined,
				top: space.anchor === AnchorType.Bottom ? space.handleSize : undefined,
				bottom: space.anchor === AnchorType.Top ? space.handleSize : undefined,
			},
		};
	}

	const centeredContent = applyCentering(children, props.centerContent);

	return (
		<>
			{resizeHandles.mouseHandles.map((handleProps) => handleRender?.(handleProps) || <div {...handleProps} />)}
			{React.createElement(
				props.as || "div",
				{
					...{
						id: space.id,
						ref: elementRef,
						className: outerClasses.join(" "),
					},
					...events,
				},
				<div className={innerClasses.join(" ")} style={innerStyle}>
					<ParentContext.Provider value={space.id}>
						<LayerContext.Provider value={undefined}>
							<DOMRectContext.Provider value={domRect}>{centeredContent}</DOMRectContext.Provider>
						</LayerContext.Provider>
					</ParentContext.Provider>
				</div>,
			)}
		</>
	);
};
