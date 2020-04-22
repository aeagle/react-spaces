import * as React from "react";
import "../styles.css";
import { ResizeSensor } from "css-element-queries";
import { coalesce, createStore, SizeUnit, Type, Anchor, ICommonProps, ISpaceProps, shortuuid } from "../core";

const ParentContext = React.createContext<string | undefined>(undefined);
const DOMRectContext = React.createContext<DOMRect | undefined>(undefined);
const LayerContext = React.createContext<number | undefined>(undefined);
const currentStore = createStore();

function useSpace(props: ISpaceProps) {
	const store = currentStore;
	const parent = React.useContext(ParentContext);
	const layer = React.useContext(LayerContext);
	const spaceId = React.useRef(props.id || `s${shortuuid()}`);

	let space = store.getSpace(spaceId.current);

	const parsedProps = {
		...props,
		...{
			id: spaceId.current,
			zIndex: coalesce(props.zIndex, layer),
		},
	};

	if (!space) {
		space = store.createSpace(parent, parsedProps);
		store.addSpace(space);
	} else {
		store.updateSpace(space, parsedProps);
	}

	React.useEffect(() => {
		return () => {
			store.removeSpace(space!);
		};
	}, []);

	return space;
}

interface IFixedProps extends ICommonProps {
	width?: SizeUnit;
	height: SizeUnit;
}

export const Fixed: React.FC<IFixedProps> = ({ width, height, children, ...commonProps }) => (
	<Space {...commonProps} type={Type.Fixed} position={{ width: width, height: height }}>
		{children}
	</Space>
);

interface IViewPortProps extends ICommonProps {
	left?: SizeUnit;
	right?: SizeUnit;
	top?: SizeUnit;
	bottom?: SizeUnit;
}

export const ViewPort: React.FC<IViewPortProps> = ({ left, top, right, bottom, children, ...commonProps }) => (
	<Space {...commonProps} type={Type.ViewPort} position={{ left: left || 0, top: top || 0, right: right || 0, bottom: bottom || 0 }}>
		{children}
	</Space>
);

interface IAnchorProps extends ICommonProps {
	id?: string;
	size: SizeUnit;
	order?: number;
	resizable?: boolean;
}

export const LeftResizable: React.FC<Omit<IAnchorProps, "resizable">> = ({ children, ...props }) => (
	<Left {...props} resizable={true}>
		{children}
	</Left>
);

export const Left: React.FC<IAnchorProps> = ({ size, children, ...commonProps }) => (
	<Space {...commonProps} type={Type.Anchored} anchor={Anchor.Left} position={{ left: 0, top: 0, bottom: 0, width: size }}>
		{children}
	</Space>
);

export const TopResizable: React.FC<Omit<IAnchorProps, "resizable">> = ({ children, ...props }) => (
	<Top {...props} resizable={true}>
		{children}
	</Top>
);

export const Top: React.FC<IAnchorProps> = ({ size, children, ...commonProps }) => (
	<Space {...commonProps} type={Type.Anchored} anchor={Anchor.Top} position={{ left: 0, top: 0, right: 0, height: size }}>
		{children}
	</Space>
);

export const RightResizable: React.FC<Omit<IAnchorProps, "resizable">> = ({ children, ...props }) => (
	<Right {...props} resizable={true}>
		{children}
	</Right>
);

export const Right: React.FC<IAnchorProps> = ({ size, children, ...commonProps }) => (
	<Space {...commonProps} type={Type.Anchored} anchor={Anchor.Right} position={{ bottom: 0, top: 0, right: 0, width: size }}>
		{children}
	</Space>
);

export const BottomResizable: React.FC<Omit<IAnchorProps, "resizable">> = ({ children, ...props }) => (
	<Bottom {...props} resizable={true}>
		{children}
	</Bottom>
);

export const Bottom: React.FC<IAnchorProps> = ({ size, children, ...commonProps }) => (
	<Space {...commonProps} type={Type.Anchored} anchor={Anchor.Bottom} position={{ bottom: 0, left: 0, right: 0, height: size }}>
		{children}
	</Space>
);

export const Fill: React.FC<ICommonProps> = (props) => (
	<Space {...props} type={Type.Fill} position={{ left: 0, top: 0, right: 0, bottom: 0 }}>
		{props.children}
	</Space>
);

export const Centered: React.FC = (props) => <div className={`spaces-centered`}>{props.children}</div>;

export const CenteredVertically: React.FC = (props) => <div className={`spaces-centered-vertically`}>{props.children}</div>;

export const Layer: React.FC<{ zIndex: number }> = (props) => <LayerContext.Provider value={props.zIndex}>{props.children}</LayerContext.Provider>;

const Space: React.FC<ISpaceProps> = (props) => {
	const { style, className, onClick } = props;
	let { children } = props;
	const space = useSpace(props);
	const elementRef = React.useRef<HTMLElement>();
	const resizeSensor = React.useRef<ResizeSensor>();
	const [domRect, setDomRect] = React.useState<DOMRect>();

	React.useEffect(() => {
		const rect = elementRef.current!.getBoundingClientRect() as DOMRect;
		space.dimension = {
			...rect,
			...{
				left: Math.floor(rect.left),
				top: Math.floor(rect.top),
				right: Math.floor(rect.right),
				bottom: Math.floor(rect.bottom),
				width: Math.floor(rect.width),
				height: Math.floor(rect.height),
				x: Math.floor(rect.x),
				y: Math.floor(rect.y),
			},
		};
		setDomRect(space.dimension);

		if (props.trackSize) {
			resizeSensor.current = new ResizeSensor(elementRef.current!, (size) => {
				space.dimension = {
					...rect,
					...{
						width: Math.floor(size.width),
						height: Math.floor(size.height),
					},
				};
				setDomRect(space.dimension);
			});
		}

		return () => {
			resizeSensor.current && resizeSensor.current.detach();
		};
	}, []);

	if (props.centerContent === "vertical") {
		children = <CenteredVertically>{children}</CenteredVertically>;
	} else if (props.centerContent === "horizontalVertical") {
		children = <Centered>{children}</Centered>;
	}

	return (
		<>
			{React.createElement(
				props.as || "div",
				{
					id: space.id,
					ref: elementRef,
					style: style,
					className: `spaces-space${className ? ` ${className}` : ""}`,
					onClick: onClick,
				},
				<ParentContext.Provider value={space.id}>
					<LayerContext.Provider value={undefined}>
						<DOMRectContext.Provider value={domRect}>{children}</DOMRectContext.Provider>
					</LayerContext.Provider>
				</ParentContext.Provider>,
			)}
		</>
	);
};

interface ISpaceInfoProps {
	children: (info: DOMRect) => JSX.Element;
}

export const Info: React.FC<ISpaceInfoProps> = (props) => {
	const domRect = React.useContext(DOMRectContext);

	if (domRect) {
		return props.children(domRect);
	}

	return props.children({ left: 0, top: 0, right: 0, bottom: 0, width: 0, height: 0, x: 0, y: 0, toJSON: () => "" });
};

const white = { backgroundColor: "#ffffff", padding: 15 };
const green = { backgroundColor: "#ddffdd", padding: 15 };
const red = { backgroundColor: "#ffdddd", padding: 15 };
const blue = { backgroundColor: "#ddddff", padding: 15 };

export const Demo: React.FC = () => {
	const [visible, setVisible] = React.useState(true);
	const [size, setSize] = React.useState(true);
	const [side, setSide] = React.useState(true);
	return (
		<ViewPort as="main">
			<Left as="aside" size="15%" style={red} centerContent={"horizontalVertical"} trackSize={true}>
				{description("Left")}
			</Left>
			<Fill>
				<Layer zIndex={1}>
					<Top size="15%" style={blue} centerContent={"horizontalVertical"} trackSize={true}>
						{description("Top")}
					</Top>
					<Fill>
						{visible && (
							<Left size={size ? "10%" : "15%"} order={0} style={green} centerContent={"horizontalVertical"} trackSize={true}>
								{description("Left 1")}
								<div>
									<button onClick={() => setSize((prev) => !prev)}>Toggle size</button>
								</div>
							</Left>
						)}
						<Left size={"10%"} order={1} style={red} centerContent={"horizontalVertical"} trackSize={true}>
							{description("Left 2")}
						</Left>
						<Fill>
							<Top size="20%" order={1} style={red} centerContent={"horizontalVertical"} trackSize={true}>
								{description("Top 1")}
							</Top>
							<Fill style={blue}>
								{side ? (
									<Left size="20%" style={white} centerContent={"horizontalVertical"} trackSize={true}>
										{description("Left 2")}
										<div>
											<button onClick={() => setSide((prev) => !prev)}>Toggle side</button>
										</div>
									</Left>
								) : (
									<Top size="20%" style={white} centerContent={"horizontalVertical"} trackSize={true}>
										{description("Top")}
										<div>
											<button onClick={() => setSide((prev) => !prev)}>Toggle side</button>
										</div>
									</Top>
								)}
								<Fill centerContent={"horizontalVertical"} trackSize={true}>
									{description("Fill")}
									<div>
										<button onClick={() => setVisible((prev) => !prev)}>Toggle visible</button>
									</div>
								</Fill>
							</Fill>
							<Bottom size="20%" style={red} centerContent={"horizontalVertical"} trackSize={true}>
								{description("Bottom")}
							</Bottom>
						</Fill>
						<Right size="20%" style={green} scrollable={true} trackSize={true}>
							Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nam quasi ipsam autem deserunt facere mollitia asperiores nisi,
							fugiat iste cumque quo perspiciatis corporis error accusamus placeat eaque minima a, cupiditate voluptatum. Asperiores
							itaque vitae, maxime maiores iste beatae cumque, ipsum ut laboriosam alias minima ducimus numquam, quas voluptas aliquid
							omnis cupiditate fuga accusamus nemo fugit at nam reiciendis commodi quo! Odit, totam expedita laboriosam nobis
							consequatur, aperiam esse laudantium mollitia reprehenderit corporis aut unde cum delectus sed illo reiciendis voluptas
							eveniet doloribus aspernatur magnam minima, dolorem molestiae culpa! Officiis sit, doloremque veniam asperiores maiores
							fuga eveniet necessitatibus ratione delectus porro laborum minima sed ipsum aliquid dolorum eos perferendis culpa est
							totam, saepe sapiente numquam. Eveniet ipsam blanditiis iure a? Magnam quo dicta nihil velit. Fuga sit porro consectetur
							quidem! Error, dignissimos ipsa? Minus quod nulla libero fuga eligendi, nemo magnam quis. Aspernatur similique tenetur
							fugit earum distinctio. Officiis laudantium corporis facilis quia tenetur. In tempore vel, optio nihil molestias ab fuga
							vero esse amet iusto cupiditate hic molestiae suscipit non sint eum ad laudantium. Ducimus eum reiciendis consequuntur,
							sint deleniti temporibus quod ex aliquid beatae veniam officiis soluta commodi earum explicabo rerum laudantium adipisci
							dicta veritatis consequatur voluptates maxime fuga.
						</Right>
					</Fill>
					<Bottom size="15%" style={blue} centerContent={"horizontalVertical"} trackSize={true}>
						{description("Bottom")}
					</Bottom>
				</Layer>
			</Fill>
			<Right size="15%" style={red} centerContent={"horizontalVertical"} trackSize={true}>
				{description("Right")}
			</Right>
		</ViewPort>
	);
};

const description = (text: string) => (
	<Info>
		{(info) => (
			<p>
				{text}
				<br />
				{info.width}px x {info.height}px
			</p>
		)}
	</Info>
);
