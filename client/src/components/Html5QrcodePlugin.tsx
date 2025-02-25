// file = Html5QrcodePlugin.jsx
import { Html5QrcodeScanner } from 'html5-qrcode';
import { Html5QrcodeScannerConfig } from 'html5-qrcode/esm/html5-qrcode-scanner';
import { useEffect } from 'react';

const qrcodeRegionId = 'html5qr-code-full-region';

type Html5QrcodeConfig = Html5QrcodeScannerConfig & {
	fps?: number;
	qrbox?: {
		width: number;
		height: number;
	};
	aspectRatio?: number;
	disableFlip?: boolean;
};

type Html5QrcodePluginProps = Html5QrcodeConfig & {
	qrCodeSuccessCallback: (decodedText: string, result: any) => void;
	qrCodeErrorCallback?: (errorMessage: string) => void;
	verbose?: boolean;
};

// Creates the configuration object for Html5QrcodeScanner.
const createConfig = (props: Html5QrcodePluginProps) => {
	let config: Html5QrcodeConfig = {
		fps: 10,
		qrbox: {
			width: 250,
			height: 250,
		},
		aspectRatio: 1.0,
		disableFlip: false,
	};

	if (props.fps) {
		config.fps = props.fps;
	}
	if (props.qrbox) {
		config.qrbox = props.qrbox;
	}
	if (props.aspectRatio) {
		config.aspectRatio = props.aspectRatio;
	}
	if (props.disableFlip !== undefined) {
		config.disableFlip = props.disableFlip;
	}
	return config;
};

export default function Html5QrcodePlugin(props: Html5QrcodePluginProps) {
	useEffect(() => {
		// when component mounts
		const config = createConfig(props);
		const verbose = props.verbose === true;
		// Suceess callback is required.
		if (!props.qrCodeSuccessCallback) {
			throw 'qrCodeSuccessCallback is required callback.';
		}
		const html5QrcodeScanner = new Html5QrcodeScanner(
			qrcodeRegionId,
			config,
			verbose
		);
		html5QrcodeScanner.render(
			props.qrCodeSuccessCallback,
			props.qrCodeErrorCallback
		);

		// cleanup function when component will unmount
		return () => {
			html5QrcodeScanner.clear().catch((error) => {
				console.error('Failed to clear html5QrcodeScanner. ', error);
			});
		};
	}, []);

	return <div id={qrcodeRegionId} />;
}
