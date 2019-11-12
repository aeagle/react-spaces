import { ISpace } from "./Globals/Types";
import * as ReactDOM from 'react-dom';
import { cssValue, isHorizontalSpace, isVerticalSpace } from './Globals/Utils';
import * as React from 'react';

export const HeadStyles : React.FC<{ spaces: ISpace[] }> = (props) => {
	const { spaces } = props;

	if (spaces.length > 0)
	{
		return ReactDOM.createPortal(
			<style>
			{
				spaces.map(space => {
					const style = {
						left: (space.left !== undefined ? cssValue(space.left, space.adjustedLeft) : undefined),
						top: (space.top !== undefined ? cssValue(space.top, space.adjustedTop) : undefined),
						right: (space.right !== undefined ? cssValue(space.right, space.adjustedLeft) : undefined),
						bottom: (space.bottom !== undefined ? cssValue(space.bottom, space.adjustedTop) : undefined),
						width: isHorizontalSpace(space.anchorType) ? cssValue(space.size, space.adjustedSize) : space.width,
						height: isVerticalSpace(space.anchorType) ? cssValue(space.size, space.adjustedSize) : space.height,
						zIndex: space.zIndex
					};
					return (
						<>{ `#${space.id} {` } { style.left ? `left: ${style.left};` : "" } { style.top ? `top: ${style.top};` : "" } { style.right ? `right: ${style.right};` : "" } { style.bottom ? `bottom: ${style.bottom};` : "" } { style.width ? `width: ${style.width};` : "" } { style.height ? `height: ${style.height};` : "" } { style.zIndex ? `z-index: ${style.zIndex};` : "" } { `}`}</>
					)
				})
			}
			</style>
			,
			window.document.head
		);
	}

	return null;
}