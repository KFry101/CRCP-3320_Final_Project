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


/*const mysql = require('mysql'); // Will eventually be using mySql

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'your_user',
    password: 'your_password',
    database: 'your_database'
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to MySQL database.');
});
*/

//Routes
app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/artwork/:id', (req, res) => {
  let artId = req.params.id; //ID value in Mysql table in db eventually 
  artId = encode(artId);
  const sqlQuery = 'SELECT * FROM arts WHERE id = ?';
  //db will be fetch from sql art odject
  /*
  db.query(sqlQuery, [artId], (err, results) => {
    if (err) {
      // Handle error appropriately
      console.error(err);
      res.status(500).send('Error retrieving user data');
      return;
    }
  // The results will be an array of rows. Access the first row (index 0).
  // Ensure a row was actually found
  if (results.length > 0) {
    const user = results[0];
    // Pass the single user object to the EJS template
    res.render('artwork', { art: art });
  } else {
      res.status(404).send('Art not found');
  }
  */
  res.render('artwork', {artName: artId});
});

app.use((request, response, next) => {
  response.status(404).render('errors/404');
});



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});