const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "18.144.4.128",
  database: "bookings",
  password: "",
  port: 5432
});

module.exports = pool;