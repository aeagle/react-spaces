import * as React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { ViewPort } from "../ViewPort";

const mutateComponent = (component: React.ReactNode, newProps: Object) => {
	return React.cloneElement(component as React.DetailedReactHTMLElement<any, HTMLElement>, newProps);
};

export const commonPropsTests = (name: string, component: React.ReactNode, expectedStyle: Partial<CSSStyleDeclaration>) => {
	test(`${name} default has correct styles`, async () => {
		const { container } = render(<ViewPort>{mutateComponent(component, { id: "test" })}</ViewPort>);
		const sut = container.querySelector("#test")!;
		const style = window.getComputedStyle(sut);

		expect(style.display).toBe("block");
		expect(sut.nodeName).toBe("DIV");

		Object.keys(expectedStyle).forEach((k) => {
			expect(style[k], `Property ${k}`).toBe(expectedStyle[k]);
		});
	});

	test(`${name} with class applied`, async () => {
		const { container } = render(<ViewPort>{mutateComponent(component, { id: "test", className: "custom-class" })}</ViewPort>);
		const sut = container.querySelector("#test");

		expect(sut!.className).toBe("spaces-space custom-class");
	});

	test(`${name} with style applied`, async () => {
		const { container } = render(<ViewPort>{mutateComponent(component, { id: "test", style: { backgroundColor: "red" } })}</ViewPort>);
		const sut = container.querySelector("#test");
		const style = window.getComputedStyle(sut!);

		expect(style.backgroundColor).toBe("red");
	});

	test(`${name} scrollable applied`, async () => {
		const { container } = render(<ViewPort>{mutateComponent(component, { id: "test", scrollable: true })}</ViewPort>);
		const sut = container.querySelector("#test");
		const style = window.getComputedStyle(sut!);

		expect(style.overflow).toBe("auto");
	});

	test(`${name} as applied`, async () => {
		const { container } = render(<ViewPort>{mutateComponent(component, { id: "test", as: "main" })}</ViewPort>);
		const sut = container.querySelector("#test")!;

		expect(sut.nodeName).toBe("MAIN");
	});
};
