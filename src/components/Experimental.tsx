import * as React from "react";
import { SizeUnit } from "../types";
import "../styles.css";

export enum Type {
	ViewPort = "viewport",
	Fixed = "fixed",
	Fill = "fill",
	Anchored = "anchored",
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
	getSpaces: () => ISpaceDefinition[];
	getSpace: (id: string) => ISpaceDefinition | undefined;
	addSpace: (space: ISpaceDefinition) => void;
	updateSpace: (space: ISpaceDefinition, props: ISpaceProps) => void;
	removeSpace: (space: ISpaceDefinition) => void;
	createSpace: (parent: string | undefined, props: ISpaceProps) => ISpaceDefinition;
}

export interface IPositionalProps {
	left?: SizeUnit;
	top?: SizeUnit;
	right?: SizeUnit;
	bottom?: SizeUnit;
	width?: SizeUnit;
	height?: SizeUnit;
}

interface ISize {
	size: SizeUnit;
	adjusted: SizeUnit[];
	resized: number;
}

export interface ISpaceDefinition {
	adjustLeft: (adjusted: SizeUnit[]) => boolean;
	adjustRight: (adjusted: SizeUnit[]) => boolean;
	adjustTop: (adjusted: SizeUnit[]) => boolean;
	adjustBottom: (adjusted: SizeUnit[]) => boolean;
	adjustEdge: (adjusted: SizeUnit[]) => boolean;
	anchoredChildren: (anchor: Anchor, zIndex: number) => ISpaceDefinition[];
	id: string;
	type: Type;
	anchor?: Anchor;
	orientation: Orientation;
	scrollable: boolean;
	order: number;
	position: "fixed" | "absolute" | "relative";
	children: ISpaceDefinition[];
	parentId: string | undefined;
	store: ISpaceStore;
	left: ISize;
	top: ISize;
	right: ISize;
	bottom: ISize;
	width: ISize;
	height: ISize;
	zIndex: number;
	resizable: boolean;
	centerContent: "none" | "vertical" | "horizontalVertical";
}

function getSizeString(size: SizeUnit) {
	return typeof size === "string" ? size : `${size}px`;
}

function css(size: ISize) {
	if (size.size === 0 && size.adjusted.length === 0 && size.resized === 0) {
		return `0`;
	}

	const parts: string[] = [];
	if (size.size !== undefined) {
		parts.push(getSizeString(size.size));
	}

	size.adjusted.forEach((l) => parts.push(getSizeString(l)));

	if (parts.length === 0) {
		return undefined;
	}

	return `calc(${parts.join(" + ")})`;
}

function coalesce<T>(...args: T[]) {
	return args.find((x) => x !== null && x !== undefined);
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

const sizeInfoDefault = (size: SizeUnit) => ({ size: size, adjusted: [], resized: 0 });

const spaceDefaults: Partial<ISpaceDefinition> = {
	id: "",
	order: 0,
	zIndex: 0,
	scrollable: false,
	resizable: false,
	centerContent: "none",
	adjustLeft: () => false,
	adjustRight: () => false,
	adjustTop: () => false,
	adjustBottom: () => false,
	adjustEdge: () => false,
	anchoredChildren: () => [],
};

function getPosition(type: Type) {
	if (type === Type.ViewPort) {
		return "fixed";
	}
	if (type === Type.Fixed) {
		return "relative";
	}
	return "absolute";
}

function getOrientation(anchor: Anchor | undefined) {
	return anchor === Anchor.Bottom || anchor === Anchor.Top ? Orientation.Vertical : Orientation.Horizontal;
}

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

function styleDefinition(space: ISpaceDefinition) {
	const style: React.CSSProperties = {
		position: space.position,
		left: css(space.left),
		top: css(space.top),
		right: css(space.right),
		bottom: css(space.bottom),
		width: css(space.width),
		height: css(space.height),
		zIndex: space.zIndex,
	};

	const cssString: string[] = [];

	if (space.scrollable) {
		cssString.push(`overflow: auto;`);
	}
	if (style.position) {
		cssString.push(`position: ${style.position};`);
	}
	if (style.left) {
		cssString.push(`left: ${style.left};`);
	}
	if (style.top) {
		cssString.push(`top: ${style.top};`);
	}
	if (style.right) {
		cssString.push(`right: ${style.right};`);
	}
	if (style.bottom) {
		cssString.push(`bottom: ${style.bottom};`);
	}
	if (style.width) {
		cssString.push(`width: ${style.width};`);
	}
	if (style.height) {
		cssString.push(`height: ${style.height};`);
	}
	if (style.zIndex) {
		cssString.push(`z-index: ${style.zIndex};`);
	}

	return `#${space.id} { ${cssString.join(" ")} }`;
}

function shortuuid() {
	let firstPart = (Math.random() * 46656) | 0;
	let secondPart = (Math.random() * 46656) | 0;
	return ("000" + firstPart.toString(36)).slice(-3) + ("000" + secondPart.toString(36)).slice(-3);
}

function updateStyleDefinition(space: ISpaceDefinition) {
	const definition = styleDefinition(space);
	const existing = document.getElementById(`style_${space.id}`);
	if (existing) {
		if (existing.innerHTML !== definition) {
			existing.innerHTML = definition;
		}
	} else {
		const newStyle = document.createElement("style");
		newStyle.id = `style_${space.id}`;
		newStyle.innerHTML = definition;
		document.head.appendChild(newStyle);
	}
}

function removeStyleDefinition(space: ISpaceDefinition) {
	const existing = document.getElementById(`style_${space.id}`);
	if (existing) {
		document.head.removeChild(existing);
	}
}

const currentStore = createStore();

function createStore(): ISpaceStore {
	let spaces: ISpaceDefinition[] = [];

	const setSpaces = (newSpaces: ISpaceDefinition[]) => {
		spaces = newSpaces;
	};
	const getSpace = (id: string) => {
		return getSpaces().find((s) => s.id === id);
	};
	const getSpaces = () => spaces;

	const recalcSpaces = (parent: ISpaceDefinition) => {
		const queuedUpdates: (() => void)[] = [];

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
				const anchoredSpaces = parent
					.anchoredChildren(space.anchor!, space.zIndex)
					.filter((s) => s.id !== space.id && s.order <= space.order);

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
				updateStyleDefinition(space);
			}
		}

		return queuedUpdates;
	};

	const store: ISpaceStore = {
		getSpaces: getSpaces,
		getSpace: getSpace,
		addSpace: (space) => {
			getSpaces().push(space);

			if (space.parentId) {
				const parentSpace = getSpace(space.parentId);
				if (parentSpace) {
					parentSpace.children.push(space);
					recalcSpaces(parentSpace);
				}
			}

			updateStyleDefinition(space);
		},
		removeSpace: (space) => {
			setSpaces(getSpaces().filter((s) => s.id !== space.id));

			if (space.parentId) {
				const parentSpace = getSpace(space.parentId);
				if (parentSpace) {
					parentSpace.children = parentSpace.children.filter((s) => s.id !== space.id);
					recalcSpaces(parentSpace);
				}
			}

			removeStyleDefinition(space);
		},
		updateSpace: (space, props) => {
			const { type, anchor, order, zIndex, scrollable, position, resizable, centerContent } = props;
			let changed = false;

			if (space.type !== type) {
				space.type = type;
				space.position = getPosition(type);
				changed = true;
			}

			if (space.anchor !== anchor) {
				space.anchor = anchor;
				space.orientation = getOrientation(anchor);
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

			if (space.width.size !== (position && position.width)) {
				space.width.size = position && position.width;
				space.width.resized = 0;
				changed = true;
			}

			if (space.height.size !== (position && position.height)) {
				space.height.size = position && position.height;
				space.height.resized = 0;
				changed = true;
			}

			if (coalesce(space.order, 0) !== coalesce(order, 0)) {
				space.order = coalesce(order, 0)!;
				changed = true;
			}

			if (coalesce(space.zIndex, 0) !== coalesce(zIndex, 0)) {
				space.zIndex = coalesce(zIndex, 0)!;
				changed = true;
			}

			if (coalesce(space.scrollable, false) !== coalesce(scrollable, false)) {
				space.scrollable = coalesce(scrollable, false)!;
				changed = true;
			}

			if (coalesce(space.resizable, false) !== coalesce(resizable, false)) {
				space.resizable = coalesce(resizable, false)!;
				changed = true;
			}

			if (coalesce(space.centerContent, "none") !== coalesce(centerContent, "none")) {
				space.centerContent = coalesce(centerContent, "none")!;
				changed = true;
			}

			if (changed) {
				if (space.parentId) {
					const parentSpace = getSpace(space.parentId);
					if (parentSpace) {
						recalcSpaces(parentSpace);
					}
				}
				updateStyleDefinition(space);
			}
		},
		createSpace: () => ({} as ISpaceDefinition),
	};

	store.createSpace = (parentId: string | undefined, props: ISpaceProps) => {
		const { position, anchor, type, ...commonProps } = props;

		const newSpace: ISpaceDefinition = {
			...spaceDefaults,
			...commonProps,
			...{
				store: store,
				parentId: parentId,
				children: [],
				anchor: anchor,
				type: type,
				orientation: getOrientation(anchor),
				position: getPosition(type),
				left: sizeInfoDefault(position && position.left),
				right: sizeInfoDefault(position && position.right),
				top: sizeInfoDefault(position && position.top),
				bottom: sizeInfoDefault(position && position.bottom),
				width: sizeInfoDefault(position && position.width),
				height: sizeInfoDefault(position && position.height),
			},
		} as ISpaceDefinition;

		newSpace.anchoredChildren = (anchor, zIndex) =>
			newSpace.children.filter((s) => s.type === Type.Anchored && s.anchor === anchor && s.zIndex === zIndex);

		newSpace.adjustLeft = (adjusted) => {
			if (adjustmentsEqual(newSpace.left.adjusted, adjusted)) {
				return false;
			}

			newSpace.left.adjusted = adjusted;
			return true;
		};

		newSpace.adjustRight = (adjusted) => {
			if (adjustmentsEqual(newSpace.right.adjusted, adjusted)) {
				return false;
			}

			newSpace.right.adjusted = adjusted;
			return true;
		};

		newSpace.adjustTop = (adjusted) => {
			if (adjustmentsEqual(newSpace.top.adjusted, adjusted)) {
				return false;
			}

			newSpace.top.adjusted = adjusted;
			return true;
		};

		newSpace.adjustBottom = (adjusted) => {
			if (adjustmentsEqual(newSpace.bottom.adjusted, adjusted)) {
				return false;
			}

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

const ParentContext = React.createContext<string | undefined>(undefined);
const LayerContext = React.createContext<number | undefined>(undefined);

function useSpace(props: ISpaceProps) {
	const store = currentStore;
	const parent = React.useContext(ParentContext);
	const layer = React.useContext(LayerContext);
	const spaceId = React.useRef(props.id || `s${shortuuid()}`);

	let space = store.getSpace(spaceId.current);

	const parsedProps = {
		...props,
		...{
			id: spaceId.current,
			zIndex: coalesce(props.zIndex, layer),
		},
	};

	if (!space) {
		space = store.createSpace(parent, parsedProps);
		store.addSpace(space);
	} else {
		store.updateSpace(space, parsedProps);
	}

	React.useEffect(() => {
		return () => {
			store.removeSpace(space!);
		};
	}, []);

	return space;
}

interface IFixedProps extends ICommonProps {
	width?: SizeUnit;
	height: SizeUnit;
}

export const Fixed: React.FC<IFixedProps> = (props) => {
	const { width, height, children, ...commonProps } = props;
	return (
		<Space {...commonProps} type={Type.Fixed} position={{ width: width, height: height }}>
			{children}
		</Space>
	);
};

interface IViewPortProps extends ICommonProps {
	left?: SizeUnit;
	right?: SizeUnit;
	top?: SizeUnit;
	bottom?: SizeUnit;
}

export const ViewPort: React.FC<IViewPortProps> = (props) => {
	const { left, top, right, bottom, children, ...commonProps } = props;
	return (
		<Space {...commonProps} type={Type.ViewPort} position={{ left: left || 0, top: top || 0, right: right || 0, bottom: bottom || 0 }}>
			{children}
		</Space>
	);
};

interface ICommonProps {
	id?: string;
	className?: string;
	style?: React.CSSProperties;
	as?: string;
	centerContent?: "none" | "vertical" | "horizontalVertical";
	zIndex?: number;
	scrollable?: boolean;
	onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

interface IAnchorProps extends ICommonProps {
	id?: string;
	size: SizeUnit;
	order?: number;
	resizable?: boolean;
}

export const LeftResizable: React.FC<Omit<IAnchorProps, "resizable">> = (props) => (
	<Left {...props} resizable={true}>
		{props.children}
	</Left>
);

export const Left: React.FC<IAnchorProps> = (props) => {
	const { size, children, ...commonProps } = props;
	return (
		<Space {...commonProps} type={Type.Anchored} anchor={Anchor.Left} position={{ left: 0, top: 0, bottom: 0, width: size }}>
			{children}
		</Space>
	);
};

export const TopResizable: React.FC<Omit<IAnchorProps, "resizable">> = (props) => (
	<Top {...props} resizable={true}>
		{props.children}
	</Top>
);

export const Top: React.FC<IAnchorProps> = (props) => {
	const { size, children, ...commonProps } = props;
	return (
		<Space {...commonProps} type={Type.Anchored} anchor={Anchor.Top} position={{ left: 0, top: 0, right: 0, height: size }}>
			{children}
		</Space>
	);
};

export const RightResizable: React.FC<Omit<IAnchorProps, "resizable">> = (props) => (
	<Right {...props} resizable={true}>
		{props.children}
	</Right>
);

export const Right: React.FC<IAnchorProps> = (props) => {
	const { size, children, ...commonProps } = props;
	return (
		<Space {...commonProps} type={Type.Anchored} anchor={Anchor.Right} position={{ bottom: 0, top: 0, right: 0, width: size }}>
			{children}
		</Space>
	);
};

export const BottomResizable: React.FC<Omit<IAnchorProps, "resizable">> = (props) => (
	<Bottom {...props} resizable={true}>
		{props.children}
	</Bottom>
);

export const Bottom: React.FC<IAnchorProps> = (props) => {
	const { size, children, ...commonProps } = props;
	return (
		<Space {...commonProps} type={Type.Anchored} anchor={Anchor.Bottom} position={{ bottom: 0, left: 0, right: 0, height: size }}>
			{children}
		</Space>
	);
};

export const Fill: React.FC<ICommonProps> = (props) => {
	return (
		<Space {...props} type={Type.Fill} position={{ left: 0, top: 0, right: 0, bottom: 0 }}>
			{props.children}
		</Space>
	);
};

export const Centered: React.FC = (props) => <div className={`spaces-centered`}>{props.children}</div>;

export const CenteredVertically: React.FC = (props) => <div className={`spaces-centered-vertically`}>{props.children}</div>;

export const Layer: React.FC<{ zIndex: number }> = (props) => <LayerContext.Provider value={props.zIndex}>{props.children}</LayerContext.Provider>;

interface ISpaceProps extends ICommonProps {
	type: Type;
	anchor?: Anchor;
	order?: number;
	position?: IPositionalProps;
	resizable?: boolean;
}

const Space: React.FC<ISpaceProps> = (props) => {
	const { style, className, onClick } = props;
	let { children } = props;
	const space = useSpace(props);

	if (props.centerContent === "vertical") {
		children = <CenteredVertically>{children}</CenteredVertically>;
	} else if (props.centerContent === "horizontalVertical") {
		children = <Centered>{children}</Centered>;
	}

	return (
		<>
			{React.createElement(
				props.as || "div",
				{
					id: space.id,
					style: style,
					className: `spaces-space${className ? ` ${className}` : ""}`,
					onClick: onClick,
				},
				<ParentContext.Provider value={space.id}>
					<LayerContext.Provider value={undefined}>{children}</LayerContext.Provider>
				</ParentContext.Provider>,
			)}
		</>
	);
};

const white = { backgroundColor: "#ffffff", padding: 15 };
const green = { backgroundColor: "#ddffdd", padding: 15 };
const red = { backgroundColor: "#ffdddd", padding: 15 };
const blue = { backgroundColor: "#ddddff", padding: 15 };

export const Demo: React.FC = () => {
	const [visible, setVisible] = React.useState(true);
	const [size, setSize] = React.useState(true);
	const [side, setSide] = React.useState(true);
	return (
		<ViewPort as="main">
			<Left as="aside" size="15%" style={red}>
				Left
			</Left>
			<Fill>
				<Layer zIndex={1}>
					<Top size="15%" style={blue} centerContent={"horizontalVertical"}>
						Top
					</Top>
					<Fill>
						{visible && (
							<Left size={size ? "10%" : "15%"} order={0} style={green} centerContent={"horizontalVertical"}>
								Left 1
								<div>
									<button onClick={() => setSize((prev) => !prev)}>Toggle size</button>
								</div>
							</Left>
						)}
						<Left size={"10%"} order={1} style={red} centerContent={"horizontalVertical"}>
							Left 2
						</Left>
						<Fill>
							<Top size="20%" order={1} style={red} centerContent={"horizontalVertical"}>
								Top 1
							</Top>
							<Fill style={blue}>
								{side ? (
									<Left size="20%" style={white} centerContent={"horizontalVertical"}>
										Left 2
										<div>
											<button onClick={() => setSide((prev) => !prev)}>Toggle side</button>
										</div>
									</Left>
								) : (
									<Top size="20%" style={white} centerContent={"horizontalVertical"}>
										Top
										<div>
											<button onClick={() => setSide((prev) => !prev)}>Toggle side</button>
										</div>
									</Top>
								)}
								<Fill centerContent={"horizontalVertical"}>
									Fill
									<div>
										<button onClick={() => setVisible((prev) => !prev)}>Toggle visible</button>
									</div>
								</Fill>
							</Fill>
							<Bottom size="20%" style={red} centerContent={"horizontalVertical"}>
								Bottom
							</Bottom>
						</Fill>
						<Right size="20%" style={green} scrollable={true}>
							Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nam quasi ipsam autem deserunt facere mollitia asperiores nisi,
							fugiat iste cumque quo perspiciatis corporis error accusamus placeat eaque minima a, cupiditate voluptatum. Asperiores
							itaque vitae, maxime maiores iste beatae cumque, ipsum ut laboriosam alias minima ducimus numquam, quas voluptas aliquid
							omnis cupiditate fuga accusamus nemo fugit at nam reiciendis commodi quo! Odit, totam expedita laboriosam nobis
							consequatur, aperiam esse laudantium mollitia reprehenderit corporis aut unde cum delectus sed illo reiciendis voluptas
							eveniet doloribus aspernatur magnam minima, dolorem molestiae culpa! Officiis sit, doloremque veniam asperiores maiores
							fuga eveniet necessitatibus ratione delectus porro laborum minima sed ipsum aliquid dolorum eos perferendis culpa est
							totam, saepe sapiente numquam. Eveniet ipsam blanditiis iure a? Magnam quo dicta nihil velit. Fuga sit porro consectetur
							quidem! Error, dignissimos ipsa? Minus quod nulla libero fuga eligendi, nemo magnam quis. Aspernatur similique tenetur
							fugit earum distinctio. Officiis laudantium corporis facilis quia tenetur. In tempore vel, optio nihil molestias ab fuga
							vero esse amet iusto cupiditate hic molestiae suscipit non sint eum ad laudantium. Ducimus eum reiciendis consequuntur,
							sint deleniti temporibus quod ex aliquid beatae veniam officiis soluta commodi earum explicabo rerum laudantium adipisci
							dicta veritatis consequatur voluptates maxime fuga.
						</Right>
					</Fill>
					<Bottom size="15%" style={blue} centerContent={"horizontalVertical"}>
						Bottom
					</Bottom>
				</Layer>
			</Fill>
			<Right size="15%" style={red} centerContent={"horizontalVertical"}>
				Right
			</Right>
		</ViewPort>
	);
};
