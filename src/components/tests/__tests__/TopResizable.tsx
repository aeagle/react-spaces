import * as React from "react";
import { cleanup } from "@testing-library/react";
import { TopResizable } from "../../Anchored";
import { commonPropsTests, commonAnchorTests, commonResizableTests } from "../Common";

afterEach(cleanup);

commonPropsTests("TopResizable", <TopResizable size={50} />, {
	position: "absolute",
	left: "0px",
	top: "0px",
	right: "0px",
	bottom: "",
	width: "",
	height: "50px",
});

commonAnchorTests(
	"TopResizable",
	<TopResizable size={50} />,
	(style) => style.height,
	(style) => style.top,
	(style) => style.bottom,
);

commonResizableTests(
	"TopResizable",
	<TopResizable size={50} />,
	(style) => style.height,
	(style) => style.top,
	(style) => style.bottom,
	false,
	false,
);
