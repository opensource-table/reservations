const pool = require('./postgresConfig');

// const getAvailability = (request, response) => {
//     pool.query('SELECT * FROM restaurants ORDER BY id ASC', (error, results) => {
//       if (error) {
//         throw error
//       }
//       response.status(200).json(results.rows)
//     })
// };

const getRestaurantInfo = (id, response) => {
    // const id = parseInt(request.params.id)

    pool.query('SELECT bookings.id, reservation_date, time_slot, party_size, bookings.restaurant_id, created_at, name, booked, "6:00 PM", "6:15 PM", "6:30 PM", "6:45 PM", "7:00 PM", "7:15 PM", "7:30 PM", "7:45 PM", "8:00 PM", "8:15 PM", "8:30 PM" FROM bookings INNER JOIN restaurants ON restaurants.id = bookings.restaurant_id where bookings.restaurant_id = $1;'
    , [id], (error, results) => {
      if (error) {
        throw error;
      }
      // console.log("hello");
      response.status(200).json(results.rows)
    })
}

const createBooking = (request, response) => {
    // const { name, booked, "6:00 PM", "6:15 PM", "6:30 PM", "6:45 PM", "7:00 PM", "7:15 PM", "7:30 PM", "7:45 PM", "8:00 PM", "8:15 PM", "8:30 PM" } = request.body;
  
    // need 2 queries or inner join query
    //foreign ID?
    pool.query('INSERT INTO restaurants (name, booked, "6:00 PM", "6:15 PM", "6:30 PM", "6:45 PM", "7:00 PM", "7:15 PM", "7:30 PM", "7:45 PM", "8:00 PM", "8:15 PM", "8:30 PM") VALUES ($1, $2)', [name, booked], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`User added with ID: ${result.insertId}`)
    })
  }


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
  // getAvailability,
  getRestaurantInfo,
  remove
}

// SELECT bookings.id, reservation_date, time_slot, party_size, bookings.restaurant_id, created_at, name, booked, "6:00 PM", "6:15 PM", "6:30 PM", "6:45 PM", "7:00 PM", "7:15 PM", "7:30 PM", "7:45 PM", "8:00 PM", "8:15 PM", "8:30 PM" FROM bookings INNER JOIN restaurants ON restaurants.id = bookings.restaurant_id where bookings.restaurant_id = 3;

// explain analyze SELECT bookings.id, reservation_date, time_slot, party_size, bookings.restaurant_id, created_at, name, booked, "6:00 PM", "6:15 PM", "6:30 PM", "6:45 PM", "7:00 PM", "7:15 PM", "7:30 PM", "7:45 PM", "8:00 PM", "8:15 PM", "8:30 PM" FROM bookings INNER JOIN restaurants ON restaurants.id = bookings.restaurant_id where bookings.restaurant_id = 3;
// 0.137 ms\quit