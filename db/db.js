const Sequelize = require('sequelize');
const mysql = require('mysql');

// change user: 'root' and password: 'password' with your credentials
const sequelize = new Sequelize('reservations', 'root', null, {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
});

sequelize
  .authenticate()
  .then(() => {
    console.log('db connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'reservations',
  });

  connection.connect();

const Availability = sequelize.define('restaurant',
  {
    name: {
      type: Sequelize.STRING,
    },
    booked: {
      type: Sequelize.INTEGER,
    },
    '6:00 PM': {
      type: Sequelize.INTEGER,
    },
    '6:15 PM': {
      type: Sequelize.INTEGER,
    },
    '6:30 PM': {
      type: Sequelize.INTEGER,
    },
    '6:45 PM': {
      type: Sequelize.INTEGER,
    },
    '7:00 PM': {
      type: Sequelize.INTEGER,
    },
    '7:15 PM': {
      type: Sequelize.INTEGER,
    },
    '7:30 PM': {
      type: Sequelize.INTEGER,
    },
    '7:45 PM': {
      type: Sequelize.INTEGER,
    },
    '8:00 PM': {
      type: Sequelize.INTEGER,
    },
    '8:15 PM': {
      type: Sequelize.INTEGER,
    },
    '8:30 PM': {
      type: Sequelize.INTEGER,
    },
  },
  {
    timestamps: false,
  });

  const post = (restaurant, cb) => {
  console.log(restaurant);
  connection.query(`INSERT INTO restaurants 
  ( name,
    booked, 
    6:00 PM, 
    6:15 PM, 
    6:30 PM, 
    6:45 PM, 
    7:00 PM, 
    7:15 PM, 
    7:30 PM, 
    7:45 PM, 
    8:00 PM, 
    8:15 PM, 
    8:30 PM)  
    VALUES ?`, 
  [restaurant], (err) => {
    if (err) {
      cb(err);
      return;
    }
    cb();
  })
};

const put = (restaurant, id, cb) => {
  connection.query(`UPDATE restaurants SET 
    name 
    booked = ?,
    6:00 PM = ?,
    6:15 PM = ?,
    6:30 PM = ?,
    6:45 PM = ?,
    7:00 PM = ?,
    7:15 PM = ?,
    7:30 PM = ?,
    7:45 PM = ?,
    8:00 PM = ?,
    8:15 PM = ?,
    8:30 PM = ?
    WHERE id = ${id}`, [restaurant], (err) => {
    if (err) {
      callback(err);
      return;
    } else {
      cb();
    }
    })
};

const remove = (id, callback) => {
  connection.query(`DELETE FROM restaurants where id = ?`, [id], (err) => {
    if (err) {
      callback(err);
      return;
    } else {
      callback();
    }
})
};

module.exports = {
  Availability,
  connection,
  post,
  put,
  remove
};