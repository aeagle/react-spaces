import * as React from "react";
import { render, cleanup } from "@testing-library/react";
import { Fill } from "../Fill";
import { Left, Top, Right, Bottom, LeftResizable, TopResizable, RightResizable, BottomResizable } from "../Anchored";
import "@testing-library/jest-dom/extend-expect";
import { ViewPort } from "../ViewPort";

afterEach(cleanup);

test("Fill default has correct styles", async () => {
	const { container } = render(
		<ViewPort>
			<Fill id="test" />
		</ViewPort>,
	);
	const sut = container.querySelector("#test")!;
	const style = window.getComputedStyle(sut);

	expect(style.display).toBe("block");
	expect(style.position).toBe("absolute");
	expect(style.left).toBe("0px");
	expect(style.top).toBe("0px");
	expect(style.right).toBe("0px");
	expect(style.bottom).toBe("0px");
	expect(style.width).toBe("");
	expect(style.height).toBe("");
	expect(sut.nodeName).toBe("DIV");
});

test("Fill with class applied", async () => {
	const { container } = render(
		<ViewPort>
			<Fill id="test" className={"custom-class"} />
		</ViewPort>,
	);
	const sut = container.querySelector("#test");

	expect(sut!.className).toBe("spaces-space custom-class");
});

test("Fill with style applied", async () => {
	const { container } = render(
		<ViewPort>
			<Fill id="test" style={{ backgroundColor: "red" }} />
		</ViewPort>,
	);
	const sut = container.querySelector("#test");
	const style = window.getComputedStyle(sut!);

	expect(style.backgroundColor).toBe("red");
});

test("Fill scrollable applied", async () => {
	const { container } = render(
		<ViewPort>
			<Fill id="test" scrollable={true} />
		</ViewPort>,
	);
	const sut = container.querySelector("#test");
	const style = window.getComputedStyle(sut!);

	expect(style.overflow).toBe("auto");
});

test("Fill as applied", async () => {
	const { container } = render(
		<ViewPort>
			<Fill id="test" as="main" />
		</ViewPort>,
	);
	const sut = container.querySelector("#test")!;

	expect(sut.nodeName).toBe("MAIN");
});

test("Fill with Left has correct styles", async () => {
	const { container } = render(
		<ViewPort>
			<Left size={10} />
			<Fill id="test" />
		</ViewPort>,
	);
	const sut = container.querySelector("#test")!;
	const style = window.getComputedStyle(sut);

	expect(style.display).toBe("block");
	expect(style.position).toBe("absolute");
	expect(style.left).toBe("calc(0px + 10px)");
	expect(style.top).toBe("0px");
	expect(style.right).toBe("0px");
	expect(style.bottom).toBe("0px");
	expect(style.width).toBe("");
	expect(style.height).toBe("");
	expect(sut.nodeName).toBe("DIV");
});

test("Fill with stacked Left has correct styles", async () => {
	const { container } = render(
		<ViewPort>
			<Left size={10} order={0} />
			<Left size={20} order={1} />
			<Fill id="test" />
		</ViewPort>,
	);
	const sut = container.querySelector("#test")!;
	const style = window.getComputedStyle(sut);

	expect(style.display).toBe("block");
	expect(style.position).toBe("absolute");
	expect(style.left).toBe("calc(0px + 10px + 20px)");
	expect(style.top).toBe("0px");
	expect(style.right).toBe("0px");
	expect(style.bottom).toBe("0px");
	expect(style.width).toBe("");
	expect(style.height).toBe("");
	expect(sut.nodeName).toBe("DIV");
});

test("Fill with Top has correct styles", async () => {
	const { container } = render(
		<ViewPort>
			<Top size={10} />
			<Fill id="test" />
		</ViewPort>,
	);
	const sut = container.querySelector("#test")!;
	const style = window.getComputedStyle(sut);

	expect(style.display).toBe("block");
	expect(style.position).toBe("absolute");
	expect(style.left).toBe("0px");
	expect(style.top).toBe("calc(0px + 10px)");
	expect(style.right).toBe("0px");
	expect(style.bottom).toBe("0px");
	expect(style.width).toBe("");
	expect(style.height).toBe("");
	expect(sut.nodeName).toBe("DIV");
});

test("Fill with stacked Top has correct styles", async () => {
	const { container } = render(
		<ViewPort>
			<Top size={10} order={0} />
			<Top size={20} order={1} />
			<Fill id="test" />
		</ViewPort>,
	);
	const sut = container.querySelector("#test")!;
	const style = window.getComputedStyle(sut);

	expect(style.display).toBe("block");
	expect(style.position).toBe("absolute");
	expect(style.left).toBe("0px");
	expect(style.top).toBe("calc(0px + 10px + 20px)");
	expect(style.right).toBe("0px");
	expect(style.bottom).toBe("0px");
	expect(style.width).toBe("");
	expect(style.height).toBe("");
	expect(sut.nodeName).toBe("DIV");
});

test("Fill with Right has correct styles", async () => {
	const { container } = render(
		<ViewPort>
			<Right size={10} />
			<Fill id="test" />
		</ViewPort>,
	);
	const sut = container.querySelector("#test")!;
	const style = window.getComputedStyle(sut);

	expect(style.display).toBe("block");
	expect(style.position).toBe("absolute");
	expect(style.left).toBe("0px");
	expect(style.top).toBe("0px");
	expect(style.right).toBe("calc(0px + 10px)");
	expect(style.bottom).toBe("0px");
	expect(style.width).toBe("");
	expect(style.height).toBe("");
	expect(sut.nodeName).toBe("DIV");
});

test("Fill with stacked Right has correct styles", async () => {
	const { container } = render(
		<ViewPort>
			<Right size={10} order={0} />
			<Right size={20} order={1} />
			<Fill id="test" />
		</ViewPort>,
	);
	const sut = container.querySelector("#test")!;
	const style = window.getComputedStyle(sut);

	expect(style.display).toBe("block");
	expect(style.position).toBe("absolute");
	expect(style.left).toBe("0px");
	expect(style.top).toBe("0px");
	expect(style.right).toBe("calc(0px + 10px + 20px)");
	expect(style.bottom).toBe("0px");
	expect(style.width).toBe("");
	expect(style.height).toBe("");
	expect(sut.nodeName).toBe("DIV");
});

test("Fill with Bottom has correct styles", async () => {
	const { container } = render(
		<ViewPort>
			<Bottom size={10} />
			<Fill id="test" />
		</ViewPort>,
	);
	const sut = container.querySelector("#test")!;
	const style = window.getComputedStyle(sut);

	expect(style.display).toBe("block");
	expect(style.position).toBe("absolute");
	expect(style.left).toBe("0px");
	expect(style.top).toBe("0px");
	expect(style.right).toBe("0px");
	expect(style.bottom).toBe("calc(0px + 10px)");
	expect(style.width).toBe("");
	expect(style.height).toBe("");
	expect(sut.nodeName).toBe("DIV");
});

test("Fill with stacked Bottom has correct styles", async () => {
	const { container } = render(
		<ViewPort>
			<Bottom size={10} order={0} />
			<Bottom size={20} order={1} />
			<Fill id="test" />
		</ViewPort>,
	);
	const sut = container.querySelector("#test")!;
	const style = window.getComputedStyle(sut);

	expect(style.display).toBe("block");
	expect(style.position).toBe("absolute");
	expect(style.left).toBe("0px");
	expect(style.top).toBe("0px");
	expect(style.right).toBe("0px");
	expect(style.bottom).toBe("calc(0px + 10px + 20px)");
	expect(style.width).toBe("");
	expect(style.height).toBe("");
	expect(sut.nodeName).toBe("DIV");
});

test("Fill with LeftResizable has correct styles", async () => {
	const { container } = render(
		<ViewPort>
			<LeftResizable size={10} />
			<Fill id="test" />
		</ViewPort>,
	);
	const sut = container.querySelector("#test")!;
	const style = window.getComputedStyle(sut);

	expect(style.display).toBe("block");
	expect(style.position).toBe("absolute");
	expect(style.left).toBe("calc(0px + 10px)");
	expect(style.top).toBe("0px");
	expect(style.right).toBe("0px");
	expect(style.bottom).toBe("0px");
	expect(style.width).toBe("");
	expect(style.height).toBe("");
	expect(sut.nodeName).toBe("DIV");
});

test("Fill with stacked LeftResizable has correct styles", async () => {
	const { container } = render(
		<ViewPort>
			<LeftResizable size={10} order={0} />
			<LeftResizable size={20} order={1} />
			<Fill id="test" />
		</ViewPort>,
	);
	const sut = container.querySelector("#test")!;
	const style = window.getComputedStyle(sut);

	expect(style.display).toBe("block");
	expect(style.position).toBe("absolute");
	expect(style.left).toBe("calc(0px + 10px + 20px)");
	expect(style.top).toBe("0px");
	expect(style.right).toBe("0px");
	expect(style.bottom).toBe("0px");
	expect(style.width).toBe("");
	expect(style.height).toBe("");
	expect(sut.nodeName).toBe("DIV");
});

test("Fill with TopResizable has correct styles", async () => {
	const { container } = render(
		<ViewPort>
			<TopResizable size={10} />
			<Fill id="test" />
		</ViewPort>,
	);
	const sut = container.querySelector("#test")!;
	const style = window.getComputedStyle(sut);

	expect(style.display).toBe("block");
	expect(style.position).toBe("absolute");
	expect(style.left).toBe("0px");
	expect(style.top).toBe("calc(0px + 10px)");
	expect(style.right).toBe("0px");
	expect(style.bottom).toBe("0px");
	expect(style.width).toBe("");
	expect(style.height).toBe("");
	expect(sut.nodeName).toBe("DIV");
});

test("Fill with stacked TopResizable has correct styles", async () => {
	const { container } = render(
		<ViewPort>
			<TopResizable size={10} order={0} />
			<TopResizable size={20} order={1} />
			<Fill id="test" />
		</ViewPort>,
	);
	const sut = container.querySelector("#test")!;
	const style = window.getComputedStyle(sut);

	expect(style.display).toBe("block");
	expect(style.position).toBe("absolute");
	expect(style.left).toBe("0px");
	expect(style.top).toBe("calc(0px + 10px + 20px)");
	expect(style.right).toBe("0px");
	expect(style.bottom).toBe("0px");
	expect(style.width).toBe("");
	expect(style.height).toBe("");
	expect(sut.nodeName).toBe("DIV");
});

test("Fill with RightResizable has correct styles", async () => {
	const { container } = render(
		<ViewPort>
			<RightResizable size={10} />
			<Fill id="test" />
		</ViewPort>,
	);
	const sut = container.querySelector("#test")!;
	const style = window.getComputedStyle(sut);

	expect(style.display).toBe("block");
	expect(style.position).toBe("absolute");
	expect(style.left).toBe("0px");
	expect(style.top).toBe("0px");
	expect(style.right).toBe("calc(0px + 10px)");
	expect(style.bottom).toBe("0px");
	expect(style.width).toBe("");
	expect(style.height).toBe("");
	expect(sut.nodeName).toBe("DIV");
});

test("Fill with stacked RightResizable has correct styles", async () => {
	const { container } = render(
		<ViewPort>
			<RightResizable size={10} order={0} />
			<RightResizable size={20} order={1} />
			<Fill id="test" />
		</ViewPort>,
	);
	const sut = container.querySelector("#test")!;
	const style = window.getComputedStyle(sut);

	expect(style.display).toBe("block");
	expect(style.position).toBe("absolute");
	expect(style.left).toBe("0px");
	expect(style.top).toBe("0px");
	expect(style.right).toBe("calc(0px + 10px + 20px)");
	expect(style.bottom).toBe("0px");
	expect(style.width).toBe("");
	expect(style.height).toBe("");
	expect(sut.nodeName).toBe("DIV");
});

test("Fill with BottomResizable has correct styles", async () => {
	const { container } = render(
		<ViewPort>
			<BottomResizable size={10} />
			<Fill id="test" />
		</ViewPort>,
	);
	const sut = container.querySelector("#test")!;
	const style = window.getComputedStyle(sut);

	expect(style.display).toBe("block");
	expect(style.position).toBe("absolute");
	expect(style.left).toBe("0px");
	expect(style.top).toBe("0px");
	expect(style.right).toBe("0px");
	expect(style.bottom).toBe("calc(0px + 10px)");
	expect(style.width).toBe("");
	expect(style.height).toBe("");
	expect(sut.nodeName).toBe("DIV");
});

test("Fill with stacked BottomResizable has correct styles", async () => {
	const { container } = render(
		<ViewPort>
			<BottomResizable size={10} order={0} />
			<BottomResizable size={20} order={1} />
			<Fill id="test" />
		</ViewPort>,
	);
	const sut = container.querySelector("#test")!;
	const style = window.getComputedStyle(sut);

	expect(style.display).toBe("block");
	expect(style.position).toBe("absolute");
	expect(style.left).toBe("0px");
	expect(style.top).toBe("0px");
	expect(style.right).toBe("0px");
	expect(style.bottom).toBe("calc(0px + 10px + 20px)");
	expect(style.width).toBe("");
	expect(style.height).toBe("");
	expect(sut.nodeName).toBe("DIV");
});
