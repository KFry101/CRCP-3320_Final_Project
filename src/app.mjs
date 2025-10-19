import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = 3000;

//Bootstrap and other public files
app.use(express.static('public'));

//Routes

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});