import express from 'express';
import { encode } from 'html-entities';

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

/*
app.use(express.static('assets'));
app.get('/gallery', (req, res) => {
  res.render('gallery');
});

app.get('/artwork/:id', (req, res) => {
  let artId = req.params.id; 
  artId = encode(artId);
  const sqlQuery = 'SELECT * FROM arts WHERE id = ?';
  res.render('artwork', {artName: artId});
});
*/

app.use((request, response, next) => {
  response.status(404).render('errors/404');
});



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});