import React, { useState } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import "./Login.css";
import md5 from "md5";
import { URL } from "../variables/rutas";
import "toastr/build/toastr.min.css";
import toastr from "toastr";

export default function Login() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  function validateForm() {
    return user.length > 0 && password.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    fetch(`${URL.login}`, {
      method: "POST",
      body: JSON.stringify({
        usuario: user,
        password: md5(password),
      }),
      headers: {
        "Content-Type": "application/json",
        mode: "no-cors",
      },
    })
      .then((res) => res)
      .then(async function (response) {
        if (response.status == 200) {
          let respuesta = await response.json();
          let val = respuesta.data;

          console.log(val);

          localStorage.setItem("current", JSON.stringify(val));

          toastr.options = {
            positionClass: "toast-top-full-width",
            hideDuration: 300,
            timeOut: 60000,
          };
          toastr.clear();
          setTimeout(() => toastr.success(`Credenciales Correctas`), 300);

          history.push("/admin/peliculas");
        } else {
          toastr.options = {
            positionClass: "toast-top-full-width",
            hideDuration: 300,
            timeOut: 60000,
          };
          toastr.clear();
          setTimeout(() => toastr.warning(`Credenciales incorrectas`), 300);
        }
      });
  }

  async function registrar_usuarios(event) {
    event.preventDefault();
    history.push("RegistrarUsuarios");
  }

  return (
    <div className="Login">
      <h1>Bienvenido a nuesta APP! Ingresa tus datos</h1>
      <br></br>
      <br></br>
      <h5>Por favor ingresar las credenciales aquí</h5>
      <br></br>
      <br></br>
      <form>
        <FormGroup controlId="email" bsSize="large">
          <ControlLabel>Usuario</ControlLabel>
          <FormControl
            autoFocus
            type="text"
            value={user}
            onChange={(e) => setUser(e.target.value)}
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
        <Button
          block
          bsSize="large"
          disabled={!validateForm()}
          onClick={handleSubmit}
          id="login"
        >
          Login
        </Button>

        <Button block bsSize="large" onClick={registrar_usuarios}>
          Registrar Usuario
        </Button>
      </form>
    </div>
  );
}
