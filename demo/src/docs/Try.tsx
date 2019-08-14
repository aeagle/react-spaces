import * as React from 'react';

export const Try: React.FC = () => {
	return (
		<>
			<h2 id="try">Try for yourself</h2>

			<iframe src="https://codesandbox.io/embed/react-shapes-ml4kl?fontsize=14" title="react-shapes" allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media" style={{ width:'100%', maxWidth: 1000, height: 500, border: 0, borderRadius: 4, overflow: 'hidden' }} sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>
		</>
	)
}