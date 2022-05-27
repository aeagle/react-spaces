import { SyntheticEvent } from "react";
import { ISpaceDefinition, ISpaceStore, EndEvent, MoveEvent, OnDragEnd } from "./core-types";
export declare function createDrag(store: ISpaceStore): {
    startDrag<T extends SyntheticEvent<HTMLElement, Event> | MouseEvent | TouchEvent>(e: T, space: ISpaceDefinition, endEvent: EndEvent, moveEvent: MoveEvent, getCoords: (event: T) => {
        x: number;
        y: number;
    }, onDragEnd?: OnDragEnd | undefined): void;
};
