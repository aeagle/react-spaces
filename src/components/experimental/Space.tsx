import { ISpaceProps } from "../../core-types";
import { useSpace, ParentContext, LayerContext, DOMRectContext } from "../../core-react";
import * as React from "react";
import { Centered } from "./Centered";
import { CenteredVertically } from "./CenteredVertically";

export const Space: React.FC<ISpaceProps> = (props) => {
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
