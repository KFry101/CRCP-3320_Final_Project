import express from 'express';
import { RandomColor } from './utils/random_color.mjs';
import { RandomNumber } from './utils/random_number.mjs';

const app = express();
const port = 3000;

//Bootstrap and other public files
app.use(express.static('public'));

//Routes
app.get('/randomColor', (request, response) => {
  const randomColor = RandomColor.getRandomHex();
  response.send(`<html><head><title>Random Color</title></head><body style="background-color:${randomColor};"><h1>Your Random Color is: ${randomColor}</h1></body></html>`);
})

app.get('/api/randomColor', (request, response) => {
  const randomColor = RandomColor.getRandomHex();
  response.json({ color: randomColor });
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