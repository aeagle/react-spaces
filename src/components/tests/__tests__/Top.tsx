import * as React from "react";
import { cleanup } from "@testing-library/react";
import { Top } from "../../Anchored";
import { commonPropsTests, commonAnchorTests, anchorPropTypesTest } from "../Common";

afterEach(cleanup);

commonPropsTests("Top", <Top size={50} />, {
	position: "absolute",
	left: "0px",
	top: "0px",
	right: "0px",
	bottom: "",
	width: "",
	height: "50px",
});

commonAnchorTests(
	"Top",
	<Top size={50} />,
	(style) => style.height,
	(style) => style.top,
	(style) => style.bottom,
);

anchorPropTypesTest("Top", Top);
