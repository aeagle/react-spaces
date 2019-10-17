import * as React from 'react';
import { IPublicProps, IAnchoredProps, AnchorType, IResizableProps, AllProps, IPositionedProps, CenterType, publicProps, anchoredProps, resizableProps, positionedProps, allProps } from './Globals/Types';
import { SpaceContext, SpaceInfoContext } from './Globals/Contexts';
import { useSpace } from './Globals/Hooks';
import './Styles.css';
import { CenteredVertically, Centered } from './Centered';

export const Fill : React.FC<IPublicProps> = (props) => <SpaceInternal {...props} />
Fill.propTypes = publicProps;
export const Top : React.FC<IPublicProps & IAnchoredProps> = (props) => <SpaceInternal {...props} anchor={AnchorType.Top} anchorSize={props.size} />
Top.propTypes = {...publicProps, ...anchoredProps};
export const Left : React.FC<IPublicProps & IAnchoredProps> = (props) => <SpaceInternal {...props} anchor={AnchorType.Left} anchorSize={props.size} />
Left.propTypes = {...publicProps, ...anchoredProps};
export const Bottom : React.FC<IPublicProps & IAnchoredProps> = (props) => <SpaceInternal {...props} anchor={AnchorType.Bottom} anchorSize={props.size} />
Bottom.propTypes = {...publicProps, ...anchoredProps};
export const Right : React.FC<IPublicProps & IAnchoredProps> = (props) => <SpaceInternal {...props} anchor={AnchorType.Right} anchorSize={props.size} />
Right.propTypes = {...publicProps, ...anchoredProps};
export const TopResizable : React.FC<IPublicProps & IAnchoredProps & IResizableProps> = (props) => <SpaceInternal {...props} anchor={AnchorType.Top} anchorSize={props.size} resizable={true} />
TopResizable.propTypes = {...publicProps, ...anchoredProps, ...resizableProps};
export const LeftResizable : React.FC<IPublicProps & IAnchoredProps & IResizableProps> = (props) => <SpaceInternal {...props} anchor={AnchorType.Left} anchorSize={props.size} resizable={true} />
LeftResizable.propTypes = {...publicProps, ...anchoredProps, ...resizableProps};
export const BottomResizable : React.FC<IPublicProps & IAnchoredProps & IResizableProps> = (props) => <SpaceInternal {...props} anchor={AnchorType.Bottom} anchorSize={props.size} resizable={true} />
BottomResizable.propTypes = {...publicProps, ...anchoredProps, ...resizableProps};
export const RightResizable : React.FC<IPublicProps & IAnchoredProps & IResizableProps> = (props) => <SpaceInternal {...props} anchor={AnchorType.Right} anchorSize={props.size} resizable={true} />
RightResizable.propTypes = {...publicProps, ...anchoredProps, ...resizableProps};
export const Positioned : React.FC<IPublicProps & IResizableProps & IPositionedProps> = (props) => <SpaceInternal {...props} />
RightResizable.propTypes = {...publicProps, ...resizableProps, ...positionedProps};

const SpaceInternal : React.FC<AllProps> = (props) => {

	const divElementRef = React.useRef<HTMLDivElement>();

	const { 
		currentContext, 
		outerStyle, 
		outerClasses,
		innerStyle, 
		innerClasses,
		resizeHandle,
		currentWidth,
		currentHeight
	} = useSpace(props, divElementRef);
	
	let children = props.children;

	if (props.centerContent === CenterType.Vertical) {
		children = <CenteredVertically>{children}</CenteredVertically>;
	} else if (props.centerContent === CenterType.HorizontalVertical) {
		children = <Centered>{children}</Centered>;
	}

	return (
		<SpaceContext.Provider value={currentContext}>
			<SpaceInfoContext.Provider value={{ width: Math.floor(currentWidth), height: Math.floor(currentHeight) }}>
				{
					React.createElement(
						props.as || 'div',
						{
							id: props.id,
							ref: divElementRef,
							className: outerClasses.join(' '),
							style: outerStyle,
							onClick: props.onClick,
							onMouseDown: props.onMouseDown,
							onMouseEnter: props.onMouseEnter,
							onMouseLeave: props.onMouseLeave
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
	)
}
SpaceInternal.propTypes = allProps;