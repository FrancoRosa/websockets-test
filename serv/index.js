// Import required modules
const express = require('express');
const cors = require("cors");
const http = require('http');
const socketio = require('socket.io');

// Initialize express and HTTP server
const app = express();
app.use(cors());
const server = http.createServer(app);

// Initialize Socket.IO
const io = socketio(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});

// Define the port
const PORT = 8910;

// Serve the client side HTML (optional)
app.get('/', (req, res) => {
    res.send('<h1>WebSocket Server Running</h1>');
});

// When a client connects
io.on('connection', (socket) => {
    console.log('Client connected');

    // Send a message with a timestamp every 5 seconds
    const interval = setInterval(() => {
        socket.emit('message', "...");
    }, 5000);

    // Handle client disconnect
    socket.on('disconnect', () => {
        console.log('Client disconnected');
        clearInterval(interval);  // Stop sending messages
    });
    socket.on('message', (msg) => {
        console.log(msg);
    });
});

// Start the server
server.listen(PORT, () => {
    console.log(`WebSocket server is running on http://localhost:${PORT}`);
});
