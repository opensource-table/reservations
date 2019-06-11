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


// app.get('/:id/reservations', (req, res) => {
//   const resID = Number(req.params.id);
  
//   db.Availability.findOne({ where: { id: resID } })
//   .then((main) => {
//     res.status(200).send(main);
//   })
//   .catch((err) => {
//     res.status(404).send('unable to retrieve from db: ', err);
//   });
// });

//"READ"
app.get('/:id/reservations', (req, res) => {
  const resID = Number(req.params.id);
  db.getBooking(resID, res), () => {
    if (!req.params.id) {
      res.status(400);
      res.end();
    } else {
      res.sendFile('index.html', { root: path.resolve(__dirname, '../public') });
    }

  }
});

//"CREATE"
app.post('/:id/reservations', (req, res) => {
  db.post(req.body, (err) => {
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
  const resID = Number(req.params.id)
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
  const resID = Number(req.params.id)
  db.remove(resID, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send('Could not delete booking');
    } else {
      res.sendStatus(202);
    }
})
});





////////////////////////////////////////////////////////////////////////////////////
//CREATE
// app.post('/reservations', (req, res) => {
//   db.post(req.body, (err) => {
//     if (err) {
//       console.log(err);
//       res.status(500).send('Could not create booking');
//     } else {
//       res.sendStatus(201);
//     }
//   })
// });

// //READ
// app.get('/:id/reservations', (req, res) => {
//   if (!req.params.id) {
//     res.status(400);
//     res.end();
//   } else {
//     res.sendFile('index.html', { root: path.resolve(__dirname, '../public') });
//   }
// });

// //UPDATE
// app.put('/:id/reservations', (req, res) => {
//   const resID = Number(req.params.id)
//   db.put(req.body, resID, (err) => {
//     if (err) {
//       console.log(err);
//       res.status(500).send('Could not update booking');
//     } else {
//       res.sendStatus(202);
//     }
// })
// });

// //DELETE
// app.delete('/:id/reservations', (req, res) => {
//   const resID = Number(req.params.id)
//   db.remove(resID, (err) => {
//     if (err) {
//       console.log(err);
//       res.status(500).send('Could not delete booking');
//     } else {
//       res.sendStatus(202);
//     }
// })
// });


module.exports = app;