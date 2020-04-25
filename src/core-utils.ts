import { ISpaceDefinition, SizeUnit, Type, Anchor, Orientation, ISize } from "./core-types";

export function shortuuid() {
	let firstPart = (Math.random() * 46656) | 0;
	let secondPart = (Math.random() * 46656) | 0;
	return ("000" + firstPart.toString(36)).slice(-3) + ("000" + secondPart.toString(36)).slice(-3);
}

export function getSizeString(size: SizeUnit) {
	return typeof size === "string" ? size : `${size}px`;
}

export function css(size: ISize) {
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

export function styleDefinition(space: ISpaceDefinition) {
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
