// import {Server} from 'ws';
let data = require('./MOCK_DATA');
let server = require('ws').Server;

let s = new server({ port: 5001 });

s.on('connection', (ws) => {
    ws.on('message', (message) => {
        console.log(`Received message: ${message}`);
        
        message = JSON.parse(message);
        switch (message.type) {
            case "FETCH_DATA":
                let pageSize = message.pageSize;
                let pageNumber = message.pageNumber;

                let endIndx = pageSize * pageNumber; // 100
                let stIndx = endIndx - pageSize;
                let parsedData = data.slice(stIndx, endIndx);
                if (parsedData.length > 0) {
                    ws.send(JSON.stringify(parsedData));
                } else {
                    ws.send("Nothing to send");
                }


                break;
            default:
                ws.send(JSON.stringify("Nothing to send"));
        }
        // if (message == "Hello") {
        // ws.send(JSON.stringify(data));
        // }
    });
});