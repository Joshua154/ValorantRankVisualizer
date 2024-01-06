const ws = require('ws');

const wss = new ws.Server({ port: 8080 });

wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(message) {
        console.log('received: %s', message);

        const data = JSON.parse(message);
        if (data.type === "pong") {
            ws.send(JSON.stringify({ type: "ping" }));
        }
    });

    ws.send(JSON.stringify({ type: "ping" }));
});