import * as React from 'react';
import './Styles.css';

export enum ResizeType {
	Left = " resize-left",
	Right = " resize-right",
	Top = " resize-top",
	Bottom = " resize-bottom"
}

interface IProps {
	type: ResizeType,
	width?: number,
	height?: number,
	minimumAdjust: number,
	maximumAdjust?: number,
	onResize: (adjustedSize: number) => void
}

interface IState {
	adjustedSize: number
}

export class Resizable extends React.Component<IProps, IState> {
	private divElementRef = React.createRef<HTMLDivElement>();
	private originalMouseX: number = 0;
	private originalMouseY: number = 0;

	constructor(props: IProps) {
		super(props);

		this.state = {
			adjustedSize: 0
		}
	}

	public render() {
		return (
			<>
				<div 
					ref={this.divElementRef}
					style={{ 
						width: this.props.width, 
						height: this.props.height,
						position: 'absolute',
						zIndex: 9999 
					}}
					className={`spaces-resize-handle${this.props.type}`} 
					onMouseDown={this.startResize} />
			</>
		)
	}

	private startResize = (e: React.MouseEvent<HTMLDivElement>) => {
		e.preventDefault()
		
		if (this.props.type === ResizeType.Right) {
			this.originalMouseX = e.pageX - this.state.adjustedSize;
		}
		else if (this.props.type === ResizeType.Left) {
			this.originalMouseX = e.pageX + this.state.adjustedSize;
		}
		else if (this.props.type === ResizeType.Top) {
			this.originalMouseY = e.pageY + this.state.adjustedSize;
		}
		else if (this.props.type === ResizeType.Bottom) {
			this.originalMouseY = e.pageY - this.state.adjustedSize;
		}
		
		window.addEventListener('mousemove', this.resize)
		window.addEventListener('mouseup', this.stopResize)
	}
  
	private resize = (e: MouseEvent) => {
		let adjustment = 0;
		if (this.props.type === ResizeType.Right) {
			adjustment = e.pageX - this.originalMouseX;
		}
		else if (this.props.type === ResizeType.Left) {
			adjustment = this.originalMouseX - e.pageX;
		}
		else if (this.props.type === ResizeType.Top) {
			adjustment = this.originalMouseY - e.pageY;
		}
		else if (this.props.type === ResizeType.Bottom) {
			adjustment = e.pageY - this.originalMouseY;
		}

		if (adjustment < this.props.minimumAdjust) {
			adjustment = this.props.minimumAdjust;
		}

		if (this.props.maximumAdjust && adjustment > this.props.maximumAdjust) {
			adjustment = this.props.maximumAdjust;
		}

		if (adjustment !== this.state.adjustedSize) {
			this.setState({ adjustedSize: adjustment });
			this.props.onResize(adjustment);
		}
	}
	  
	private stopResize = () => {
		window.removeEventListener('mousemove', this.resize)
	}
}