import express from 'express';

const app = express();
const port = 3000;

//Bootstrap and static files
app.use(express.static('public'));

//Routes
app.get('/', (request, response) => {
    response.send('Hello, World!!!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});