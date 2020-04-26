import * as React from "react";
import { render, cleanup } from "@testing-library/react";
import { ViewPort } from "../ViewPort";
import "@testing-library/jest-dom/extend-expect";

afterEach(cleanup);

test("ViewPort default has correct styles", async () => {
	const { container } = render(<ViewPort id="test" />);
	const sut = container.querySelector("#test");
	const style = window.getComputedStyle(sut!);

	expect(style.display).toBe("block");
	expect(style.position).toBe("fixed");
	expect(style.left).toBe("0px");
	expect(style.top).toBe("0px");
	expect(style.right).toBe("0px");
	expect(style.bottom).toBe("0px");
	expect(style.width).toBe("");
	expect(style.height).toBe("");
});

test("ViewPort with class has correct class", async () => {
	const { container } = render(<ViewPort id="test" className={"custom-class"} />);
	const sut = container.querySelector("#test");

	expect(sut!.className).toBe("spaces-space custom-class");
});
