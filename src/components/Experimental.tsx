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
	updateSpace: (space: ISpaceDefinition, type: Type, anchor?: Anchor, order?: number, position?: IPositionalProps) => void;
	removeSpace: (space: ISpaceDefinition) => void;
	createSpace: (
		update: () => void,
		parent: ISpaceDefinition | undefined,
		id: string,
		type: Type,
		anchor?: Anchor,
		order?: number,
		position?: IPositionalProps,
	) => ISpaceDefinition;
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

interface ISize {
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
	left: ISize;
	top: ISize;
	right: ISize;
	bottom: ISize;
	width: ISize;
	height: ISize;
	zIndex: number;
}

function getSizeString(size: SizeUnit) {
	return typeof size === "string" ? size : `${size}px`;
}

function css(size: ISize) {
	const parts: string[] = [];
	if (size !== undefined) {
		parts.push(getSizeString(size.size));
	}

	size.adjusted.forEach((l) => parts.push(getSizeString(l)));

	if (parts.length === 0) {
		return undefined;
	}

	return `calc(${parts.join(" + ")})`;
}

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

function adjustmentsEqual(item1: SizeUnit[], item2: SizeUnit[]) {
	if (item1.length !== item2.length) {
		return false;
	}

	for (var i = 0, len = item1.length; i < len; i++) {
		if (item1[i] !== item2[i]) {
			return false;
		}
	}

	return true;
}

function createStore(): ISpaceStore {
	const spaces: ISpaceDefinition[] = [];

	const recalcSpaces = (parent: ISpaceDefinition) => {
		for (var i = 0, len = parent.children.length; i < len; i++) {
			const space = parent.children[i];
			let changed = false;

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

					if (info.update(adjusted)) {
						changed = true;
					}
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

				if (space.adjustEdge(adjusted)) {
					changed = true;
				}
			}

			if (changed) {
				space.update();
				space.invalid = false;
			}
		}
	};

	const store: ISpaceStore = {
		spaces: spaces,
		getSpace: (id) => {
			return spaces.find((s) => s.id === id);
		},
		addSpace: (space) => {
			spaces.push(space);

			if (space.parent) {
				space.parent.children.push(space);
				recalcSpaces(space.parent);
			}
		},
		removeSpace: (space) => {
			if (space.parent) {
				space.parent.children = space.parent.children.filter((s) => s.id !== space.id);
				recalcSpaces(space.parent);
			}
		},
		updateSpace: (space, type, anchor, order, position) => {
			let changed = false;

			if (space.type !== type) {
				space.type = type;
				space.position = type === Type.ViewPort ? "fixed" : "absolute";
				changed = true;
			}

			if (space.anchor != anchor) {
				space.anchor = anchor;
				space.orientation = anchor === Anchor.Bottom || anchor === Anchor.Top ? Orientation.Vertical : Orientation.Horizontal;
				changed = true;

				if (type === Type.Anchored) {
					if (anchor === Anchor.Left) {
						space.adjustEdge = space.adjustLeft;
					} else if (anchor === Anchor.Top) {
						space.adjustEdge = space.adjustTop;
					} else if (anchor === Anchor.Right) {
						space.adjustEdge = space.adjustRight;
					} else if (anchor === Anchor.Bottom) {
						space.adjustEdge = space.adjustBottom;
					}
				}
			}

			if (space.left.size !== (position && position.left)) {
				space.left.size = position && position.left;
				space.left.resized = 0;
				changed = true;
			}

			if (space.right.size !== (position && position.right)) {
				space.right.size = position && position.right;
				space.right.resized = 0;
				changed = true;
			}

			if (space.top.size !== (position && position.top)) {
				space.top.size = position && position.top;
				space.top.resized = 0;
				changed = true;
			}

			if (space.bottom.size !== (position && position.bottom)) {
				space.bottom.size = position && position.bottom;
				space.bottom.resized = 0;
				changed = true;
			}

			if (space.order !== (order || 0)) {
				space.order = order || 0;
				changed = true;
			}

			if (space.zIndex !== ((position && position.zIndex) || 0)) {
				space.zIndex = (position && position.zIndex) || 0;
				changed = true;
			}

			if (changed && space.parent) {
				space.update();
				recalcSpaces(space.parent);
			}
		},
		createSpace: () => ({} as ISpaceDefinition),
	};

	store.createSpace = (
		update: () => void,
		parent: ISpaceDefinition | undefined,
		id: string,
		type: Type,
		anchor?: Anchor,
		order?: number,
		position?: IPositionalProps,
	) => {
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
			if (adjustmentsEqual(newSpace.left.adjusted, adjusted)) {
				return false;
			}

			newSpace.invalid = true;
			newSpace.left.adjusted = adjusted;
			return true;
		};

		newSpace.adjustRight = (adjusted) => {
			if (adjustmentsEqual(newSpace.right.adjusted, adjusted)) {
				return false;
			}

			newSpace.invalid = true;
			newSpace.right.adjusted = adjusted;
			return true;
		};

		newSpace.adjustTop = (adjusted) => {
			if (adjustmentsEqual(newSpace.top.adjusted, adjusted)) {
				return false;
			}

			newSpace.invalid = true;
			newSpace.top.adjusted = adjusted;
			return true;
		};

		newSpace.adjustBottom = (adjusted) => {
			if (adjustmentsEqual(newSpace.bottom.adjusted, adjusted)) {
				return false;
			}

			newSpace.invalid = true;
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

		return newSpace;
	};

	return store;
}

// REACT SPECIFIC

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

function useSpace(id: string, type: Type, anchor?: Anchor, order?: number, position?: IPositionalProps) {
	const update = useForceUpdate();
	const store = React.useContext(StoreContext)!;
	const parent = React.useContext(ParentContext);

	let space = store.getSpace(id);

	if (!space) {
		space = store.createSpace(update, parent, id, type, anchor, order, position);
		store.addSpace(space);
	} else {
		store.updateSpace(space, type, anchor, order, position);
	}

	React.useEffect(() => {
		return () => {
			store.removeSpace(space!);
		};
	}, []);

	return space;
}

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
	style?: React.CSSProperties;
}> = (props) => {
	return (
		<Space id={props.id} type={Type.Fill} style={props.style} position={{ left: 0, top: 0, right: 0, bottom: 0 }}>
			{props.children}
		</Space>
	);
};

export const ViewPort: React.FC<{
	id: string;
	style?: React.CSSProperties;
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

export const Demo: React.FC = () => {
	const [visible, setVisible] = React.useState(true);
	return (
		<ViewPort id="viewport">
			<Left id="left" size="15%" style={{ backgroundColor: "#ffdddd", padding: 15 }}>
				Left
			</Left>
			<Fill id="main-container">
				<Top id="top" size="15%" style={{ backgroundColor: "#ddddff", padding: 15 }}>
					Top
				</Top>
				<Fill id="main">
					{visible && (
						<Left id="nleft" size="20%" style={{ backgroundColor: "#ddffdd", padding: 15 }}>
							Left
						</Left>
					)}
					<Fill id="nmain-container">
						<Top id="ntop" size="20%" style={{ backgroundColor: "#ffdddd", padding: 15 }}>
							Top
						</Top>
						<Fill id="nmain" style={{ backgroundColor: "#ddddff", padding: 15 }}>
							Fill <button onClick={() => setVisible((prev) => !prev)}>Toggle visible</button>
						</Fill>
						<Bottom id="nbottom" size="20%" style={{ backgroundColor: "#ffdddd", padding: 15 }}>
							Bottom
						</Bottom>
					</Fill>
					<Right id="nright" size="20%" style={{ backgroundColor: "#ddffdd", padding: 15 }}>
						Right
					</Right>
				</Fill>
				<Bottom id="bottom" size="15%" style={{ backgroundColor: "#ddddff", padding: 15 }}>
					Bottom
				</Bottom>
			</Fill>
			<Right id="right" size="15%" style={{ backgroundColor: "#ffdddd", padding: 15 }}>
				Right
			</Right>
		</ViewPort>
	);
};
