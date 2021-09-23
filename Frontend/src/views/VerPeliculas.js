import React, { useEffect, useState } from "react";

import { URL } from "../variables/rutas";
import "toastr/build/toastr.min.css";
import toastr from "toastr";

import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
} from "reactstrap";

export default function VerPeliculas() {
  const [peliculas, setPeliculas] = useState([]);

  useEffect(() => {
    obtenerPeliculas();
  }, []);

  const obtenerPeliculas = () => {
    fetch(`${URL.obtener_peliculas}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        mode: "no-cors",
      },
    })
      .then((res) => res)
      .then(async function (response) {
        if (response.status == 200) {
          let respuesta = await response.json();

          console.log(respuesta);
          setPeliculas(respuesta.data);
        } else {
          toastr.options = {
            positionClass: "toast-top-full-width",
            hideDuration: 300,
            timeOut: 60000,
          };
          toastr.clear();
          setTimeout(() => toastr.warning(`Error al obtener los datos`), 300);
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h1">Peliculas</CardTitle>
              </CardHeader>
              <CardBody>
                <Row>
                  <br />
                  <br />
                  <Table className="tablesorter" responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>Id Pelicula</th>

                        <th>Titulo</th>
                        <th>Año</th>
                        <th>Rating</th>
                      </tr>
                    </thead>
                    <tbody>
                      {peliculas.map((pelicula, i) => {
                        return (
                          <tr key={i}>
                            <th>{pelicula.ID_PELICULA}</th>

                            <th>{pelicula.TITULO_PELICULA}</th>
                            <th>{pelicula.YEAR_PELICULA}</th>
                            <th>{pelicula.RATING_PELICULA}</th>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}
