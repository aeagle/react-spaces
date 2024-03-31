import * as React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ViewPort } from "../ViewPort";
import { drag } from "./TestUtils";
import { ResizeType } from "../../core-types";
import { Positioned } from "../Positioned";
import { IReactSpaceCommonProps } from "../../core-react";
import { asRecord } from "../../core-utils";

export const mutateComponent = (component: React.ReactNode, newProps: Object) => {
	return React.cloneElement(component as React.DetailedReactHTMLElement<any, HTMLElement>, newProps);
};

export function hasProps(name: string, component: React.FC<IReactSpaceCommonProps>, props: string[]) {
	props.forEach((prop) => {
		expect(prop in component.propTypes!, `${prop} missing`).toBe(true);
	});
}

export const fixUp = (sut: HTMLElement) => {
	// This is annoying. A bug in JSDOM means that getComputedStyle() on test elements does
	// not correctly return the applied styles when a dynamically added style tag is added to
	// the document.head. It doesn't happen in all cases. Quick fix for now is take the style
	// from the doc head and apply directly to the test element
	// Existing issue raised on JSDOM repo - https://github.com/jsdom/jsdom/issues/2986
	const test = document.documentElement.querySelector(`#style_${sut.id}`)!;
	const style = test.innerHTML
		.replace(`#${sut.id} { `, "")
		.split("#")[0]
		.replace(" }", "");
	sut.setAttribute("style", style);

	return sut;
};

export function commonPropTypesTest(name: string, component: React.FC<IReactSpaceCommonProps>) {
	test(`${name} has correct common prop types`, async () => {
		hasProps(name, component, [
			"as",
			"centerContent",
			"className",
			"id",
			"scrollable",
			"trackSize",
			"zIndex",
			"allowOverflow",
			"onClick",
			"onDoubleClick",
			"onMouseDown",
			"onMouseEnter",
			"onMouseLeave",
			"onMouseMove",
			"onTouchStart",
			"onTouchMove",
			"onTouchEnd",
		]);
	});
}

export function resizablePropTypesTest(name: string, component: React.FC<IReactSpaceCommonProps>) {
	commonPropTypesTest(name, component);
	test(`${name} has correct resizable prop types`, async () => {
		hasProps(name, component, [
			"size",
			"handleSize",
			"touchHandleSize",
			"handlePlacement",
			"handleRender",
			"minimumSize",
			"maximumSize",
			"onResizeStart",
			"onResizeEnd",
		]);
	});
}

export function anchorPropTypesTest(name: string, component: React.FC<IReactSpaceCommonProps>) {
	resizablePropTypesTest(name, component);
	test(`${name} has correct anchor prop types`, async () => {
		hasProps(name, component, ["resizable"]);
	});
}

export const commonPropsTests = (name: string, component: React.ReactNode, expectedStyle: Partial<CSSStyleDeclaration>) => {
	test(`${name} default has correct styles`, async () => {
		// arrange, act
		const { container } = render(<ViewPort>{mutateComponent(component, { id: "test" })}</ViewPort>);

		// assert
		const sut = container.querySelector("#test")!;
		const style = window.getComputedStyle(sut);
		expect(style.display).toBe("block");
		expect(sut.nodeName).toBe("DIV");
		Object.keys(expectedStyle).forEach((k) => {
			expect(asRecord(style)[k], `Property ${k}`).toBe(asRecord(expectedStyle)[k]);
		});
	});

	test(`${name} with id applied`, async () => {
		// arrange, act
		const { container } = render(<ViewPort>{mutateComponent(component, { id: "test" })}</ViewPort>);

		// assert
		const sut = container.querySelector("#test")!;
		expect(sut.id).toBe("test");
	});

	test(`${name} with class applied`, async () => {
		// arrange, act
		const { container } = render(<ViewPort>{mutateComponent(component, { id: "test", className: "custom-class" })}</ViewPort>);

		// assert
		const sut = container.querySelector("#test .spaces-space-inner")!;
		expect(sut.className).toBe("spaces-space-inner custom-class");
	});

	test(`${name} with class change applied`, async () => {
		// arrange
		const { container, rerender } = render(<ViewPort>{mutateComponent(component, { id: "test", className: "custom-class" })}</ViewPort>);
		const sut = container.querySelector("#test .spaces-space-inner")!;

		// act
		rerender(<ViewPort>{mutateComponent(component, { id: "test", className: "different-custom-class" })}</ViewPort>);

		//assert
		expect(sut.className).toBe("spaces-space-inner different-custom-class");
	});

	test(`${name} with style applied`, async () => {
		// arrange, act
		const { container } = render(<ViewPort>{mutateComponent(component, { id: "test", style: { backgroundColor: "red" } })}</ViewPort>);
		const sut = container.querySelector("#test");

		// assert
		const style = window.getComputedStyle(sut!);
		expect(style.backgroundColor).toBe("red");
	});

	test(`${name} with style change applied`, async () => {
		// arrange
		const { container, rerender } = render(<ViewPort>{mutateComponent(component, { id: "test", style: { backgroundColor: "red" } })}</ViewPort>);
		const sut = container.querySelector("#test");

		// act
		rerender(<ViewPort>{mutateComponent(component, { id: "test", style: { backgroundColor: "green" } })}</ViewPort>);

		// assert
		const style = window.getComputedStyle(sut!);
		expect(style.backgroundColor).toBe("green");
	});

	test(`${name} with style for inner container applied`, async () => {
		// arrange, act
		const { container } = render(
			<ViewPort>{mutateComponent(component, { id: "test", innerComponentStyle: { backgroundColor: "red" } })}</ViewPort>,
		);
		const sut = container.querySelector("#test .spaces-space-inner");

		// assert
		const style = window.getComputedStyle(sut!);
		expect(style.backgroundColor).toBe("red");
	});

	test(`${name} with style for inner container change applied`, async () => {
		// arrange
		const { container, rerender } = render(
			<ViewPort>{mutateComponent(component, { id: "test", innerComponentStyle: { backgroundColor: "red" } })}</ViewPort>,
		);
		const sut = container.querySelector("#test .spaces-space-inner");

		// act
		rerender(<ViewPort>{mutateComponent(component, { id: "test", innerComponentStyle: { backgroundColor: "green" } })}</ViewPort>);

		// assert
		const style = window.getComputedStyle(sut!);
		expect(style.backgroundColor).toBe("green");
	});

	test(`${name} scrollable applied`, async () => {
		// arrange, act
		const { container } = render(<ViewPort>{mutateComponent(component, { id: "test", scrollable: true })}</ViewPort>);
		const sut = container.querySelector("#test .spaces-space-inner");

		// assert
		const style = window.getComputedStyle(sut!);
		expect(style.overflow).toBe("auto");
	});

	test(`${name} scrollable change applied`, async () => {
		// arrange
		const { container, rerender } = render(<ViewPort>{mutateComponent(component, { id: "test", scrollable: false })}</ViewPort>);
		const sut = container.querySelector("#test .spaces-space-inner");

		// act
		rerender(<ViewPort>{mutateComponent(component, { id: "test", scrollable: true })}</ViewPort>);

		// assert
		const style = window.getComputedStyle(sut!);
		expect(style.overflow).toBe("auto");
	});

	test(`${name} as applied`, async () => {
		// arrange, act
		const { container } = render(<ViewPort>{mutateComponent(component, { id: "test", as: "main" })}</ViewPort>);
		const sut = container.querySelector("#test")!;

		// assert
		expect(sut.nodeName).toBe("MAIN");
	});

	test(`${name} as change applied`, async () => {
		// arrange
		const { container, rerender } = render(<ViewPort>{mutateComponent(component, { id: "test" })}</ViewPort>);

		// act
		rerender(<ViewPort>{mutateComponent(component, { id: "test", as: "main" })}</ViewPort>);

		// assert
		const sut = container.querySelector("#test")!;
		expect(sut.nodeName).toBe("MAIN");
	});
};

export const commonAnchorTests = (
	name: string,
	component: React.ReactNode,
	size: (style: CSSStyleDeclaration) => string | null,
	edge: (style: CSSStyleDeclaration) => string | null,
	oppositeEdge: (style: CSSStyleDeclaration) => string | null,
) => {
	test(`${name} stacked has correct styles`, async () => {
		// arrange, act
		const { container } = render(
			<ViewPort>
				{mutateComponent(component, { id: "test", size: 50, order: 0 })}
				{mutateComponent(component, { id: "test1", size: 100, order: 1 })}
			</ViewPort>,
		);
		const sut = fixUp(container.querySelector("#test")!);
		const sut1 = fixUp(container.querySelector("#test1")!);

		// assert
		const style = window.getComputedStyle(sut);
		const style1 = window.getComputedStyle(sut1);

		expect(size(style)).toBe("50px");
		expect(edge(style)).toBe("0px");
		expect(oppositeEdge(style)).toBe("");

		expect(size(style1)).toBe("100px");
		expect(edge(style1)).toBe("calc(0px + 50px)");
		expect(oppositeEdge(style1)).toBe("");
	});

	test(`${name} size changed has correct styles`, async () => {
		// arrange
		const { container, rerender } = render(<ViewPort>{mutateComponent(component, { id: "test", size: 50 })}</ViewPort>);
		const sut = container.querySelector("#test")!;

		// act
		rerender(<ViewPort>{mutateComponent(component, { id: "test", size: 100 })}</ViewPort>);

		// assert
		const style = window.getComputedStyle(sut);
		expect(size(style)).toBe("100px");
	});

	test(`${name} stacked DOM reversed has correct styles`, async () => {
		// arrange, act
		const { container } = render(
			<ViewPort>
				{mutateComponent(component, { id: "test1", size: 100, order: 1 })}
				{mutateComponent(component, { id: "test", size: 50, order: 0 })}
			</ViewPort>,
		);
		const sut = fixUp(container.querySelector("#test")!);
		const sut1 = fixUp(container.querySelector("#test1")!);

		// assert
		const style = window.getComputedStyle(sut);
		expect(size(style)).toBe("50px");
		expect(edge(style)).toBe("0px");
		expect(oppositeEdge(style)).toBe("");

		const style1 = window.getComputedStyle(sut1);
		expect(size(style1)).toBe("100px");
		expect(edge(style1)).toBe("calc(0px + 50px)");
		expect(oppositeEdge(style1)).toBe("");
	});
};

export const commonResizableTests = (
	name: string,
	component: React.ReactNode,
	size: (style: CSSStyleDeclaration) => string | null,
	edge: (style: CSSStyleDeclaration) => string | null,
	oppositeEdge: (style: CSSStyleDeclaration) => string | null,
	horizontal: boolean,
	negate: boolean,
) => {
	test(`${name} after resize has correct styles`, async () => {
		// arrange
		const { container } = render(<ViewPort>{mutateComponent(component, { id: "test" })}</ViewPort>);
		const sut = container.querySelector("#test")!;
		const resizeHandle = container.querySelector(".spaces-resize-handle")!;

		// act
		drag(
			resizeHandle,
			sut,
			{ width: horizontal ? 50 : 0, height: horizontal ? 0 : 50 },
			{ width: horizontal ? 150 : 0, height: horizontal ? 0 : 150 },
			horizontal ? (negate ? -100 : 100) : 0,
			horizontal ? 0 : negate ? -100 : 100,
		);

		// assert
		const style = window.getComputedStyle(sut);
		expect(size(style)).toBe("calc(50px + 100px)");
	});

	test(`${name} subsequent resize has correct styles`, async () => {
		// arrange
		const { container } = render(<ViewPort>{mutateComponent(component, { id: "test" })}</ViewPort>);
		const sut = container.querySelector("#test")!;
		const resizeHandle = container.querySelector(".spaces-resize-handle")!;

		// act
		drag(
			resizeHandle,
			sut,
			{ width: horizontal ? 50 : 0, height: horizontal ? 0 : 50 },
			{ width: horizontal ? 150 : 0, height: horizontal ? 0 : 150 },
			horizontal ? (negate ? -100 : 100) : 0,
			horizontal ? 0 : negate ? -100 : 100,
		);
		drag(
			resizeHandle,
			sut,
			{ width: horizontal ? 150 : 0, height: horizontal ? 0 : 150 },
			{ width: horizontal ? 50 : 0, height: horizontal ? 0 : 50 },
			horizontal ? (negate ? 100 : -100) : 0,
			horizontal ? 0 : negate ? 100 : -100,
		);

		// assert
		const style = window.getComputedStyle(sut);
		expect(size(style)).toBe("50px");
	});

	test(`${name} resize then props size change has correct styles`, async () => {
		// arrange
		const { container, rerender } = render(<ViewPort>{mutateComponent(component, { id: "test", size: 50 })}</ViewPort>);
		const sut = container.querySelector("#test")!;
		const resizeHandle = container.querySelector(".spaces-resize-handle")!;

		// act
		drag(
			resizeHandle,
			sut,
			{ width: horizontal ? 50 : 0, height: horizontal ? 0 : 50 },
			{ width: horizontal ? 150 : 0, height: horizontal ? 0 : 150 },
			horizontal ? (negate ? -100 : 100) : 0,
			horizontal ? 0 : negate ? -100 : 100,
		);

		rerender(<ViewPort>{mutateComponent(component, { id: "test", size: 150 })}</ViewPort>);

		// assert
		const style = window.getComputedStyle(sut);
		expect(size(style)).toBe("150px");
	});

	test(`${name} resize with maximum size constraint has correct styles`, async () => {
		// arrange
		const { container } = render(<ViewPort>{mutateComponent(component, { id: "test", size: 50, maximumSize: 100 })}</ViewPort>);
		const sut = container.querySelector("#test")!;
		const resizeHandle = container.querySelector(".spaces-resize-handle")!;

		// act (resize 100px)
		drag(
			resizeHandle,
			sut,
			{ width: horizontal ? 50 : 0, height: horizontal ? 0 : 50 },
			{ width: horizontal ? 150 : 0, height: horizontal ? 0 : 150 },
			horizontal ? (negate ? -100 : 100) : 0,
			horizontal ? 0 : negate ? -100 : 100,
		);

		// assert
		const style = window.getComputedStyle(sut);
		expect(size(style)).toBe("calc(50px + 50px)"); // only 50px resized
	});

	test(`${name} resize with minimum size constraint has correct styles`, async () => {
		// arrange
		const { container } = render(<ViewPort>{mutateComponent(component, { id: "test", size: 150, minimumSize: 100 })}</ViewPort>);
		const sut = container.querySelector("#test")!;
		const resizeHandle = container.querySelector(".spaces-resize-handle")!;

		// act (resize -100px)
		drag(
			resizeHandle,
			sut,
			{ width: horizontal ? 150 : 0, height: horizontal ? 0 : 150 },
			{ width: horizontal ? 50 : 0, height: horizontal ? 0 : 50 },
			horizontal ? (negate ? 100 : -100) : 0,
			horizontal ? 0 : negate ? 100 : -100,
		);

		// assert
		const style = window.getComputedStyle(sut);
		expect(size(style)).toBe("calc(150px + -50px)"); // only -50px resized
	});
};

export const commonPositionedResizeTests = (
	name: string,
	size: (style: CSSStyleDeclaration) => string | null,
	edge: (style: CSSStyleDeclaration) => string | null,
	oppositeEdge: (style: CSSStyleDeclaration) => string | null,
	handle: string,
	horizontal: boolean,
	negate: boolean,
) => {
	const testProps = { id: "test", resizable: [ResizeType.Left, ResizeType.Top, ResizeType.Bottom, ResizeType.Right] };

	[
		{ name: "left/top/width/height", props: { left: 100, top: 100, width: 100, height: 100 }, widthHeightSpecified: true },
		{ name: "left/top/right/bottom", props: { left: 100, top: 100, right: 100, bottom: 100 }, widthHeightSpecified: false },
	].forEach((testCase) => {
		test(`${name} (${testCase.name}) after resize has correct styles`, async () => {
			// arrange
			const { container } = render(<ViewPort>{mutateComponent(<Positioned />, { ...testProps, ...testCase.props })}</ViewPort>);

			const resizeHandle = container.querySelector(`#test-${handle}`)!;
			const sut = container.querySelector("#test")!;

			// act
			drag(
				resizeHandle,
				sut,
				{ width: horizontal ? 50 : 0, height: horizontal ? 0 : 50 },
				{ width: horizontal ? 150 : 0, height: horizontal ? 0 : 150 },
				horizontal ? (negate ? -100 : 100) : 0,
				horizontal ? 0 : negate ? -100 : 100,
			);

			// assert
			const style = window.getComputedStyle(sut);

			if (testCase.widthHeightSpecified) {
				expect(size(style)).toBe("calc(100px + -100px)");
			} else {
				expect(edge(style)).toBe("calc(100px + 100px)");
			}
		});

		test(`${name} (${testCase.name}) subsequent resize has correct styles`, async () => {
			// arrange
			const { container } = render(<ViewPort>{mutateComponent(<Positioned />, { ...testProps, ...testCase.props })}</ViewPort>);
			const resizeHandle = container.querySelector(`#test-${handle}`)!;
			const sut = container.querySelector("#test")!;

			// act
			drag(
				resizeHandle,
				sut,
				{ width: horizontal ? 50 : 0, height: horizontal ? 0 : 50 },
				{ width: horizontal ? 150 : 0, height: horizontal ? 0 : 150 },
				horizontal ? (negate ? -100 : 100) : 0,
				horizontal ? 0 : negate ? -100 : 100,
			);
			drag(
				resizeHandle,
				sut,
				{ width: horizontal ? 150 : 0, height: horizontal ? 0 : 150 },
				{ width: horizontal ? 50 : 0, height: horizontal ? 0 : 50 },
				horizontal ? (negate ? 100 : -100) : 0,
				horizontal ? 0 : negate ? 100 : -100,
			);

			// assert
			const style = window.getComputedStyle(sut);

			if (testCase.widthHeightSpecified) {
				expect(size(style)).toBe("100px");
			} else {
				expect(edge(style)).toBe("100px");
			}
		});
	});
};
