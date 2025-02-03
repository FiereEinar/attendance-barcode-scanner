import { useState } from 'react';
import Html5QrcodePlugin from './components/Html5QrcodePlugin';

function App() {
	const [results, setResults] = useState<{ [key: string]: string }>({});
	const onNewScanResult = (decodedText: string) => {
		console.log(`Scan decoded text: ${decodedText}`);
		if (!results[decodedText]) {
			setResults({ ...results, [decodedText]: decodedText });
		}
	};

	return (
		<main className='p-5 flex flex-col items-center gap-12'>
			<div className='size-[500px]'>
				<Html5QrcodePlugin
					fps={10}
					qrbox={{ width: 500, height: 500 }}
					disableFlip={false}
					qrCodeSuccessCallback={onNewScanResult}
				/>
			</div>
			<div>
				{results && (
					<ul>
						<p className='text-center'>results</p>
						{Object.keys(results).map((key) => (
							<li key={key}>{results[key]}</li>
						))}
					</ul>
				)}
			</div>
		</main>
	);
}

export default App;
