import * as React from "react";
import { render, cleanup } from "@testing-library/react";
import { Fixed } from "../Fixed";
import "@testing-library/jest-dom/extend-expect";

afterEach(cleanup);

test("Fixed default has correct styles", async () => {
	const { container } = render(<Fixed id="test" height={10} />);
	const sut = container.querySelector("#test");
	const style = window.getComputedStyle(sut!);

	expect(style.display).toBe("block");
	expect(style.position).toBe("relative");
	expect(style.left).toBe("");
	expect(style.top).toBe("");
	expect(style.right).toBe("");
	expect(style.bottom).toBe("");
	expect(style.width).toBe("");
	expect(style.height).toBe("10px");
});

test("Fixed with width and height has correct styles", async () => {
	const { container } = render(<Fixed id="test" width={10} height={20} />);
	const sut = container.querySelector("#test");
	const style = window.getComputedStyle(sut!);

	expect(style.left).toBe("");
	expect(style.top).toBe("");
	expect(style.right).toBe("");
	expect(style.bottom).toBe("");
	expect(style.width).toBe("10px");
	expect(style.height).toBe("20px");
});

test("Fixed with class applied", async () => {
	const { container } = render(<Fixed id="test" height={20} className={"custom-class"} />);
	const sut = container.querySelector("#test");

	expect(sut!.className).toBe("spaces-space custom-class");
});

test("Fixed with style applied", async () => {
	const { container } = render(<Fixed id="test" height={20} style={{ backgroundColor: "red" }} />);
	const sut = container.querySelector("#test");
	const style = window.getComputedStyle(sut!);

	expect(style.backgroundColor).toBe("red");
});

test("Fixed scrollable applied", async () => {
	const { container } = render(<Fixed id="test" height={20} scrollable={true} />);
	const sut = container.querySelector("#test");
	const style = window.getComputedStyle(sut!);

	expect(style.overflow).toBe("auto");
});
