<?php
require_once("conexion.php");
header(
    "Content-Type: application/json"
);
$accion =
    $_POST["accion"] ??
    $_GET["accion"] ??
    "";
//------------------------//
//--|guardar_contrasena|--//
//------------------------//
if($accion === "guardar"){
    $usuario =
        $_POST["usuario"] ?? "";
    $correo =
        $_POST["correo"] ?? "";
    $contrasena =
        $_POST["contrasena"] ?? "";
    $categoria =
        $_POST["categoria"] ?? "";
    $fecha =
        $_POST["fecha"] ?? "";
    if(
        empty($usuario) ||
        empty($correo) ||
        empty($contrasena) ||
        empty($categoria) ||
        empty($fecha)
    ){
        echo json_encode([
            "estado" => false,
            "mensaje" =>
                "Todos los campos son obligatorios"
        ]);
        exit;
    }
    $sql =
        "INSERT INTO bloc_contrasena
        (
            usuario,
            correo,
            contrasena,
            categoria,
            fecha_creacion
        )
        VALUES
        (
            ?,
            ?,
            ?,
            ?,
            ?
        )";
    $sentencia =
        $conexion->prepare(
            $sql
        );
    if(!$sentencia){
        echo json_encode([
            "estado" => false,
            "mensaje" =>
                $conexion->error
        ]);
        exit;
    }
    $sentencia->bind_param(
        "sssss",
        $usuario,
        $correo,
        $contrasena,
        $categoria,
        $fecha
    );
    if(
        $sentencia->execute()
    ){
        echo json_encode([
            "estado" => true,
            "mensaje" =>
                "Contraseña guardada correctamente"
        ]);
    }else{
        echo json_encode([
            "estado" => false,
            "mensaje" =>
                $sentencia->error
        ]);
    }
    exit;
}
//-------------------------//
//--|mostrar_contrasenas|--//
//-------------------------//
if($accion === "mostrar"){
    $sql =
        "SELECT *
        FROM bloc_contrasena
        ORDER BY id DESC";
    $resultado =
        $conexion->query(
            $sql
        );
    $datos = [];
    if($resultado){
        while(
            $fila =
            $resultado->fetch_assoc()
        ){
            $datos[] =
                $fila;
        }
    }
    echo json_encode(
        $datos
    );
    exit;
}
//-----------------------//
//--|editar_contrasena|--//
//-----------------------//
if($accion === "editar"){
    $id =
        $_POST["id"] ?? 0;
    $usuario =
        $_POST["usuario"] ?? "";
    $correo =
        $_POST["correo"] ?? "";
    $contrasena =
        $_POST["contrasena"] ?? "";
    $fecha =
        $_POST["fecha"] ?? "";
    $sql =
        "UPDATE
            bloc_contrasena
        SET
            usuario = ?,
            correo = ?,
            contrasena = ?,
            fecha_creacion = ?
        WHERE
            id = ?";
    $sentencia =
        $conexion->prepare(
            $sql
        );
    if(!$sentencia){
        echo json_encode([
            "estado" => false,
            "mensaje" =>
                $conexion->error
        ]);
        exit;
    }
    $sentencia->bind_param(
        "ssssi",
        $usuario,
        $correo,
        $contrasena,
        $fecha,
        $id
    );
    if(
        $sentencia->execute()
    ){
        echo json_encode([
            "estado" => true,
            "mensaje" =>
                "Contraseña actualizada correctamente"
        ]);
    }else{
        echo json_encode([
            "estado" => false,
            "mensaje" =>
                $sentencia->error
        ]);
    }
    exit;
}
//-------------------------//
//--|eliminar_contrasena|--//
//-------------------------//
if($accion === "eliminar"){
    $id =
        $_POST["id"] ?? 0;
    $sql =
        "DELETE FROM
            bloc_contrasena
        WHERE
            id = ?";
    $sentencia =
        $conexion->prepare(
            $sql
        );
    if(!$sentencia){
        echo json_encode([
            "estado" => false,
            "mensaje" =>
                $conexion->error
        ]);
        exit;
    }
    $sentencia->bind_param(
        "i",
        $id
    );
    if(
        $sentencia->execute()
    ){
        echo json_encode([
            "estado" => true,
            "mensaje" =>
                "Contraseña eliminada correctamente"
        ]);
    }else{
        echo json_encode([
            "estado" => false,
            "mensaje" =>
                $sentencia->error
        ]);
    }
    exit;
}
echo json_encode([
    "estado" => false,
    "mensaje" =>
        "Acción no válida"
]);
?>