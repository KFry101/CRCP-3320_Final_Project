import express from 'express';
import { RandomColor } from './utils/random_color.mjs';
import { RandomNumber } from './utils/random_number.mjs';
import { render } from 'ejs';

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public'));

app.set('views', './views');
app.set('view engine', 'ejs');

//Routes
app.get('/randomColor', (request, response) => {
  const hexColor = RandomColor.getRandomHex();
  response.render('randomColor', {hexColor: hexColor});
})

app.get('/color/:colorName', (request, response) => {
  const colorName = request.params.colorName;
  colorName = encode(colorName);
  response.send(`<html><head><title>${colorName}</title></head><body style="background-color:${colorName};"><h1>This page is ${colorName}!</h1></body></html>`);
});

app.get('/api/randomColor', (request, response) => {
  const randomColor = RandomColor.getRandomHex();
  response.json({ color: randomColor });
})

app.get('/randomNumber', (request, response) => {
  response.render('randomNumber')
})

app.get('/api/randomNumber', (request, response) => {
  const min = parseFloat(request.query.min);
  const max = parseFloat(request.query.max);
  const randomNumber = RandomNumber.getRandomFloat(min, max);
  response.json({ number: randomNumber });
});

//Listener
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});