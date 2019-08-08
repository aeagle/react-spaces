import * as React from 'react';
import './Space.scss';
import { AnchorType, CenterType } from './Globals';
import { ResizeSensor, ResizeSensorCallback } from 'css-element-queries';
import { SpaceContext, ISpaceContext, ISpaceTaker } from './SpaceContext';
import { Guid } from "guid-typescript";
import { Resizable, ResizeType } from './Resizable';
import { CenteredVertically, Centered } from './Centered';

interface IPublicProps {
	id?: string,
	className?: string,
	style?: React.CSSProperties,
	scrollable?: boolean,
	trackSize?: boolean,
	centerContent?: CenterType,
	as?: string
}

interface IPrivateProps {
	anchor?: AnchorType,
	resizable?: boolean
}

interface IAnchoredProps {
	size?: number | string,
	order?: number
}

interface IResizableProps {
	handleSize?: number,
	overlayHandle?: boolean,
	minimumSize?: number,
	maximumSize?: number
}

interface IState {
	id: string,
	currentWidth: number,
	currentHeight: number,
	adjustedSize: number,
	spaceTakers: ISpaceTaker[],

	parsedSize?: number;
	left?: number;
	top?: number;
	right?: number;
	bottom?: number;
	width?: number | string;
	height?: number | string;
}

export const Fill : React.FC<IPublicProps> = (props) => <Space {...props} />
export const Top : React.FC<IPublicProps & IAnchoredProps> = (props) => <Space {...props} anchor={AnchorType.Top} />
export const Left : React.FC<IPublicProps & IAnchoredProps> = (props) => <Space {...props} anchor={AnchorType.Left} />
export const Bottom : React.FC<IPublicProps & IAnchoredProps> = (props) => <Space {...props} anchor={AnchorType.Bottom} />
export const Right : React.FC<IPublicProps & IAnchoredProps> = (props) => <Space {...props} anchor={AnchorType.Right} />
export const TopResizable : React.FC<IPublicProps & IAnchoredProps & IResizableProps> = (props) => <Space {...props} anchor={AnchorType.Top} resizable={true} />
export const LeftResizable : React.FC<IPublicProps & IAnchoredProps & IResizableProps> = (props) => <Space {...props} anchor={AnchorType.Left} resizable={true} />
export const BottomResizable : React.FC<IPublicProps & IAnchoredProps & IResizableProps> = (props) => <Space {...props} anchor={AnchorType.Bottom} resizable={true} />
export const RightResizable : React.FC<IPublicProps & IAnchoredProps & IResizableProps> = (props) => <Space {...props} anchor={AnchorType.Right} resizable={true} />

type AllProps = IPublicProps & IPrivateProps & IAnchoredProps & IResizableProps;

interface ISpaceInfo {
	width: number,
	height: number
}

const SpaceInfoContext = React.createContext<ISpaceInfo | null>(null);

const getSizeString = (size: string | number) =>
	typeof(size) === "string" ? size : `${size}px`;

class Space extends React.Component<AllProps, IState> {
	private divElementRef = React.createRef<HTMLDivElement>();
	private resizeSensor?: ResizeSensor;
	private onRemove?: () => void;

	constructor(props: AllProps) {
		super(props);

		this.state = {
			id: Guid.create().toString(),
			currentWidth: 0,
			currentHeight: 0,
			adjustedSize: 0,
			spaceTakers: [],

			parsedSize: typeof props.size === "string" ? 0 : props.size as number | undefined,
			left: props.anchor !== AnchorType.Right ? 0 : undefined,
			top: props.anchor !== AnchorType.Bottom ? 0 : undefined,
			right: props.anchor !== AnchorType.Left ? 0 : undefined,
			bottom: props.anchor !== AnchorType.Top ? 0 : undefined,
			width: this.isHorizontalSpace() ? props.size || 0 : undefined,
			height: this.isVerticalSpace() ? props.size || 0 : undefined,
		}
	}

	public componentDidMount() {
		if (this.divElementRef.current) {
			if (this.props.trackSize) {
				this.resizeSensor = new ResizeSensor(this.divElementRef.current, this.spaceResized);
			}

			const currentRect = this.divElementRef.current.getBoundingClientRect();
			this.setState({
				parsedSize: 
					!this.state.parsedSize ? 
						this.isHorizontalSpace() ? currentRect.width : currentRect.height : 
						this.state.parsedSize,
				currentWidth: currentRect.width,
				currentHeight: currentRect.height
			});
		}
	}

	public componentWillReceiveProps(nextProps: AllProps) {
		if (this.props.size !== nextProps.size ||
			this.props.anchor !== nextProps.anchor) {
			this.setState({
				parsedSize: typeof nextProps.size === "string" ? 0 : nextProps.size as number | undefined,
				left: nextProps.anchor !== AnchorType.Right ? 0 : undefined,
				top: nextProps.anchor !== AnchorType.Bottom ? 0 : undefined,
				right: nextProps.anchor !== AnchorType.Left ? 0 : undefined,
				bottom: nextProps.anchor !== AnchorType.Top ? 0 : undefined,
				width: this.isHorizontalSpace() ? nextProps.size || 0 : undefined,
				height: this.isVerticalSpace() ? nextProps.size || 0 : undefined
			})
		}
	}

	public componentWillUnmount() {
		if (this.props.trackSize) {
			if (this.resizeSensor) {
				this.resizeSensor.detach();
				this.resizeSensor = undefined;
			}
		}

		if (this.onRemove) {
			this.onRemove();
		}
	}

	public render() {
		return (
			<SpaceContext.Consumer>
				{
					parentContext => {
						const style = {
							left: (this.state.left !== undefined ? `calc(${this.state.left}px)` : undefined) as string | undefined,
							top: (this.state.top !== undefined ? `calc(${this.state.top}px)` : undefined) as string,
							right: (this.state.right !== undefined ? `calc(${this.state.right}px)` : undefined) as string,
							bottom: (this.state.bottom !== undefined ? `calc(${this.state.bottom}px)` : undefined) as string,
							width: 
								this.isHorizontalSpace() ? 
									`calc(${getSizeString(this.props.size || 0)} + ${this.state.adjustedSize}px)`
									: undefined,
							height: 
								this.isVerticalSpace() ? 
									`calc(${getSizeString(this.props.size || 0)} + ${this.state.adjustedSize}px)`
									: undefined,
						};

						if (parentContext) {
							this.onRemove = () => {
								parentContext.removeSpaceTaker(this.state.id);
							}

							let adjustedTop: string[] = [];
							let adjustedLeft: string[] = [];
							let adjustedRight: string[] = [];
							let adjustedBottom: string[] = [];

							[ AnchorType.Left, 
							  AnchorType.Right, 
							  AnchorType.Bottom, 
							  AnchorType.Top ]
								.forEach(a => {
									const spaceTakers = 
										parentContext.spaceTakers
											.filter(t => t.anchorType === a)
											.sort((a, b) => a.order - b.order);

									for (let i = 0; i < spaceTakers.length; i ++)
									{
										const t = spaceTakers[i];
										if (t.id !== this.state.id) {
											const adjustedSize = t.adjustedSize !== 0 ?` + ${t.adjustedSize}px` : ``;
											if (this.isFilledSpace())
											{
												if (t.anchorType === AnchorType.Top) {
													adjustedTop.push(`${getSizeString(t.size)}${adjustedSize}`);
												} else if (t.anchorType === AnchorType.Left) {
													adjustedLeft.push(`${getSizeString(t.size)}${adjustedSize}`);
												} else if (t.anchorType === AnchorType.Bottom) {
													adjustedBottom.push(`${getSizeString(t.size)}${adjustedSize}`);
												} else if (t.anchorType === AnchorType.Right) {
													adjustedRight.push(`${getSizeString(t.size)}${adjustedSize}`);
												}
											}
											else
											{
												if (t.anchorType === AnchorType.Top && style.top !== undefined) {
													adjustedTop.push(`${getSizeString(t.size)}${adjustedSize}`);
												} else if (t.anchorType === AnchorType.Left && style.left !== undefined) {
													adjustedLeft.push(`${getSizeString(t.size)}${adjustedSize}`);
												} else if (t.anchorType === AnchorType.Bottom && style.bottom !== undefined) {
													adjustedBottom.push(`${getSizeString(t.size)}${adjustedSize}`);
												} else if (t.anchorType === AnchorType.Right && style.right !== undefined) {
													adjustedRight.push(`${getSizeString(t.size)}${adjustedSize}`);
												}
											}
										} else {
											break;
										}
									}
								});

							[
								{ adjusted: adjustedTop, setter: (value: string) => style.top = value },
								{ adjusted: adjustedBottom, setter: (value: string) => style.bottom = value },
								{ adjusted: adjustedLeft, setter: (value: string) => style.left = value },
								{ adjusted: adjustedRight, setter: (value: string) => style.right = value }
							].map(x => {
								if (x.adjusted.length > 0) {
									x.setter(`calc(${x.adjusted.join(" + ")})`)
								}
							});
							
							if (this.props.anchor) {
								parentContext.registerSpaceTaker({
									id: this.state.id,
									order: this.props.order || 1,
									anchorType: this.props.anchor,
									size: this.props.size || 0,
									adjustedSize: 0
								});
							}
						}
				
						const currentContext = this.getContext(parentContext);
						const handleSize = this.props.handleSize || 5;
						const overlayHandle = this.props.overlayHandle !== undefined ? this.props.overlayHandle : true;
						let children = this.props.children;

						const [ resizeRender, resizeType ] = this.applyResize(parentContext, handleSize);

						if (this.props.centerContent === CenterType.Vertical) {
							children = <CenteredVertically>{children}</CenteredVertically>;
						} else if (this.props.centerContent === CenterType.HorizontalVertical) {
							children = <Centered>{children}</Centered>;
						}
						
						const adjustedStyle = 
							{
								...this.props.style, 
								...{ 
									left: resizeType === ResizeType.Left && !overlayHandle ? handleSize : undefined,
									top: resizeType === ResizeType.Top && !overlayHandle ? handleSize : undefined,
									right: resizeType === ResizeType.Right && !overlayHandle ? handleSize : undefined,
									bottom: resizeType === ResizeType.Bottom && !overlayHandle ? handleSize : undefined
								}
							};
						
						return (
							<SpaceContext.Provider value={currentContext}>
								<SpaceInfoContext.Provider value={{ width: Math.floor(this.state.currentWidth), height: Math.floor(this.state.currentHeight) }}>
									{
										React.createElement(
											this.props.as || 'div',
											{
												id: this.props.id,
												ref: this.divElementRef,
												className: `spaces-space${this.props.anchor || ''}${resizeType || ''}${this.props.scrollable ? ' scrollable' : ''}${this.props.className ? ` ${this.props.className}-container` : ``}`,
												style: style
											},
											<>
												{ resizeRender }
												<div className={`spaces-space-inner${this.props.className ? ` ${this.props.className}` : ``}`} style={adjustedStyle}>
													{ children }
												</div>
											</>
										)
									}
								</SpaceInfoContext.Provider>
							</SpaceContext.Provider>
						)
					}
				}
			</SpaceContext.Consumer>
		)
	}

	private isFilledSpace = () => {
		return !this.props.anchor;
	}

	private isHorizontalSpace = () => {
		return this.props.anchor && (this.props.anchor === AnchorType.Left || this.props.anchor === AnchorType.Right);
	}

	private isVerticalSpace = () => {
		return this.props.anchor && (this.props.anchor === AnchorType.Top || this.props.anchor === AnchorType.Bottom);
	}

	private getContext = (parent: ISpaceContext | null) => {
		return {
			level: parent ? parent.level + 1 : 0,
			width: this.state.currentWidth,
			height: this.state.currentHeight,
			spaceTakers: this.state.spaceTakers,
			registerSpaceTaker: 
				(spaceTaker: ISpaceTaker) => {
					const existing = this.state.spaceTakers.find(t => t.id === spaceTaker.id);

					if (!existing) {
						this.setState({
							spaceTakers: [ ...this.state.spaceTakers, spaceTaker ]
						})
					} else {
						existing.order = spaceTaker.order;
						existing.anchorType = spaceTaker.anchorType;
						existing.size = spaceTaker.size;
					}
				},
			removeSpaceTaker:
				(id: string) => {
					this.setState({
						spaceTakers: this.state.spaceTakers.filter(t => t.id !== id)
					})
				},
			updateSpaceTakerAdjustedSize:
				(id: string, adjustedSize: number) => {
					this.setState({
						spaceTakers: 
							this.state.spaceTakers.map(t =>
								t.id === id ?
									{...t, ...{ adjustedSize: adjustedSize }} :
									t
						)
					})
				}
		}
	}

	private applyResize = (parentContext: ISpaceContext | null, handleSize: number) => {
		let resizeType : ResizeType = ResizeType.Left;
		let resizeHandleWidth : number | undefined;
		let resizeHandleHeight : number | undefined;

		if (parentContext && this.props.anchor && this.props.resizable) {
			switch (this.props.anchor) {
				case AnchorType.Left:
					resizeType = ResizeType.Right;
					resizeHandleWidth = handleSize;
					break;
				case AnchorType.Right:
					resizeType = ResizeType.Left;
					resizeHandleWidth = this.props.handleSize || 5;
					break;
				case AnchorType.Top:
					resizeType = ResizeType.Bottom;
					resizeHandleHeight = this.props.handleSize || 5;
					break;
				case AnchorType.Bottom:
					resizeType = ResizeType.Top;
					resizeHandleHeight = this.props.handleSize || 5;
					break;
			}
			
			return [
				<Resizable 
					type={resizeType} 
					width={resizeHandleWidth}
					height={resizeHandleHeight}
					minimumAdjust={ -(this.state.parsedSize || 0) + (this.props.minimumSize || 20) }
					maximumAdjust={ this.props.maximumSize ? (this.props.maximumSize - (this.state.parsedSize || 0)) : undefined }
					onResize={(adjustedSize) => { 
						this.setState(
							{ adjustedSize: adjustedSize },
							() => {
								parentContext.updateSpaceTakerAdjustedSize(this.state.id, adjustedSize); 
							}); 
					}} />,
				resizeType
			]
		}

		return [ null, null ];
	}

	private spaceResized : ResizeSensorCallback = (size) => {
		this.setState({
			currentWidth: size.width,
			currentHeight: size.height
		});
	}
}

export const Info : React.FC<{ children: (info: ISpaceInfo) => React.ReactNode }> = (props) => (
	<SpaceInfoContext.Consumer>
		{
			info => props.children(info!)
		}
	</SpaceInfoContext.Consumer>
)
