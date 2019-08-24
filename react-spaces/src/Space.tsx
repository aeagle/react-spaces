import * as React from 'react';
import { ResizeSensor } from 'css-element-queries';
import { IPublicProps, IAnchoredProps, AnchorType, IResizableProps, AllProps, IState } from './Globals/Types';
import { isHorizontalSpace, isVerticalSpace, calculateSpace, initialState } from './Globals/Helpers';
import { SpaceContext, SpaceInfoContext } from './Globals/Contexts';
import './Styles.css';

export const Fill : React.FC<IPublicProps> = (props) => <Space {...props} />
export const Top : React.FC<IPublicProps & IAnchoredProps> = (props) => <Space {...props} anchor={AnchorType.Top} anchorSize={props.size} />
export const Left : React.FC<IPublicProps & IAnchoredProps> = (props) => <Space {...props} anchor={AnchorType.Left} anchorSize={props.size} />
export const Bottom : React.FC<IPublicProps & IAnchoredProps> = (props) => <Space {...props} anchor={AnchorType.Bottom} anchorSize={props.size} />
export const Right : React.FC<IPublicProps & IAnchoredProps> = (props) => <Space {...props} anchor={AnchorType.Right} anchorSize={props.size} />
export const TopResizable : React.FC<IPublicProps & IAnchoredProps & IResizableProps> = (props) => <Space {...props} anchor={AnchorType.Top} anchorSize={props.size} resizable={true} />
export const LeftResizable : React.FC<IPublicProps & IAnchoredProps & IResizableProps> = (props) => <Space {...props} anchor={AnchorType.Left} anchorSize={props.size} resizable={true} />
export const BottomResizable : React.FC<IPublicProps & IAnchoredProps & IResizableProps> = (props) => <Space {...props} anchor={AnchorType.Bottom} anchorSize={props.size} resizable={true} />
export const RightResizable : React.FC<IPublicProps & IAnchoredProps & IResizableProps> = (props) => <Space {...props} anchor={AnchorType.Right} anchorSize={props.size} resizable={true} />
 
const Space : React.FC<AllProps> = (props) => {
	const parentContext = React.useContext(SpaceContext);
	const [ state, changeState ] = React.useState<IState>(initialState(props));
	const divElementRef = React.useRef<HTMLDivElement>();
	const resizeSensor = React.useRef<ResizeSensor | undefined>(undefined);
	const onRemove = React.useRef<(() => void) | undefined>(undefined);
	
	const setState = (stateDelta: Partial<IState>) => changeState(prev => ({...prev, ...stateDelta}));

	// Deal with property changes to size / anchoring 
	React.useEffect(() => {
		setState({
			parsedSize: typeof props.anchorSize === "string" ? 0 : props.anchorSize as number | undefined,
			left: props.anchor !== AnchorType.Right ? 0 : undefined,
			top: props.anchor !== AnchorType.Bottom ? 0 : undefined,
			right: props.anchor !== AnchorType.Left ? 0 : undefined,
			bottom: props.anchor !== AnchorType.Top ? 0 : undefined,
			width: isHorizontalSpace(props) ? props.anchorSize || 0 : undefined,
			height: isVerticalSpace(props) ? props.anchorSize || 0 : undefined,
			debug: props.debug !== undefined ? props.debug : false,
		})
	}, [ props.anchor, props.anchorSize, props.debug ]);

	// Setup / cleanup
	React.useEffect(() => {
		if (divElementRef.current) {
			if (props.trackSize) {
				resizeSensor.current = new ResizeSensor(
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
			if (resizeSensor.current) {
				resizeSensor.current.detach();
				resizeSensor.current = undefined;
			}
	
			if (onRemove.current) {
				onRemove.current();
				onRemove.current = undefined;
			}
		}

		return cleanup;
	}, [])

	const debug =
		parentContext ? parentContext.debug : false ||
		props.debug !== undefined ? props.debug : false;

	const { currentContext, outerStyle, innerStyle, resizeType, resizeHandle, children } = 
		calculateSpace(props, state, setState, (handler) => { onRemove.current = handler; }, parentContext);

	const outerClasses = [
		"spaces-space",
		props.anchor || '',
		resizeType || '',
		props.scrollable ? "scrollable" : '',
		props.className ? `${props.className}-container` : '',
		debug ? 'debug' : ''
	]

	const innerClasses = [
		"spaces-space-inner",
		props.className ? props.className : ''
	]

	return (
		<>
			<SpaceContext.Provider value={currentContext}>
				<SpaceInfoContext.Provider value={{ width: Math.floor(state.currentWidth), height: Math.floor(state.currentHeight) }}>
					{
						React.createElement(
							props.as || 'div',
							{
								id: props.id,
								ref: divElementRef,
								className: outerClasses.join(' '),
								style: outerStyle
							},
							<>
								{ resizeHandle }
								<div className={innerClasses.join(' ')} style={innerStyle}>
									{ children }
								</div>
							</>
						)
					}
				</SpaceInfoContext.Provider>
			</SpaceContext.Provider>
		</>
	)
}