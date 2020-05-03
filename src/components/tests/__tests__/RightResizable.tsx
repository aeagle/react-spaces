import * as React from "react";
import { cleanup } from "@testing-library/react";
import { RightResizable } from "../../Anchored";
import { commonPropsTests, commonAnchorTests, commonResizableTests } from "../Common";

afterEach(cleanup);

commonPropsTests("RightResizable", <RightResizable size={50} />, {
	position: "absolute",
	left: "",
	top: "0px",
	right: "0px",
	bottom: "0px",
	width: "50px",
	height: "",
});

commonAnchorTests(
	"RightResizable",
	<RightResizable size={50} />,
	(style) => style.width,
	(style) => style.right,
	(style) => style.left,
);

commonResizableTests(
	"RightResizable",
	<RightResizable size={50} />,
	(style) => style.width,
	(style) => style.right,
	(style) => style.left,
	true,
	true,
);
