import mysql from "mysql2";
import dotenv from "dotenv";
import express from "express"

const app = express()


dotenv.config();

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10, // Adjust as per your app’s load
    queueLimit: 0,
});

// Test the connection
db.getConnection((err, connection) => {
    if (err) {
        console.error("Error connecting to the database:", err);
    } else {
        console.log("Database connected successfully.");
        connection.release();
    }
});


app.get("/get/roles/:id", (req, res) => {
    // const id = req.params.id;
    const { id } = req.params
    console.log(id);

    const sqlQuery = `SELECT * FROM roles where id=${id}`;



    db.query(sqlQuery, (err, results) => {
        if (err) {
            console.error("Error fetching roles:", err);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        res.json(results);
    });
});


const PORT = 5000;
app.listen(PORT, () => {
    console.log(` Server running at http://localhost:${PORT}`);
});
