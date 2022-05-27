import { SyntheticEvent } from "react";
import { ISpaceDefinition, ResizeType, ISpaceStore, OnResizeEnd, EndEvent, MoveEvent } from "./core-types";
export interface IResizeChange {
    x: number;
    y: number;
}
export declare function createResize(store: ISpaceStore): {
    startResize<T extends SyntheticEvent<HTMLElement, Event> | MouseEvent | TouchEvent>(e: T, resizeType: ResizeType, space: ISpaceDefinition, endEvent: EndEvent, moveEvent: MoveEvent, getCoords: (event: T) => {
        x: number;
        y: number;
    }, onResizeEnd?: OnResizeEnd): void;
};
