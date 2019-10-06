import * as React from 'react';
import { ISpaceContext, ISpaceInfo } from './Types';

export const SpaceContext = React.createContext<ISpaceContext | null>(null);
export const SpaceLayerContext = React.createContext<number | null>(null);
export const SpaceInfoContext = React.createContext<ISpaceInfo | null>(null);