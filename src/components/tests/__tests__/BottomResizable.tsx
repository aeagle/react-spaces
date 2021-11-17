import * as React from "react";
import { cleanup } from "@testing-library/react";
import { BottomResizable } from "../../Anchored";
import { commonPropsTests, commonAnchorTests, commonResizableTests, resizablePropTypesTest } from "../Common";

afterEach(cleanup);

commonPropsTests("BottomResizable", <BottomResizable size={50} />, {
	position: "absolute",
	left: "0px",
	top: "",
	right: "0px",
	bottom: "0px",
	width: "",
	height: "50px",
});

commonAnchorTests(
	"BottomResizable",
	<BottomResizable size={50} />,
	(style) => style.height,
	(style) => style.bottom,
	(style) => style.top,
);

commonResizableTests(
	"BottomResizable",
	<BottomResizable size={50} />,
	(style) => style.height,
	(style) => style.bottom,
	(style) => style.top,
	false,
	true,
);

resizablePropTypesTest("BottomResizable", BottomResizable);
