import { CenterType, ResizeHandlePlacement, AnchorType, Type } from "../core-types";
import {
	useSpace,
	ParentContext,
	LayerContext,
	DOMRectContext,
	IReactSpaceInnerProps,
	useEffectOnce,
	SSR_SUPPORT_ENABLED,
	useUniqueId,
} from "../core-react";
import * as React from "react";
import { Centered } from "./Centered";
import { CenteredVertically } from "./CenteredVertically";
import { updateStyleDefinition } from "../core-utils";

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
	let idToUse = props.id ?? props.wrapperInstance["_react_spaces_uniqueid"];

	const uniqueId = useUniqueId();

	if (!idToUse) {
		props.wrapperInstance["_react_spaces_uniqueid"] = uniqueId;
		idToUse = props.wrapperInstance["_react_spaces_uniqueid"];
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
		...{ id: idToUse },
	});

	useEffectOnce(() => {
		space.element = elementRef.current!;

		if (SSR_SUPPORT_ENABLED) {
			if (space.element.getAttribute("data-ssr") === "1") {
				const preRenderedStyle = space.element.children[0];
				if (preRenderedStyle) {
					const id = preRenderedStyle.getAttribute("data-id");
					if (id) {
						space.id = id;
						console.log(space.id);
					}

					const newStyle = document.createElement("style");
					newStyle.id = `style_${space.id}`;
					newStyle.innerHTML = preRenderedStyle.innerHTML;
					document.head.appendChild(newStyle);
				}
				space.element.removeAttribute("data-ssr");
				updateStyleDefinition(space);
			}
		}
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

	const outerProps = {
		...{
			id: space.id,
			ref: elementRef,
			className: outerClasses.join(" "),
		},
		...events,
	} as any;

	if (SSR_SUPPORT_ENABLED) {
		outerProps["data-ssr"] = "1";
	}

	return (
		<>
			{resizeHandles.mouseHandles.map((handleProps) => handleRender?.(handleProps) || <div {...handleProps} />)}
			{React.createElement(
				props.as || "div",
				outerProps,
				<>
					{SSR_SUPPORT_ENABLED && space.ssrStyle && (
						<style className="ssr" data-id={space.id}>
							{space.ssrStyle}
						</style>
					)}
					<div className={innerClasses.join(" ")} style={innerStyle}>
						<ParentContext.Provider value={space.id}>
							<LayerContext.Provider value={undefined}>
								<DOMRectContext.Provider value={domRect}>{centeredContent}</DOMRectContext.Provider>
							</LayerContext.Provider>
						</ParentContext.Provider>
					</div>
				</>,
			)}
		</>
	);
};
