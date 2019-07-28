import * as React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';

export const GettingStarted = () => {
	return (
		<>
			<h2 id="getting-started">Getting started</h2>

			<p>
			To get started with React Spaces you need:
			</p>

			<SyntaxHighlighter language="html">
			{
				"npm install react-spaces --save"
			}
			</SyntaxHighlighter>

			<SyntaxHighlighter language="html">
			{
				"import * as Space from 'react-spaces';"
			}
			</SyntaxHighlighter>
		</>
	)
}