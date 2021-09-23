var express = require("express");
var bodyParser = require("body-parser");
var router = express.Router();

const service = require("./connection.js");
const cors = require("cors");

router.use(cors({ origin: true, optionsSuccessStatus: 200 }));
router.use(bodyParser.json({ limit: "50mb", extended: true }));
router.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

router.post("/login", async function (req, res, next) {
  const { usuario, password } = req.body;

  let response = await service.connect(
    `SELECT * from USUARIO WHERE usuario = '${usuario}' AND password_usuario='${password}'`
  );
 
  if (response.status == 400) {
    res.status(400).json({ message: response.message });
  } else {
    if (response.data.length == 0) {
      res.status(400).json({ message: "Credenciales incorrectas" });
    } else {
      res
        .status(200)
        .json({ message: "Credenciales correctas", data: response.data[0] });
    }
  }
});

router.post("/crear_usuario", async function (req, res, next) {
  const { usuario, nombre, apellido, password, edad, correo } = req.body;

  let response = await service.connect(
    `BEGIN INSERT INTO USUARIO VALUES('${usuario}','${nombre}','${apellido}','${password}','${parseInt(edad)}','${correo}'); COMMIT; END;`
  );
  
  if (response.status == 400) {
    res.status(400).json({ message: response.message });
  } else {
      res
        .status(200)
        .json({ message: "Usuario creado correctamente"});
  }
});


router.put("/modificar_usuario", async function (req, res, next) {
  const { usuario, nombre, apellido, edad, correo } = req.body;

  let response = await service.connect(
    `BEGIN UPDATE USUARIO SET nombre_usuario='${nombre}', apellido_usuario='${apellido}', edad_usuario=${parseInt(edad)}, correo_usuario='${correo}' WHERE usuario='${usuario}'; COMMIT; END;`
  );
  
  if (response.status == 400) {
    res.status(400).json({ message: response.message });
  } else {
      res
        .status(200)
        .json({ message: "Usuario creado correctamente"});
  }
});




module.exports = router;
