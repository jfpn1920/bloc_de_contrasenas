<?php
$servidor =
    "localhost";
$usuario =
    "root";
$contrasena =
    "";
$baseDeDatos =
    "bloc_contrasena";
$conexion =
    new mysqli(
        $servidor,
        $usuario,
        $contrasena,
        $baseDeDatos
    );
if(
    $conexion->connect_error
){
    die(
        "Error de conexión: " .
        $conexion->connect_error
    );
}
$conexion->set_charset(
    "utf8"
);
?>