import * as React from "react";
import { cleanup, render } from "@testing-library/react";
import { Positioned } from "../../Positioned";
import "@testing-library/jest-dom/extend-expect";
import { commonPositionedResizeTests, commonPropsTests, mutateComponent } from "../Common";
import { useCurrentSpace } from "../../../core-react";
import { ViewPort } from "../../ViewPort";
import { drag } from "../TestUtils";

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

commonPositionedResizeTests(
	"Positioned left resize",
	/* size */ (style) => style.width,
	/* edge */ (style) => style.left,
	/* opposite edge */ (style) => style.right,
	"ml",
	/* horizontal */ true,
	/* negate */ false,
);

commonPositionedResizeTests(
	"Positioned right resize",
	/* size */ (style) => style.width,
	/* edge */ (style) => style.right,
	/* opposite edge */ (style) => style.left,
	"mr",
	/* horizontal */ true,
	/* negate */ true,
);

commonPositionedResizeTests(
	"Positioned top resize",
	/* size */ (style) => style.height,
	/* edge */ (style) => style.top,
	/* opposite edge */ (style) => style.bottom,
	"mt",
	/* horizontal */ false,
	/* negate */ false,
);

commonPositionedResizeTests(
	"Positioned bottom resize",
	/* size */ (style) => style.height,
	/* edge */ (style) => style.bottom,
	/* opposite edge */ (style) => style.top,
	"mb",
	/* horizontal */ false,
	/* negate */ true,
);

const testProps = { id: "test" };

[
	{ name: "left/top/width/height", props: { left: 100, top: 100, width: 100, height: 100 }, widthHeightSpecified: true },
	{ name: "left/top/right/bottom", props: { left: 100, top: 100, right: 100, bottom: 100 }, widthHeightSpecified: false },
].forEach((testCase) => {
	test(`Positioned (${testCase.name}) after drag has correct styles`, async () => {
		const Inner = () => {
			const space = useCurrentSpace();
			return (
				<button id="test-drag-handle" onMouseDown={space.startMouseDrag} onTouchStart={space.startTouchDrag}>
					Drag handle
				</button>
			);
		};

		const { container } = render(
			<ViewPort>
				{mutateComponent(
					<Positioned>
						<Inner />
					</Positioned>,
					{ ...testProps, ...testCase.props },
				)}
			</ViewPort>,
		);
		const sut = container.querySelector("#test")!;
		const dragHandle = container.querySelector(`#test-drag-handle`)!;

		// act
		drag(
			dragHandle,
			sut,
			/* start rect */ { width: 50, height: 50 },
			/* end rect */ { width: 150, height: 150 },
			/* end X */ 100,
			/* end Y */ 100,
		);

		// assert
		const style = window.getComputedStyle(sut);

		if (testCase.widthHeightSpecified) {
			expect(style.width).toBe("100px");
			expect(style.height).toBe("100px");
		} else {
			expect(style.left).toBe("calc(100px + 100px)");
			expect(style.right).toBe("calc(100px + -100px)");
			expect(style.top).toBe("calc(100px + 100px)");
			expect(style.bottom).toBe("calc(100px + -100px)");
		}
	});

	test(`Positioned (${testCase.name}) after subsequent drag has correct styles`, async () => {
		const Inner = () => {
			const space = useCurrentSpace();
			return (
				<button id="test-drag-handle" onMouseDown={space.startMouseDrag} onTouchStart={space.startTouchDrag}>
					Drag handle
				</button>
			);
		};

		const { container } = render(
			<ViewPort>
				{mutateComponent(
					<Positioned>
						<Inner />
					</Positioned>,
					{ ...testProps, ...testCase.props },
				)}
			</ViewPort>,
		);
		const sut = container.querySelector("#test")!;
		const dragHandle = container.querySelector(`#test-drag-handle`)!;

		// act
		drag(
			dragHandle,
			sut,
			/* start rect */ { width: 50, height: 50 },
			/* end rect */ { width: 150, height: 150 },
			/* end X */ 100,
			/* end Y */ 100,
		);
		drag(
			dragHandle,
			sut,
			/* start rect */ { width: 150, height: 150 },
			/* end rect */ { width: 50, height: 50 },
			/* end X */ -100,
			/* end Y */ -100,
		);

		// assert
		const style = window.getComputedStyle(sut);

		if (testCase.widthHeightSpecified) {
			expect(style.width).toBe("100px");
			expect(style.height).toBe("100px");
		} else {
			expect(style.left).toBe("calc(100px + 0px)");
			expect(style.right).toBe("calc(100px + 0px)");
			expect(style.top).toBe("calc(100px + 0px)");
			expect(style.bottom).toBe("calc(100px + 0px)");
		}
	});
});
