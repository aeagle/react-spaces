import * as React from "react";
interface ISpaceInfoProps {
    children: (info: DOMRect) => JSX.Element;
}
/**
 * @deprecated use useCurrentSpace() hook instead
 */
export declare const Info: React.FC<ISpaceInfoProps>;
export {};
