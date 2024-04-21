import * as React from "react";
import { render, cleanup } from "@testing-library/react";
import { Fixed } from "../../Fixed";
import "@testing-library/jest-dom";
import { commonPropsTests, commonPropTypesTest, hasProps } from "../Common";

afterEach(cleanup);

commonPropsTests("Fixed", <Fixed height={50} />, {
	position: "relative",
	left: "",
	top: "",
	right: "",
	bottom: "",
	width: "",
	height: "50px",
});

test("Fixed with width and height has correct styles", async () => {
	const { container } = render(<Fixed id="test" width={10} height={20} />);
	const sut = container.querySelector("#test")!;
	const style = window.getComputedStyle(sut);

	expect(style.left).toBe("");
	expect(style.top).toBe("");
	expect(style.right).toBe("");
	expect(style.bottom).toBe("");
	expect(style.width).toBe("10px");
	expect(style.height).toBe("20px");
});

commonPropTypesTest("Fixed", Fixed);

test(`Fixed has correct prop types`, async () => {
	hasProps("Fixed", Fixed, ["width", "height"]);
});
