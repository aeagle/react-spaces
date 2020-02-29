import * as React from "react";
import * as Space from "react-spaces";
import "./ResizableScrollable.scss";

class TestComponent extends React.Component<{}> {
	constructor(props: {}) {
		super(props);
		console.log("created");
	}

	public render() {
		console.log("rendered");
		return (
			<>
				Lorem ipsum dolor sit, amet consectetur adipisicing elit. Hic, quo. Repudiandae hic placeat id beatae sint. Veritatis odio facere
				excepturi ducimus dicta ab ullam qui illo labore voluptate, vel provident sed quod perspiciatis odit expedita rem raesentium vitae
				libero laudantium corporis nulla quam ad? Illo, eos quas quaerat nde ducimus quos consequatur blanditiis odit excepturi dolorum
				repellendus animi reprehenderit esse facere et maiores cumque! Eaque ratione, nostrum cum cumque, doloremque ab voluptates reiciendis
				amet obcaecati aut dolores nobis cupiditate, ullam nesciunt nisi explicabo nihil repellendus quidem eos expedita. Eligendi facilis
				ducimus distinctio voluptatum quas officiis accusantium consequuntur necessitatibus culpa cumque.
			</>
		);
	}
}

export const ResizableScrollable = () => {
	const [resizable, setResizable] = React.useState(false);

	return (
		<Space.Fill className="scrollable-resizable">
			<Space.Custom resizable={resizable} className="left-pane" anchorSize={200} anchor={Space.AnchorType.Left} style={{ fontSize: 30 }}>
				<Space.Fill scrollable={true}>
					<button onClick={() => setResizable(!resizable)}>Change resizable</button>
					<TestComponent />
				</Space.Fill>
			</Space.Custom>
			<Space.Fill style={{ fontSize: 30 }}>
				Lorem ipsum dolor sit, amet consectetur adipisicing elit. Hic, quo. Repudiandae hic placeat id beatae sint. Veritatis odio facere
				excepturi ducimus dicta ab ullam qui illo labore voluptate, vel provident sed quod perspiciatis odit expedita rem raesentium vitae
				libero laudantium corporis nulla quam ad? Illo, eos quas quaerat nde ducimus quos consequatur blanditiis odit excepturi dolorum
				repellendus animi reprehenderit esse facere et maiores cumque! Eaque ratione, nostrum cum cumque, doloremque ab voluptates reiciendis
				amet obcaecati aut dolores nobis cupiditate, ullam nesciunt nisi explicabo nihil repellendus quidem eos expedita. Eligendi facilis
				ducimus distinctio voluptatum quas officiis accusantium consequuntur necessitatibus culpa cumque.
			</Space.Fill>
		</Space.Fill>
	);
};
