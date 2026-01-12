
const express = require('express');
const app = express();
const shortid = require('shortid');
const PORT = 8002;
// connect to Database
const { Client } = require('pg');

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'test',
    password: '',
    port: 5432,
});

client.connect()
    .then(() => console.log('Connected to Database'))
    .catch(err => console.error('Connection ', err.stack));

// Middlewares
app.use(express.json());




// routes

app.post('/url', (req, res) => {

    const shortURL = shortid.generate();

    const body = req.body;
    if (!body.originalURL) {
        return res.status(400).send({ error: 'originalURL is required' });
    }
    const originalURL = body.originalURL;
    const visitedHistory = [];
    const query = 'INSERT INTO urls(short_url, original_url, visited_history) VALUES($1, $2, $3)';
    const values = [shortURL, originalURL, visitedHistory];
    client.query(query, values, (err, result) => {
        if (err) {
            console.error('Error inserting URL', err.stack);
            res.status(500).send('Error saving URL');
        } else {
            res.json({ shortURL: `http://localhost:${PORT}/${shortURL}` });
        }
    });

});

app.get('/:shortURL', (req, res) => {
    const shortURL = req.params.shortURL;

    const query = 'SELECT original_url FROM urls WHERE short_url = $1';
    client.query(query, [shortURL], (err, result) => {
        if (err) {
            console.error('Error fetching URL', err.stack);
            res.status(500).send('Error retrieving URL');
        } else {
            if (result.rows.length > 0) {
                const originalURL = result.rows[0].original_url;
                res.redirect(originalURL);
            } else {
                res.status(404).send('URL not found');
            }
        }
    });
});

app.listen(PORT, () => console.log(`Server is running on port : ${PORT}`));

