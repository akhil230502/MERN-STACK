import mysql from "mysql2";
import dotenv from "dotenv";
import express from "express";
import { v4 as uuidv4 } from "uuid";
import cors from "cors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());

app.use(cookieParser());
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

// app.get('/', (req, res) => {
//   res.send('Server is running');
// });

app.listen(5000, () => {
  console.log(`Server started on http://localhost:5000`);
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

  const sqlQuery =` SELECT * FROM roles where id=${id}`;

  db.query(sqlQuery, (err, results) => {
    if (err) {
      console.error("Error fetching roles:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    res.json(results);
  });
});

app.get("/getAllRoles", (req, res) => {
  const sqlQuery =` select * from roles`;
  db.query(sqlQuery, (err, results) => {
    if (err) {
      console.error("Error fetching roles:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    res.json(results);
  });
})

app.post("/user/add", (req, res) => {
  const { username, department, mail, password_user, role_type } = req.body;

  if (!username || !department || !mail || !password_user || !role_type) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const id = uuidv4();
  const saltRounds = 10;

  //  Hash the password using bcrypt
  bcrypt.hash(password_user, saltRounds, (err, hashedPassword) => {
    if (err) {
      console.error("Error hashing password:", err);
      return res.status(500).json({ error: "Password encryption failed" });
    }

    // Insert into users table
    const sqlQuery = `INSERT INTO users(username, department, mail, identity) VALUES (?, ?, ?, ?)`;
    db.query(sqlQuery, [username, department, mail, id], (err, result) => {
      if (err) {
        console.error("Error inserting into users:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      // Insert into logindetails table with hashed password
      const loginQuery =` INSERT INTO logindetails(mail, password_user, role_type, user_id) VALUES (?, ?, ?, ?)`;
      db.query(loginQuery, [mail, hashedPassword, role_type, id], (err, result) => {
        if (err) {
          console.error("Error inserting into logindetails:", err);
          return res.status(500).json({ error: "Internal Server Error" });
        }

        res.json({ message: "User added successfully" });
      });
    });
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
  const sqlQuery =` INSERT INTO books(book_type)values(?)`;
  db.query(sqlQuery, [book_type], (err, result) => {
    if (err) {
      console.error("Error fetching users:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    res.json(result);
  })
});

app.get("/getAllBookType", (req, res) => { //getting all type of books
  const sqlQuery =` select * from books`;
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
  const sqlQuery = 
  `SELECT 
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
    bookmain.created_at ASC`
;
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
  ORDER BY book_status.borrowdate DESC`
;


  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error("Error fetching history:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    res.json(results);
  });
});


app.post("/login", (req, res) => {
  const { mail, password_user } = req.body;

  if (!mail || !password_user) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  const sqlQuery = `SELECT * FROM logindetails WHERE mail = ?`;

  db.query(sqlQuery, [mail], (err, results) => {
    if (err) {
      console.error("Error during login:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    if (results.length === 0) {
      console.log(err);
      
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const user = results[0];

    bcrypt.compare(password_user, user.password_user, (err, isMatch) => {
      if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });
  
      const payload = { user_id: user.user_id, role_type: user.role_type };
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1hr' });


      res.cookie("auth",token ,{
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        sameSite: "Strict",
        maxAge: 3600000, })
  
      res.json({ message: "Login successful", token, user });
    });
  });

  app.get("/verify-token", (req, res) => {
    const token = req.cookies?.auth;
  
    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }
  
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ error: "Invalid or expired token" });
      }
  
      // Token is valid, send response
      res.json({ message: "Token is valid", user: decoded });
    });
  });

  app.get("/logout", (req, res) => {
    res.clearCookie("auth", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    });
  
    res.json({ message: "Logged out successfully" });
  });
  
const PORT = 5000;
app.listen(PORT, () => {
  console.log(` Server running at http://localhost:${PORT}`);
})
});