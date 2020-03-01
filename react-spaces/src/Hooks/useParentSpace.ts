import * as React from "react";
import { SpaceContext } from "../components/Contexts";
import { IParentSpace, ResizeType } from "../types";

export const useParentSpace: () => IParentSpace = () => {
	const parentSpace = React.useContext(SpaceContext);

	return {
		startMouseDrag: !parentSpace
			? (e: React.MouseEvent<HTMLElement, MouseEvent>, onDragEnd?: (e: any) => void) => null
			: parentSpace.startMouseDrag,
		startMouseResize: !parentSpace
			? (e: React.MouseEvent<HTMLElement, MouseEvent>, resizeType: ResizeType, onResizeEnd?: (e: any) => void) => null
			: parentSpace.startMouseResize,
	};
};
