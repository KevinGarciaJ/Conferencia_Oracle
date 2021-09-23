import React, { useState } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import "./Login.css";
import md5 from "md5";
import { URL } from "../variables/rutas";
import "toastr/build/toastr.min.css";
import toastr from "toastr";

export default function RegistrarUsuarios() {
  const [usuario, setUsuario] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [edad, setEdad] = useState("");
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");


  const history = useHistory();

  async function handleSubmit(event) {
    event.preventDefault();

    fetch(`${URL.crear_usuario}`, {
      method: "POST",
      body: JSON.stringify({
        usuario: usuario,
        nombre: nombre,
        apellido: apellido,
        correo: correo,
        edad: edad,
        password: md5(password),
      }),
      headers: {
        "Content-Type": "application/json",
        mode: "no-cors",
      },
    })
      .then((res) => res)
      .then(async function (response) {

        if (response.status === 200) {
          toastr.options = {
            positionClass: "toast-top-full-width",
            hideDuration: 300,
            timeOut: 60000,
          };
          toastr.clear();
          setTimeout(() => toastr.success(`Usuario creado correctamente`), 300);
          history.push("/login");
        } else {
          toastr.options = {
            positionClass: "toast-top-full-width",
            hideDuration: 300,
            timeOut: 60000,
          };
          toastr.clear();
          setTimeout(() => toastr.warning(`El usuario ya está en uso`), 300);
        }
      })
      .catch((error) => console.log(error));
  }

  return (
    <div className="Login">
      <h1>Bienvenido a nuesta APP!</h1>
      <br></br>
      <br></br>
      <h5>Por favor ingresa tus datos para registrarte</h5>
      <br></br>
      <br></br>
      <form>
        <FormGroup controlId="usuario" bsSize="large">
          <ControlLabel>Usuario</ControlLabel>
          <FormControl
            autoFocus
            type="text"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="nombre" bsSize="large">
          <ControlLabel>Nombre</ControlLabel>
          <FormControl
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            type="text"
          />
        </FormGroup>
        <FormGroup controlId="apellido" bsSize="large">
          <ControlLabel>Apellido</ControlLabel>
          <FormControl
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            type="text"
          />
        </FormGroup>
        <FormGroup controlId="edad" bsSize="large">
          <ControlLabel>Edad</ControlLabel>
          <FormControl
            value={edad}
            onChange={(e) => setEdad(e.target.value)}
            type="number"
          />
        </FormGroup>
        <FormGroup controlId="correo" bsSize="large">
          <ControlLabel>Correo</ControlLabel>
          <FormControl
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            type="email"
          />
        </FormGroup>
        <FormGroup controlId="password" bsSize="large">
          <ControlLabel>Password</ControlLabel>
          <FormControl
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
        </FormGroup>

        <Button block bsSize="large" onClick={handleSubmit}>
          Registrar Usuario
        </Button>
      </form>
    </div>
  );
}
