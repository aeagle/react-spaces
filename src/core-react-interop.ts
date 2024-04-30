import { shortuuid } from "./core-utils";
const React = require("react");

const idFn =
	React.version.startsWith("18") && typeof React.useId !== "undefined"
		? React.useId
		: typeof React.unstable_useOpaqueIdentifier !== "undefined"
		? React.unstable_useOpaqueIdentifier
		: () => `${shortuuid()}`;

export function useUniqueId(ssrEnabled: boolean) {
	return `s${idFn().replace(/\:/g, "")}`;
}
