import * as React from "react";

interface IProps {
	children?: React.ReactNode;
}

export const Centered: React.FC<IProps> = (props) => <div className={`spaces-centered`}>{props.children}</div>;
