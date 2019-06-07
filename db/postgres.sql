CREATE TABLE restaurants (
    id SERIAL PRIMARY KEY,
    name VARCHAR (55) NOT NULL,
    booked SMALLINT NOT NULL,
    '6:00 PM' SMALLINT NOT NULL,
    '6:15 PM' SMALLINT NOT NULL,
    '6:30 PM' SMALLINT NOT NULL,
    '6:45 PM' SMALLINT NOT NULL,
    '7:00 PM' SMALLINT NOT NULL,
    '7:15 PM' SMALLINT NOT NULL,
    '7:30 PM' SMALLINT NOT NULL,
    '7:45 PM' SMALLINT NOT NULL,
    '8:00 PM' SMALLINT NOT NULL,
    '8:15 PM' SMALLINT NOT NULL,
    '8:30 PM' SMALLINT NOT NULL
)

CREATE TABLE bookings (
    id SERIAL PRIMARY KEY,
    reservation_date DATE NOT NULL,
    time_slot TIME NOT NULL,
    party_size SMALLINT NOT NULL,
    restaurant_id SMALLINT NOT NULL,
    created_at DATE NOT NULL DEFAULT CURRENT_DATE
)