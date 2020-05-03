import * as React from "react";
import { render, cleanup } from "@testing-library/react";
import { LeftResizable } from "../../Anchored";
import "@testing-library/jest-dom/extend-expect";
import { ViewPort } from "../../ViewPort";
import { drag } from "../TestUtils";
import { commonPropsTests } from "../Common";

afterEach(cleanup);

commonPropsTests("LeftResizable", <LeftResizable size={50} />, {
	position: "absolute",
	left: "0px",
	top: "0px",
	right: "",
	bottom: "0px",
	width: "50px",
	height: "",
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

test("LeftResizable after resize has correct styles", async () => {
	const { container } = render(
		<ViewPort>
			<LeftResizable id="test" size={50} />
		</ViewPort>,
	);
	const sut = container.querySelector("#test")!;
	const resizeHandle = container.querySelector("#test .spaces-resize-handle")!;

	drag(resizeHandle, sut, { width: 50 }, { width: 150 }, 100, 0);

	const style = window.getComputedStyle(sut);
	expect(style.display).toBe("block");
	expect(style.position).toBe("absolute");
	expect(style.left).toBe("0px");
	expect(style.top).toBe("0px");
	expect(style.right).toBe("");
	expect(style.bottom).toBe("0px");
	expect(style.width).toBe("calc(50px + 100px)");
	expect(style.height).toBe("");
	expect(sut.nodeName).toBe("DIV");
});

test("LeftResizable resize then props size change has correct styles", async () => {
	const { container, rerender } = render(
		<ViewPort>
			<LeftResizable id="test" size={50} />
		</ViewPort>,
	);
	const sut = container.querySelector("#test")!;
	const resizeHandle = container.querySelector("#test .spaces-resize-handle")!;

	drag(resizeHandle, sut, { width: 50 }, { width: 150 }, 100, 0);

	rerender(
		<ViewPort>
			<LeftResizable id="test" size={150} />
		</ViewPort>,
	);

	const style = window.getComputedStyle(sut);
	expect(style.display).toBe("block");
	expect(style.position).toBe("absolute");
	expect(style.left).toBe("0px");
	expect(style.top).toBe("0px");
	expect(style.right).toBe("");
	expect(style.bottom).toBe("0px");
	expect(style.width).toBe("150px");
	expect(style.height).toBe("");
	expect(sut.nodeName).toBe("DIV");
});
