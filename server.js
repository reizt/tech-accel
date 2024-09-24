const express = require('express');
const next = require('next');
const https = require('node:https');
const fs = require('node:fs');

const port = Number.parseInt(process.env.PORT || '4300');
const host = '0.0.0.0';

const app = next({
	dev: process.env.NODE_ENV !== 'production',
});
const handle = app.getRequestHandler();

(async () => {
	await app.prepare();
	const expressApp = express();

	expressApp.get('*', (req, res) => handle(req, res));

	// Use HTTPS if HTTPS option enabled
	const hasCertificates =
		fs.existsSync('./certificates/localhost.key') && fs.existsSync('./certificates/localhost.crt');
	const useHttps = process.env.HTTPS === 'true' && hasCertificates;

	if (useHttps) {
		const options = {
			key: fs.readFileSync('./certificates/localhost.key'),
			cert: fs.readFileSync('./certificates/localhost.crt'),
		};
		const server = https.createServer(options, expressApp);
		server.listen(port, host);
		console.log(`> Ready on https://localhost:${port}`);
	} else {
		expressApp.listen(port, host);
		console.log(`> Ready on http://localhost:${port}`);
	}
})();
