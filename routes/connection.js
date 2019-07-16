const mysql = require('mysql');


const hostname = "localhost";
const username = "root";
const passwd = "password";
const database_name = "TourAndTravels";

const connection = mysql.createConnection(
    {
        host: hostname,
        user: username,
        password: passwd,
        database: database_name
    }
);


connection.connect((err) => {
    if(err) {
        console.log('ERROR::Unable to connect to mysql database ' + database_name + '!!!');
        throw err;
    }
    console.log('Connection Successfull!!');
});

module.exports = connection;