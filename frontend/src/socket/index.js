import { io } from 'socket.io-client';

const options = {
    // "force new connection": true,
    // reconnectionAttempts: "Infinity", // avoid having user reconnect manually in order to prevent dead clients after a server restart
    // timeout: 10000, // before connect_error and connect_timeout are emitted.
    transports: ["websocket"]
}
const urlLoacal = "http://localhost:5001"
const urlDeploy = 'https://test4-ulov.onrender.com'
const socket = io(urlDeploy, options);

export default socket;
