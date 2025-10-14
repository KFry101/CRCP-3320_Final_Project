import express from 'express';
import { RandomColor } from './utils/random_color.mjs';

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

//Listener
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});