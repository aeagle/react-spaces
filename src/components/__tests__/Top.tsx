import * as React from "react";
import { render, cleanup } from "@testing-library/react";
import { Top } from "../Anchored";
import "@testing-library/jest-dom/extend-expect";
import { ViewPort } from "../ViewPort";

afterEach(cleanup);

test("Top default has correct styles", async () => {
	const { container } = render(
		<ViewPort>
			<Top id="test" size={10} />
		</ViewPort>,
	);
	const sut = container.querySelector("#test")!;
	const style = window.getComputedStyle(sut);

	expect(style.display).toBe("block");
	expect(style.position).toBe("absolute");
	expect(style.left).toBe("0px");
	expect(style.top).toBe("0px");
	expect(style.right).toBe("0px");
	expect(style.bottom).toBe("");
	expect(style.width).toBe("");
	expect(style.height).toBe("10px");
	expect(sut.nodeName).toBe("DIV");
});

test("Top with class applied", async () => {
	const { container } = render(
		<ViewPort>
			<Top id="test" size={10} className={"custom-class"} />
		</ViewPort>,
	);
	const sut = container.querySelector("#test");

	expect(sut!.className).toBe("spaces-space custom-class");
});

test("Top with style applied", async () => {
	const { container } = render(
		<ViewPort>
			<Top id="test" size={10} style={{ backgroundColor: "red" }} />
		</ViewPort>,
	);
	const sut = container.querySelector("#test");
	const style = window.getComputedStyle(sut!);

	expect(style.backgroundColor).toBe("red");
});

test("Top scrollable applied", async () => {
	const { container } = render(
		<ViewPort>
			<Top id="test" size={10} scrollable={true} />
		</ViewPort>,
	);
	const sut = container.querySelector("#test");
	const style = window.getComputedStyle(sut!);

	expect(style.overflow).toBe("auto");
});

test("Top as applied", async () => {
	const { container } = render(
		<ViewPort>
			<Top id="test" size={10} as="main" />
		</ViewPort>,
	);
	const sut = container.querySelector("#test")!;

	expect(sut.nodeName).toBe("MAIN");
});

test("Top stacked has correct styles", async () => {
	const { container } = render(
		<ViewPort>
			<Top id="test" size={10} order={0} />
			<Top id="test1" size={10} order={1} />
		</ViewPort>,
	);
	const sut = container.querySelector("#test")!;
	const style = window.getComputedStyle(sut);

	expect(style.left).toBe("0px");
	expect(style.top).toBe("0px");
	expect(style.right).toBe("0px");
	expect(style.bottom).toBe("");
	expect(style.width).toBe("");
	expect(style.height).toBe("10px");

	const sut1 = container.querySelector("#test1")!;
	const style1 = window.getComputedStyle(sut1);

	expect(style1.left).toBe("0px");
	expect(style1.top).toBe("calc(0px + 10px)");
	expect(style1.right).toBe("0px");
	expect(style1.bottom).toBe("");
	expect(style1.width).toBe("");
	expect(style1.height).toBe("10px");
});

test("Top stacked reversed has correct styles", async () => {
	const { container } = render(
		<ViewPort>
			<Top id="test1" size={10} order={1} />
			<Top id="test" size={10} order={0} />
		</ViewPort>,
	);
	const sut = container.querySelector("#test")!;
	const style = window.getComputedStyle(sut);

	expect(style.left).toBe("0px");
	expect(style.top).toBe("0px");
	expect(style.right).toBe("0px");
	expect(style.bottom).toBe("");
	expect(style.width).toBe("");
	expect(style.height).toBe("10px");

	const sut1 = container.querySelector("#test1")!;
	const style1 = window.getComputedStyle(sut1);

	expect(style1.left).toBe("0px");
	expect(style1.top).toBe("calc(0px + 10px)");
	expect(style1.right).toBe("0px");
	expect(style1.bottom).toBe("");
	expect(style1.width).toBe("");
	expect(style1.height).toBe("10px");
});
