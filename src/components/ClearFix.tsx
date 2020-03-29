import * as React from "react";
import "../styles.css";

export const ClearFix: React.FC = (props) => <div className={`spaces-clearfix`}>{props.children}</div>;
