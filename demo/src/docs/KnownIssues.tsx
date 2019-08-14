import * as React from 'react';

export const KnownIssues = () => {
	return (
		<>
			<h2 id="issues">Known issues / limitations</h2>

			<ul>
				<li>
					The components in <strong>v0.1.13</strong> have been changed to use React Hooks. This can cause problems if there are
					multiple versions of React loaded. If you are using webpack you can add to your webpack config:
					
					<pre style={{ marginTop: 15 }}>
						{`alias: { 'react': path.resolve('./node_modules/react') }`}
					</pre> 

					This will ensure that all references to React resolve to the same version.
				</li>
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