import * as React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';

export const SizingInfo = () => {
	return (
		<>
            <h2 id="sizeinfo">Getting size information for a space</h2>
            
            <p>
              Using the Info component, you can get size information on the containing space. For live updates
              when the space size changes ensure that <strong>trackChanges</strong> is set to true on the space.
            </p>

            <SyntaxHighlighter language="html">
                {
                  "const App = () => (\r\n" +
                  "  <Space.Fixed height={400}>\r\n" +
                  "    <Space.Fill trackSize={true}>\r\n" +
                  "      <Space.Info>\r\n" +
                  "         {info => <span>{info.width}px x {info.height}px</span>}\r\n" +
                  "      </Space.Info>\r\n" +
                  "    </Space.Fill>\r\n" +
                  "  </Space.Fixed>\r\n" +
                  ")"
                }
            </SyntaxHighlighter>
		</>
	)
}