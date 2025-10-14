import express from 'express';
import { RandomColor } from './utils/random_color.mjs';

const app = express();
const port = 3000;

//Bootstrap and other public files
//app.use(express.static('public'));

//Routes
app.get('/', (request, response) => {
    response.send('Hello, World!!!');
});

app.get('/randomColor', (request, response) => {
    response.send('This is a random color!');
})

app.get('/api/randomColor', (request, response) => {
    const randomColor = RandomColor.getRandomHex();
    response.json({ color: randomColor });
    
})

//Listener
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});