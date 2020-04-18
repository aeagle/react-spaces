import * as React from "react";
import { SizeUnit } from "../types";

export enum Type {
	ViewPort,
	Fill,
	Anchored,
}
export enum Anchor {
	Left,
	Top,
	Right,
	Bottom,
}

export interface ISpaceStore {
	spaces: ISpaceDefinition[];
	getSpace: (id: string) => ISpaceDefinition | undefined;
	addSpace: (space: ISpaceDefinition) => void;
}

export interface ISpaceDefinition {
	id: string;
	type: Type;
	anchor?: Anchor;
	position: "fixed" | "absolute";
	zIndex: number;
	left?: SizeUnit;
	top?: SizeUnit;
	right?: SizeUnit;
	bottom?: SizeUnit;
	width?: SizeUnit;
	height?: SizeUnit;
	children: ISpaceDefinition[];
	store: ISpaceStore;
}

export function createStore(): ISpaceStore {
	const spaces: ISpaceDefinition[] = [];
	return {
		spaces: spaces,
		getSpace: (id: string) => {
			return spaces.find((s) => s.id === id);
		},
		addSpace: (space: ISpaceDefinition) => {
			spaces.push(space);
		},
	};
}

const StoreContext = React.createContext<ISpaceStore | undefined>(undefined);

export const StoreProvider: React.FC<{ store: ISpaceStore }> = (props) => (
	<StoreContext.Provider value={props.store}>{props.children}</StoreContext.Provider>
);

const useSpace = (
	id: string,
	type: Type,
	anchor?: Anchor,
	left?: SizeUnit,
	top?: SizeUnit,
	right?: SizeUnit,
	bottom?: SizeUnit,
	width?: SizeUnit,
	height?: SizeUnit,
	zIndex?: number,
) => {
	const store = React.useContext(StoreContext)!;
	const existing = store.getSpace(id);

	if (existing) {
		return existing;
	}

	const newSpace: ISpaceDefinition = {
		id: id,
		type: type,
		anchor: anchor,
		position: type === Type.ViewPort ? "fixed" : "absolute",
		children: [],
		store: store,
		left: left,
		top: top,
		right: right,
		bottom: bottom,
		width: width,
		height: height,
		zIndex: zIndex || 0,
	};

	store.addSpace(newSpace);

	return newSpace;
};

export const Space: React.FC<{
	id: string;
	type: Type;
	anchor?: Anchor;
	left?: SizeUnit;
	top?: SizeUnit;
	right?: SizeUnit;
	bottom?: SizeUnit;
	width?: SizeUnit;
	height?: SizeUnit;
	zIndex?: number;
	style?: React.CSSProperties;
}> = (props) => {
	const { id, type, anchor, left, top, right, bottom, width, height, zIndex } = props;
	const space = useSpace(id, type, anchor, left, top, right, bottom, width, height, zIndex);

	const style: React.CSSProperties = {
		...props.style,
		...{
			position: space.position,
			left: space.left,
			top: space.top,
			right: space.right,
			bottom: space.bottom,
			width: space.width,
			height: space.height,
			zIndex: space.zIndex,
		},
	};

	return (
		<div id={space.id} style={style}>
			{props.children}
		</div>
	);
};
