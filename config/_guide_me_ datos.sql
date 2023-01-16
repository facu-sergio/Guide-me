-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 21-11-2022 a las 21:35:32
-- Versión del servidor: 10.4.25-MariaDB
-- Versión de PHP: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `guide_me`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alertas`
--

CREATE TABLE `alertas` (
  `ID_ALERTA` int(11) NOT NULL,
  `ID_TIPO_EVENTO` int(11) NOT NULL,
  `TEXTO_ALERTA` varchar(500) NOT NULL,
  `FECHA_HORA` datetime NOT NULL,
  `LEIDO` binary(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `carreras_upe`
--

CREATE TABLE `carreras_upe` (
  `ID_CAR_UPE` int(11) NOT NULL,
  `NOMBRE` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `carreras_upe`
--

INSERT INTO `carreras_upe` (`ID_CAR_UPE`, `NOMBRE`) VALUES
(1, 'Comercio internacional'),
(2, 'Gestión Aeroportuaria'),
(3, 'Logistica'),
(4, 'Turismo'),
(5, 'Desarrollo de Software'),
(6, 'Higiene y Seguridad');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estudios`
--

CREATE TABLE `estudios` (
  `ID_ESTUDIO` int(11) NOT NULL,
  `NOMBRE_CARRERA` varchar(200) NOT NULL,
  `UNIVERSIDAD` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `estudios`
--

INSERT INTO `estudios` (`ID_ESTUDIO`, `NOMBRE_CARRERA`, `UNIVERSIDAD`) VALUES
(1, 'Desarrollo de Software', 'Upe'),
(2, 'Tecnicatura Universitaria en Logística', 'UPE'),
(3, 'Licenciatura en Gestión Aeroportuaria', 'Upe'),
(4, 'Comercio Internacional', 'Upe'),
(6, 'Lic. en Higiene y Seguridad', ' UTE'),
(13, 'Tecnicatura en turismo', 'UBA'),
(14, 'Desarrollo de Software', 'Upe'),
(15, 'Desarrollo de Software', 'Upe');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `eventos`
--

CREATE TABLE `eventos` (
  `ID_TIPO_EVENTO` int(11) NOT NULL,
  `REDIRECCION` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `me_gustas`
--

CREATE TABLE `me_gustas` (
  `ID_MEGUSTA` int(11) NOT NULL,
  `ID_PERSONA` int(11) NOT NULL,
  `ID_PUBLICACION` int(11) NOT NULL,
  `FECHA_HORA` datetime NOT NULL,
  `BORRADO_L` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `personas`
--

CREATE TABLE `personas` (
  `ID_PERSONA` int(11) NOT NULL,
  `ID_ROL` int(11) NOT NULL,
  `NOMBRE` varchar(9) NOT NULL,
  `APELLIDO` varchar(10) NOT NULL,
  `FOTO` varchar(500) NOT NULL,
  `EMAIL` varchar(20) NOT NULL,
  `PASSWORD` varchar(255) NOT NULL,
  `FECHA_NAC` date NOT NULL,
  `OFICIO` varchar(300) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `personas`
--

INSERT INTO `personas` (`ID_PERSONA`, `ID_ROL`, `NOMBRE`, `APELLIDO`, `FOTO`, `EMAIL`, `PASSWORD`, `FECHA_NAC`, `OFICIO`) VALUES
(2, 2, 'Facundo', 'Sergio', '661f2d67-8cf2-43cc-8e51-3293ebd6a90c.jpg', 'facu@gmail.com', '$2a$08$ocErrpFK3SnUrhx4em53be9LHlaKRZDmqZnhK7vW4nTxyfK5TLnzq', '1994-11-14', 'Programador web'),
(3, 2, 'Santiago', 'Diaz', 'cc659e6f-b7a4-451d-91e6-b5ec1f3bb9c3.png', 'santiago@gmail.com', '$2a$08$Gexknciox4YaPBA9wu0e9uiP3HOrDILJLQZVjBpCyMm6rVBIPrx.O', '1990-09-12', 'Encargado  de depósito'),
(4, 2, 'Romina', 'Gonzales', '0ee633d6-c97f-4f35-b91c-7ce8aad765dd.jpg', 'romina@gmail.com', '$2a$08$.5VddxZ4vrH.KcGyEBhkJOkKxWDYHSkseK7T2fbS.WcZOF3qQWpke', '1991-07-23', 'Auxiliar de vuelo'),
(5, 2, 'Lucas', 'Perez', 'cac0f217-d146-4879-9584-707a32de97ad.jpg', 'Lucas@gmail.com', '$2a$08$XpC3MuMgCwfBf7zQFqLAVOjAco4QE9hBwYNzzh7g2vWCCCby94KHC', '1987-05-04', 'Analista de comercio Exterior'),
(6, 2, 'Martin', 'Roldan', '3c06bde8-162c-4693-9b91-4bd81db3c53e.jpg', 'martin@gmail.com', '$2a$08$q4y3Rf2xpTCQBv33UHc71.K2TKGjzPlcIWsmNVWDEQ0qAXwrhzawO', '1993-04-23', 'Tecnico en seguridad e higiene'),
(7, 2, 'Cristian', 'Duran', 'b1ce513d-97a2-4ce2-99ef-b06b7adf10f5.jpg', 'cristian@gmail.com', '$2a$08$/QzO/a3BDni80I.7AB82k.iVpgHE/rSzDLH5I2jgmnMxYEli5YiIu', '1995-02-14', 'Organizador de congresos'),
(8, 3, 'Pedro', 'Ramirez', 'e7184a02-26b6-4889-84c4-0232a3c0ff0f.jpg', 'pedro@gmail.com', '$2a$08$f23YPQjsnQrZB/i0TqE5Ye8QskeFahjunERginDkvjSpXUVxqfmXC', '1996-02-28', ''),
(9, 2, 'Natalia', 'Merino', '21de94a4-8b65-4fa5-9b7a-339842fdb19d.jpg', 'natalia@gmail.com', '$2a$08$aJjQhRerBNCc9Wtw2bLPrubq0M5SBgKs16ZgwxR59ThLNjczcnUZi', '1995-04-13', 'Analista funcional');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `persona_estudios`
--

CREATE TABLE `persona_estudios` (
  `ID_PERSONA_ESTUDIO` int(11) NOT NULL,
  `ID_PERSONA` int(11) NOT NULL,
  `ID_ESTUDIO` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `persona_estudios`
--

INSERT INTO `persona_estudios` (`ID_PERSONA_ESTUDIO`, `ID_PERSONA`, `ID_ESTUDIO`) VALUES
(1, 2, 1),
(2, 3, 2),
(3, 4, 3),
(4, 5, 4),
(6, 6, 6),
(9, 7, 13),
(10, 8, 14),
(11, 9, 15);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `persona_sigue_a`
--

CREATE TABLE `persona_sigue_a` (
  `ID_SEGUIDOR` int(11) NOT NULL,
  `ID_PERSONA` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `publicaciones`
--

CREATE TABLE `publicaciones` (
  `ID_PUBLICACION` int(11) NOT NULL,
  `ID_PERSONA` int(11) NOT NULL,
  `ID_CAR_UPE` int(11) NOT NULL,
  `TITULO` varchar(35) NOT NULL,
  `EMPRESA` varchar(200) NOT NULL,
  `CUERPO` text NOT NULL,
  `ESTADO` varchar(100) NOT NULL,
  `BORRADO_L` int(11) DEFAULT NULL,
  `FECHA_HORA` timestamp(1) NOT NULL DEFAULT current_timestamp(1) ON UPDATE current_timestamp(1),
  `MOTIVO_MODERACION` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `publicaciones`
--

INSERT INTO `publicaciones` (`ID_PUBLICACION`, `ID_PERSONA`, `ID_CAR_UPE`, `TITULO`, `EMPRESA`, `CUERPO`, `ESTADO`, `BORRADO_L`, `FECHA_HORA`, `MOTIVO_MODERACION`) VALUES
(1, 2, 5, 'Programador web', 'Engee', 'Hola, ¿cómo están? mi nombre es facundo y trabajo como programador en engee, estudie en la upe la carrera tec. en desarrollo de software hace varios años, quería contarles las tareas que hago día a día para que tengan una idea de cómo es trabajar como dev Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto provident laudantium voluptates ipsum dicta. Molestias dolores animi, id omnis voluptates voluptatem consectetur facere laboriosam odit magnam est inventore, provident earum!', 'publicada', 0, '2022-11-21 18:20:20.8', NULL),
(2, 3, 3, 'Encargado de depósito', 'Logistics ar', 'Hola, ¿cómo están?, mi nombre es Santiago y trabajo como encargado de depósito en Logistics Ar, estudie  en la upe la carrera Tecnicatura Universitaria en Logística hace varios años, quería contarles las tareas que hago día a día en mi trabajo Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias inventore ex quibusdam, quidem explicabo quae repellendus! Qui deleniti repudiandae laborum ex autem reprehenderit pariatur dolore, harum excepturi ipsam hic eum!', 'publicada', 0, '2022-11-21 18:32:33.3', NULL),
(3, 4, 2, 'Auxiliar de vuelo', 'Aeropuerto Ezeiza', 'Hola me llamo Romina, si les interesa saber cómo es trabajar de auxiliar de vuelo aca les cuento, estudie la carrera Licenciatura en Gestión Aeroportuaria hace varios años y actualmente trabajo en el aeropuerto de ezeiza Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt voluptates harum ipsam ad itaque fugiat cumque quam inventore commodi, esse quaerat incidunt consequuntur aspernatur debitis quae tenetur consectetur sunt. Amet.', 'publicada', 0, '2022-11-21 18:42:49.8', NULL),
(4, 5, 1, 'Analista de comercio Exterior', 'AMAZON', 'Buenas mi nombre es Lucas y trabajo como analista de comercio exterior en amazon quería contarles un poco lo que hago día a día Lorem ipsum dolor sit, amet consectetur adipisicing elit. Alias voluptate delectus ipsa culpa iure vitae modi, porro ullam iste. Earum nostrum tempora laboriosam laborum expedita. Voluptatum quos provident dolorum nisi.', 'publicada', 0, '2022-11-21 18:52:57.0', NULL),
(5, 7, 4, 'Organizador de Congresos', 'Turistics Org', 'Hola soy Cristian y me encargo de organizar congresos sobre turismo para la empresa Turistics Org  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsam dolorum quidem debitis nam eum impedit soluta cupiditate, saepe nihil, fugiat dolor odio blanditiis, at deleniti porro dignissimos illum quas incidunt.', 'publicada', 0, '2022-11-21 19:24:29.0', NULL),
(6, 6, 6, 'Inspector de Higiene', 'OCA', 'Buenas soy Martín, estudie higiene y seguridad en la upe y actualmente trabajo para oca como inspector, queria contarles las tareas que hago  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laudantium fugiat deserunt, recusandae atque assumenda nihil optio animi rerum voluptas neque impedit est repellat id consequuntur iusto quod! Doloribus, tempora enim.', 'publicada', 0, '2022-11-21 19:27:30.0', NULL),
(7, 9, 5, 'Analista funcional', 'Develop Org', 'Hola soy Natalia y trabajo como analista funcional hace varios años, quería contarles como es desempeñar esta función día a día Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat quis beatae consectetur sunt! Aliquam sequi quisquam consectetur vitae, pariatur adipisci repellendus quas modi repudiandae maiores nulla repellat, vero ea itaque.', 'publicada', 0, '2022-11-21 20:31:58.0', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `recibe`
--

CREATE TABLE `recibe` (
  `ID_ALERTA` int(11) NOT NULL,
  `ID_PERSONA` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `ID_ROL` int(11) NOT NULL,
  `NOMBRE_ROL` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`ID_ROL`, `NOMBRE_ROL`) VALUES
(1, 'admin'),
(2, 'profesional'),
(3, 'alumno');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `seguimientos`
--

CREATE TABLE `seguimientos` (
  `ID_SEGUIDOR` int(11) NOT NULL,
  `ID_SEGUIDO` int(11) NOT NULL,
  `FECHA_HORA` datetime NOT NULL,
  `BORRADO_L` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `alertas`
--
ALTER TABLE `alertas`
  ADD PRIMARY KEY (`ID_ALERTA`),
  ADD KEY `ID_TIPO_EVENTO` (`ID_TIPO_EVENTO`);

--
-- Indices de la tabla `carreras_upe`
--
ALTER TABLE `carreras_upe`
  ADD PRIMARY KEY (`ID_CAR_UPE`);

--
-- Indices de la tabla `estudios`
--
ALTER TABLE `estudios`
  ADD PRIMARY KEY (`ID_ESTUDIO`);

--
-- Indices de la tabla `eventos`
--
ALTER TABLE `eventos`
  ADD PRIMARY KEY (`ID_TIPO_EVENTO`);

--
-- Indices de la tabla `me_gustas`
--
ALTER TABLE `me_gustas`
  ADD PRIMARY KEY (`ID_MEGUSTA`),
  ADD KEY `me_gustas_ibfk_1` (`ID_PERSONA`),
  ADD KEY `me_gustas_ibfk_2` (`ID_PUBLICACION`);

--
-- Indices de la tabla `personas`
--
ALTER TABLE `personas`
  ADD PRIMARY KEY (`ID_PERSONA`),
  ADD UNIQUE KEY `EMAIL` (`EMAIL`),
  ADD KEY `ID_ROL` (`ID_ROL`);

--
-- Indices de la tabla `persona_estudios`
--
ALTER TABLE `persona_estudios`
  ADD PRIMARY KEY (`ID_PERSONA_ESTUDIO`),
  ADD KEY `persona_estudios_ibfk1` (`ID_PERSONA`),
  ADD KEY `persona_estudios_ibfk2` (`ID_ESTUDIO`);

--
-- Indices de la tabla `persona_sigue_a`
--
ALTER TABLE `persona_sigue_a`
  ADD PRIMARY KEY (`ID_SEGUIDOR`,`ID_PERSONA`),
  ADD KEY `persona_sigue_a_ibfk_2` (`ID_PERSONA`);

--
-- Indices de la tabla `publicaciones`
--
ALTER TABLE `publicaciones`
  ADD PRIMARY KEY (`ID_PUBLICACION`),
  ADD KEY `ID_CAR_UPE` (`ID_CAR_UPE`),
  ADD KEY `publicaciones_ibfk_1` (`ID_PERSONA`);

--
-- Indices de la tabla `recibe`
--
ALTER TABLE `recibe`
  ADD PRIMARY KEY (`ID_ALERTA`,`ID_PERSONA`),
  ADD KEY `recibe_ibfk_2` (`ID_PERSONA`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`ID_ROL`);

--
-- Indices de la tabla `seguimientos`
--
ALTER TABLE `seguimientos`
  ADD PRIMARY KEY (`ID_SEGUIDOR`),
  ADD KEY `seguimientos_ibfk1` (`ID_SEGUIDO`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `estudios`
--
ALTER TABLE `estudios`
  MODIFY `ID_ESTUDIO` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `me_gustas`
--
ALTER TABLE `me_gustas`
  MODIFY `ID_MEGUSTA` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `personas`
--
ALTER TABLE `personas`
  MODIFY `ID_PERSONA` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `persona_estudios`
--
ALTER TABLE `persona_estudios`
  MODIFY `ID_PERSONA_ESTUDIO` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `publicaciones`
--
ALTER TABLE `publicaciones`
  MODIFY `ID_PUBLICACION` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `alertas`
--
ALTER TABLE `alertas`
  ADD CONSTRAINT `alertas_ibfk_1` FOREIGN KEY (`ID_TIPO_EVENTO`) REFERENCES `eventos` (`ID_TIPO_EVENTO`);

--
-- Filtros para la tabla `me_gustas`
--
ALTER TABLE `me_gustas`
  ADD CONSTRAINT `me_gustas_ibfk_1` FOREIGN KEY (`ID_PERSONA`) REFERENCES `personas` (`ID_PERSONA`),
  ADD CONSTRAINT `me_gustas_ibfk_2` FOREIGN KEY (`ID_PUBLICACION`) REFERENCES `publicaciones` (`ID_PUBLICACION`);

--
-- Filtros para la tabla `personas`
--
ALTER TABLE `personas`
  ADD CONSTRAINT `personas_ibfk_1` FOREIGN KEY (`ID_ROL`) REFERENCES `roles` (`ID_ROL`);

--
-- Filtros para la tabla `persona_estudios`
--
ALTER TABLE `persona_estudios`
  ADD CONSTRAINT `persona_estudios_ibfk1` FOREIGN KEY (`ID_PERSONA`) REFERENCES `personas` (`ID_PERSONA`),
  ADD CONSTRAINT `persona_estudios_ibfk2` FOREIGN KEY (`ID_ESTUDIO`) REFERENCES `estudios` (`ID_ESTUDIO`);

--
-- Filtros para la tabla `persona_sigue_a`
--
ALTER TABLE `persona_sigue_a`
  ADD CONSTRAINT `persona_sigue_a_ibfk_1` FOREIGN KEY (`ID_SEGUIDOR`) REFERENCES `seguimientos` (`ID_SEGUIDOR`),
  ADD CONSTRAINT `persona_sigue_a_ibfk_2` FOREIGN KEY (`ID_PERSONA`) REFERENCES `personas` (`ID_PERSONA`);

--
-- Filtros para la tabla `publicaciones`
--
ALTER TABLE `publicaciones`
  ADD CONSTRAINT `publicaciones_ibfk_1` FOREIGN KEY (`ID_PERSONA`) REFERENCES `personas` (`ID_PERSONA`),
  ADD CONSTRAINT `publicaciones_ibfk_2` FOREIGN KEY (`ID_CAR_UPE`) REFERENCES `carreras_upe` (`ID_CAR_UPE`);

--
-- Filtros para la tabla `recibe`
--
ALTER TABLE `recibe`
  ADD CONSTRAINT `recibe_ibfk_1` FOREIGN KEY (`ID_ALERTA`) REFERENCES `alertas` (`ID_ALERTA`),
  ADD CONSTRAINT `recibe_ibfk_2` FOREIGN KEY (`ID_PERSONA`) REFERENCES `personas` (`ID_PERSONA`);

--
-- Filtros para la tabla `seguimientos`
--
ALTER TABLE `seguimientos`
  ADD CONSTRAINT `seguimientos_ibfk1` FOREIGN KEY (`ID_SEGUIDO`) REFERENCES `personas` (`ID_PERSONA`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
