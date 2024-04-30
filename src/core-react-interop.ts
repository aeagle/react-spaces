import { shortuuid } from "./core-utils";
const React = require("react");

function getIdFn() {
	if (React.version.startsWith("18") && typeof React.useId !== "undefined") {
		return React.useId;
	}
	// @ts-ignore
	if (typeof React.unstable_useOpaqueIdentifier !== "undefined") {
		console.log("React 17 legacy");
		// @ts-ignore
		return React.unstable_useOpaqueIdentifier;
	}
	return () => `s${shortuuid()}`;
}

export function useUniqueId(ssrEnabled: boolean) {
	const idFn = getIdFn();
	return `s${idFn().replace(/\:/g, "")}`;
}
