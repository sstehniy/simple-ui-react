import { TextInput } from "simple-ui-react";
import { HiOutlineMail } from "react-icons/all";
import { PreviewLayout } from "./PreviewLayout";

function App() {
	return (
		<div className="App">
			<PreviewLayout>
				<TextInput
					type="text"
					placeholder="Email"
					showAnimatedName={true}
					icon={<HiOutlineMail size={20} />}
				/>
			</PreviewLayout>
		</div>
	);
}

export default App;
