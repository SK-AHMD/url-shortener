
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

app.post('/url', async (req, res) => {

    const shortURL = shortid.generate();

    const body = req.body;
    if (!body.originalURL) {
        return res.status(400).send({ error: 'originalURL is required' });
    }
    const originalURL = body.originalURL;
    const visitedHistory = JSON.stringify([]);
    try {
        const query = 'INSERT INTO urls (short_url, original_url, visited_history) VALUES ($1, $2, $3)';
        await client.query(query, [shortURL, originalURL, visitedHistory]);
        return res.json({
            message: 'Short URL created successfully',
            shortURL: shortURL
        });
    } catch (err) {
        console.error('Error inserting URL:', err);
        return res.status(500).send({
            error: 'Internal Server Error'
        })
    }

});

app.get('/:shortURL', async (req, res) => {
    const shortURL = req.params.shortURL;
    try {
        const query = `
            UPDATE urls 
            SET visited_history = visited_history || $1::jsonb 
            WHERE short_url = $2 
            RETURNING original_url`;

        const visitedAt = JSON.stringify([{ visited_at: new Date().toISOString() }]);
        const result = await client.query(query, [visitedAt, shortURL]);

        if (result.rows.length === 0) {
            return res.status(404).send({ error: ' URL not found' });
        }

        const originalURL = result.rows[0].original_url;
        return res.redirect(originalURL);
    }
    catch (err) {
        console.error('Error retrieving URL:', err);
        return res.status(500).send({ error: 'Internal Server Error' });
    }
});

app.get('/analytics/:shortURL', async (req, res) => {
    const { shortURL } = req.params;
    const query = "select visited_history , created_at , updated_at from urls where short_url = $1";

    try {
        const result = await client.query(query, [shortURL]);

        if (result.rows.length == 0) {
            return res.status(404).send({ error: "URL not found" })
        }
        else {
            const data = result.rows[0];
            return res.send({
                totalClicks: data.visited_history.length,
                visitedHistory: data.visited_history,
                createdAt: data.created_at,
                updatedAt: data.updated_at
            })
        }
    }
    catch (e) {
        res.status(500).send({ error: "Internal Server Error" })
    }
})

app.listen(PORT, () => console.log(`Server is running on port : ${PORT}`));

