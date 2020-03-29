import * as React from "react";
import { SpaceLayerContext } from "./Contexts";

interface IProps {
	zIndex: number;
}

export const Layer: React.FC<IProps> = (props) => {
	return <SpaceLayerContext.Provider value={props.zIndex}>{props.children}</SpaceLayerContext.Provider>;
};
