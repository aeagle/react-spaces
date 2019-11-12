import React from "react";
import * as Space from "react-spaces";
import './Test.scss';
import { Info } from "react-spaces";

const COLLAPSED_SIZE = 20;
const MINIMUM_SIZE = 200;

export const Test : React.FC = () => {
    const [ size, setSize ] = React.useState(300);

    const onResizeStart = () => {
    };
  
    const onResizeEnd = (width: number) => {
        setSize(width);
    }
  
    return (
        <Space.ViewPort className="test">

            <Space.LeftResizable 
                style={{ backgroundColor: 'yellow', padding: 10 }} 
                size={size}
                handleSize={60}
                maximumSize={600}
                minimumSize={100}
                onResizeStart={onResizeStart}
                onResizeEnd={onResizeEnd}
                trackSize={true}
                order={1}>
                <Space.Info>
                    {(info) => <span>Hello<br />{info.width} x {info.height}</span>}
                </Space.Info>
            </Space.LeftResizable>

            <Space.LeftResizable
                style={{ backgroundColor: 'navy', color: 'white', padding: 10 }}
                size={200}
                trackSize={true}
                order={2}>
                <Space.Info>
                    {(info) => <span>Something<br />{info.width} x {info.height}</span>}
                </Space.Info>
            </Space.LeftResizable>

            <Space.Fill 
                style={{ backgroundColor: 'red', padding: 10 }}
                trackSize={true}>
                <Space.Info>
                    {(info) => <span>World<br />{info.width} x {info.height}</span>}
                </Space.Info>
            </Space.Fill>

        </Space.ViewPort>
    )
  }