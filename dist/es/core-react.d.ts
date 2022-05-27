import * as React from "react";
import { ISpaceProps, ISpaceStore, ISpaceDefinition, CenterType, ISpaceContext, ICommonProps } from "./core-types";
import * as PropTypes from "prop-types";
export declare const useEffectOnce: (effect: () => void | (() => void)) => void;
export declare const ParentContext: React.Context<string | undefined>;
export declare const DOMRectContext: React.Context<DOMRect | undefined>;
export declare const LayerContext: React.Context<number | undefined>;
export declare const OptionsContext: React.Context<IReactSpacesOptions>;
export declare const currentStore: ISpaceStore;
export declare const commonProps: {
    id: PropTypes.Requireable<string>;
    className: PropTypes.Requireable<string>;
    style: PropTypes.Requireable<object>;
    as: PropTypes.Requireable<any>;
    centerContent: PropTypes.Requireable<CenterType>;
    zIndex: PropTypes.Requireable<number>;
    scrollable: PropTypes.Requireable<boolean>;
    trackSize: PropTypes.Requireable<boolean>;
    allowOverflow: PropTypes.Requireable<boolean>;
    handleRender: PropTypes.Requireable<(...args: any[]) => any>;
    onClick: PropTypes.Requireable<(...args: any[]) => any>;
    onDoubleClick: PropTypes.Requireable<(...args: any[]) => any>;
    onMouseDown: PropTypes.Requireable<(...args: any[]) => any>;
    onMouseEnter: PropTypes.Requireable<(...args: any[]) => any>;
    onMouseLeave: PropTypes.Requireable<(...args: any[]) => any>;
    onMouseMove: PropTypes.Requireable<(...args: any[]) => any>;
    onTouchStart: PropTypes.Requireable<(...args: any[]) => any>;
    onTouchMove: PropTypes.Requireable<(...args: any[]) => any>;
    onTouchEnd: PropTypes.Requireable<(...args: any[]) => any>;
};
export interface IReactSpacesOptions {
    debug?: boolean;
}
export interface IReactEvents {
    onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
    onDoubleClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
    onMouseDown?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
    onMouseEnter?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
    onMouseLeave?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
    onMouseMove?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
    onTouchStart?: (event: React.TouchEvent<HTMLElement>) => void;
    onTouchMove?: (event: React.TouchEvent<HTMLElement>) => void;
    onTouchEnd?: (event: React.TouchEvent<HTMLElement>) => void;
}
export interface IReactSpaceCommonProps extends ICommonProps, IReactEvents {
    style?: React.CSSProperties;
    as?: keyof React.ReactDOM | React.ComponentType<ICommonProps>;
}
export interface IReactSpaceInnerProps extends IReactSpaceCommonProps, ISpaceProps, IReactEvents {
    handleRender?: (handleProps: IResizeHandleProps) => React.ReactNode;
}
export interface IReactSpacesOptions {
    debug?: boolean;
}
export declare function useForceUpdate(): () => void;
export declare function useSpace(props: IReactSpaceInnerProps): {
    space: ISpaceDefinition;
    resizeHandles: {
        mouseHandles: IResizeHandleProps[];
    };
    domRect: DOMRect | undefined;
    elementRef: React.MutableRefObject<HTMLElement | undefined>;
};
export interface IResizeHandleProps {
    id?: string;
    key: string | number;
    className?: string;
    onMouseDown: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
    onTouchStart: (e: React.TouchEvent<HTMLElement>) => void;
}
export declare function useSpaceResizeHandles(store: ISpaceStore, space: ISpaceDefinition): {
    mouseHandles: IResizeHandleProps[];
};
export declare function useCurrentSpace(): ISpaceContext;
