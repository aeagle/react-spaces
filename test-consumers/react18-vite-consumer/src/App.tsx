import * as Space from "react-spaces";
import "./App.css";

function App() {
	return (
		<Space.ViewPort>
			<Space.LeftResizable size="25%" centerContent={Space.CenterType.HorizontalVertical} style={{ backgroundColor: "#ddffdd", color: "#000" }}>
				Side bar
			</Space.LeftResizable>
			<Space.Fill centerContent={Space.CenterType.HorizontalVertical}>Main</Space.Fill>
		</Space.ViewPort>
	);
}

export default App;
