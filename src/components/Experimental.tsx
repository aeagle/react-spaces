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

export interface ISpaceDefinition extends IPositionalProps {
	update: () => void;
	invalid: boolean;
	id: string;
	type: Type;
	anchor?: Anchor;
	orientation: Orientation;
	order?: number;
	position: "fixed" | "absolute";
	children: ISpaceDefinition[];
	parent: ISpaceDefinition | undefined;
	store: ISpaceStore;
	adjustedLeft: SizeUnit[];
	adjustedTop: SizeUnit[];
	adjustedRight: SizeUnit[];
	adjustedBottom: SizeUnit[];
	resizedLeft: SizeUnit;
	resizedTop: SizeUnit;
	resizedBottom: SizeUnit;
	resizedRight: SizeUnit;
	resizedWidth: SizeUnit;
	resizedHeight: SizeUnit;
}

const getSizeString = (size: SizeUnit) => (typeof size === "string" ? size : `${size}${size !== 0 ? "px" : ""}`);

const cssLeft = (space: ISpaceDefinition) => {
	const parts: string[] = [];

	if (space.left !== undefined) {
		parts.push(getSizeString(space.left));
	}

	space.adjustedLeft.forEach((l) => parts.push(getSizeString(l)));

	if (parts.length === 0) {
		return undefined;
	}

	return `calc(${parts.join(" + ")})`;
};

const cssTop = (space: ISpaceDefinition) => {
	const parts: string[] = [];

	if (space.top !== undefined) {
		parts.push(getSizeString(space.top));
	}

	space.adjustedTop.forEach((l) => parts.push(getSizeString(l)));

	if (parts.length === 0) {
		return undefined;
	}

	return `calc(${parts.join(" + ")})`;
};

const cssRight = (space: ISpaceDefinition) => {
	const parts: string[] = [];

	if (space.right !== undefined) {
		parts.push(getSizeString(space.right));
	}

	space.adjustedRight.forEach((l) => parts.push(getSizeString(l)));

	if (parts.length === 0) {
		return undefined;
	}

	return `calc(${parts.join(" + ")})`;
};

const cssBottom = (space: ISpaceDefinition) => {
	const parts: string[] = [];

	if (space.bottom !== undefined) {
		parts.push(getSizeString(space.bottom));
	}

	space.adjustedBottom.forEach((l) => parts.push(getSizeString(l)));

	if (parts.length === 0) {
		return undefined;
	}

	return `calc(${parts.join(" + ")})`;
};

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
				const adjusted: SizeUnit[] = [];

				[
					{
						anchor: Anchor.Left,
						update: (adjusted: SizeUnit[]) => {
							space.adjustedLeft = adjusted;
						},
					},
					{
						anchor: Anchor.Top,
						update: (adjusted: SizeUnit[]) => {
							space.adjustedTop = adjusted;
						},
					},
					{
						anchor: Anchor.Right,
						update: (adjusted: SizeUnit[]) => {
							space.adjustedRight = adjusted;
						},
					},
					{
						anchor: Anchor.Bottom,
						update: (adjusted: SizeUnit[]) => {
							space.adjustedBottom = adjusted;
						},
					},
				].forEach((info) => {
					const anchoredSpaces = parent.children.filter((s) => s.type === Type.Anchored && s.anchor === info.anchor);

					anchoredSpaces.forEach((as) => {
						if (as.orientation === Orientation.Vertical) {
							if (as.height) {
								adjusted.push(as.height);
							}
						} else {
							if (as.width) {
								adjusted.push(as.width);
							}
						}
					});

					info.update(adjusted);
				});
			} else if (space.type === Type.Anchored) {
				const adjusted: SizeUnit[] = [];

				const anchoredSpaces = parent.children.filter(
					(s) => s.type === Type.Anchored && s.anchor === space.anchor && s.id !== space.id && (s.order || 0) < (space.order || 0),
				);

				anchoredSpaces.forEach((as) => {
					if (as.orientation === Orientation.Vertical) {
						if (as.height) {
							adjusted.push(as.height);
						}
					} else {
						if (as.width) {
							adjusted.push(as.width);
						}
					}
				});

				if (space.anchor === Anchor.Left) {
					space.adjustedLeft = adjusted;
				} else if (space.anchor === Anchor.Top) {
					space.adjustedTop = adjusted;
				} else if (space.anchor === Anchor.Right) {
					space.adjustedRight = adjusted;
				} else if (space.anchor === Anchor.Bottom) {
					space.adjustedBottom = adjusted;
				}
			}

			queueUpdate();
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
		...{
			store: store,
			parent: parent,
			update: update,
			invalid: true,
			id: id,
			type: type,
			anchor: anchor,
			orientation: anchor === Anchor.Bottom || anchor === Anchor.Top ? Orientation.Vertical : Orientation.Horizontal,
			order: order,
			position: type === Type.ViewPort ? "fixed" : "absolute",
			children: [],
			adjustedLeft: [],
			adjustedTop: [],
			adjustedRight: [],
			adjustedBottom: [],
			resizedLeft: 0,
			resizedTop: 0,
			resizedRight: 0,
			resizedBottom: 0,
			resizedWidth: 0,
			resizedHeight: 0,
		},
		...position,
	};

	store.addSpace(newSpace);

	return newSpace;
};

export const Left: React.FC<{
	id: string;
	size: SizeUnit;
	order?: number;
	style: React.CSSProperties;
}> = (props) => {
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

export const Top: React.FC<{
	id: string;
	size: SizeUnit;
	order?: number;
	style: React.CSSProperties;
}> = (props) => {
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

export const Right: React.FC<{
	id: string;
	size: SizeUnit;
	order?: number;
	style: React.CSSProperties;
}> = (props) => {
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

export const Bottom: React.FC<{
	id: string;
	size: SizeUnit;
	order?: number;
	style: React.CSSProperties;
}> = (props) => {
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
		<Space id={props.id} type={Type.Fill} style={props.style}>
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
			left: cssLeft(space),
			top: cssTop(space),
			right: cssRight(space),
			bottom: cssBottom(space),
			width: space.width,
			height: space.height,
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
