const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql");

const app = express();
const port = 3000;

const options = {
    origin: '*',
};
app.use(cors(options));

// Parser za JSON podatke
app.use(bodyParser.json());

// Parser za podatke iz formi
app.use(bodyParser.urlencoded({ extended: true }));

const connection = mysql.createConnection({
    host: "student.veleri.hr",
    user: "riwa",
    password: "11",
    port: 3306,
    database: "riwa",
  });
  
app.use(express.urlencoded({ extended: true }));
  
connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });

app.get("/api/knjige", (req, res) => {
  connection.query("SELECT * FROM knjiga", (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});
app.get("/api/knjige/:id", (req, res) => {
  const id = req.params.id
  connection.query("SELECT * FROM knjiga WHERE id="+id, (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

app.post("/api/rezerv_knjige", (request, response) => {
  const data = request.body;
  rezervacija = [[data.datum, data.id_knjiga, data.id_korisnik]]
  connection.query("INSERT INTO rezervacija (datum_rezervacije, knjiga, korisnik) VALUES ?", [rezervacija], (error, results) => {
    if (error) throw error;
    response.send(results);
  });
});

app.post("/api/unos_knjige", (request, response) => {
  const data = request.body;
  knjiga = [[data.naslov, data.autor, data.opis, data.slika, data.stanje,"slobodna"]]
  connection.query("INSERT INTO knjiga (naslov, autor, opis, slika, stanje,status) VALUES ?", 
    [knjiga], (error, results) => {
    if (error) throw error;
    response.send(results);
  });
});

app.listen(port, () => {
    console.log("Server running at port: " + port);
});