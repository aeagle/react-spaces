import * as React from "react";
import { IReactSpacesOptions, OptionsContext } from "../core-react";

interface IProps extends IReactSpacesOptions {
	children?: React.ReactNode;
}

export const Options: React.FC<IProps> = ({ children, ...opts }) => {
	return <OptionsContext.Provider value={opts}>{children}</OptionsContext.Provider>;
};
