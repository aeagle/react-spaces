import { shortuuid } from "./core-utils";
const React = require("react");

export function useUniqueId(ssrEnabled: boolean) {
	if (ssrEnabled) {
		if (React.version.startsWith("18") && typeof React.useId !== "undefined") {
			return `s${React.useId().replace(/\:/g, "")}`;
		}

		// @ts-ignore
		if (typeof React.unstable_useOpaqueIdentifier !== "undefined") {
			// @ts-ignore
			return `s${React.unstable_useOpaqueIdentifier().replace(/\:/g, "")}`;
		}
	}

	return `s${shortuuid()}`;
}
