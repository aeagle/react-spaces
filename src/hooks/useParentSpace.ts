import * as React from "react";
import { SpaceContext } from "../components/Contexts";
import { IParentSpace } from "../types";

export const useParentSpace: () => IParentSpace = () => {
	const parentSpace = React.useContext(SpaceContext);

	return {
		startMouseDrag: !parentSpace ? () => null : parentSpace.startMouseDrag,
		startMouseResize: !parentSpace ? () => null : parentSpace.startMouseResize,
	};
};
