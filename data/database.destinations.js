const dotenv = require('dotenv');
dotenv.config();

const MongoClient = require('mongodb').MongoClient;

let database;

const initDb = (callback) => {
  if (database) {
    //console.log('Destinations database is already initialized!');
    return callback(null, database);
  }
  MongoClient.connect(process.env.MONGODB_URL_DESTINATIONS)
    .then((client) => {
      database = client.db();
      callback(null, database);
    })
    .catch((err) => {
      callback(err);
    });
};

const getDatabase = () => {
  if (!database) {
    throw Error('Destinations database not initialized');
  }
  return database;
};

module.exports = {
  initDb,
  getDatabase,
};
