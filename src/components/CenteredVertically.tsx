import * as React from "react";

export interface ICenteredVerticallyProps {
	children?: React.ReactNode;
}

export const CenteredVertically: React.FC<ICenteredVerticallyProps> = (props) => <div className={`spaces-centered-vertically`}>{props.children}</div>;
