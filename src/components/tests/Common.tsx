import * as React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { ViewPort } from "../ViewPort";
import { drag } from "./TestUtils";

const mutateComponent = (component: React.ReactNode, newProps: Object) => {
	return React.cloneElement(component as React.DetailedReactHTMLElement<any, HTMLElement>, newProps);
};

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
			expect(style[k], `Property ${k}`).toBe(expectedStyle[k]);
		});
	});

	test(`${name} with class applied`, async () => {
		// arrange, act
		const { container } = render(<ViewPort>{mutateComponent(component, { id: "test", className: "custom-class" })}</ViewPort>);

		// assert
		const sut = container.querySelector("#test");
		expect(sut!.className).toBe("spaces-space custom-class");
	});

	test(`${name} with class change applied`, async () => {
		// arrange
		const { container, rerender } = render(<ViewPort>{mutateComponent(component, { id: "test", className: "custom-class" })}</ViewPort>);
		const sut = container.querySelector("#test");

		// act
		rerender(<ViewPort>{mutateComponent(component, { id: "test", className: "different-custom-class" })}</ViewPort>);

		//assert
		expect(sut!.className).toBe("spaces-space different-custom-class");
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

	test(`${name} scrollable applied`, async () => {
		// arrange, act
		const { container } = render(<ViewPort>{mutateComponent(component, { id: "test", scrollable: true })}</ViewPort>);
		const sut = container.querySelector("#test");

		// assert
		const style = window.getComputedStyle(sut!);
		expect(style.overflow).toBe("auto");
	});

	test(`${name} scrollable change applied`, async () => {
		// arrange
		const { container, rerender } = render(<ViewPort>{mutateComponent(component, { id: "test", scrollable: false })}</ViewPort>);
		const sut = container.querySelector("#test");

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
		const sut = container.querySelector("#test")!;
		const sut1 = container.querySelector("#test1")!;

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
		const sut = container.querySelector("#test")!;
		const sut1 = container.querySelector("#test1")!;

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
		const resizeHandle = container.querySelector("#test .spaces-resize-handle")!;

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
		const resizeHandle = container.querySelector("#test .spaces-resize-handle")!;

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
		const resizeHandle = container.querySelector("#test .spaces-resize-handle")!;

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
};
