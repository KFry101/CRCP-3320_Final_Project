import 'dotenv/config';

import express from 'express';
import { encode } from 'html-entities';

import { DatabaseClient } from './utils/database-client.mjs';

import path from 'path';
import { fileURLToPath } from 'url';

const dbClient = new DatabaseClient();
await dbClient.initConnection();

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public'));

app.set('views', './views');
app.set('view engine', 'ejs');



//Routes
app.get('/about', (req, res) => {
  res.render('about');
});


app.use(express.static('assets'));

/*
app.get('/gallery', (req, res) => {
  res.render('gallery');
});
*/

app.get('/artwork/:id', async (req, res) => {
    try {
        console.log('Artwork route hit with id:', req.params.id);
        let artId = req.params.id;
        artId = encode(artId);
        console.log('Encoded artId:', artId);

        const page = await dbClient.getPageWithPieces(artId);
        console.log('Page data:', page);

        if (!page) {
            console.log('No page found, rendering 404');
            return res.status(404).render('errors/404');
        }

        res.render('artwork', {page: page});
    } catch (error) {
        console.error('Error fetching artwork:', error);
        res.status(500).render('errors/500');
    }
});


app.use((request, response, next) => {
  response.status(404).render('errors/404');
});



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});