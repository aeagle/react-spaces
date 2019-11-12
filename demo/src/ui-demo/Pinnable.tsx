import React from 'react';
import * as Space from 'react-spaces';

export const Pinnable = () => {
    const [leftOpen, setLeftOpen] = React.useState(false);
    const [leftPinned, setLeftPinned] = React.useState(false);
    const [rightOpen, setRightOpen] = React.useState(false);
    const [rightPinned, setRightPinned] = React.useState(false);
  
    return (
      <>
        <Space.Fill>
          <Space.LeftResizable
            order={1}
            size={leftOpen ? "25%" : 50}
            zIndex={leftPinned ? 1 : 2}
            style={{ background: "yellow", opacity: 0.8 }}
          >
            <Space.Top size={40} centerContent={Space.CenterType.HorizontalVertical}>
              <button onClick={() => setLeftOpen(prev => !prev)}>
                {leftOpen ? "Close" : "Open"}
              </button>
              {leftOpen && (
                <button onClick={() => setLeftPinned(prev => !prev)}>
                  {leftPinned ? "Unpin" : "Pin"}
                </button>
              )}
            </Space.Top>
            <Space.Fill style={{ padding: 10 }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab incidunt
            commodi id doloremque inventore laudantium maxime saepe veritatis,
            dolorem labore magnam. Quod, tempore inventore omnis doloremque
            accusantium commodi ratione dignissimos eos doloribus aliquid
            quibusdam officiis qui porro neque modi, fugiat iusto suscipit
            perspiciatis? Corporis, necessitatibus quia soluta illum perferendis
            beatae.
            </Space.Fill>
          </Space.LeftResizable>
          <Space.Left
            zIndex={1}
            order={2}
            size="25%"
            style={{ background: "orange" }}
          >
          <Space.Top size={40} />
            <Space.Fill style={{ padding: 10 }}>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod a,
            facilis qui perspiciatis excepturi culpa! Vero sit eum nobis itaque
            nemo culpa sed quasi recusandae, voluptatum, debitis dolores qui dolor
            libero ipsam minima animi voluptates! Ad excepturi modi eius velit,
            debitis impedit maxime voluptates consequatur rem dolore nesciunt,
            earum cum.
            </Space.Fill>
          </Space.Left>
          <Space.Fill zIndex={1} style={{ background: "pink" }}>
            <Space.Top size={40} />
            <Space.Fill style={{ padding: 10 }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo dicta
            dolore nisi veniam maiores iusto magnam fuga facere ipsum, recusandae,
            reprehenderit quasi illum sequi doloribus molestias. Consectetur qui
            unde dolore odio similique quidem perferendis, eligendi sequi
            recusandae explicabo. Excepturi ratione molestias et temporibus
            perferendis vitae ab voluptatum repellat corporis assumenda.
            </Space.Fill>
          </Space.Fill>
          <Space.Right
            size={rightOpen ? "25%" : 50}
            zIndex={rightPinned ? 1 : 2}
            style={{ background: "lime", opacity: 0.8 }}
          >
            <Space.Top size={40} centerContent={Space.CenterType.HorizontalVertical}>
            <button onClick={() => setRightOpen(prev => !prev)}>
              {rightOpen ? "Close" : "Open"}
            </button>
            {rightOpen && (
              <button onClick={() => setRightPinned(prev => !prev)}>
                {rightPinned ? "Unpin" : "Pin"}
              </button>
            )}
            </Space.Top>
            <Space.Fill style={{ padding: 10 }}>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iure,
              inventore! Deserunt quasi hic atque natus quod totam. Quia molestias
              obcaecati quibusdam illum sint dolorem doloremque eos unde natus
              nesciunt officia corrupti recusandae ipsam, accusamus, sed amet optio
              numquam minima eaque inventore enim esse. Natus saepe laboriosam dolor
              magnam at illo.
            </Space.Fill>
          </Space.Right>
        </Space.Fill>
      </>
    );
  };