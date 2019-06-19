const pool = require('./postgresConfig.js');

const getRestaurantInfo = (id, cb) => {
    // const id = parseInt(request.params.id)

    pool.query('SELECT bookings.id, reservation_date, time_slot, party_size, bookings.restaurant_id, created_at, name, booked, "6:00 PM", "6:15 PM", "6:30 PM", "6:45 PM", "7:00 PM", "7:15 PM", "7:30 PM", "7:45 PM", "8:00 PM", "8:15 PM", "8:30 PM" FROM bookings INNER JOIN restaurants ON restaurants.id = bookings.restaurant_id where bookings.restaurant_id = $1;'
    , [id], (error, results) => {
      if (error) {
        cb(error);
        return;
      }
      // console.log("hello");
      cb(null, results.rows)
    })
}

const createBooking = (request, response) => {
    // const { name, booked, "6:00 PM", "6:15 PM", "6:30 PM", "6:45 PM", "7:00 PM", "7:15 PM", "7:30 PM", "7:45 PM", "8:00 PM", "8:15 PM", "8:30 PM" } = request.body;
  console.log(request.body);
    pool.query(`INSERT INTO restaurants (name, booked, "6:00 PM", "6:15 PM",
     "6:30 PM", "6:45 PM", "7:00 PM", "7:15 PM", "7:30 PM", 
     "7:45 PM", "8:00 PM", "8:15 PM", "8:30 PM") 
     VALUES (${request.body[0]}, ${request.body[1]}, ${request.body[2]},
       ${request.body[3]},${request.body[4]}, ${request.body[5]},
        ${request.body[6]}, ${request.body[7]}, ${request.body[8]},
        ${request.body[9]}, ${request.body[10]}, ${request.body[11]}, ${request.body[12]}
        )`, (error) => {
      if (error) {
        throw error;
      }
      response.status(201).send(`User added with ID: ${result.insertId}`)
    })
  };


const remove = (id, callback) => {
  pool.query(`DELETE FROM restaurants where id = ?`, [id], (err) => {
    if (err) {
      callback(err);
      return;
    } else {
      callback();
    }
})
};


module.exports = {
  createBooking,
  getRestaurantInfo,
  remove
}

// SELECT bookings.id, reservation_date, time_slot, party_size, bookings.restaurant_id, created_at, name, booked, "6:00 PM", "6:15 PM", "6:30 PM", "6:45 PM", "7:00 PM", "7:15 PM", "7:30 PM", "7:45 PM", "8:00 PM", "8:15 PM", "8:30 PM" FROM bookings INNER JOIN restaurants ON restaurants.id = bookings.restaurant_id where bookings.restaurant_id = 3;

// explain analyze SELECT bookings.id, reservation_date, time_slot, party_size, bookings.restaurant_id, created_at, name, booked, "6:00 PM", "6:15 PM", "6:30 PM", "6:45 PM", "7:00 PM", "7:15 PM", "7:30 PM", "7:45 PM", "8:00 PM", "8:15 PM", "8:30 PM" FROM bookings INNER JOIN restaurants ON restaurants.id = bookings.restaurant_id where bookings.restaurant_id = 3;
// 0.137 ms\quit

