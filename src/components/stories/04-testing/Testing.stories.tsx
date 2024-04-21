import * as React from "react";
import { StateDriven, AnchoredDefaultOrdering, SpaceDemoStacked1, StateDrivenSize } from "../Utils";

export default {
	title: "Testing/State",
};

export const TestSpacesUsingGlobalStoreWithStateDrivenSizingAndSwitchedSpaces = {
	render: () => <StateDriven />,
	name: "Spaces using global store with state driven sizing and switched spaces",
};

export const TestAnchoredSpacesWithDefaultOrdering = {
	render: () => <AnchoredDefaultOrdering />,
	name: "Anchored spaces with default ordering",
};

export const TestStackedSpaces = {
	render: () => <SpaceDemoStacked1 />,
	name: "Test stacked spaces",
};

export const TestStateDrivenSize = {
	render: () => <StateDrivenSize />,
	name: "State driven size",
};
