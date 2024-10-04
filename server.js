const https = require('https');
const fs = require('fs');

const options = {
    key: fs.readFileSync('server-key.pem'),
    cert: fs.readFileSync('server-cert.pem'),
    ca: fs.readFileSync('client-cert.pem'),
    requestCert: false,
    rejectUnauthorized: false
};
const server = https.createServer(options, (req, res) => {
    console.log('Request received:');

    const cert = req.socket.getPeerCertificate();


    if (req.client.authorized) {
        console.log('Client certificate accepted');
        res.writeHead(200);
        res.end('Hello, client!');
    } else {
        res.writeHead(401);
        res.end('Client certificate required.');
    }
});
server.on('tlsClientError', (err, socket) => {
    console.error('TLS client error:', err);
});

server.listen(443, () => {
    console.log('Server listening on https://localhost:443');
});