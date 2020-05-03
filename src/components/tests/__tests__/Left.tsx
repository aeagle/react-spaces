import * as React from "react";
import { cleanup } from "@testing-library/react";
import { Left } from "../../Anchored";
import { commonPropsTests, commonAnchorTests } from "../Common";

afterEach(cleanup);

commonPropsTests("Left", <Left size={50} />, {
	position: "absolute",
	left: "0px",
	top: "0px",
	right: "",
	bottom: "0px",
	width: "50px",
	height: "",
});

commonAnchorTests(
	"Left",
	<Left size={50} />,
	(style) => style.width,
	(style) => style.left,
	(style) => style.right,
);
