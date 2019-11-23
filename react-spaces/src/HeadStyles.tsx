import { ISpace } from "./Globals/Types";
import * as ReactDOM from 'react-dom';
import { cssValue, isHorizontalSpace, isVerticalSpace } from './Globals/Utils';
import * as React from 'react';

export const HeadStyles : React.FC<{ spaces: ISpace[] }> = (props) => {
	const { spaces } = props;

	if (spaces.length > 0)
	{
		const styles : string[] = [];
		for (let i = 0; i < spaces.length; i ++) {
			const space = spaces[i];
			const css: string[] = [];
			const style = {
				left: (space.left !== undefined ? cssValue(space.left, space.adjustedLeft) : undefined),
				top: (space.top !== undefined ? cssValue(space.top, space.adjustedTop) : undefined),
				right: (space.right !== undefined ? cssValue(space.right, space.adjustedLeft) : undefined),
				bottom: (space.bottom !== undefined ? cssValue(space.bottom, space.adjustedTop) : undefined),
				width: isHorizontalSpace(space.anchorType) ? cssValue(space.anchorSize, space.adjustedSize) : space.width,
				height: isVerticalSpace(space.anchorType) ? cssValue(space.anchorSize, space.adjustedSize) : space.height,
				zIndex: space.zIndex
			};
			if (style.left) {
				css.push(`left: ${style.left};`);
			}
			if (style.top) {
				css.push(`top: ${style.top};`);
			}
			if (style.right) {
				css.push(`right: ${style.right};`);
			}
			if (style.bottom) {
				css.push(`bottom: ${style.bottom};`);
			}
			if (style.width) {
				css.push(`width: ${style.width};`);
			}
			if (style.height) {
				css.push(`height: ${style.height}`);
			}
			if (style.zIndex) {
				css.push(`z-index: ${style.zIndex}`);
			}
			if (css.length > 0) {
				styles.push(`#${space.id} { ${css.join(' ')} }`);
			}
		}

		if (styles.length === 0) {
			return null;
		}

		return ReactDOM.createPortal(<style>{styles.join(' ')}</style>, window.document.head);
	}

	return null;
}