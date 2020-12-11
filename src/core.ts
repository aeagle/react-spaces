import { ISpaceDefinition, SizeUnit, AnchorType, Type, Orientation, ISpaceStore, ISpaceProps, CenterType, ResizeHandlePlacement } from "./core-types";
import { EndEvent, MoveEvent, createResize } from "./core-resizing";
import { updateStyleDefinition, removeStyleDefinition, coalesce, adjustmentsEqual } from "./core-utils";

const spaceDefaults: Partial<ISpaceDefinition> = {
	id: "",
	order: 0,
	zIndex: 0,
	scrollable: false,
	resizing: false,
	centerContent: "none",
	dimension: { left: 0, top: 0, right: 0, bottom: 0, width: 0, height: 0, x: 0, y: 0, toJSON: () => "" },
	handleSize: 5,
	touchHandleSize: 5,
	handlePlacement: ResizeHandlePlacement.OverlayInside,
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

function getOrientation(anchor: AnchorType | undefined) {
	return anchor === AnchorType.Bottom || anchor === AnchorType.Top ? Orientation.Vertical : Orientation.Horizontal;
}

function anchorUpdates(space: ISpaceDefinition) {
	return [
		{
			anchor: AnchorType.Left,
			update: space.adjustLeft,
		},
		{
			anchor: AnchorType.Top,
			update: space.adjustTop,
		},
		{
			anchor: AnchorType.Right,
			update: space.adjustRight,
		},
		{
			anchor: AnchorType.Bottom,
			update: space.adjustBottom,
		},
	];
}

function sizeInfoDefault(size: SizeUnit) {
	return { size: size, adjusted: [], resized: 0 };
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
		updateStyles: (space) => {
			if (space.parentId) {
				const parent = getSpace(space.parentId);
				if (parent) {
					recalcSpaces(parent);
				}
			}
			updateStyleDefinition(space);
		},
		updateSpace: (space, props) => {
			const {
				type,
				anchor,
				order,
				zIndex,
				scrollable,
				position,
				centerContent,
				minimumSize,
				maximumSize,
				handleSize,
				touchHandleSize,
				handlePlacement
			} = props;
			const canResizeLeft = (position && position.rightResizable) || false;
			const canResizeRight = (position && position.leftResizable) || false;
			const canResizeTop = (position && position.bottomResizable) || false;
			const canResizeBottom = (position && position.topResizable) || false;

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
					if (anchor === AnchorType.Left) {
						space.adjustEdge = space.adjustLeft;
					} else if (anchor === AnchorType.Top) {
						space.adjustEdge = space.adjustTop;
					} else if (anchor === AnchorType.Right) {
						space.adjustEdge = space.adjustRight;
					} else if (anchor === AnchorType.Bottom) {
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

			if (space.minimumSize !== minimumSize) {
				space.minimumSize = minimumSize;
				changed = true;
			}

			if (space.maximumSize !== maximumSize) {
				space.maximumSize = maximumSize;
				changed = true;
			}

			if (coalesce(space.centerContent, CenterType.None) !== coalesce(centerContent, CenterType.None)) {
				space.centerContent = coalesce(centerContent, CenterType.None)!;
				changed = true;
			}

			if (space.handleSize !== handleSize) {
				space.handleSize = handleSize || spaceDefaults.handleSize!;
				changed = true;
			}

			if (space.touchHandleSize !== touchHandleSize) {
				space.touchHandleSize = touchHandleSize || spaceDefaults.touchHandleSize!;
				changed = true;
			}

			if (space.handlePlacement !== handlePlacement) {
				space.handlePlacement = handlePlacement || spaceDefaults.handlePlacement!;
				changed = true;
			}

			if (space.canResizeBottom !== canResizeBottom) {
				space.canResizeBottom = canResizeBottom;
				changed = true;
			}

			if (space.canResizeTop !== canResizeTop) {
				space.canResizeTop = canResizeTop;
				changed = true;
			}

			if (space.canResizeLeft !== canResizeLeft) {
				space.canResizeLeft = canResizeLeft;
				changed = true;
			}

			if (space.canResizeRight !== canResizeRight) {
				space.canResizeRight = canResizeRight;
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
		startMouseResize: () => null,
		startTouchResize: () => null,
	};

	const resize = createResize(store);

	store.createSpace = (parentId: string | undefined, props: ISpaceProps, update: () => void) => {
		const { position, anchor, type, ...commonProps } = props;
		const canResizeLeft = (position && position.rightResizable) || false;
		const canResizeRight = (position && position.leftResizable) || false;
		const canResizeTop = (position && position.bottomResizable) || false;
		const canResizeBottom = (position && position.topResizable) || false;

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
				canResizeLeft: canResizeLeft,
				canResizeRight: canResizeRight,
				canResizeTop: canResizeTop,
				canResizeBottom: canResizeBottom,
			},
		} as ISpaceDefinition;

		newSpace.anchoredChildren = (anchor, zIndex) => {
			const children = newSpace.children.filter((s) => s.type === Type.Anchored && s.anchor === anchor && s.zIndex === zIndex);
			const orderedChildren = children.filter(c => c.order !== undefined);
			const unorderedChildren = children.filter(c => c.order === undefined);
			var maxOrder = orderedChildren.length > 0 ? orderedChildren.map(a => a.order).reduce((a, b) => Math.max(a, b)) : 0;
			return [...orderedChildren, ...unorderedChildren.map((c, idx) => ({...c, ...{ order: maxOrder + idx + 1 }}))];
		}

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
			if (anchor === AnchorType.Left) {
				newSpace.adjustEdge = newSpace.adjustLeft;
			} else if (anchor === AnchorType.Top) {
				newSpace.adjustEdge = newSpace.adjustTop;
			} else if (anchor === AnchorType.Right) {
				newSpace.adjustEdge = newSpace.adjustRight;
			} else if (anchor === AnchorType.Bottom) {
				newSpace.adjustEdge = newSpace.adjustBottom;
			}
		}

		return newSpace;
	};

	store.startMouseResize = (resizeType, space, size, event) => {
		resize.startResize(resizeType, event, space, size, EndEvent.Mouse, MoveEvent.Mouse, (e) => ({
			x: e.clientX,
			y: e.clientY,
		}));
	};

	store.startTouchResize = (resizeType, space, size, event) => {
		resize.startResize(resizeType, event, space, size, EndEvent.Touch, MoveEvent.Touch, (e) => ({
			x: e.touches[0].clientX,
			y: e.touches[0].clientY,
		}));
	};

	return store;
}
