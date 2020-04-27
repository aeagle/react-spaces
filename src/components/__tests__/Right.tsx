import * as React from "react";
import { render, cleanup } from "@testing-library/react";
import { Right } from "../Anchored";
import "@testing-library/jest-dom/extend-expect";
import { ViewPort } from "../ViewPort";

afterEach(cleanup);

test("Right default has correct styles", async () => {
	const { container } = render(
		<ViewPort>
			<Right id="test" size={10} />
		</ViewPort>,
	);
	const sut = container.querySelector("#test")!;
	const style = window.getComputedStyle(sut);

	expect(style.display).toBe("block");
	expect(style.position).toBe("absolute");
	expect(style.left).toBe("");
	expect(style.top).toBe("0px");
	expect(style.right).toBe("0px");
	expect(style.bottom).toBe("0px");
	expect(style.width).toBe("10px");
	expect(style.height).toBe("");
	expect(sut.nodeName).toBe("DIV");
});

test("Right with class applied", async () => {
	const { container } = render(
		<ViewPort>
			<Right id="test" size={10} className={"custom-class"} />
		</ViewPort>,
	);
	const sut = container.querySelector("#test");

	expect(sut!.className).toBe("spaces-space custom-class");
});

test("Right with style applied", async () => {
	const { container } = render(
		<ViewPort>
			<Right id="test" size={10} style={{ backgroundColor: "red" }} />
		</ViewPort>,
	);
	const sut = container.querySelector("#test");
	const style = window.getComputedStyle(sut!);

	expect(style.backgroundColor).toBe("red");
});

test("Right scrollable applied", async () => {
	const { container } = render(
		<ViewPort>
			<Right id="test" size={10} scrollable={true} />
		</ViewPort>,
	);
	const sut = container.querySelector("#test");
	const style = window.getComputedStyle(sut!);

	expect(style.overflow).toBe("auto");
});

test("Right as applied", async () => {
	const { container } = render(
		<ViewPort>
			<Right id="test" size={10} as="main" />
		</ViewPort>,
	);
	const sut = container.querySelector("#test")!;

	expect(sut.nodeName).toBe("MAIN");
});

test("Right stacked has correct styles", async () => {
	const { container } = render(
		<ViewPort>
			<Right id="test" size={10} order={0} />
			<Right id="test1" size={10} order={1} />
		</ViewPort>,
	);
	const sut = container.querySelector("#test")!;
	const style = window.getComputedStyle(sut);

	expect(style.left).toBe("");
	expect(style.top).toBe("0px");
	expect(style.right).toBe("0px");
	expect(style.bottom).toBe("0px");
	expect(style.width).toBe("10px");
	expect(style.height).toBe("");

	const sut1 = container.querySelector("#test1")!;
	const style1 = window.getComputedStyle(sut1);

	expect(style1.left).toBe("");
	expect(style1.top).toBe("0px");
	expect(style1.right).toBe("calc(10px + 0px)");
	expect(style1.bottom).toBe("0px");
	expect(style1.width).toBe("10px");
	expect(style1.height).toBe("");
});

test("Right stacked reversed has correct styles", async () => {
	const { container } = render(
		<ViewPort>
			<Right id="test1" size={10} order={1} />
			<Right id="test" size={10} order={0} />
		</ViewPort>,
	);
	const sut = container.querySelector("#test")!;
	const style = window.getComputedStyle(sut);

	expect(style.left).toBe("");
	expect(style.top).toBe("0px");
	expect(style.right).toBe("0px");
	expect(style.bottom).toBe("0px");
	expect(style.width).toBe("10px");
	expect(style.height).toBe("");

	const sut1 = container.querySelector("#test1")!;
	const style1 = window.getComputedStyle(sut1);

	expect(style1.left).toBe("");
	expect(style1.top).toBe("0px");
	expect(style1.right).toBe("calc(10px + 0px)");
	expect(style1.bottom).toBe("0px");
	expect(style1.width).toBe("10px");
	expect(style1.height).toBe("");
});
