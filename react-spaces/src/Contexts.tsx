import * as React from "react";
import { ISpaceInfo } from "./Globals/Types";
import { ISpaceContext } from "./Globals/ISpaceContext";

export const SpaceContext = React.createContext<ISpaceContext | null>(null);
export const SpaceLayerContext = React.createContext<number | null>(null);
export const SpaceInfoContext = React.createContext<ISpaceInfo | null>(null);
