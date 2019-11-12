import { AllProps, ISpace, AnchorToResizeTypeMap, ResizeType } from './Types';
import { ISpaceContext, updateSpace } from './ISpaceContext';
import * as React from 'react';
import { Resizable } from 'src/Resizable';

export const applyResize = (
	props: AllProps,
	currentSpace: ISpace,
	parentContext: ISpaceContext | null, 
	handleSize: number,
	divElementRef: React.MutableRefObject<HTMLElement | undefined>) => {

	if (parentContext && props.anchor && props.resizable) {
		const resizeType = AnchorToResizeTypeMap[props.anchor];
		const resizeHandleWidth = resizeType === ResizeType.Left || resizeType === ResizeType.Right ? handleSize : undefined;
		const resizeHandleHeight = resizeType === ResizeType.Top || resizeType === ResizeType.Bottom ? handleSize : undefined;
		
		return {
			resizeHandle:
				<Resizable
					type={resizeType}
					adjustedSize={currentSpace.adjustedSize} 
					width={resizeHandleWidth}
					height={resizeHandleHeight}
					minimumAdjust={ (props.minimumSize === undefined ? 20 : props.minimumSize) - (currentSpace.parsedSize || 0) }
					maximumAdjust={ props.maximumSize ? (props.maximumSize - (currentSpace.parsedSize || 0)) : undefined }
					onResize={(adjustedSize: number) => updateSpace(parentContext, currentSpace.id, { adjustedSize: adjustedSize })}
					onResizeStart={() => props.onResizeStart && props.onResizeStart()}
					onResizeEnd={() => {
						if (divElementRef.current)
						{
							const currentRect = divElementRef.current.getBoundingClientRect();
							props.onResizeEnd && props.onResizeEnd(
								Math.floor(resizeType === ResizeType.Left || resizeType === ResizeType.Right ? currentRect.width : currentRect.height)
							);
						}
					}} />,
			resizeType: 
				resizeType
		}
	}

	return { resizeHandle: null, resizeType: null };
}