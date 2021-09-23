var express = require("express");
var bodyParser = require("body-parser");
var router = express.Router();

const service = require("./connection.js");
const cors = require("cors");
const crypto = require("crypto");
const generarID = () => crypto.randomBytes(16).toString("hex");


router.use(cors({ origin: true, optionsSuccessStatus: 200 }));
router.use(bodyParser.json({ limit: "50mb", extended: true }));
router.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

router.get("/obtener_peliculas", async function (req, res, next) {

  let response = await service.connect(
    `SELECT * from PELICULA`
  );
  console.log(response);
  if (response.status == 400) {
    res.status(400).json({ message: response.message });
  } else {
      res
        .status(200)
        .json({ message: "Credenciales correctas", data: response.data });
  }
});

router.post("/crear_pelicula", async function (req, res, next) {
  const { titulo_pelicula,year_pelicula,rating_pelicula,descripcion_pelicula } = req.body;

  let response = await service.connect(
    `BEGIN INSERT INTO PELICULA VALUES('${generarID()}','${titulo_pelicula}','${year_pelicula}','${rating_pelicula}','${descripcion_pelicula}'); COMMIT; END;`
  );
  console.log(response);
  if (response.status == 400) {
    res.status(400).json({ message: response.message });
  } else {
      res
        .status(200)
        .json({ message: "Usuario creado correctamente"});
  }
});





module.exports = router;
