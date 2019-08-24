import React from 'react';

export const Index: React.FC = () => {
	return (
		<>
			<h1>React Spaces with Next.js</h1>

			<ol>
				<li><a href="/withoutssr">Without SSR</a></li>
				<li><a href="/withssr">With SSR</a></li>
			</ol>
		</>
	)
}

export default Index;