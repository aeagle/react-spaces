import { ISpaceDefinition, SizeUnit, ISize, ResizeHandlePlacement, Type, Orientation } from "./core-types";

export const asRecord = (obj: any) => (obj as unknown) as Record<string, object>;

export function omit<K extends string, T extends Record<K, unknown>>(object: T, ...keys: K[]): Omit<T, K> {
	const keySet = Object.create(null) as Record<K, true>;
	keys.forEach((key) => {
		keySet[key] = true;
	});

	const result = Object.create(null) as Omit<T, K>;
	Object.keys(object).forEach((key) => {
		if (!asRecord(keySet)[key]) {
			asRecord(result)[key] = asRecord(object)[key];
		}
	});

	return result;
}

export function shortuuid() {
	let firstPart = (Math.random() * 46656) | 0;
	let secondPart = (Math.random() * 46656) | 0;
	return ("000" + firstPart.toString(36)).slice(-3) + ("000" + secondPart.toString(36)).slice(-3);
}

export function getSizeString(size: SizeUnit) {
	return typeof size === "string" ? size : `${size}px`;
}

export function css(size: ISize, dontAddCalc?: boolean) {
	if (size.size === 0 && size.adjusted.length === 0 && size.resized === 0) {
		return `0px`;
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

	if (parts.length === 1) {
		return parts[0];
	}

	if (dontAddCalc) {
		return parts.join(" + ");
	}

	return `calc(${parts.join(" + ")})`;
}

export function coalesce<T>(...args: T[]) {
	return args.find((x) => x !== null && x !== undefined);
}

export function adjustmentsEqual(item1: SizeUnit[], item2: SizeUnit[]) {
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

export function throttle<F extends (...args: any) => any>(callback: F, limit: number) {
	var wait = false; // Initially, we're not waiting
	return function(...args: any) {
		// We return a throttled function
		if (!wait) {
			// If we're not waiting
			callback(...args); // Execute users function
			wait = true; // Prevent future invocations
			setTimeout(function() {
				// After a period of time
				wait = false; // And allow future invocations
			}, limit);
		}
	};
}

export function styleDefinition(space: ISpaceDefinition) {
	const cssElements: string[] = [];

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
	if (space.allowOverflow) {
		cssString.push("overflow: visible;");
	}

	if (cssString.length > 0) {
		cssElements.push(`#${space.id} { ${cssString.join(" ")} }`);
	}

	if (space.scrollable) {
		cssElements.push(`#${space.id} > .spaces-space-inner { overflow: auto; touch-action: auto; }`);
	}

	let nhandleOffset = 0;
	const handleSize = `${space.handleSize}px`;
	const touchHandleSize = `-${space.touchHandleSize / 2 - space.handleSize / 2}px`;
	const negativeTouchHandleSize = `${space.touchHandleSize / 2 - space.handleSize / 2}px`;

	switch (space.handlePlacement) {
		case ResizeHandlePlacement.Inside:
		case ResizeHandlePlacement.OverlayInside:
			nhandleOffset = space.handleSize;
			if (space.type === Type.Positioned) {
				nhandleOffset = 0;
			}
			break;
		case ResizeHandlePlacement.OverlayBoundary:
			nhandleOffset = space.handleSize / 2;
			break;
	}

	const handleOffset = `${nhandleOffset}px`;

	const addHandleCss = (id: string, pos: { left?: string; top?: string; right?: string; bottom?: string; width?: string; height?: string }) => {
		const styles: string[] = [];

		if (pos.left) styles.push(`left: ${pos.left}`);
		if (pos.top) styles.push(`top: ${pos.top}`);
		if (pos.right) styles.push(`right: ${pos.right}`);
		if (pos.bottom) styles.push(`bottom: ${pos.bottom}`);
		if (pos.width) styles.push(`width: ${pos.width}`);
		if (pos.height) styles.push(`height: ${pos.height}`);

		cssElements.push(`#${space.id}-${id} { ${styles.join("; ")}}`);
	};

	const widthOrHeightSpecified = () =>
		space.type === Type.Positioned
			? space.width.size && space.height.size
			: space.orientation == Orientation.Horizontal
			? space.width.size
			: space.height.size;

	if (space.canResizeLeft) {
		if (space.anchor) {
			addHandleCss("ml", {
				right: `calc(${css(space.right, true)} + ${css(space.width)} - ${handleOffset})`,
				top: `0`,
				bottom: `0`,
				width: handleSize,
			});
		} else {
			addHandleCss("ml", {
				left: `calc(${css(space.left, true)} - ${handleOffset})`,
				top: css(space.top),
				bottom: css(space.bottom),
				width: handleSize,
				height: css(space.height),
			});
		}
		addHandleCss("ml:after", {
			left: touchHandleSize,
			right: touchHandleSize,
			top: touchHandleSize,
			bottom: touchHandleSize,
		});
	}

	if (space.canResizeTop) {
		if (space.anchor) {
			addHandleCss("mt", {
				left: `0`,
				right: `0`,
				bottom: `calc(${css(space.bottom)} + ${css(space.height)} - ${handleOffset})`,
				height: handleSize,
			});
			addHandleCss("mt:after", {
				top: touchHandleSize,
				bottom: touchHandleSize,
				left: touchHandleSize,
				width: css(space.width),
				right: touchHandleSize,
			});
		} else {
			addHandleCss("mt", {
				top: `calc(${css(space.top, true)} - ${handleOffset})`,
				left: css(space.left),
				right: css(space.right),
				width: css(space.width),
				height: handleSize,
			});
			if (widthOrHeightSpecified()) {
				addHandleCss("mt:after", {
					top: touchHandleSize,
					bottom: touchHandleSize,
					left: touchHandleSize,
					width: `calc(${css(space.width, true)} - ${handleOffset}) + ${negativeTouchHandleSize}`,
					right: touchHandleSize,
				});
			} else {
				addHandleCss("mt:after", {
					top: touchHandleSize,
					bottom: touchHandleSize,
					left: touchHandleSize,
					width: css(space.width),
					right: touchHandleSize,
				});
			}
		}
	}

	if (space.canResizeRight) {
		if (widthOrHeightSpecified()) {
			addHandleCss("mr", {
				left: `calc(${css(space.left, true)} + ${css(space.width, true)} - ${handleSize} + ${handleOffset})`,
				top: css(space.top),
				bottom: css(space.bottom),
				width: handleSize,
				height: css(space.height),
			});
		} else {
			addHandleCss("mr", {
				right: `calc(${css(space.right, true)} - ${handleOffset})`,
				top: css(space.top),
				bottom: css(space.bottom),
				width: handleSize,
				height: css(space.height),
			});
		}
		addHandleCss("mr:after", {
			left: touchHandleSize,
			right: touchHandleSize,
			top: touchHandleSize,
			bottom: touchHandleSize,
		});
	}

	if (space.canResizeBottom) {
		if (widthOrHeightSpecified()) {
			addHandleCss("mb", {
				top: `calc(${css(space.top, true)} + ${css(space.height, true)} - ${handleSize} + ${handleOffset})`,
				left: css(space.left),
				right: css(space.right),
				width: css(space.width),
				height: handleSize,
			});
		} else {
			addHandleCss("mb", {
				bottom: `calc(${css(space.bottom, true)} - ${handleOffset})`,
				left: css(space.left),
				right: css(space.right),
				width: css(space.width),
				height: handleSize,
			});
		}
		addHandleCss("mb:after", {
			top: touchHandleSize,
			bottom: touchHandleSize,
			left: touchHandleSize,
			right: touchHandleSize,
		});
	}

	if (space.canResizeTopLeft) {
		addHandleCss("mtl", {
			left: `calc(${css(space.left, true)} - ${handleOffset})`,
			top: css(space.top),
			width: handleSize,
			height: handleSize,
		});
		addHandleCss("mtl:after", {
			top: touchHandleSize,
			bottom: touchHandleSize,
			left: touchHandleSize,
			right: touchHandleSize,
		});
	}

	if (space.canResizeTopRight) {
		if (widthOrHeightSpecified()) {
			addHandleCss("mtr", {
				left: `calc(${css(space.left, true)} + ${css(space.width, true)} - ${handleSize} + ${handleOffset})`,
				top: css(space.top),
				width: handleSize,
				height: handleSize,
			});
		} else {
			addHandleCss("mtr", {
				right: `calc(${css(space.right, true)} - ${handleOffset})`,
				top: css(space.top),
				width: handleSize,
				height: handleSize,
			});
		}
		addHandleCss("mtr:after", {
			top: touchHandleSize,
			bottom: touchHandleSize,
			left: touchHandleSize,
			right: touchHandleSize,
		});
	}

	if (space.canResizeBottomLeft) {
		if (widthOrHeightSpecified()) {
			addHandleCss("mbl", {
				top: `calc(${css(space.top, true)} + ${css(space.height, true)} - ${handleSize} + ${handleOffset})`,
				left: css(space.left),
				width: handleSize,
				height: handleSize,
			});
		} else {
			addHandleCss("mbl", {
				bottom: `calc(${css(space.bottom, true)} - ${handleOffset})`,
				left: css(space.left),
				width: handleSize,
				height: handleSize,
			});
		}
		addHandleCss("mbl:after", {
			top: touchHandleSize,
			bottom: touchHandleSize,
			left: touchHandleSize,
			right: touchHandleSize,
		});
	}

	if (space.canResizeBottomRight) {
		if (widthOrHeightSpecified()) {
			addHandleCss("mbr", {
				left: `calc(${css(space.left, true)} + ${css(space.width, true)} - ${handleSize} + ${handleOffset})`,
				top: `calc(${css(space.top, true)} + ${css(space.height, true)} - ${handleSize} + ${handleOffset})`,
				width: handleSize,
				height: handleSize,
			});
		} else {
			addHandleCss("mbr", {
				right: `calc(${css(space.right, true)} - ${handleOffset})`,
				bottom: `calc(${css(space.bottom, true)} - ${handleOffset})`,
				width: handleSize,
				height: handleSize,
			});
		}
		addHandleCss("mbr:after", {
			top: touchHandleSize,
			bottom: touchHandleSize,
			left: touchHandleSize,
			right: touchHandleSize,
		});
	}

	return cssElements.join(" ");
}

export function updateStyleDefinition(space: ISpaceDefinition) {
	const definition = styleDefinition(space);
	if (!isServer()) {
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
	} else {
		space.ssrStyle = definition;
	}
}

export function removeStyleDefinition(space: ISpaceDefinition) {
	const existing = document.getElementById(`style_${space.id}`);
	if (existing) {
		document.head.removeChild(existing);
	}
}

export function isServer() {
	if (typeof document !== "undefined") {
		if (document) {
			return false;
		}
	}
	return true;
}
