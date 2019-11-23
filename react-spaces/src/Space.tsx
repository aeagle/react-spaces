import * as React from 'react';
import { IPublicProps, IAnchoredProps, AnchorType, IResizableProps, AllProps, IPositionedProps, CenterType, publicProps, anchoredProps, resizableProps, positionedProps, allProps, ResizeType, AnchorToResizeTypeMap } from './Globals/Types';
import { SpaceContext, SpaceInfoContext } from './Globals/Contexts';
import './Styles.css';
import { CenteredVertically, Centered } from './Centered';
import { useSpace } from './Hooks/useSpace';
import { cssValue, isHorizontalSpace, isVerticalSpace } from './Globals/Utils';
import { HeadStyles } from './HeadStyles';
import { ResizeHandle } from './ResizeHandle';
import { updateSpace } from './Globals/ISpaceContext';
import { throttle } from './Globals/Throttle';

const USE_INLINESTYLES = false;
const RESIZE_THROTTLE = 5;

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
		currentSize
	} = useSpace(props, divElementRef);

	const handleSize = props.handleSize === undefined ? 5 : props.handleSize;
	const overlayHandle = props.overlayHandle !== undefined ? props.overlayHandle : true;
	let resizeType: ResizeType | undefined = undefined;
	let resizeHandle: React.ReactNode | undefined = undefined;
	const onResizeEnd = React.useCallback(() => {
		if (divElementRef.current)
		{
			const currentRect = divElementRef.current.getBoundingClientRect();
			props.onResizeEnd && props.onResizeEnd(
				Math.floor(resizeType === ResizeType.Left || resizeType === ResizeType.Right ? currentRect.width : currentRect.height)
			);
		}
	}, []);

	if (parentContext && props.anchor && props.resizable) {
		resizeType = AnchorToResizeTypeMap[props.anchor];

		const resizeHandleWidth = resizeType === ResizeType.Left || resizeType === ResizeType.Right ? handleSize : undefined;
		const resizeHandleHeight = resizeType === ResizeType.Top || resizeType === ResizeType.Bottom ? handleSize : undefined;

		const onResize = (
			originalX: number, 
			originalY: number, 
			x: number, 
			y: number,
			minimumAdjust: number,
			maximumAdjust: number | undefined) => {

			const adjustmentX = 
				Math.min(
					Math.max(resizeType === ResizeType.Left ? originalX - x : x - originalX, minimumAdjust),
					maximumAdjust === undefined ? 999999 : maximumAdjust
				);
			const adjustmentY = 
				Math.min(
					Math.max(resizeType === ResizeType.Top ? originalY - y : y - originalY, minimumAdjust),
					maximumAdjust === undefined ? 999999 : maximumAdjust
				);
	
			const adjustment = isHorizontalSpace(props.anchor) ? adjustmentX : adjustmentY;
	
			if (adjustment !== space.adjustedSize) {
				updateSpace(parentContext, space.id, { adjustedSize: adjustment });
			}
		};
	
		const startTouchResize = (e: React.TouchEvent<HTMLDivElement>) => {
			if (!divElementRef.current) {
				return;
			}

			var rect = divElementRef.current.getBoundingClientRect();
			var size = isHorizontalSpace(props.anchor) ? rect.width : rect.height;

			const originalTouchX = resizeType === ResizeType.Left ? e.touches[0].pageX + space.adjustedSize : e.touches[0].pageX - space.adjustedSize;
			const originalTouchY = resizeType === ResizeType.Top ? e.touches[0].pageY + space.adjustedSize : e.touches[0].pageY - space.adjustedSize;
			const minimumAdjust = (props.minimumSize === undefined ? 20 : props.minimumSize) - size + space.adjustedSize;
			const maximumAdjust = props.maximumSize ? (props.maximumSize - size + space.adjustedSize) : undefined;
			let lastX = 0;
			let lastY = 0;
			let moved = false;
	
			const touchResize = (x: number, y: number) => onResize(originalTouchX, originalTouchY, x, y, minimumAdjust, maximumAdjust);
			const throttledTouchResize = throttle<typeof touchResize>(touchResize, RESIZE_THROTTLE);
			const withPreventDefault = (e: TouchEvent) => { 
				moved = true; 
				lastX = e.touches[0].pageX; 
				lastY = e.touches[0].pageY; 
				e.preventDefault(); 
				e.stopImmediatePropagation(); 
				throttledTouchResize(lastX, lastY); 
			};
			const removeListener = () => {
				if (moved) {
					touchResize(lastX, lastY);
				}
				window.removeEventListener('touchmove', withPreventDefault);
				window.removeEventListener('touchend', removeListener);
				onResizeEnd();
			};
			window.addEventListener('touchmove', withPreventDefault);
			window.addEventListener('touchend', removeListener);
			e.preventDefault();
			e.stopPropagation();
			props.onResizeStart && props.onResizeStart();
		};
	
		const startResize = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
			if (!divElementRef.current) {
				return;
			}

			var rect = divElementRef.current.getBoundingClientRect();
			var size = isHorizontalSpace(props.anchor) ? rect.width : rect.height;

			const originalMouseX = resizeType === ResizeType.Left ? e.pageX + space.adjustedSize : e.pageX - space.adjustedSize;
			const originalMouseY = resizeType === ResizeType.Top ? e.pageY + space.adjustedSize : e.pageY - space.adjustedSize;
			const minimumAdjust = (props.minimumSize === undefined ? 20 : props.minimumSize) - size + space.adjustedSize;
			const maximumAdjust = props.maximumSize ? (props.maximumSize - size + space.adjustedSize) : undefined;
			let lastX = 0;
			let lastY = 0;
			let moved = false;

			const mouseResize = (x: number, y: number) => onResize(originalMouseX, originalMouseY, x, y, minimumAdjust, maximumAdjust);
			const throttledMouseResize = throttle<typeof mouseResize>(mouseResize, RESIZE_THROTTLE);
			const withPreventDefault = (e: MouseEvent) => { 
				moved = true; 
				lastX = e.pageX;
				lastY = e.pageY;
				e.preventDefault(); 
				e.stopImmediatePropagation(); 
				throttledMouseResize(lastX, lastY); 
			};
			const removeListener = () => {
				if (moved) {
					mouseResize(lastX, lastY);
				}
				window.removeEventListener('mousemove', withPreventDefault);
				window.removeEventListener('mouseup', removeListener);
				onResizeEnd();
			};
			window.addEventListener('mousemove', withPreventDefault);
			window.addEventListener('mouseup', removeListener);
			e.preventDefault();
			e.stopPropagation();
			props.onResizeStart && props.onResizeStart();
		};

		resizeHandle =
			<ResizeHandle
				type={resizeType}
				adjustedSize={space.adjustedSize} 
				width={resizeHandleWidth}
				height={resizeHandleHeight}
				onMouseDown={e => startResize(e)}
				onTouchStart={e => startTouchResize(e)} />;
	}
	
	const outerStyle = {
		left: (space.left !== undefined ? cssValue(space.left, space.adjustedLeft) : undefined),
		top: (space.top !== undefined ? cssValue(space.top, space.adjustedTop) : undefined),
		right: (space.right !== undefined ? cssValue(space.right, space.adjustedLeft) : undefined),
		bottom: (space.bottom !== undefined ? cssValue(space.bottom, space.adjustedTop) : undefined),
		width: isHorizontalSpace(props.anchor) ? cssValue(props.anchorSize, space.adjustedSize) : space.width,
		height: isVerticalSpace(props.anchor) ? cssValue(props.anchorSize, space.adjustedSize) : space.height,
		zIndex: space.zIndex
	};
	
	const innerStyle = 
		{
			...props.style, 
			...{ 
				left: resizeType === ResizeType.Left && !overlayHandle ? handleSize : undefined,
				top: resizeType === ResizeType.Top && !overlayHandle ? handleSize : undefined,
				right: resizeType === ResizeType.Right && !overlayHandle ? handleSize : undefined,
				bottom: resizeType === ResizeType.Bottom && !overlayHandle ? handleSize : undefined
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
				props.scrollable ? (resizeHandle ? "scrollable" : "scrollable-a") : undefined
			],
			...(resizeHandle && props.scrollable ? userClasses.map(c => `${c}-container`) : userClasses)
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
		resizeHandle && props.scrollable ?
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
					{ resizeHandle }
					<div 
						className={innerClasses.join(' ')} 
						style={innerStyle}>
						<SpaceContext.Provider value={currentContext}>
							<SpaceInfoContext.Provider value={{ width: Math.floor(currentSize.width), height: Math.floor(currentSize.height) }}>
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
					{ resizeHandle }
					<SpaceContext.Provider value={currentContext}>
					<SpaceInfoContext.Provider value={{ width: Math.floor(currentSize.width), height: Math.floor(currentSize.height) }}>
						{ children }
						</SpaceInfoContext.Provider>
					</SpaceContext.Provider>
				</>
			)
	)
})

SpaceInternal.propTypes = allProps;