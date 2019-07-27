import * as React from 'react';

export const Intro = () => {
	return (
		<>
  			<p id="intro" style={{ fontWeight: 400, paddingTop: 30, paddingBottom: 0, fontSize: 28, color: '#777' }}>
              React Spaces allow you to divide a page or container into nestable, anchored, scrollable and resizable spaces.
            </p>

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
              <img src="http://www.allaneagle.com/react-spaces/react-spaces-demo.gif" alt="Screen demo" width="100%" style={{ maxWidth: 1000 }} />
            </p>
		</>
	)
}