import * as React from 'react';

export const VersionHistory = () => {
	return (
		<>
			<h2 id="changes">Version history</h2>

			<div>
				<h3>0.1.14</h3> 
				<ul>
					<li>
						Migrated from Webpack to Rollup for building component library
					</li>
					<li>
						Created ES module bundles in /dist/es
					</li>
					<li>
						Fixed window undefined error when rendering spaces via Next.js
					</li>
					<li>
						Created server bundle (/dist/server) for using with Node.js server 
						side apps when utilising SSR, e.g. Next.js and seperated
						styling from server bundle (/dist/server.css). This is currently
						experimental.
					</li>
				</ul>
			</div>
			<div>
				<h3>0.1.13</h3> 
				<ul>
					<li>
						Refactored spaces as functional component using hooks.
					</li>
					<li>
						Fixed className type on &lt;ViewPort /&gt; component.
					</li>
				</ul>
			</div>
			<div>
				<h3>0.1.11 - 0.1.12</h3> 
				<ul>
					<li>
						Fix to deal with changes to size and anchor properties on anchored
						spaces and adjusted spaces accordingly.
					</li>
				</ul>
			</div>
			<div>
				<h3>0.1.10</h3> 
				<ul>
					<li>
						Added 'as' property to allow rendered DOM element to be specified (thanks to{" "}
						<a href="https://www.reddit.com/user/MahNonAnon/" rel="noopener noreferrer" target="_blank">u/MahNonAnon</a> and{" "}
						<a href="https://www.reddit.com/user/trevoreyre/" rel="noopener noreferrer" target="_blank">u/trevoreyre</a> on Reddit
						for suggestion of this).
					</li>
					<li>
						Added 'centerContent' property as short-hand for centering space content instead of having
						to introduce the extra &lt;Centered /&gt; or &lt;CenteredVertically /&gt; components.
					</li>
					<li>
						Allow resize handle width to be specified and also it's placement within space controlled
						with the 'overlayHandle' property.
					</li>
					<li>
						Fixed issue with dynamically added/removed anchored spaces where an anchored space would
						see itself as a space taking space.
					</li>
				</ul>
			</div>
			<div>
				<h3>0.1.9</h3> 
				<ul>
					<li>Added repository field to package.json</li>
				</ul>
			</div>
			<div>
				<h3>0.1.8</h3> 
				<ul>
					<li>Removed clear fix from space</li>
				</ul>
			</div>
			<div>
				<h3>0.1.7</h3> 
				<ul>
					<li>Fixed positioning of resize handles within scrollable divs</li>
				</ul>
			</div>
			<div>
				<h3>0.1.6</h3> 
				<ul>
					<li>Fixed resize minimum and maximum constraints</li>
				</ul>
			</div>
			<div>
				<h3>0.1.5</h3> 
				<ul>
					<li>Fixed resize handles being covered by nested spaces preventing resizing</li>
				</ul>
			</div>
			<div>
				<h3>0.1.4</h3> 
				<ul>
					<li>Add support for percentage sizing on anchored spaces</li>
				</ul>
			</div>
			<div>
				<h3>0.1.3</h3> 
				<ul>
					<li>Added readme</li>
					<li>Updated documentation</li>
				</ul>
			</div>
			<div>
				<h3>0.1.2</h3> 
				<ul>
					<li>Removed ResizeSensor from spaces by default and now optionally allow live size updates with <strong>trackSize</strong> property</li>
					<li>Added <strong>VerticallyCentered</strong> component to vertically centre content within a space</li>
					<li>Allow class names to be specified on top-level spaces <strong>ViewPort</strong> and <strong>Fixed</strong></li>
				</ul>
			</div>
			<div>
				<h3>0.1.1</h3>
				<ul>
					<li>Initial version</li>
				</ul>
			</div>
		</>		
	)
}