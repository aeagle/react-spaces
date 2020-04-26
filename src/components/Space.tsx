import { ISpaceProps, CenterType } from "../core-types";
import { useSpace, ParentContext, LayerContext, DOMRectContext } from "../core-react";
import * as React from "react";
import { Centered } from "./Centered";
import { CenteredVertically } from "./CenteredVertically";

function applyCentering(children: React.ReactNode, centerType: CenterType | undefined) {
	switch (centerType) {
		case CenterType.Vertical:
			return <CenteredVertically>{children}</CenteredVertically>;
		case CenterType.HorizontalVertical:
			return <Centered>{children}</Centered>;
	}
	return children;
}

export const Space: React.FC<ISpaceProps> = (props) => {
	const { style, className, onClick, children } = props;
	const { space, domRect, elementRef, resizeHandles } = useSpace(props);

	React.useEffect(() => {
		space.element = elementRef.current!;
	}, []);

	const userClasses = className ? className.split(" ").map((c) => c.trim()) : [];

	const outerClasses = [
		...[
			"spaces-space",
			//props.scrollable ? (isResizable(props) ? "scrollable" : "scrollable-a") : undefined,
			space.children.find((s) => s.resizing) ? " spaces-resizing" : undefined,
		],
		//...(isResizable(props) && props.scrollable ? userClasses.map((c) => `${c}-container`) : userClasses),
		...userClasses,
	].filter((c) => c);

	const centeredContent = applyCentering(children, props.centerContent);

	return (
		<>
			{React.createElement(
				props.as || "div",
				{
					id: space.id,
					ref: elementRef,
					style: style,
					className: outerClasses.join(" "),
					onClick: onClick,
				},
				<ParentContext.Provider value={space.id}>
					<LayerContext.Provider value={undefined}>
						<DOMRectContext.Provider value={domRect}>
							{resizeHandles.map((r) => (
								<div {...r} />
							))}
							{centeredContent}
						</DOMRectContext.Provider>
					</LayerContext.Provider>
				</ParentContext.Provider>,
			)}
		</>
	);
};
