import { shortuuid } from "./core-utils";
const React = require("react");

export function useUniqueId(ssrEnabled: boolean) {
	// React 18
	if (typeof React.useId === "function") {
		return `s${React.useId().replace(/\:/g, "")}`;
	}
	// React 16 and 17 - access potentially existing unstable identifier dynamically
	const unstableIdentifier = (React as any)["unstable_useOpaqueIdentifier"];
	if (typeof unstableIdentifier === "function") {
		return `s${unstableIdentifier().replace(/\:/g, "")}`;
	}

	// Fallback for non-SSR or older React versions
	return `s${shortuuid()}`;
}
