import * as React from "react";
import { cleanup } from "@testing-library/react";
import { Bottom } from "../../Anchored";
import { commonPropsTests, commonAnchorTests } from "../Common";

afterEach(cleanup);

commonPropsTests("Bottom", <Bottom size={50} />, {
	position: "absolute",
	left: "0px",
	top: "",
	right: "0px",
	bottom: "0px",
	width: "",
	height: "50px",
});

commonAnchorTests(
	"Bottom",
	<Bottom size={50} />,
	(style) => style.height,
	(style) => style.bottom,
	(style) => style.top,
);
