import * as React from 'react';
import * as Space from 'react-spaces';
import './Resizable.scss';
import { Button } from 'antd';

export const Resizable = () => {
	const [ spaceSize, setSpaceSize ] = React.useState(20);
	const [ resizingSpaces, setResizingSpaces ] = React.useState(false);

	const intervalId = React.useRef<number | undefined>(undefined);
	const direction = React.useRef<boolean>(true);
	
	React.useEffect(() => {
		return () => {
			if (intervalId.current) {
				window.clearInterval(intervalId.current);
			}
		}
	}, [])

	React.useEffect(() => {
		if (resizingSpaces) {
			intervalId.current = window.setInterval(() => {
				setSpaceSize(prev => {
					const newSize = prev + (direction.current ? 0.1 : -0.1);
					
					if (newSize < 20 || newSize > 30) {
						direction.current = !direction.current;
					}

					return newSize;
				});
			}, 21)
		} else {
			if (intervalId.current) {
				window.clearInterval(intervalId.current);
			}
		}
	}, [ resizingSpaces ]);

	return (
		<Space.Fill className="resizable-demo blue">
			<AnchoredExample spaceSize={spaceSize} resizingSpaces={resizingSpaces} setResizingSpaces={setResizingSpaces}>
				<AnchoredExample spaceSize={spaceSize} resizingSpaces={resizingSpaces} setResizingSpaces={setResizingSpaces} />
			</AnchoredExample>
		</Space.Fill>
	)
}

const AnchoredExample : React.FC<{ spaceSize: number,resizingSpaces: boolean, setResizingSpaces: (state: boolean) => void }> = (props) => {
	const trackSize = false;

	return (
		<>
			<Space.LeftResizable size={`${props.spaceSize}%`} trackSize={trackSize} className={props.children ? "blue" : "gray"}>
				{Description("Left")}
			</Space.LeftResizable>

			<Space.Fill>
			<Space.TopResizable size={`${props.spaceSize}%`} trackSize={trackSize} className={props.children ? "red" : "blue"}>
				{Description("Top")}
			</Space.TopResizable>
			<Space.Fill trackSize={trackSize} className="white">
				{props.children ? 
					props.children : 
					<Space.Centered>
						<div style={{ textAlign: 'center' }}>
							<Button onClick={() => props.setResizingSpaces(!props.resizingSpaces)}>
								{
									!props.resizingSpaces ? "Dynamically resize spaces" : "Stop"
								}
							</Button>
						</div>
					</Space.Centered>
				}
			</Space.Fill>
			<Space.BottomResizable size={`${props.spaceSize}%`} trackSize={trackSize} className={props.children ? "red" : "blue"}>
				{Description("Bottom")}
			</Space.BottomResizable>
			</Space.Fill>

			<Space.RightResizable size={`${props.spaceSize}%`} trackSize={trackSize} className={props.children ? "blue" : "gray"}>
			{Description("Right")}
			</Space.RightResizable>
		</>
	)
}

const Description = (props: string) => (
  <Space.Centered>
	<div className="description">
		<strong>{props}</strong>
	</div>
  </Space.Centered>
);