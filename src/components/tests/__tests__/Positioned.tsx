import * as React from "react";
import { cleanup } from "@testing-library/react";
import { Positioned } from "../../Positioned";
import "@testing-library/jest-dom/extend-expect";
import { commonPositionedTests, commonPropsTests } from "../Common";

afterEach(cleanup);

const positionedLeftTopRightBottom = <Positioned left={100} top={100} right={100} bottom={100} />;
const positionedLeftTopWidthHeight = <Positioned left={100} top={100} width={100} height={100} />;

commonPropsTests("Positioned (left/top/right/bottom)", positionedLeftTopRightBottom, {
	position: "absolute",
	left: "100px",
	top: "100px",
	right: "100px",
	bottom: "100px",
	width: "",
	height: "",
});

commonPropsTests("Positioned (left/top/width/height)", positionedLeftTopWidthHeight, {
	position: "absolute",
	left: "100px",
	top: "100px",
	right: "",
	bottom: "",
	width: "100px",
	height: "100px",
});

commonPositionedTests(
	"Positioned left resize (left/top/width/height)",
	positionedLeftTopWidthHeight,
	(style) => style.width,
	(style) => style.left,
	(style) => style.right,
	"ml",
	true,
	false,
);

commonPositionedTests(
	"Positioned right resize (left/top/width/height)",
	positionedLeftTopWidthHeight,
	(style) => style.width,
	(style) => style.right,
	(style) => style.left,
	"mr",
	true,
	true,
);

commonPositionedTests(
	"Positioned top resize (left/top/width/height)",
	positionedLeftTopWidthHeight,
	(style) => style.height,
	(style) => style.top,
	(style) => style.bottom,
	"mt",
	false,
	false,
);

commonPositionedTests(
	"Positioned bottom resize (left/top/width/height)",
	positionedLeftTopWidthHeight,
	(style) => style.height,
	(style) => style.bottom,
	(style) => style.top,
	"mb",
	false,
	true,
);
