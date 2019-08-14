import * as React from 'react';
import './Space.scss';
import { ResizeSensor } from 'css-element-queries';
import { IPublicProps, IAnchoredProps, AnchorType, IResizableProps, AllProps, IState } from './Globals/Types';
import { isHorizontalSpace, isVerticalSpace, calculateSpace, initialState } from './Globals/Helpers';
import { SpaceContext, SpaceInfoContext } from './Globals/Contexts';

export const Fill : React.FC<IPublicProps> = (props) => <Space {...props} />
export const Top : React.FC<IPublicProps & IAnchoredProps> = (props) => <Space {...props} anchor={AnchorType.Top} />
export const Left : React.FC<IPublicProps & IAnchoredProps> = (props) => <Space {...props} anchor={AnchorType.Left} />
export const Bottom : React.FC<IPublicProps & IAnchoredProps> = (props) => <Space {...props} anchor={AnchorType.Bottom} />
export const Right : React.FC<IPublicProps & IAnchoredProps> = (props) => <Space {...props} anchor={AnchorType.Right} />
export const TopResizable : React.FC<IPublicProps & IAnchoredProps & IResizableProps> = (props) => <Space {...props} anchor={AnchorType.Top} resizable={true} />
export const LeftResizable : React.FC<IPublicProps & IAnchoredProps & IResizableProps> = (props) => <Space {...props} anchor={AnchorType.Left} resizable={true} />
export const BottomResizable : React.FC<IPublicProps & IAnchoredProps & IResizableProps> = (props) => <Space {...props} anchor={AnchorType.Bottom} resizable={true} />
export const RightResizable : React.FC<IPublicProps & IAnchoredProps & IResizableProps> = (props) => <Space {...props} anchor={AnchorType.Right} resizable={true} />

const Space : React.FC<AllProps> = (props) => {
	const parentContext = React.useContext(SpaceContext);
	const [ state, changeState ] = React.useState<IState>(initialState(props));
	const divElementRef = React.useRef<HTMLDivElement>();

	let resizeSensor: ResizeSensor | undefined = undefined;
	let onRemove: (() => void) | undefined = undefined;
	
	const setState = (stateDelta: Partial<IState>) => changeState(prev => ({...prev, ...stateDelta}));

	// Deal with property changes to size / anchoring 
	React.useEffect(() => {
		setState({
			parsedSize: typeof props.size === "string" ? 0 : props.size as number | undefined,
			left: props.anchor !== AnchorType.Right ? 0 : undefined,
			top: props.anchor !== AnchorType.Bottom ? 0 : undefined,
			right: props.anchor !== AnchorType.Left ? 0 : undefined,
			bottom: props.anchor !== AnchorType.Top ? 0 : undefined,
			width: isHorizontalSpace(props) ? props.size || 0 : undefined,
			height: isVerticalSpace(props) ? props.size || 0 : undefined
		})
	}, [ props.anchor, props.size ]);

	// Setup / cleanup
	React.useEffect(() => {
		if (divElementRef.current) {
			if (props.trackSize) {
				resizeSensor = new ResizeSensor(
					divElementRef.current, 
					(size) => setState({ currentWidth: size.width, currentHeight: size.height })
				);
			}

			const currentRect = divElementRef.current.getBoundingClientRect();
			setState({
				parsedSize: 
					!state.parsedSize ? 
						(isHorizontalSpace(props) ? currentRect.width : currentRect.height) : 
						state.parsedSize,
				currentWidth: currentRect.width,
				currentHeight: currentRect.height
			});
		}

		const cleanup = () => {
			if (resizeSensor) {
				resizeSensor.detach();
				resizeSensor = undefined;
			}
	
			if (onRemove) {
				onRemove();
				onRemove = undefined;
			}
		}

		return cleanup;
	}, [])

	const { currentContext, outerStyle, innerStyle, resizeType, resizeHandle, children } = 
		calculateSpace(props, state, setState, (handler) => { onRemove = handler; }, parentContext);

	return (
		<SpaceContext.Provider value={currentContext}>
			<SpaceInfoContext.Provider value={{ width: Math.floor(state.currentWidth), height: Math.floor(state.currentHeight) }}>
				{
					React.createElement(
						props.as || 'div',
						{
							id: props.id,
							ref: divElementRef,
							className: `spaces-space${props.anchor || ''}${resizeType || ''}${props.scrollable ? ' scrollable' : ''}${props.className ? ` ${props.className}-container` : ``}`,
							style: outerStyle
						},
						<>
							{ resizeHandle }
							<div className={`spaces-space-inner${props.className ? ` ${props.className}` : ``}`} style={innerStyle}>
								{ children }
							</div>
						</>
					)
				}
			</SpaceInfoContext.Provider>
		</SpaceContext.Provider>
	)
}