import React, { useState } from "react";

import {
  Card,
  CardHeader,
  CardBody,
  Button,
  CardFooter,
  FormGroup,
  Row,
  Col,
} from "reactstrap";
import { FormControl, ControlLabel } from "react-bootstrap";
import { URL } from "../variables/rutas";
import "toastr/build/toastr.min.css";
import toastr from "toastr";

export default function ModificarUsuario() {
  const [obj_usuario] = useState(JSON.parse(localStorage.getItem("current")));

  const [usuario, setUsuario] = useState(obj_usuario.USUARIO);
  const [nombre, setNombre] = useState(obj_usuario.NOMBRE_USUARIO);
  const [apellido, setApellido] = useState(obj_usuario.APELLIDO_USUARIO);
  const [edad, setEdad] = useState(obj_usuario.EDAD_USUARIO);
  const [correo, setCorreo] = useState(obj_usuario.CORREO_USUARIO);

  const modificar_usuario = () => {
    fetch(`${URL.modificar_usuario}`, {
      method: "PUT",
      body: JSON.stringify({
        usuario: usuario,
        nombre: nombre,
        apellido: apellido,
        correo: correo,
        edad: edad,
      }),
      headers: {
        "Content-Type": "application/json",
        mode: "no-cors",
      },
    })
      .then((res) => res)
      .then(async function (response) {
        if (response.status == 200) {
          toastr.options = {
            positionClass: "toast-top-full-width",
            hideDuration: 300,
            timeOut: 60000,
          };
          toastr.clear();
          setTimeout(
            () => toastr.success(`Usuario modificado correctamente`),
            300
          );
        } else {
          toastr.options = {
            positionClass: "toast-top-full-width",
            hideDuration: 300,
            timeOut: 60000,
          };
          toastr.clear();
          setTimeout(
            () => toastr.warning(`Error al modificar el usuario`),
            300
          );
        }
      });
  };

  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <h5 className="title">Modificar Usuario</h5>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col sm="12" md={{ size: 6, offset: 3 }}>
                    <label>Usuario</label>
                    <FormGroup>
                      <FormControl
                        type="text"
                        defaultValue={usuario}
                        disabled={true}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col sm="12" md={{ size: 6, offset: 3 }}>
                    <label>Nombre</label>
                    <FormGroup>
                      <FormControl
                        type="text"
                        defaultValue={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col sm="12" md={{ size: 6, offset: 3 }}>
                    <label>Apellido</label>
                    <FormGroup>
                      <FormControl
                        type="text"
                        defaultValue={apellido}
                        onChange={(e) => setApellido(e.target.value)}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col sm="12" md={{ size: 6, offset: 3 }}>
                    <label>Edad</label>
                    <FormGroup>
                      <FormControl
                        type="number"
                        defaultValue={edad}
                        onChange={(e) => setEdad(e.target.value)}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col sm="12" md={{ size: 6, offset: 3 }}>
                    <label>Correo</label>
                    <FormGroup>
                      <FormControl
                        type="text"
                        defaultValue={correo}
                        onChange={(e) => setCorreo(e.target.value)}
                      />
                    </FormGroup>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <Button
                  className="btn-fill"
                  color="primary"
                  type="submit"
                  onClick={() => modificar_usuario()}
                >
                  Modificar Usuario
                </Button>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}
