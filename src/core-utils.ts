import { ISpaceDefinition, SizeUnit, ISize, ResizeHandlePlacement, Type } from "./core-types";

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

	let handleOffset = 0;
	const touchHandleSize = space.touchHandleSize / 2 - space.handleSize / 2;

	switch (space.handlePlacement) {
		case ResizeHandlePlacement.Inside:
		case ResizeHandlePlacement.OverlayInside:
			handleOffset = space.handleSize;
			if (space.type === Type.Positioned) {
				handleOffset = 0;
			}
			break;
		case ResizeHandlePlacement.OverlayBoundary:
			handleOffset = space.handleSize / 2;
			break;
	}

	if (space.type === Type.Positioned) {
		if (space.canResizeLeft) {
			cssElements.push(
				`#${space.id}-ml { left: calc(${css(space.left, true)} - ${handleOffset}px); width: ${space.handleSize}px; top: ${css(
					space.top,
				)}; bottom: ${css(space.bottom)}; height: ${css(space.height)}; }`,
			);
			cssElements.push(`#${space.id}-ml:after { left: -${touchHandleSize}px; right: -${touchHandleSize}px; top: 0; bottom: 0; }`);
		}

		if (space.canResizeTop) {
			cssElements.push(
				`#${space.id}-mt { top: calc(${css(space.top, true)} - ${handleOffset}px); height: ${space.handleSize}px; left: ${css(
					space.left,
				)}; right: ${css(space.right)}; width: ${css(space.width)}; }`,
			);
			cssElements.push(
				`#${space.id}-mt:after { top: -${touchHandleSize}px; bottom: -${touchHandleSize}px; left: ${css(space.left)}; right: ${css(
					space.right,
				)}; width: ${css(space.width)}; }`,
			);
		}

		if (space.canResizeRight) {
			if (space.width.size) {
				cssElements.push(
					`#${space.id}-mr { left: calc(${css(space.left, true)} + ${css(space.width, true)} - ${
						space.handleSize
					}px + ${handleOffset}px); width: ${space.handleSize}px; top: ${css(space.top)}; bottom: ${css(space.bottom)}; height: ${css(
						space.height,
					)}; }`,
				);
			} else {
				cssElements.push(
					`#${space.id}-mr { right: calc(${css(space.right, true)} - ${handleOffset}px); width: ${space.handleSize}px; top: ${css(
						space.top,
					)}; bottom: ${css(space.bottom)}; height: ${css(space.height)}; }`,
				);
			}
			cssElements.push(`#${space.id}-mr:after { left: -${touchHandleSize}px; right: -${touchHandleSize}px; top: 0; bottom: 0; }`);
		}

		if (space.canResizeBottom) {
			if (space.height.size) {
				cssElements.push(
					`#${space.id}-mb { top: calc(${css(space.top, true)} + ${css(space.height, true)} - ${
						space.handleSize
					}px + ${handleOffset}px); height: ${space.handleSize}px; left: ${css(space.left)}; right: ${css(space.right)}; width: ${css(
						space.width,
					)}; }`,
				);
			} else {
				cssElements.push(
					`#${space.id}-mb { bottom: calc(${css(space.bottom, true)} - ${handleOffset}px); height: ${space.handleSize}px; left: ${css(
						space.left,
					)}; right: ${css(space.right)}; width: ${css(space.width)}; }`,
				);
			}
			cssElements.push(`#${space.id}-mb:after { top: -${touchHandleSize}px; bottom: -${touchHandleSize}px; left: 0; right: 0; }`);
		}
	} else {
		if (space.canResizeLeft) {
			cssElements.push(
				`#${space.id}-ml { left: calc(${css(space.left, true)} + ${css(space.width, true)} - ${handleOffset}px); width: ${
					space.handleSize
				}px; }`,
			);
			cssElements.push(`#${space.id}-ml:after { left: -${touchHandleSize}px; right: -${touchHandleSize}px; top: 0; bottom: 0; }`);
		}

		if (space.canResizeTop) {
			cssElements.push(
				`#${space.id}-mt { top: calc(${css(space.top, true)} + ${css(space.height, true)} - ${handleOffset}px); height: ${
					space.handleSize
				}px; }`,
			);
			cssElements.push(`#${space.id}-mt:after { top: -${touchHandleSize}px; bottom: -${touchHandleSize}px; left: 0; right: 0; }`);
		}

		if (space.canResizeRight) {
			cssElements.push(
				`#${space.id}-mr { right: calc(${css(space.right, true)} + ${css(space.width, true)} - ${handleOffset}px); width: ${
					space.handleSize
				}px; }`,
			);
			cssElements.push(`#${space.id}-mr:after { left: -${touchHandleSize}px; right: -${touchHandleSize}px; top: 0; bottom: 0; }`);
		}

		if (space.canResizeBottom) {
			cssElements.push(
				`#${space.id}-mb { bottom: calc(${css(space.bottom, true)} + ${css(space.height, true)} - ${handleOffset}px); height: ${
					space.handleSize
				}px; }`,
			);
			cssElements.push(`#${space.id}-mb:after { top: -${touchHandleSize}px; bottom: -${touchHandleSize}px; left: 0; right: 0; }`);
		}
	}

	return cssElements.join(" ");
}

export function updateStyleDefinition(space: ISpaceDefinition) {
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

export function removeStyleDefinition(space: ISpaceDefinition) {
	const existing = document.getElementById(`style_${space.id}`);
	if (existing) {
		document.head.removeChild(existing);
	}
}
