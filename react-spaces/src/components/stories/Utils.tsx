import * as React from "react";
import { CSSProperties } from "react";
import { Centered } from "../Centered";
import { Info } from "../SpaceInfo";

export const blue: CSSProperties = { backgroundColor: "#e0eeee" };
export const red: CSSProperties = { backgroundColor: "#eee0e0" };
export const green: CSSProperties = { backgroundColor: "#e0eee0" };

export const description = (props: string) => (
	<Info>
		{(info) => (
			<Centered>
				<div className="description">
					<strong>{props}</strong>
					<br />
					{info && (
						<>
							{info.width} x {info.height}
						</>
					)}
				</div>
			</Centered>
		)}
	</Info>
);
