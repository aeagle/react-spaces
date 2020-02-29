import { AnchorType, AllProps, SizeUnit } from "./Types";

export const getSizeString = (size: SizeUnit) =>
	size !== undefined ? (typeof size === "string" ? size : `${size}${size !== 0 ? "px" : ""}`) : undefined;

export const isFilledSpace = (props: AllProps) => !props.anchor;

export const isHorizontalSpace = (anchorType?: AnchorType) => anchorType && (anchorType === AnchorType.Left || anchorType === AnchorType.Right);

export const isVerticalSpace = (anchorType?: AnchorType) => anchorType && (anchorType === AnchorType.Top || anchorType === AnchorType.Bottom);

function shortuuid() {
	let firstPart = (Math.random() * 46656) | 0;
	let secondPart = (Math.random() * 46656) | 0;
	return ("000" + firstPart.toString(36)).slice(-3) + ("000" + secondPart.toString(36)).slice(-3);
}

export const initialState = (props: AllProps) => ({
	id: props.id || `s${shortuuid()}`,
	children: [],
	resizing: false,
});

export const appendAdjusted = (adjusted: number) => {
	if (adjusted < 0) {
		console.log(` - ${getSizeString(Math.abs(adjusted))}`);
	}

	return adjusted >= 0 ? ` + ${getSizeString(adjusted)}` : ` - ${getSizeString(Math.abs(adjusted))}`;
};

export const cssValue = (value: SizeUnit, adjusted: number) =>
	adjusted ? `calc(${getSizeString(value || 0)}${appendAdjusted(adjusted)})` : getSizeString(value || 0);

export function coalesce(...args: any[]) {
	return args.find((x) => x !== null && x !== undefined);
}
