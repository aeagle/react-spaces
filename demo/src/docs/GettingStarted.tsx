import * as React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';

export const GettingStarted = () => {
	return (
		<>
			<h2 id="getting-started">Getting started</h2>

			<p>
			Spaces can be used by importing the spaces using the following:
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