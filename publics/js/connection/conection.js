import mysql from "mysql";

const pool = mysql.createPool({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'shop'
});
 
export {pool};