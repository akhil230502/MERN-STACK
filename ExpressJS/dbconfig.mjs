import mysql from "mysql2";
import dotenv from "dotenv";
import express from "express";
import { v4 as uuidv4 } from "uuid";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

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
    console.error("Error connecting to the database//:", err);
  } else {
    console.log("Database connected successfully.");
    connection.release();
  }
});

app.get("/get/roles/:id", (req, res) => {   //get data from  roles
  // const id = req.params.id; 
  const { id } = req.params;
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

app.get("/getAllRoles", (req, res) => {
  const sqlQuery = `select * from roles`;
  db.query(sqlQuery, (err, results) => {
    if (err) {
      console.error("Error fetching roles:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    res.json(results);
  });
})
app.post("/user/add", (req, res) => {   // adding the user and login details
  const { username, department, mail, password_user, role_type } = req.body;
  if (!username || !department || !mail) {
    return res.status(400).json({ error: "All fields are required" });
  }
  console.log(username, department, mail, password_user, role_type);

  const id = uuidv4();

  console.log(id);

  const sqlQuery = `INSERT INTO users(username,department,mail,identity)values(?,?,?,?)`;

  db.query(sqlQuery, [username, department, mail, id], (err, result) => {
    if (err) {
      console.error("Error fetching users:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    const loginDetails = `INSERT INTO logindetails(mail,password_user,role_type,user_id)values(?,?,?,?)`;

    db.query(
      loginDetails,
      [mail, password_user, role_type, id],
      (err, result) => {
        if (err) {
          console.error("Error fetching users:", err);
          return res.status(500).json({ error: "Internal Server Error" });
        }
        res.json(result);
      }
    );
  });
});

app.get("/getAllUser", (req, res) => { //getting all users
  const sqlQuery = `select * from users`;
  db.query(sqlQuery, (err, results) => {
    if (err) {
      console.error("Error fetching roles:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    res.json(results);
  });
});

app.post("/books", (req, res) => { //adding the type of book
  const { book_type } = req.body;
  const sqlQuery = `INSERT INTO books(book_type)values(?)`;
  db.query(sqlQuery, [book_type], (err, result) => {
    if (err) {
      console.error("Error fetching users:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    res.json(result);
  })
});

app.get("/getAllBookType", (req, res) => { //getting all type of books
  const sqlQuery = `select * from books`;
  db.query(sqlQuery, (err, results) => {
    if (err) {
      console.error("Error fetching roles:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    res.json(results);
  });
});

app.post("/books/details", (req, res) => {    //books details adding
  const { book_name, book_type, Author } = req.body;
  const sqlQuery = `INSERT INTO bookmain(book_name,book_type,Author)values(?,?,?)`;

  db.query(sqlQuery, [book_name, book_type, Author], (err, result) => {
    if (err) {
      console.error("error in adding books details", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    res.json(result);
  })
});

app.get("/getAllBooks", (req, res) => {      // getting all books
  const sqlQuery = `
  SELECT 
    bookmain.id, 
    bookmain.book_name, 
    books.book_type, 
    bookmain.created_at, 
    bookmain.Author,

    (
      SELECT status_type 
      FROM book_status 
      WHERE book_id = bookmain.id 
      ORDER BY id DESC 
      LIMIT 1
    ) as status_type,

    (
      CASE 
        WHEN (
          SELECT status_type 
          FROM book_status 
          WHERE book_id = bookmain.id 
          ORDER BY id DESC 
          LIMIT 1
        ) IN (1, 2) THEN 0
        ELSE 1
      END
    ) as isAvailable

  FROM 
    bookmain
  LEFT JOIN 
    books ON bookmain.book_type = books.id
  ORDER BY 
    bookmain.created_at ASC
`;
  db.query(sqlQuery, (err, results) => {
    if (err) {
      console.error("Error fetching roles:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    res.json(results);
  });
});

app.post("/status", (req, res) => { //adding the type of status
  const { status_type } = req.body;
  const sqlQuery = `INSERT INTO status(status_type)values(?)`;
  db.query(sqlQuery, [status_type], (err, result) => {
    if (err) {
      console.error("Error fetching users:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    res.json(result);
  })
});


app.post("/books/status", (req, res) => {  // getting all details of books
  const { bookname, status_type, borrowdate, duedate, user_id, book_id } = req.body;

  const sqlQuery = `insert into book_status(bookname,status_type,borrowdate,duedate,user_id,book_id)values(?,?,?,?,?,?)`;

  db.query(sqlQuery, [bookname, status_type, borrowdate, duedate, user_id, book_id], (err, result) => {
    if (err) {
      console.error("SQL Error in /books/status:", err);
      return res.status(500).json({ error: err.message });
    }
    res.json({ msg: "submitted", result });
  })
});

app.get('/borrowHistory/:userId', (req, res) => {
  const userId = req.params.userId;
  console.log(userId);

  const query = `
  SELECT 
    book_status.id,
    bookmain.book_name,
    book_status.borrowdate,
    book_status.duedate,
    status.status_type AS status_name,
    status.id as status_id
  FROM book_status
  JOIN bookmain ON book_status.book_id = bookmain.id
  JOIN status ON book_status.status_type = status.id
  WHERE book_status.user_id = ?
  ORDER BY book_status.borrowdate DESC
`;


  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error("Error fetching history:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    res.json(results);
  });
});


app.post("/login", (req, res) => {      // login api
  const { mail, password_user } = req.body;

  const sqlQuery = `SELECT * FROM logindetails WHERE mail = ? AND password_user = ?`;

  db.query(sqlQuery, [mail, password_user], (err, results) => {
    if (err) {
      console.error("Error during login:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    // Login successful
    res.json({ message: "Login successful", user: results[0] });
  });
});
app.put('/submitBook/:id', (req, res) => {
  const bookId = req.params.id;

  const updateQuery = `
    UPDATE book_status 
    SET status_type = 3 
    WHERE id = ?
  `;

  db.query(updateQuery, [bookId], (err, result) => {
    if (err) {
      console.error('Error updating book status:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    res.json({ message: 'Book submitted successfully' });
  });
});


const PORT = 5000;
app.listen(PORT, () => {
  console.log(` Server running at http://localhost:${PORT}`);
});
