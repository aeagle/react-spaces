import { ISpace, AnchorType, AnchorTypes } from './Types';
import { getSizeString } from './Utils';

export interface ISpaceContext {
	level: number,
	children: ISpace[],
	updateChildren: (children: ISpace[]) => void
}

const recalcSpaces = (spaces: ISpace[]) => {

	for (let sidx = 0; sidx < spaces.length; sidx ++)
	{
		const space = spaces[sidx];

		let adjustedTop: string[] = [];
		let adjustedLeft: string[] = [];
		let adjustedRight: string[] = [];
		let adjustedBottom: string[] = [];
	
		if (space.anchorType === undefined) {
			space.left = 0;
			space.top = 0;
			space.right = 0;
			space.bottom = 0;
		} else {
			space.left = space.anchorType !== AnchorType.Right ? 0 : undefined;
			space.top = space.anchorType !== AnchorType.Bottom ? 0 : undefined;
			space.right = space.anchorType !== AnchorType.Left ? 0 : undefined;
			space.bottom = space.anchorType !== AnchorType.Top ? 0 : undefined;
		}
	
		for (let at = 0; at < AnchorTypes.length; at ++)
		{
			const spaceTakers = 
				spaces
					.filter(t => t.anchorType !== undefined && t.zIndex === space.zIndex && t.anchorType === AnchorTypes[at])
					.sort((a, b) => a.order - b.order);
	
			for (let i = 0; i < spaceTakers.length; i ++)
			{
				const t = spaceTakers[i];
				if (t.id !== space.id) {
					const adjustedSize = t.adjustedSize !== 0 ? ` + ${getSizeString(t.adjustedSize)}` : ``;
					if (space.anchorType === undefined)
					{
						if (t.anchorType === AnchorType.Top && t.size) {
							adjustedTop.push(`${getSizeString(t.size)}${adjustedSize}`);
						} else if (t.anchorType === AnchorType.Left && t.size) {
							adjustedLeft.push(`${getSizeString(t.size)}${adjustedSize}`);
						} else if (t.anchorType === AnchorType.Bottom && t.size) {
							adjustedBottom.push(`${getSizeString(t.size)}${adjustedSize}`);
						} else if (t.anchorType === AnchorType.Right && t.size) {
							adjustedRight.push(`${getSizeString(t.size)}${adjustedSize}`);
						}
					}
					else
					{
						if (t.anchorType === AnchorType.Top && t.size && space.top !== undefined) {
							adjustedTop.push(`${getSizeString(t.size)}${adjustedSize}`);
						} else if (t.anchorType === AnchorType.Left && t.size && space.left !== undefined) {
							adjustedLeft.push(`${getSizeString(t.size)}${adjustedSize}`);
						} else if (t.anchorType === AnchorType.Bottom && t.size && space.bottom !== undefined) {
							adjustedBottom.push(`${getSizeString(t.size)}${adjustedSize}`);
						} else if (t.anchorType === AnchorType.Right && t.size && space.right !== undefined) {
							adjustedRight.push(`${getSizeString(t.size)}${adjustedSize}`);
						}
					}
				} else {
					break;
				}
			}
		}
	
		[
			{ adjusted: adjustedTop, setter: (value: string) => space.top = value },
			{ adjusted: adjustedBottom, setter: (value: string) => space.bottom = value },
			{ adjusted: adjustedLeft, setter: (value: string) => space.left = value },
			{ adjusted: adjustedRight, setter: (value: string) => space.right = value }
		].map(x => x.adjusted.length > 0 && x.setter(`calc(${x.adjusted.join(" + ")})`));
	}

	return spaces;

}

export const getSpace = (context: ISpaceContext, id: string) => {
	return context.children.find(s => s.id === id);
}

export const registerSpace = (context: ISpaceContext, space: ISpace) => {
	const existing = context.children.find(t => t.id === space.id);

	if (!existing) {
		context.updateChildren(recalcSpaces([ ...context.children, space ]));
		return space;
	} else {
		existing.order = space.order;
		existing.anchorType = space.anchorType;
		existing.size = space.size;
		return existing;
	}
}

export const removeSpace = (context: ISpaceContext, id: string) => {
	context.updateChildren(recalcSpaces(context.children.filter(t => t.id !== id)));
}

export const updateSpace = (context: ISpaceContext, id: string, delta: Partial<ISpace>) => {
	context.updateChildren(recalcSpaces(context.children.map(t => t.id === id ? {...t, ...delta} : t)));
}

export const createSpaceContext = (
	children: ISpace[],
	updateChildren: (children: ISpace[]) => void,
	currentSpace?: ISpace,
	parent?: ISpaceContext | null) => {

	const context : ISpaceContext = {
		level: parent ? parent.level + 1 : 0,
		children: children,
		updateChildren: updateChildren
	}

	return context;
}