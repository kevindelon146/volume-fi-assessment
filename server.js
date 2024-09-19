const express = require('express');

const app = express();
app.use(express.json());

const calculateFlightPath = (flights) => {
    const flightMap = new Map();
    const destinationSet = new Set();
    const sourceSet = new Set();

    flights.forEach(([source, destination]) => {
        flightMap.set(source, destination);
        destinationSet.add(destination);
        sourceSet.add(source);
    });

    const startingAirport = Array.from(sourceSet).find(source => !destinationSet.has(source));
    const endingAirport = Array.from(destinationSet).find(destination => !sourceSet.has(destination));

    if (!startingAirport || !endingAirport) {
        return null;
    }

    return [startingAirport, endingAirport];
};

app.post('/calculate', (req, res) => {
    const { flights } = req.body;

    if (!Array.isArray(flights) || flights.length === 0) {
        return res.status(400).json({ error: 'Invalid input. Please provide a non-empty array of flights.' });
    }

    try {
        const flightPath = calculateFlightPath(flights);
        if (!flightPath) {
            return res.status(400).json({ error: 'Unable to calculate a valid flight path from the provided flights.' });
        }

        return res.json(flightPath);
    } catch (error) {
        return res.status(500).json({ error: 'An error occurred while calculating the flight path.' });
    }
});

app.listen(8080, () => {
    console.log('Server started at port 8080');
});