import * as React from "react";
import "./Styles.css";
import { ResizeType, ISpace, AnchorToResizeTypeMap, AnchorType } from "./Globals/Types";
import { startMouseResize, startTouchResize } from "./Globals/Resizing";
import { ISpaceContext } from "./Globals/ISpaceContext";

interface IProps {
	resizable?: boolean;
	anchor?: AnchorType;
	handleSize?: number;
	parentContext: ISpaceContext | undefined;
	space: ISpace;
	spaceElement: HTMLElement | undefined;
}

export const ResizeHandle: React.FC<IProps> = (props) => {
	if (props.parentContext && props.anchor && props.resizable) {
		const handleSize = props.handleSize === undefined ? 5 : props.handleSize;
		const resizeType: ResizeType | undefined = props.anchor ? AnchorToResizeTypeMap[props.anchor] : undefined;
		const width = resizeType === ResizeType.Left || resizeType === ResizeType.Right ? handleSize : undefined;
		const height = resizeType === ResizeType.Top || resizeType === ResizeType.Bottom ? handleSize : undefined;
		return (
			<div
				style={{ width: width, height: height }}
				className={`spaces-resize-handle ${AnchorToResizeTypeMap[props.anchor]}`}
				onMouseDown={(e) => startMouseResize(e, props.parentContext, props.space, props, props.spaceElement)}
				onTouchStart={(e) => startTouchResize(e, props.parentContext, props.space, props, props.spaceElement)}
			/>
		);
	}

	return null;
};
