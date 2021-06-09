import io from "socket.io-client";
const ENDPOINT = 'http://localhost:4000';
const socket = io.connect(ENDPOINT, {
    "force new connection": true,
    "reconnectionAttempts": "Infinity",
    "timeout": 10000,
    "transports": ["websocket"]
});
export default socket;