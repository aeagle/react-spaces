import * as React from 'react';

export const VersionHistory = () => {
	return (
		<>
			<h2 id="changes">Version history</h2>

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