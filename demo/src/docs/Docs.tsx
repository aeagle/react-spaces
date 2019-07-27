import * as React from 'react';
import * as Space from 'react-spaces';
import { Anchor, Button, Icon } from 'antd';
import 'antd/dist/antd.css';
import { GettingStarted } from './GettingStarted';
import { Types } from './Types';
import { Anchored } from '../ui-demo/Anchored';
import { Resizable } from './Resizable';
import { Nested } from './Nested';
import { Scrollable } from './Scrollable';
import { Stacked } from './Stacked';
import { SizingInfo } from './SizingInfo';
import { VersionHistory } from './VersionHistory';
import { Intro } from './Intro';

export const Docs = () => {
	return (
		<Space.ViewPort>
        <Space.Top size={80} style={{ backgroundColor: 'black', color: 'white', padding: 15 }}>
          <Space.CenteredVertically>
            <h1 style={{ color: 'white' }}>React Spaces</h1>
          </Space.CenteredVertically>
        </Space.Top>
        <Space.Fill className="all-content">
          <Space.Left className="sidebar" scrollable={true} size={250} style={{ padding: 30, borderRight: '2px solid #ddd' }}>

            <h3 className="sidebar-header">GitHub</h3>
            <div style={{ marginBottom: 15 }}>
              <Button type="primary" onClick={() => window.location.href = 'https://github.com/aeagle/react-spaces'}><Icon type="github" /> View on GitHub</Button>
            </div>

            <h3 className="sidebar-header">NPM <img style={{ position: 'relative', top: -2 }} alt="NPM version" src="https://img.shields.io/npm/v/react-spaces.svg" /></h3>

            <Anchor offsetTop={30}>
              <Anchor.Link href="#getting-started" title="Getting started" />
              <Anchor.Link href="#types" title="Types" />
              <Anchor.Link href="#non-resizable" title="Anchored" />
              <Anchor.Link href="#resizable" title="Resizable" />
              <Anchor.Link href="#nested" title="Nested" />
              <Anchor.Link href="#scrollable" title="Scrollable" />
              <Anchor.Link href="#stacked" title="Stacked" />
              <Anchor.Link href="#sizeinfo" title="Sizing information" />
              <Anchor.Link href="#changes" title="Version history" />
            </Anchor>

            <h2 className="sidebar-header"><a style={{ color: 'black', fontSize: 24 }} href="https://twitter.com/allaneagle">@allaneagle</a></h2>

          </Space.Left>
          <Space.Fill className="main" scrollable={true} style={{ padding: 30, paddingTop: 0 }}>

			<Intro />
			<GettingStarted />
			<Types />
			<Anchored />
			<Resizable />
			<Nested />
			<Scrollable />
			<Stacked />
			<SizingInfo />
			<VersionHistory />

          </Space.Fill>

        </Space.Fill>
      </Space.ViewPort>
	)
}

export const Description = (desc: string, mobileDesc: string) => (
	<Space.Centered>
	  <span className="description">
		<strong className="desc">{desc}</strong>
		<strong className="mobileDesc">{mobileDesc}</strong>
		<Space.Info>{info => <div>{info.width.toFixed()} x {info.height.toFixed()}</div> }</Space.Info>
	  </span>
	</Space.Centered>
)