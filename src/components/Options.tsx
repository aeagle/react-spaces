import * as React from "react";
import { IReactSpacesOptions, OptionsContext } from "../core-react";

export const Options: React.FC<IReactSpacesOptions> = ({ children, ...opts }) => {
	return <OptionsContext.Provider value={opts}>{children}</OptionsContext.Provider>;
};
