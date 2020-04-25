import { SyntheticEvent } from "react";
import { throttle } from "./throttle";

const RESIZE_THROTTLE = 5;

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

enum MoveEvent {
	Mouse = "mousemove",
	Touch = "touchmove",
}

enum EndEvent {
	Mouse = "mouseup",
	Touch = "touchend",
}

interface IResizeChange {
	x: number;
	y: number;
}

type ResizeType = "left" | "right" | "top" | "bottom";

export type SizeUnit = number | string | undefined;

export interface ICommonProps {
	id?: string;
	className?: string;
	style?: React.CSSProperties;
	as?: string;
	centerContent?: "none" | "vertical" | "horizontalVertical";
	zIndex?: number;
	scrollable?: boolean;
	onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
	trackSize?: boolean;
}

export interface ISpaceProps extends ICommonProps {
	type: Type;
	anchor?: Anchor;
	order?: number;
	position?: IPositionalProps;
}

export interface ISpaceStore {
	getSpaces: () => ISpaceDefinition[];
	getSpace: (id: string) => ISpaceDefinition | undefined;
	addSpace: (space: ISpaceDefinition) => void;
	updateSpace: (space: ISpaceDefinition, props: ISpaceProps) => void;
	removeSpace: (space: ISpaceDefinition) => void;
	createSpace: (parent: string | undefined, props: ISpaceProps, update: () => void) => ISpaceDefinition;
	startMouseResize: (resizeType: ResizeType, space: ISpaceDefinition, size: ISize, element: HTMLElement, e: React.MouseEvent<HTMLElement>) => void;
}

export interface IPositionalProps {
	left?: SizeUnit;
	leftResizable?: boolean;
	top?: SizeUnit;
	topResizable?: boolean;
	right?: SizeUnit;
	rightResizable?: boolean;
	bottom?: SizeUnit;
	bottomResizable?: boolean;
	width?: SizeUnit;
	height?: SizeUnit;
}

export interface ISize {
	size: SizeUnit;
	adjusted: SizeUnit[];
	resized: number;
}

export interface ISpaceDefinition {
	update: () => void;
	updateParent: () => void;
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
	dimension: DOMRect;
	centerContent: "none" | "vertical" | "horizontalVertical";
	resizing: boolean;
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

	if (size.resized !== 0) {
		parts.push(getSizeString(size.resized));
	}

	if (parts.length === 0) {
		return undefined;
	}

	return `calc(${parts.join(" + ")})`;
}

export function coalesce<T>(...args: T[]) {
	return args.find((x) => x !== null && x !== undefined);
}

function anchorUpdates(space: ISpaceDefinition) {
	return [
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
}

function sizeInfoDefault(size: SizeUnit) {
	return { size: size, adjusted: [], resized: 0 };
}

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

const spaceDefaults: Partial<ISpaceDefinition> = {
	id: "",
	order: 0,
	zIndex: 0,
	scrollable: false,
	resizing: false,
	centerContent: "none",
	dimension: { left: 0, top: 0, right: 0, bottom: 0, width: 0, height: 0, x: 0, y: 0, toJSON: () => "" },
	adjustLeft: () => false,
	adjustRight: () => false,
	adjustTop: () => false,
	adjustBottom: () => false,
	adjustEdge: () => false,
	anchoredChildren: () => [],
};

export function shortuuid() {
	let firstPart = (Math.random() * 46656) | 0;
	let secondPart = (Math.random() * 46656) | 0;
	return ("000" + firstPart.toString(36)).slice(-3) + ("000" + secondPart.toString(36)).slice(-3);
}

export function createStore(): ISpaceStore {
	let spaces: ISpaceDefinition[] = [];

	const setSpaces = (newSpaces: ISpaceDefinition[]) => {
		spaces = newSpaces;
	};

	const getSpace = (id: string) => {
		return getSpaces().find((s) => s.id === id);
	};

	const getSpaces = () => spaces;

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
							if (as.height.resized) {
								adjusted.push(as.height.resized);
							}
						} else {
							if (as.width.size) {
								adjusted.push(as.width.size);
							}
							if (as.width.resized) {
								adjusted.push(as.width.resized);
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
						if (as.height.resized) {
							adjusted.push(as.height.resized);
						}
					} else {
						if (as.width.size) {
							adjusted.push(as.width.size);
						}
						if (as.width.resized) {
							adjusted.push(as.width.resized);
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
	};

	function resizeEnd(space: ISpaceDefinition, resizeType: ResizeType, element: HTMLElement) {
		//const currentRect = element.getBoundingClientRect();
		// props.onResizeEnd &&
		// 	props.onResizeEnd(Math.floor(resizeType === ResizeType.Left || resizeType === ResizeType.Right ? currentRect.width : currentRect.height));
	}

	function onResize(
		space: ISpaceDefinition,
		parent: ISpaceDefinition | undefined,
		targetSize: ISize,
		resizeType: ResizeType,
		originalX: number,
		originalY: number,
		x: number,
		y: number,
		minimumAdjust: number,
		maximumAdjust: number | undefined,
		customResizeHandler?: (resizeDelta: IResizeChange) => void,
	) {
		const adjustmentX = Math.min(
			Math.max(resizeType === "left" ? originalX - x : x - originalX, minimumAdjust),
			maximumAdjust === undefined ? 999999 : maximumAdjust,
		);
		const adjustmentY = Math.min(
			Math.max(resizeType === "top" ? originalY - y : y - originalY, minimumAdjust),
			maximumAdjust === undefined ? 999999 : maximumAdjust,
		);

		if (customResizeHandler) {
			customResizeHandler({ x: adjustmentX, y: adjustmentY });
		} else {
			const adjustment = space.orientation === Orientation.Horizontal ? adjustmentX : adjustmentY;

			if (adjustment !== targetSize.resized) {
				targetSize.resized = adjustment;
				if (parent) {
					recalcSpaces(parent);
				}
				updateStyleDefinition(space);
			}
		}
	}

	function startResize<T extends SyntheticEvent<HTMLElement> | MouseEvent | TouchEvent>(
		resizeType: ResizeType,
		e: T,
		space: ISpaceDefinition,
		targetSize: ISize,
		element: HTMLElement,
		endEvent: EndEvent,
		moveEvent: MoveEvent,
		getCoords: (event: T) => { x: number; y: number },
	) {
		// if (props.onResizeStart) {
		// 	const result = props.onResizeStart();
		// 	if (typeof result === "boolean" && !result) {
		// 		return;
		// 	}
		// }

		space.resizing = true;
		space.updateParent();

		var rect = element.getBoundingClientRect();
		var size = space.orientation === Orientation.Horizontal ? rect.width : rect.height;
		const coords = getCoords(e);
		const originalMouseX = resizeType === "left" ? coords.x + targetSize.resized : coords.x - targetSize.resized;
		const originalMouseY = resizeType === "top" ? coords.y + targetSize.resized : coords.y - targetSize.resized;
		const minimumAdjust = 20 /*coalesce(props.minimumSize, 20)*/ - size + targetSize.resized;
		const maximumAdjust = undefined; //props.maximumSize ? props.maximumSize - size + space.adjustedSize : undefined;
		const parent = space.parentId ? getSpace(space.parentId) : undefined;

		let lastX = 0;
		let lastY = 0;
		let moved = false;

		const resize = (x: number, y: number) =>
			onResize(space, parent, targetSize, resizeType, originalMouseX, originalMouseY, x, y, minimumAdjust, maximumAdjust);

		const withPreventDefault = (e: T) => {
			moved = true;
			const newCoords = getCoords(e);
			lastX = newCoords.x;
			lastY = newCoords.y;
			e.preventDefault();

			throttle(resize, RESIZE_THROTTLE)(lastX, lastY);
		};

		const removeListener = () => {
			if (moved) {
				resize(lastX, lastY);
			}
			window.removeEventListener(moveEvent, withPreventDefault as EventListener);
			window.removeEventListener(endEvent, removeListener);

			space.resizing = false;
			space.updateParent();

			resizeEnd(space, resizeType, element /*, onResizeEnd */);
		};

		window.addEventListener(moveEvent, withPreventDefault as EventListener);
		window.addEventListener(endEvent, removeListener);
		e.preventDefault();
	}

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
			const { type, anchor, order, zIndex, scrollable, position, centerContent } = props;
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
		startMouseResize: (resizeType, space, size, element, event) => {
			startResize(resizeType, event, space, size, element, EndEvent.Mouse, MoveEvent.Mouse, (e) => ({
				x: e.pageX,
				y: e.pageY,
			}));
		},
	};

	store.createSpace = (parentId: string | undefined, props: ISpaceProps, update: () => void) => {
		const { position, anchor, type, ...commonProps } = props;

		const newSpace: ISpaceDefinition = {
			...spaceDefaults,
			...commonProps,
			...{
				store: store,
				update: update,
				updateParent: () => {
					if (parentId) {
						const parentSpace = store.getSpace(parentId);
						if (parentSpace) {
							parentSpace.update();
						}
					}
				},
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
