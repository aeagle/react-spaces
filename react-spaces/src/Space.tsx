import * as React from 'react';
import { IPublicProps, IAnchoredProps, AnchorType, IResizableProps, AllProps, IPositionedProps, CenterType, publicProps, anchoredProps, resizableProps, positionedProps, allProps, ResizeType } from './Globals/Types';
import { SpaceContext, SpaceInfoContext } from './Globals/Contexts';
import './Styles.css';
import { CenteredVertically, Centered } from './Centered';
import { useSpace } from './Hooks/useSpace';
import { cssValue, isHorizontalSpace, isVerticalSpace } from './Globals/Utils';
import { applyResize } from './Globals/Resize';
import { HeadStyles } from './HeadStyles';

const USE_INLINESTYLES = false;

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

export const SpaceInternal : React.FC<AllProps> = React.memo((props) => {

	const divElementRef = React.useRef<HTMLDivElement>();

	const { 
		space,
		parentContext,
		currentContext,
		currentWidth,
		currentHeight
	} = useSpace(props, divElementRef);
	
	const outerStyle = {
		left: (space.left !== undefined ? cssValue(space.left, space.adjustedLeft) : undefined),
		top: (space.top !== undefined ? cssValue(space.top, space.adjustedTop) : undefined),
		right: (space.right !== undefined ? cssValue(space.right, space.adjustedLeft) : undefined),
		bottom: (space.bottom !== undefined ? cssValue(space.bottom, space.adjustedTop) : undefined),
		width: isHorizontalSpace(props.anchor) ? cssValue(props.anchorSize, space.adjustedSize) : space.width,
		height: isVerticalSpace(props.anchor) ? cssValue(props.anchorSize, space.adjustedSize) : space.height,
		zIndex: space.zIndex
	};

	const handleSize = props.handleSize === undefined ? 5 : props.handleSize;
	const overlayHandle = props.overlayHandle !== undefined ? props.overlayHandle : true;
	const resize = applyResize(props, space, parentContext, handleSize, divElementRef);
	
	const innerStyle = 
		{
			...props.style, 
			...{ 
				left: resize.resizeType === ResizeType.Left && !overlayHandle ? handleSize : undefined,
				top: resize.resizeType === ResizeType.Top && !overlayHandle ? handleSize : undefined,
				right: resize.resizeType === ResizeType.Right && !overlayHandle ? handleSize : undefined,
				bottom: resize.resizeType === ResizeType.Bottom && !overlayHandle ? handleSize : undefined
			}
		};

	const userClasses = 
		props.className ? 
			props.className.split(' ').map(c => c.trim()) : 
			[];
		
	const outerClasses = 
		[
			...[
				"spaces-space",
				props.scrollable ? (resize.resizeHandle ? "scrollable" : "scrollable-a") : undefined
			],
			...(resize.resizeHandle && props.scrollable ? userClasses.map(c => `${c}-container`) : userClasses)
		].filter(c => c);

	const innerClasses =
		[
			"spaces-space-inner", 
			...userClasses
		].filter(c => c);

	let children = props.children;

	if (props.centerContent === CenterType.Vertical) {
		children = <CenteredVertically>{children}</CenteredVertically>;
	} else if (props.centerContent === CenterType.HorizontalVertical) {
		children = <Centered>{children}</Centered>;
	}

	return (
		props.topMost ?
			<>
				{ !USE_INLINESTYLES && <HeadStyles spaces={currentContext.children} /> }
				<SpaceContext.Provider value={currentContext}>
					<SpaceInfoContext.Provider value={{ width: Math.floor(currentWidth), height: Math.floor(currentHeight) }}>
						{ children }
					</SpaceInfoContext.Provider>
				</SpaceContext.Provider>
			</> :
			resize.resizeHandle && props.scrollable ?
				React.createElement(
					props.as || 'div',
					{
						id: space.id,
						ref: divElementRef,
						className: outerClasses.join(' '),
						style: USE_INLINESTYLES ? {...outerStyle, ...innerStyle} : undefined,
						onClick: props.onClick,
						onMouseDown: props.onMouseDown,
						onMouseEnter: props.onMouseEnter,
						onMouseLeave: props.onMouseLeave
					},
					<>
						{ !USE_INLINESTYLES && <HeadStyles spaces={currentContext.children} /> }
						{ resize.resizeHandle }
						<div 
							className={innerClasses.join(' ')} 
							style={innerStyle}>
							<SpaceContext.Provider value={currentContext}>
								<SpaceInfoContext.Provider value={{ width: Math.floor(currentWidth), height: Math.floor(currentHeight) }}>
									{ children }
								</SpaceInfoContext.Provider>
							</SpaceContext.Provider>
						</div>
					</>
				) :
				React.createElement(
					props.as || 'div',
					{
						id: space.id,
						ref: divElementRef,
						className: outerClasses.join(' '),
						style: USE_INLINESTYLES ? {...innerStyle, ...outerStyle} : innerStyle,
						onClick: props.onClick,
						onMouseDown: props.onMouseDown,
						onMouseEnter: props.onMouseEnter,
						onMouseLeave: props.onMouseLeave
					},
					<>
						{ !USE_INLINESTYLES && <HeadStyles spaces={currentContext.children} /> }
						{ resize.resizeHandle }
						<SpaceContext.Provider value={currentContext}>
							<SpaceInfoContext.Provider value={{ width: Math.floor(currentWidth), height: Math.floor(currentHeight) }}>
							{ children }
							</SpaceInfoContext.Provider>
						</SpaceContext.Provider>
					</>
				)
	)
})

SpaceInternal.propTypes = allProps;