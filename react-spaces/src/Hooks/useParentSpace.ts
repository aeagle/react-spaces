import * as React from "react";
import { SpaceContext } from "src/Contexts";

export const useParentSpace = () => {
	const parentSpace = React.useContext(SpaceContext);

	return {
		startMouseDrag: !parentSpace ? (e: React.MouseEvent<HTMLElement, MouseEvent>) => null : parentSpace.startMouseDrag,
	};
};
