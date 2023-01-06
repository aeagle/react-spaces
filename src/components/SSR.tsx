import * as React from "react";
import { enabledSsrSupport } from "../core-react";
import css from "../styles.css";

export const SSR: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	enabledSsrSupport();
	return (
		<>
			<style dangerouslySetInnerHTML={{ __html: css }} />
			{children}
		</>
	);
};
