import express from 'express';

const app = express();
const port = 3000;

//Bootstrap and other public files
app.use(express.static('public'));

//Routes
app.get('/Artwork/EconomicStress', (request, response) => {
    response.send('About me');
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});