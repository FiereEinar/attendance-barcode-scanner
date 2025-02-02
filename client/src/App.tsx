import Html5QrcodePlugin from './components/Html5QrcodePlugin';
import { Button } from './components/ui/button';

function App() {
	const onNewScanResult = (decodedText: string) => {
		console.log(`Scan decoded text: ${decodedText}`);
	};

	return (
		<main className='p-5'>
			<h1 className='text-red-500'>Hello World!</h1>
			<Button>Click</Button>
			<div className='size-[500px]'>
				<Html5QrcodePlugin
					fps={10}
					qrbox={{ width: 500, height: 500 }}
					disableFlip={false}
					qrCodeSuccessCallback={onNewScanResult}
				/>
			</div>
		</main>
	);
}

export default App;
