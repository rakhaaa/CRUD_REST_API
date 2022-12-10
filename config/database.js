let mysql = require("mysql");

const db = {
  host: "localhost",
  user: "root",
  password: "",
  database: "db_fulstack",
};

let connection = mysql.createConnection(db);

connection.connect((error) => {
  if (!!error) {
    console.log("Error: ", error);
  } else {
    console.log("Connection Successfull");
  }
});

module.exports = connection;
