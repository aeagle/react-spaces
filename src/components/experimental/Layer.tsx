import * as React from "react";
import { LayerContext } from "../../core-react";

export const Layer: React.FC<{ zIndex: number }> = (props) => <LayerContext.Provider value={props.zIndex}>{props.children}</LayerContext.Provider>;
