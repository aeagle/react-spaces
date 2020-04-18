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

export enum Orientation {
	Horizontal,
	Vertical,
}

export interface ISpaceStore {
	spaces: ISpaceDefinition[];
	getSpace: (id: string) => ISpaceDefinition | undefined;
	addSpace: (space: ISpaceDefinition) => void;
}

export interface IPositionalProps {
	left?: SizeUnit;
	top?: SizeUnit;
	right?: SizeUnit;
	bottom?: SizeUnit;
	width?: SizeUnit;
	height?: SizeUnit;
	zIndex?: number;
}

interface ISizeParts {
	size: SizeUnit;
	adjusted: SizeUnit[];
	resized: number;
}

export interface ISpaceDefinition {
	update: () => void;
	adjustLeft: (adjusted: SizeUnit[]) => boolean;
	adjustRight: (adjusted: SizeUnit[]) => boolean;
	adjustTop: (adjusted: SizeUnit[]) => boolean;
	adjustBottom: (adjusted: SizeUnit[]) => boolean;
	adjustEdge: (adjusted: SizeUnit[]) => boolean;
	anchoredChildren: (anchor: Anchor, zIndex: number) => ISpaceDefinition[];
	invalid: boolean;
	id: string;
	type: Type;
	anchor?: Anchor;
	orientation: Orientation;
	order: number;
	position: "fixed" | "absolute";
	children: ISpaceDefinition[];
	parent: ISpaceDefinition | undefined;
	store: ISpaceStore;
	left: ISizeParts;
	top: ISizeParts;
	right: ISizeParts;
	bottom: ISizeParts;
	width: ISizeParts;
	height: ISizeParts;
	zIndex: number;
}

const getSizeString = (size: SizeUnit) => (typeof size === "string" ? size : `${size}px`);

const css = (size: ISizeParts) => {
	const parts: string[] = [];
	if (size !== undefined) {
		parts.push(getSizeString(size.size));
	}

	size.adjusted.forEach((l) => parts.push(getSizeString(l)));

	if (parts.length === 0) {
		return undefined;
	}

	return `calc(${parts.join(" + ")})`;
};
const anchorUpdates = (space: ISpaceDefinition) => [
	{
		anchor: Anchor.Left,
		update: space.adjustLeft,
	},
	{
		anchor: Anchor.Top,
		update: space.adjustTop,
	},
	{
		anchor: Anchor.Right,
		update: space.adjustRight,
	},
	{
		anchor: Anchor.Bottom,
		update: space.adjustBottom,
	},
];

export function createStore(): ISpaceStore {
	const spaces: ISpaceDefinition[] = [];
	let updateId: number | undefined;

	const processUpdates = () => {
		let updated = 0;

		for (var i = 0, len = spaces.length; i < len; i++) {
			const space = spaces[i];
			if (space.invalid) {
				space.update();
				space.invalid = false;
				updated++;
			}
		}

		console.log(`Update processed ... (${updated} spaces)`);
		updateId = undefined;
	};

	const queueUpdate = () => {
		if (updateId) {
			window.clearTimeout(updateId);
		}
		updateId = window.setTimeout(processUpdates, 0);
	};

	const recalcSpaces = (parent: ISpaceDefinition) => {
		for (var i = 0, len = parent.children.length; i < len; i++) {
			const space = parent.children[i];

			if (space.type === Type.Fill) {
				anchorUpdates(space).forEach((info) => {
					const adjusted: SizeUnit[] = [];
					const anchoredSpaces = parent.anchoredChildren(info.anchor, space.zIndex);

					anchoredSpaces.forEach((as) => {
						if (as.orientation === Orientation.Vertical) {
							if (as.height.size) {
								adjusted.push(as.height.size);
							}
						} else {
							if (as.width.size) {
								adjusted.push(as.width.size);
							}
						}
					});

					info.update(adjusted);
				});
			} else if (space.type === Type.Anchored) {
				const adjusted: SizeUnit[] = [];
				const anchoredSpaces = parent.anchoredChildren(space.anchor!, space.zIndex).filter((s) => s.id !== space.id && s.order < space.order);

				anchoredSpaces.forEach((as) => {
					if (as.orientation === Orientation.Vertical) {
						if (as.height.size) {
							adjusted.push(as.height.size);
						}
					} else {
						if (as.width.size) {
							adjusted.push(as.width.size);
						}
					}
				});

				space.adjustEdge(adjusted);
			}
		}
	};

	return {
		spaces: spaces,
		getSpace: (id: string) => {
			return spaces.find((s) => s.id === id);
		},
		addSpace: (space: ISpaceDefinition) => {
			spaces.push(space);

			if (space.parent) {
				space.parent.children.push(space);
				recalcSpaces(space.parent);
			}

			queueUpdate();
		},
	};
}

const StoreContext = React.createContext<ISpaceStore | undefined>(undefined);
const ParentContext = React.createContext<ISpaceDefinition | undefined>(undefined);

export const StoreProvider: React.FC<{ store: ISpaceStore }> = (props) => (
	<StoreContext.Provider value={props.store}>{props.children}</StoreContext.Provider>
);

function useForceUpdate() {
	const [, setTick] = React.useState(0);
	const update = React.useCallback(() => {
		setTick((tick) => tick + 1);
	}, []);
	return update;
}

const useSpace = (id: string, type: Type, anchor?: Anchor, order?: number, position?: IPositionalProps) => {
	const update = useForceUpdate();
	const store = React.useContext(StoreContext)!;
	const parent = React.useContext(ParentContext);
	const existing = store.getSpace(id);

	if (existing) {
		return existing;
	}

	const newSpace: ISpaceDefinition = {
		store: store,
		parent: parent,
		update: update,
		invalid: true,
		id: id,
		type: type,
		anchor: anchor,
		orientation: anchor === Anchor.Bottom || anchor === Anchor.Top ? Orientation.Vertical : Orientation.Horizontal,
		order: order || 0,
		position: type === Type.ViewPort ? "fixed" : "absolute",
		children: [],
		zIndex: (position && position.zIndex) || 0,
		left: { size: position && position.left, adjusted: [], resized: 0 },
		right: { size: position && position.right, adjusted: [], resized: 0 },
		top: { size: position && position.top, adjusted: [], resized: 0 },
		bottom: { size: position && position.bottom, adjusted: [], resized: 0 },
		width: { size: position && position.width, adjusted: [], resized: 0 },
		height: { size: position && position.height, adjusted: [], resized: 0 },
		adjustLeft: () => false,
		adjustRight: () => false,
		adjustTop: () => false,
		adjustBottom: () => false,
		adjustEdge: () => false,
		anchoredChildren: () => [],
	};

	newSpace.anchoredChildren = (anchor, zIndex) =>
		newSpace.children.filter((s) => s.type === Type.Anchored && s.anchor === anchor && s.zIndex === zIndex);
	newSpace.adjustLeft = (adjusted) => {
		newSpace.left.adjusted = adjusted;
		return true;
	};
	newSpace.adjustRight = (adjusted) => {
		newSpace.right.adjusted = adjusted;
		return true;
	};
	newSpace.adjustTop = (adjusted) => {
		newSpace.top.adjusted = adjusted;
		return true;
	};
	newSpace.adjustBottom = (adjusted) => {
		newSpace.bottom.adjusted = adjusted;
		return true;
	};

	if (type === Type.Anchored) {
		if (anchor === Anchor.Left) {
			newSpace.adjustEdge = newSpace.adjustLeft;
		} else if (anchor === Anchor.Top) {
			newSpace.adjustEdge = newSpace.adjustTop;
		} else if (anchor === Anchor.Right) {
			newSpace.adjustEdge = newSpace.adjustRight;
		} else if (anchor === Anchor.Bottom) {
			newSpace.adjustEdge = newSpace.adjustBottom;
		}
	}

	store.addSpace(newSpace);

	return newSpace;
};

interface IAnchorProps {
	id: string;
	size: SizeUnit;
	order?: number;
	style: React.CSSProperties;
}

export const Left: React.FC<IAnchorProps> = (props) => {
	return (
		<Space
			id={props.id}
			type={Type.Anchored}
			anchor={Anchor.Left}
			order={props.order}
			style={props.style}
			position={{ left: 0, top: 0, bottom: 0, width: props.size }}>
			{props.children}
		</Space>
	);
};

export const Top: React.FC<IAnchorProps> = (props) => {
	return (
		<Space
			id={props.id}
			type={Type.Anchored}
			anchor={Anchor.Top}
			order={props.order}
			style={props.style}
			position={{ left: 0, top: 0, right: 0, height: props.size }}>
			{props.children}
		</Space>
	);
};

export const Right: React.FC<IAnchorProps> = (props) => {
	return (
		<Space
			id={props.id}
			type={Type.Anchored}
			anchor={Anchor.Right}
			order={props.order}
			style={props.style}
			position={{ bottom: 0, top: 0, right: 0, width: props.size }}>
			{props.children}
		</Space>
	);
};

export const Bottom: React.FC<IAnchorProps> = (props) => {
	return (
		<Space
			id={props.id}
			type={Type.Anchored}
			anchor={Anchor.Bottom}
			order={props.order}
			style={props.style}
			position={{ bottom: 0, left: 0, right: 0, height: props.size }}>
			{props.children}
		</Space>
	);
};

export const Fill: React.FC<{
	id: string;
	style: React.CSSProperties;
}> = (props) => {
	return (
		<Space id={props.id} type={Type.Fill} style={props.style} position={{ left: 0, top: 0, right: 0, bottom: 0 }}>
			{props.children}
		</Space>
	);
};

export const ViewPort: React.FC<{
	id: string;
	style: React.CSSProperties;
}> = (props) => {
	return (
		<StoreProvider store={createStore()}>
			<Space id={props.id} type={Type.ViewPort} style={props.style} position={{ left: 0, top: 0, right: 0, bottom: 0 }}>
				{props.children}
			</Space>
		</StoreProvider>
	);
};

export const Space: React.FC<{
	id: string;
	type: Type;
	anchor?: Anchor;
	position?: IPositionalProps;
	order?: number;
	style?: React.CSSProperties;
}> = (props) => {
	const { id, type, anchor, order, position } = props;
	const space = useSpace(id, type, anchor, order, position);

	const style: React.CSSProperties = {
		...props.style,
		...{
			position: space.position,
			left: css(space.left),
			top: css(space.top),
			right: css(space.right),
			bottom: css(space.bottom),
			width: css(space.width),
			height: css(space.height),
			zIndex: space.zIndex,
			boxSizing: "border-box",
		},
	};

	return (
		<div id={space.id} style={style}>
			<ParentContext.Provider value={space}>{props.children}</ParentContext.Provider>
		</div>
	);
};
