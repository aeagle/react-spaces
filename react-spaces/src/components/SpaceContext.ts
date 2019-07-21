import * as React from 'react';
import { AnchorType } from './Globals';
import { Guid } from 'guid-typescript';

export interface ISpaceContext {
	level: number,
	width: number,
	height: number,
	spaceTakers: ISpaceTaker[],
	registerSpaceTaker: (spaceTaker: ISpaceTaker) => void,
	removeSpaceTaker: (id: Guid) => void,
	updateSpaceTakerAdjustedSize: (id: Guid, adjustedSize: number) => void
}

export interface ISpaceTaker {
	id: Guid,
	order: number,
	anchorType: AnchorType
	size: number,
	adjustedSize: number
}

export const SpaceContext = React.createContext<ISpaceContext | null>(null);
