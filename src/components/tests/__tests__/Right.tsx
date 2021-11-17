import * as React from "react";
import { cleanup } from "@testing-library/react";
import { Right } from "../../Anchored";
import { commonPropsTests, commonAnchorTests, anchorPropTypesTest } from "../Common";

afterEach(cleanup);

commonPropsTests("Right", <Right size={50} />, {
	position: "absolute",
	left: "",
	top: "0px",
	right: "0px",
	bottom: "0px",
	width: "50px",
	height: "",
});

commonAnchorTests(
	"Right",
	<Right size={50} />,
	(style) => style.width,
	(style) => style.right,
	(style) => style.left,
);

anchorPropTypesTest("Right", Right);
