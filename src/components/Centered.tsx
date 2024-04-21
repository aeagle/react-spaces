import * as React from "react";

export interface ICenteredProps {
	children?: React.ReactNode;
}

export const Centered: React.FC<ICenteredProps> = (props) => <div className={`spaces-centered`}>{props.children}</div>;
