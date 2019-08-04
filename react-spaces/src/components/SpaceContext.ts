import * as React from 'react';
import { AnchorType } from './Globals';

export interface ISpaceContext {
	level: number,
	width: number,
	height: number,
	spaceTakers: ISpaceTaker[],
	registerSpaceTaker: (spaceTaker: ISpaceTaker) => void,
	removeSpaceTaker: (id: string) => void,
	updateSpaceTakerAdjustedSize: (id: string, adjustedSize: number) => void
}

export interface ISpaceTaker {
	id: string,
	order: number,
	anchorType: AnchorType,
	size: number | string,
	adjustedSize: number
}

export const SpaceContext = React.createContext<ISpaceContext | null>(null);
