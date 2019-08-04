import * as React from 'react';

export const KnownIssues = () => {
	return (
		<>
			<h2 id="issues">Known issues / limitations</h2>

			<ul>
				<li>
					Rendering an anchored horizontal space and an anchored vertical space within the same parent space will cause a gap
					to appear in the corner where the two anchored spaces meet. You can workaround this by using nested <strong>&lt;Fill /&gt;</strong>
					spaces to seperate the horizontally and vertically anchored spaces.
				</li>
				<li>
					There isn't currently any consideration for using spaces in a responsive manner. You can however give spaces class names and
					target them with media queries like you would with any other DOM element.
				</li>
			</ul>

		</>
	)
}