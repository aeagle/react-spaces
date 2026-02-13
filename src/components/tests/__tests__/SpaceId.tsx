import * as React from "react";
import { render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ViewPort } from "../../ViewPort";
import { Fill } from "../../Fill";
import { Left } from "../../Anchored";

afterEach(cleanup);

test("Space without id gets a generated id starting with 's'", () => {
	const { container } = render(
		<ViewPort>
			<Fill />
		</ViewPort>,
	);
	const spaces = container.querySelectorAll("[id^='s']");
	expect(spaces.length).toBeGreaterThanOrEqual(1);
	spaces.forEach((el) => {
		expect(el.id).toMatch(/^s.+/);
	});
});

test("Space with explicit id uses that id", () => {
	const { container } = render(
		<ViewPort>
			<Fill id="my-space" />
		</ViewPort>,
	);
	const sut = container.querySelector("#my-space");
	expect(sut).not.toBeNull();
});

test("Space id is stable across re-renders", () => {
	const { container, rerender } = render(
		<ViewPort>
			<Fill className="target" />
		</ViewPort>,
	);

	const space = container.querySelector(".target-container")!;
	const idBefore = space.id;
	expect(idBefore).toBeTruthy();

	rerender(
		<ViewPort>
			<Fill className="target" />
		</ViewPort>,
	);

	const spaceAfter = container.querySelector(".target-container")!;
	expect(spaceAfter.id).toBe(idBefore);
});

test("Multiple spaces without ids get unique ids", () => {
	const { container } = render(
		<ViewPort>
			<Left size={100} />
			<Fill />
		</ViewPort>,
	);

	const spaces = container.querySelectorAll(".spaces-space");
	const ids = Array.from(spaces).map((el) => el.id);

	expect(ids.length).toBeGreaterThanOrEqual(2);
	const unique = new Set(ids);
	expect(unique.size).toBe(ids.length);
});

test("Explicit id is preserved across re-renders", () => {
	const { container, rerender } = render(
		<ViewPort>
			<Fill id="stable" />
		</ViewPort>,
	);

	expect(container.querySelector("#stable")).not.toBeNull();

	rerender(
		<ViewPort>
			<Fill id="stable" />
		</ViewPort>,
	);

	expect(container.querySelector("#stable")).not.toBeNull();
});

test("Generated ids do not collide across sibling spaces", () => {
	const { container } = render(
		<ViewPort>
			<Left size={50} order={0} />
			<Left size={50} order={1} />
			<Left size={50} order={2} />
			<Fill />
		</ViewPort>,
	);

	const spaces = container.querySelectorAll(".spaces-space");
	const ids = Array.from(spaces).map((el) => el.id);
	const unique = new Set(ids);
	expect(unique.size).toBe(ids.length);
});

test("Nested space ids are stable across re-renders", () => {
	const { container, rerender } = render(
		<ViewPort>
			<Left size={200} className="outer">
				<Left size={100} className="inner-left" />
				<Fill className="inner-fill" />
			</Left>
			<Fill className="outer-fill" />
		</ViewPort>,
	);

	const collectIds = () => {
		const spaces = container.querySelectorAll(".spaces-space");
		return Array.from(spaces).map((el) => el.id);
	};

	const idsBefore = collectIds();
	expect(idsBefore.length).toBe(5); // ViewPort + outer Left + inner Left + inner Fill + outer Fill
	idsBefore.forEach((id) => expect(id).toBeTruthy());

	rerender(
		<ViewPort>
			<Left size={200} className="outer">
				<Left size={100} className="inner-left" />
				<Fill className="inner-fill" />
			</Left>
			<Fill className="outer-fill" />
		</ViewPort>,
	);

	const idsAfter = collectIds();
	expect(idsAfter).toEqual(idsBefore);
});

test("Deeply nested space ids are stable across multiple re-renders", () => {
	const { container, rerender } = render(
		<ViewPort>
			<Left size={300} className="level1">
				<Left size={200} className="level2">
					<Left size={100} className="level3" />
					<Fill className="level3-fill" />
				</Left>
				<Fill className="level2-fill" />
			</Left>
			<Fill className="level1-fill" />
		</ViewPort>,
	);

	const collectIds = () => {
		const spaces = container.querySelectorAll(".spaces-space");
		return Array.from(spaces).map((el) => el.id);
	};

	const idsFirst = collectIds();
	expect(idsFirst.length).toBe(7); // ViewPort + 3 levels × 2 (Left + Fill)

	for (let i = 0; i < 3; i++) {
		rerender(
			<ViewPort>
				<Left size={300} className="level1">
					<Left size={200} className="level2">
						<Left size={100} className="level3" />
						<Fill className="level3-fill" />
					</Left>
					<Fill className="level2-fill" />
				</Left>
				<Fill className="level1-fill" />
			</ViewPort>,
		);

		expect(collectIds()).toEqual(idsFirst);
	}
});

test("Nested space ids are unique across all levels", () => {
	const { container } = render(
		<ViewPort>
			<Left size={200}>
				<Left size={100} />
				<Fill />
			</Left>
			<Fill>
				<Left size={100} />
				<Fill />
			</Fill>
		</ViewPort>,
	);

	const spaces = container.querySelectorAll(".spaces-space");
	const ids = Array.from(spaces).map((el) => el.id);
	const unique = new Set(ids);
	expect(ids.length).toBe(7); // ViewPort + 2 outer (Left + Fill) + 2×2 inner (Left + Fill)
	expect(unique.size).toBe(ids.length);
});
