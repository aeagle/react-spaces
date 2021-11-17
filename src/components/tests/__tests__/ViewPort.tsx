import * as React from "react";
import { cleanup } from "@testing-library/react";
import { ViewPort } from "../../ViewPort";
import "@testing-library/jest-dom/extend-expect";
import { commonPropsTests, commonPropTypesTest, hasProps } from "../Common";

afterEach(cleanup);

commonPropsTests("ViewPort", <ViewPort />, {
	position: "fixed",
	left: "0px",
	top: "0px",
	right: "0px",
	bottom: "0px",
	width: "",
	height: "",
});

commonPropTypesTest("ViewPort", ViewPort);

test(`ViewPort has correct prop types`, async () => {
	hasProps("ViewPort", ViewPort, ["left", "top", "right", "bottom"]);
});
