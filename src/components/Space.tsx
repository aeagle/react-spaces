import { CenterType, ResizeHandlePlacement, AnchorType } from "../core-types";
import { useSpace, ParentContext, LayerContext, DOMRectContext, IReactSpaceProps } from "../core-react";
import * as React from "react";
import { Centered } from "./Centered";
import { CenteredVertically } from "./CenteredVertically";
import { shortuuid, updateStyleDefinition } from "../core-utils";

function applyCentering(children: React.ReactNode, centerType: CenterType | undefined) {
	switch (centerType) {
		case CenterType.Vertical:
			return <CenteredVertically>{children}</CenteredVertically>;
		case CenterType.HorizontalVertical:
			return <Centered>{children}</Centered>;
	}
	return children;
}

export class Space extends React.Component<IReactSpaceProps> {
	public render() {
		return <SpaceInner {...this.props} wrapperInstance={this} />;
	}
}

const SpaceInner: React.FC<IReactSpaceProps & { wrapperInstance: Space }> = (props) => {
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

	React.useEffect(() => {
		space.element = elementRef.current!;

		if (space.element.getAttribute("data-ssr") === "1") {
			const preRenderedStyle = space.element.children[0];
			if (preRenderedStyle) {
				const newStyle = document.createElement("style");
				newStyle.id = `style_${space.id}`;
				newStyle.innerHTML = preRenderedStyle.innerHTML;
				document.head.appendChild(newStyle);
			}
			space.element.removeAttribute("data-ssr");
			updateStyleDefinition(space);
		}
	}, []);

	const userClasses = className ? className.split(" ").map((c) => c.trim()) : [];

	const outerClasses = [
		...["spaces-space", space.children.find((s) => s.resizing) ? "spaces-resizing" : undefined],
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

	const isSSR = typeof document === "undefined";

	if (isSSR) {
		outerProps["data-ssr"] = "1";
	}

	return (
		<>
			{resizeHandles.mouseHandles.map((r) => (
				<div {...r} />
			))}
			{React.createElement(
				props.as || "div",
				outerProps,
				<>
					{isSSR && space.ssrStyle && <style className="ssr">{space.ssrStyle}</style>}
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
