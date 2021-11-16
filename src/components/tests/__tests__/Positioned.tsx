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
	"Positioned left resize",
	/* size */ (style) => style.width,
	/* edge */ (style) => style.left,
	/* opposite edge */ (style) => style.right,
	"ml",
	/* horizontal */ true,
	/* negate */ false,
);

commonPositionedTests(
	"Positioned right resize",
	/* size */ (style) => style.width,
	/* edge */ (style) => style.right,
	/* opposite edge */ (style) => style.left,
	"mr",
	/* horizontal */ true,
	/* negate */ true,
);

commonPositionedTests(
	"Positioned top resize",
	/* size */ (style) => style.height,
	/* edge */ (style) => style.top,
	/* opposite edge */ (style) => style.bottom,
	"mt",
	/* horizontal */ false,
	/* negate */ false,
);

commonPositionedTests(
	"Positioned bottom resize",
	/* size */ (style) => style.height,
	/* edge */ (style) => style.bottom,
	/* opposite edge */ (style) => style.top,
	"mb",
	/* horizontal */ false,
	/* negate */ true,
);
