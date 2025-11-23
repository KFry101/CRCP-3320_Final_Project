import express from 'express';
import { encode } from 'html-entities';

import { DatabaseClient } from './utils/database-client.mjs';

import path from 'path';
import { fileURLToPath } from 'url';

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
    let artId = req.params.id;
    artId = encode(artId);

    const dbClient = new DatabaseClient();
    await dbClient.initConnection();
    const page = await dbClient.getPageWithPieces(artId);
    res.render('artwork', {pages: page});
});


app.use((request, response, next) => {
  response.status(404).render('errors/404');
});



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});