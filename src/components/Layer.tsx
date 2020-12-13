import * as React from "react";
import { LayerContext } from "../core-react";
import * as PropTypes from "prop-types";

export const Layer: React.FC<{ zIndex: number }> = (props) => <LayerContext.Provider value={props.zIndex}>{props.children}</LayerContext.Provider>;

Layer.propTypes = {
	zIndex: PropTypes.number.isRequired,
};
