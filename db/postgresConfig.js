const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "54.215.236.80",
  database: "bookings",
  password: "",
  port: 5432
});

module.exports = pool;