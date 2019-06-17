// const nr = require('newrelic');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const db = require('../db/postgresQueries.js');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('public'));




//"READ"
app.get('/:id/reservations', (req, res) => {
  // console.log("i am inside of get")
  const resID = Number(req.params.id);
  db.getRestaurantInfo(resID, (err, results) => {
    if (err) {
      console.error(err);
      return;
    }
    res.send(results)
  })
});

//"CREATE"
app.post('/reservations', (req, res) => {
  db.createBooking(req, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send('Could not create booking');
    } else {
      res.sendStatus(201);
    }
  })
});

// "UPDATE"
app.put('/:id/reservations', (req, res) => {
  const resID = Number(req.params.id);
  db.put(req.body, resID, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send('Could not update booking');
    } else {
      res.sendStatus(202);
    }
})
});

// "DELETE"
app.delete('/:id/reservations', (req, res) => {
  const resID = Number(req.params.id);
  db.remove(resID, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send('Could not delete booking');
    } else {
      res.sendStatus(202);
    }
})
});

module.exports = app;