const express = require('express');
const PouchDB = require('pouchdb');
const path = require('path');

const app = express();
const db = new PouchDB('events');

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files from the 'frontend' directory
app.use(express.static(path.join(__dirname, '../frontend')));

// Middleware to allow CORS (Cross-Origin Resource Sharing)
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

// POST route to create a new event
app.post('/api/events', async (req, res) => {
    try {
        const event = req.body;
        const response = await db.put({ ...event, _id: new Date().toISOString() });
        res.status(201).json(response);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// GET route to retrieve all events
app.get('/api/events', async (req, res) => {
    try {
        const result = await db.allDocs({ include_docs: true });
        const events = result.rows.map(row => row.doc);
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// PUT route to update an existing event
app.put('/api/events/:eventId', async (req, res) => {
    try {
        const eventId = req.params.eventId;
        const eventUpdates = req.body;
        const existingEvent = await db.get(eventId);
        const updatedEvent = { ...existingEvent, ...eventUpdates };
        const response = await db.put(updatedEvent);
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// DELETE route to delete an event
app.delete('/api/events/:eventId', async (req, res) => {
    try {
        const eventId = req.params.eventId;
        const existingEvent = await db.get(eventId);
        const response = await db.remove(existingEvent);
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Serve the calendar.html file for all other routes (for single-page application routing)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'calendar.html'));
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
