const express = require("express");
// const bodyParser = require("body-parser"); /* deprecated */
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json()); /* bodyParser.json() is deprecated */

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true })); /* bodyParser.urlencoded() is deprecated */

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Express Node application." });
});

require("./app/routes/tutorial.routes.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


// Redis integrations

const mysqlPool = require('./app/models/db'); // Import MySQL connection pool
const redisClient = require('./app/models/redis'); // Import Redis client

async function getDataFromDatabaseOrCache(key) {
  try {
    // Check if data is in Redis cache
    const cachedData = await redisClient.get(key);

    if (cachedData) {
      console.log('Data retrieved from Redis cache');
      return JSON.parse(cachedData);
    }

    // If not in cache, fetch data from MySQL
    console.log('Fetching data from MySQL');
    const [rows, fields] = await mysqlPool.execute('SELECT * FROM your_table WHERE your_condition');
    const data = rows;

    // Store data in Redis with an expiration time (e.g., 1 hour)
    await redisClient.set(key, JSON.stringify(data), 'EX', 3600);

    return data;
  } catch (error) {
    console.error('Error in getDataFromDatabaseOrCache:', error);
    throw error;
  }
}

module.exports = {
  getDataFromDatabaseOrCache,
};

