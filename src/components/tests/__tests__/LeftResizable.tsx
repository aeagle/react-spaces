import * as React from "react";
import { cleanup } from "@testing-library/react";
import { LeftResizable } from "../../Anchored";
import { commonPropsTests, commonAnchorTests, commonResizableTests, resizablePropTypesTest } from "../Common";

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

commonAnchorTests(
	"LeftResizable",
	<LeftResizable size={50} />,
	(style) => style.width,
	(style) => style.left,
	(style) => style.right,
);

commonResizableTests(
	"LeftResizable",
	<LeftResizable size={50} />,
	(style) => style.width,
	(style) => style.left,
	(style) => style.right,
	true,
	false,
);

resizablePropTypesTest("LeftResizable", LeftResizable);
