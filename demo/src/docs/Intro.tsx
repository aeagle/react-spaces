import * as React from 'react';
import { Button, Icon } from 'antd';

export const Intro = () => {
	return (
		<>
  			<p id="intro" style={{ fontWeight: 400, paddingTop: 30, paddingBottom: 0, fontSize: 28, color: '#777' }}>
              React Spaces allow you to divide a page or container into nestable, anchored, scrollable and resizable spaces.
            </p>

			<div className="mobile" style={{ marginBottom: 15 }}>
              <Button type="primary" onClick={() => window.location.href = 'https://github.com/aeagle/react-spaces'}><Icon type="github" /> View on GitHub</Button>
            &nbsp; &nbsp;
				<img style={{ position: 'relative', top: -2 }} alt="NPM version" src="https://img.shields.io/npm/v/react-spaces.svg" />
			</div>

            <p>
              <h2>Features</h2>

              <ul>
                <li>
                  No styling to achieve simple or complex layouts.
                </li>
                <li>
                  Spaces know how to behave in relation to each other and resize accordingly.
                </li>
                <li>
                  Spaces don't have any visual element to them (even padding or margins). You can fill them with whatever you want.
                </li>
              </ul>
            </p>

            <p>
              <img src="https://www.allaneagle.com/react-spaces/react-spaces-demo.gif" alt="Screen demo" width="100%" style={{ maxWidth: 1000 }} />
            </p>
		</>
	)
}