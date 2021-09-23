CREATE TABLE USUARIO(
 usuario VARCHAR(50) NOT NULL,
 nombre_usuario VARCHAR(50) NOT NULL,
 apellido_usuario VARCHAR(50) NOT NULL,
 password_usuario VARCHAR(50) NOT NULL,
 edad_usuario INT NOT NULL,
 correo_usuario VARCHAR(50) NOT NULL,
 CONSTRAINT USUARIO_PK PRIMARY KEY (usuario)
);


CREATE TABLE PELICULA(
 id_pelicula VARCHAR(32),
 titulo_pelicula VARCHAR(50) NOT NULL,
 year_pelicula INT NOT NULL,
 rating_pelicula DECIMAL NOT NULL,
 descripcion_pelicula VARCHAR(200) NOT NULL,
 CONSTRAINT PELICULA_PK PRIMARY KEY (id_pelicula)
);

DROP TABLE USUARIO;
INSERT INTO USUARIO VALUES('1234567891234567','KevinGarciaJ','Kevin Garcia','Garcia','1234',22,'kevinalexandergarcia1999@gmail.com');
SELECT * FROM USUARIO;

DROP TABLE PELICULA;
SELECT * FROM PELICULA;


