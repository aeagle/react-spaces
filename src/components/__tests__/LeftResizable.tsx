import * as React from "react";
import { render, cleanup } from "@testing-library/react";
import { LeftResizable } from "../Anchored";
import "@testing-library/jest-dom/extend-expect";
import { ViewPort } from "../ViewPort";

afterEach(cleanup);

test("LeftResizable default has correct styles", async () => {
	const { container } = render(
		<ViewPort>
			<LeftResizable id="test" size={10} />
		</ViewPort>,
	);
	const sut = container.querySelector("#test")!;
	const style = window.getComputedStyle(sut);

	expect(style.display).toBe("block");
	expect(style.position).toBe("absolute");
	expect(style.left).toBe("0px");
	expect(style.top).toBe("0px");
	expect(style.right).toBe("");
	expect(style.bottom).toBe("0px");
	expect(style.width).toBe("10px");
	expect(style.height).toBe("");
	expect(sut.nodeName).toBe("DIV");
});

test("LeftResizable with class applied", async () => {
	const { container } = render(
		<ViewPort>
			<LeftResizable id="test" size={10} className={"custom-class"} />
		</ViewPort>,
	);
	const sut = container.querySelector("#test");

	expect(sut!.className).toBe("spaces-space custom-class");
});

test("LeftResizable with style applied", async () => {
	const { container } = render(
		<ViewPort>
			<LeftResizable id="test" size={10} style={{ backgroundColor: "red" }} />
		</ViewPort>,
	);
	const sut = container.querySelector("#test");
	const style = window.getComputedStyle(sut!);

	expect(style.backgroundColor).toBe("red");
});

test("LeftResizable scrollable applied", async () => {
	const { container } = render(
		<ViewPort>
			<LeftResizable id="test" size={10} scrollable={true} />
		</ViewPort>,
	);
	const sut = container.querySelector("#test");
	const style = window.getComputedStyle(sut!);

	expect(style.overflow).toBe("auto");
});

test("LeftResizable as applied", async () => {
	const { container } = render(
		<ViewPort>
			<LeftResizable id="test" size={10} as="main" />
		</ViewPort>,
	);
	const sut = container.querySelector("#test")!;

	expect(sut.nodeName).toBe("MAIN");
});

test("LeftResizable stacked has correct styles", async () => {
	const { container } = render(
		<ViewPort>
			<LeftResizable id="test" size={10} order={0} />
			<LeftResizable id="test1" size={10} order={1} />
		</ViewPort>,
	);
	const sut = container.querySelector("#test")!;
	const style = window.getComputedStyle(sut);

	expect(style.left).toBe("0px");
	expect(style.top).toBe("0px");
	expect(style.right).toBe("");
	expect(style.bottom).toBe("0px");
	expect(style.width).toBe("10px");
	expect(style.height).toBe("");

	const sut1 = container.querySelector("#test1")!;
	const style1 = window.getComputedStyle(sut1);

	expect(style1.left).toBe("calc(0px + 10px)");
	expect(style1.top).toBe("0px");
	expect(style1.right).toBe("");
	expect(style1.bottom).toBe("0px");
	expect(style1.width).toBe("10px");
	expect(style1.height).toBe("");
});

test("LeftResizable stacked reversed has correct styles", async () => {
	const { container } = render(
		<ViewPort>
			<LeftResizable id="test1" size={10} order={1} />
			<LeftResizable id="test" size={10} order={0} />
		</ViewPort>,
	);
	const sut = container.querySelector("#test")!;
	const style = window.getComputedStyle(sut);

	expect(style.left).toBe("0px");
	expect(style.top).toBe("0px");
	expect(style.right).toBe("");
	expect(style.bottom).toBe("0px");
	expect(style.width).toBe("10px");
	expect(style.height).toBe("");

	const sut1 = container.querySelector("#test1")!;
	const style1 = window.getComputedStyle(sut1);

	expect(style1.left).toBe("calc(0px + 10px)");
	expect(style1.top).toBe("0px");
	expect(style1.right).toBe("");
	expect(style1.bottom).toBe("0px");
	expect(style1.width).toBe("10px");
	expect(style1.height).toBe("");
});
