const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "crudgames"
});

// app.get("/", (req, res) => {
//     let sql = "INSERT INTO games (name, cost, category) VALUES (?, ?, ?)";
//     let values = ["GTA V", "100", "Ação"];
//     db.query(sql, values, (err, result) => {
//         if (err) throw err;
//         console.log(result);
//     });
// });

app.use(cors());
app.use(express.json());

app.post("/register", (req, res) => {
    const { name } = req.body;
    const { cost } = req.body;
    const { category } = req.body;

    //console.log(name, cost, category);

    let sql = "INSERT INTO games (name, cost, category) VALUES (?, ?, ?)";
    let values = [name, cost, category];

    db.query(sql, values, (err, result) => {
        if (err) throw err;
        // console.log(err);
    });
});

app.get("/getCards", (req, res) => {
    let sql = "SELECT * FROM games";

    db.query(sql, (err, result) => {
        if (err) throw err;
        else res.send(result);
    });
});

app.listen(3001, () => {
    console.log("Server running on port 3001");
});