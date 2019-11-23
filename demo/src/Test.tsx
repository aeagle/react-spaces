import React from "react";
import * as Space from "react-spaces";
import './Test.scss';
import { Info } from "react-spaces";

const COLLAPSED_SIZE = 20;
const MINIMUM_SIZE = 200;

export const Test : React.FC = () => {
    const [ size, setSize ] = React.useState("25%");

    const onResizeStart = () => {
    };
  
    const onResizeEnd = (width: number) => {
        // setSize(width);
    }
  
    return (
        <Space.ViewPort className="test">

            <Space.Left
                style={{ backgroundColor: 'yellow', padding: 10 }} 
                size={size}
                trackSize={false}
                order={1}>
                <Space.Info>
                    {(info) => <span>Hello<br />{info.width} x {info.height}</span>}
                </Space.Info>
                <div>Something else</div>
            </Space.Left>

            <Space.Left
                style={{ backgroundColor: 'navy', color: 'white', padding: 10 }}
                size={200}
                trackSize={false}
                order={2}>
                <Space.Info>
                    {(info) => <span>Something<br />{info.width} x {info.height}</span>}
                </Space.Info>
            </Space.Left>

            <Space.Fill 
                style={{ backgroundColor: 'red', padding: 10 }}
                trackSize={false}>
                <Space.Info>
                    {(info) => <span>World<br />{info.width} x {info.height}</span>}
                </Space.Info>
            </Space.Fill>

        </Space.ViewPort>
    )
  }