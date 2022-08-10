const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mysql = require("mysql");
const cors = require("cors");
const dotenv = require("dotenv");


/*dotenv.config();
module.exports = mysql.createConnection({
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});*/


const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "crudvg",
});


app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/usuarios", (req, res) => {
    const sqlGet = "SELECT * FROM usuario_db";
    db.query(sqlGet, (error, result) => {
        res.send(result);
    });
});

app.post("/usuarios/:id", (req, res) => {
    const { name, email, descricao } = req.body;
    const sqlInsert = 
        "INSERT INTO usuario_db (name, email, descricao) VALUES (?, ?, ?)";
    db.query(sqlInsert, [name, email, descricao], (error, result) => {
        if (error) {
            console.log(error);
        };
    });
});

app.delete("/usuarios/:id", (req, res) => {
    const { id } = req.params;
    const sqlRemove = 
        "DELETE FROM usuario_db WHERE id = ?";
    db.query(sqlRemove, id, (error, result) => {
        if (error) {
            console.log(error);
        };
    });
});

app.get("/usuarios/:id", (req, res) => {
    const { id } = req.params;
    const sqlGet = "SELECT * FROM usuario_db WHERE id = ?";
    db.query(sqlGet, id, (error, result) => {
        if(error) {
            console.log(error);
        }
        res.send(result);
    });
});

app.put("/usuarios/:id", (req, res) => {
        const { id } = req.params;
        const {name, email, descricao} = req.body;
        const sqlUpdate = "UPDATE usuario_db SET name = ?, email = ?, descricao = ? WHERE id = ?";
        db.query(sqlUpdate, [name, email, descricao, id], (error, result) => {
            if(error) {
                console.log(error);
            }
            res.send(result);
        });
    });
    


app.get("/", (req, res) => {
    //const sqlInsert = 
    //    "INSERT INTO usuario_db (name, email, descricao) VALUES ('gino', 'bandido@gmail.com', 'DevJr')";
    //db.query(sqlInsert, (error, result) => {
    //    console.log("error", error);
    //    console.log("result", result);
    //    res.send("Olá Express");
   // });
    
});

app.listen(5000, () => {
    console.log("Server is running on port 5000");
});