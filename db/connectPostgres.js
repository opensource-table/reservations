const { Pool } = require('pg');

const pool = new Pool({
    user: 'esodey',
    host: 'localhost',
    database: 'bookings',
    password: '',
    port: 5432
});

const start = Date.now();


        pool.query('DROP TABLE IF EXISTS restaurants', (err) => {
            if (err) {
                console.log(err);
            }
            console.log('Dropped table restaurants');
            pool.query('DROP TABLE IF EXISTS bookings', (err) => {
                if (err) {
                    console.log(err);
                }
                console.log('Dropped table bookings');
                pool.query(`CREATE TABLE restaurants (
                    id SERIAL PRIMARY KEY,
                    name VARCHAR (55) NOT NULL,
                    booked SMALLINT NOT NULL,
                    "6:00 PM" SMALLINT NOT NULL,
                    "6:15 PM" SMALLINT NOT NULL,
                    "6:30 PM" SMALLINT NOT NULL,
                    "6:45 PM" SMALLINT NOT NULL,
                    "7:00 PM" SMALLINT NOT NULL,
                    "7:15 PM" SMALLINT NOT NULL,
                    "7:30 PM" SMALLINT NOT NULL,
                    "7:45 PM" SMALLINT NOT NULL,
                    "8:00 PM" SMALLINT NOT NULL,
                    "8:15 PM" SMALLINT NOT NULL,
                    "8:30 PM" SMALLINT NOT NULL
                )`, (err) => {
                    if (err) {
                        console.log(err);
                    }
                    console.log('Created table restaurants');
                    pool.query(`CREATE TABLE bookings (
                        id SERIAL PRIMARY KEY,
                        reservation_date DATE NOT NULL,
                        time_slot TIME NOT NULL,
                        party_size SMALLINT NOT NULL,
                        restaurant_id INT NOT NULL,
                        created_at DATE NOT NULL DEFAULT CURRENT_DATE
                    )`, (err) => {
                        if (err) {
                            console.log(err);
                        }
                        console.log('Created table bookings');
                        pool.query(`COPY restaurants(name, booked, "6:00 PM", 
                        "6:15 PM", "6:30 PM", "6:45 PM", "7:00 PM", "7:15 PM", 
                        "7:30 PM", "7:45 PM", "8:00 PM", "8:15 PM", "8:30 PM") 
                        FROM '/Users/esodey/.Trash/reservations 4.27.51 PM/reservations/restaurantData.csv' DELIMITER ',' CSV HEADER;`
                        , (err) => {
                            if (err) {
                                console.log(err);
                            }
                            console.log('Copied data into table restaurants');
                            pool.query(`COPY bookings(reservation_date, time_slot,
                                party_size, restaurant_id, created_at)
                                FROM '/Users/esodey/.Trash/reservations 4.27.51 PM/reservations/bookingData.csv' DELIMITER ',' CSV HEADER;`
                                , (err) => {
                                    if (err) {
                                        console.log(err);
                                    }
                                    console.log('Copied data into table bookings');
                                    let period = Number((Date.now() - start) / 1000).toFixed(2);
                                    console.log('\nTotal time:' + period + 'seconds');
                                })
                        })
                    })
                })
            })
        })
