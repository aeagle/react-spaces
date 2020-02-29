import * as React from "react";
import { SpaceContext } from "src/Contexts";

export const useParentSpace = () => {
	const parentSpace = React.useContext(SpaceContext);

	return {
		startDrag: !parentSpace ? (e: React.MouseEvent<HTMLElement, MouseEvent>) => null : parentSpace.startDrag,
	};
};
