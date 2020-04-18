import * as React from "react";
import { SizeUnit } from "../types";

export enum Type {
	ViewPort = "viewport",
	Fill = "fill",
	Anchored = "anchored",
}

export enum Anchor {
	Left = "left",
	Top = "top",
	Right = "right",
	Bottom = "bottom",
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
	order?: number;
	position: "fixed" | "absolute";
	children: ISpaceDefinition[];
	parent: ISpaceDefinition | undefined;
	store: ISpaceStore;
}

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
				space.left = 0;
				space.top = 0;
				space.right = 0;
				space.bottom = 0;

				[
					{
						anchor: Anchor.Left,
						update: (space: ISpaceDefinition, anchoredSpace: ISpaceDefinition) => {
							space.left += anchoredSpace.width;
						},
					},
					{
						anchor: Anchor.Top,
						update: (space: ISpaceDefinition, anchoredSpace: ISpaceDefinition) => {
							space.top += anchoredSpace.height;
						},
					},
					{
						anchor: Anchor.Right,
						update: (space: ISpaceDefinition, anchoredSpace: ISpaceDefinition) => {
							space.right += anchoredSpace.width;
						},
					},
					{
						anchor: Anchor.Bottom,
						update: (space: ISpaceDefinition, anchoredSpace: ISpaceDefinition) => {
							space.bottom += anchoredSpace.height;
						},
					},
				].forEach((info) => {
					const anchoredSpaces = parent.children.filter((s) => s.type === Type.Anchored && s.anchor === info.anchor);
					anchoredSpaces.forEach((as) => {
						info.update(space, as);
					});
				});
			} else if (space.type === Type.Anchored) {
				if (space.anchor === Anchor.Left) {
					space.left = 0;
				} else if (space.anchor === Anchor.Right) {
					space.right = 0;
				} else if (space.anchor === Anchor.Top) {
					space.top = 0;
				} else if (space.anchor === Anchor.Bottom) {
					space.bottom = 0;
				}

				const anchoredSpaces = parent.children.filter(
					(s) => s.type === Type.Anchored && s.anchor === space.anchor && s.id !== space.id && (s.order || 0) < (space.order || 0),
				);

				anchoredSpaces.forEach((as) => {
					if (as.anchor === Anchor.Left) {
						if (as.width) {
							space.left += as.width;
						}
					} else if (as.anchor === Anchor.Right) {
						if (as.width) {
							space.right += as.width;
						}
					} else if (as.anchor === Anchor.Top) {
						if (as.height) {
							space.top += as.height;
						}
					} else if (as.anchor === Anchor.Bottom) {
						if (as.height) {
							space.bottom += as.height;
						}
					}
				});
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
		...{
			store: store,
			parent: parent,
			update: update,
			invalid: true,
			id: id,
			type: type,
			anchor: anchor,
			order: order,
			position: type === Type.ViewPort ? "fixed" : "absolute",
			children: [],
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
			<ParentContext.Provider value={space}>{props.children}</ParentContext.Provider>
		</div>
	);
};
