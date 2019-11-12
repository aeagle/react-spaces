import * as React from 'react';
import { ISpaceInfo } from './Types';
import { ISpaceContext } from './ISpaceContext';

export const SpaceContext = React.createContext<ISpaceContext | null>(null);
export const SpaceLayerContext = React.createContext<number | null>(null);
export const SpaceInfoContext = React.createContext<ISpaceInfo | null>(null);