import * as React from "react";
import { DOMRectContext } from "../core-react";

interface ISpaceInfoProps {
	children: (info: DOMRect) => JSX.Element;
}

export const Info: React.FC<ISpaceInfoProps> = (props) => {
	const domRect = React.useContext(DOMRectContext);

	if (domRect) {
		return props.children(domRect);
	}

	return props.children({ left: 0, top: 0, right: 0, bottom: 0, width: 0, height: 0, x: 0, y: 0, toJSON: () => "" });
};
