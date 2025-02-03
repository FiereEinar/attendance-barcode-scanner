import { useState } from 'react';
import Html5QrcodePlugin from './components/Html5QrcodePlugin';
import { Button } from './components/ui/button';

function App() {
	const [show, setShow] = useState(false);
	const onNewScanResult = (decodedText: string) => {
		console.log(`Scan decoded text: ${decodedText}`);
	};

	return (
		<main className='p-5'>
			<Button onClick={() => setShow(true)}>Show</Button>
			<div className='size-[1000px]'>
				{show && (
					<Html5QrcodePlugin
						fps={10}
						qrbox={{ width: 1000, height: 1000 }}
						disableFlip={false}
						qrCodeSuccessCallback={onNewScanResult}
					/>
				)}
			</div>
		</main>
	);
}

export default App;
