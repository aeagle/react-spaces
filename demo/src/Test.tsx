import React from "react";
import * as Space from "react-spaces";
import './Test.scss';

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
                order={1}>
                    Hello
            </Space.LeftResizable>

            <Space.Left
                style={{ backgroundColor: 'navy', color: 'white', padding: 10 }}
                size={200}
                order={2}>
                    Something
            </Space.Left>

            <Space.Fill 
                style={{ backgroundColor: 'red', padding: 10 }}>
                    World
            </Space.Fill>

        </Space.ViewPort>
    )
  }