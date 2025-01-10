import express from 'express';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*', // Allow all origins for simplicity
    },
});

app.use(cors());
app.use(express.json());

let orders = []; // In-memory storage for orders

// Place Order
app.post('/api/orders', (req, res) => {
    const order = { id: Date.now(), ...req.body, status: 'Pending', timestamp: new Date() };
    orders.push(order);
    io.emit('new-order', order); // Notify admins
    res.status(201).send(order);
});

// Fetch Orders
app.get('/api/orders', (req, res) => {
    res.send(orders);
});

// Update Order Status
app.patch('/api/orders/:id', (req, res) => {
    const order = orders.find((o) => o.id === parseInt(req.params.id));
    if (order) {
        order.status = req.body.status;
        io.emit('order-updated', order); // Notify admins about the status update
        res.send(order);
    } else {
        res.status(404).send({ error: 'Order not found' });
    }
});

// WebSocket Connection
io.on('connection', (socket) => {
    console.log('Admin connected');
});

// Start Server
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
