//---------------------------------------//
//--|funcionalidad_bloc_de_contraseñas|--//
//---------------------------------------//
const formulario =
    document.querySelector(
        "form"
    );
formulario.addEventListener(
    "submit",
    function(evento){
        evento.preventDefault();
        const usuario =
            document.querySelector(
                'input[type="text"]'
            ).value.trim();
        const correo =
            document.querySelector(
                'input[type="email"]'
            ).value.trim();
        const contrasena =
            document.querySelector(
                'input[type="password"]'
            ).value.trim();
        const categoria =
            document.querySelector(
                "select"
            ).value;
        const fecha =
            document.querySelector(
                'input[type="date"]'
            ).value;
        if(
            usuario === "" ||
            correo === "" ||
            contrasena === "" ||
            categoria === "Ninguna categoría..." ||
            fecha === ""
        ){
            alert(
                "Todos los campos son obligatorios"
            );
            return;
        }
        const datos =
            new FormData();
        datos.append(
            "accion",
            "guardar"
        );
        datos.append(
            "usuario",
            usuario
        );
        datos.append(
            "correo",
            correo
        );
        datos.append(
            "contrasena",
            contrasena
        );
        datos.append(
            "categoria",
            categoria
        );
        datos.append(
            "fecha",
            fecha
        );
        fetch(
            "bloc_de_contrasenas.php",
            {
                method: "POST",
                body: datos
            }
        )
        .then(
            function(respuesta){
                console.log(
                    "Estado HTTP:",
                    respuesta.status
                );
                return respuesta.json();
            }
        )
        .then(
            function(datos){
                console.log(
                    "Respuesta PHP:",
                    datos
                );
                if(
                    datos.estado === true
                ){
                    mostrarContrasenas();
                    alert(
                        datos.mensaje
                    );
                    formulario.reset();
                }
                else{
                    alert(
                        datos.mensaje
                    );
                }
            }
        )
        .catch(
            function(error){
                console.error(
                    "Error:",
                    error
                );
                alert(
                    "Error de conexión con el servidor"
                );
            }
        );
    }
);
//---------------------------------------------//
//--|funcionalidad_contadores_de_contraseñas|--//
//---------------------------------------------//
function actualizarContadores(
    contrasenas
){
    document.getElementById(
        "total_contrasenas"
    ).textContent =
        contrasenas.length;
    let categoriasUnicas =
        new Set(
            contrasenas.map(
                function(registro){
                    return registro.categoria;
                }
            )
        );
    document.getElementById(
        "total_categorias"
    ).textContent =
        categoriasUnicas.size;
}
//------------------------------------------//
//--|funcionalidad_tablero_de_contraseñas|--//
//------------------------------------------//
const cuerpoTabla =
    document.getElementById(
        "contenedor_tabla"
    );
function mostrarContrasenas(){
    fetch(
        "bloc_de_contrasenas.php?accion=mostrar"
    )
    .then(
        function(respuesta){
            console.log(
                "Estado HTTP:",
                respuesta.status
            );
            return respuesta.json();
        }
    )
    .then(
        function(contrasenas){
            console.log(
                "Datos recibidos:",
                contrasenas
            );
            if(
                !Array.isArray(
                    contrasenas
                )
            ){
                console.error(
                    "La respuesta no es un arreglo"
                );
                return;
            }
            actualizarContadores(
                contrasenas
            );
            cuerpoTabla.innerHTML = "";
            if(
                contrasenas.length === 0
            ){
                cuerpoTabla.innerHTML = `
                    <tr>
                        <td
                            colspan="7"
                            class="sin_registros"
                        >
                            Ninguna contraseña añadida en el tablero
                        </td>
                    </tr>
                `;
                return;
            }
            contrasenas.forEach(
                function(registro){
                    cuerpoTabla.innerHTML += `
                        <tr>
                            <td>
                                ${registro.id}
                            </td>
                            <td>
                                ${registro.usuario}
                            </td>
                            <td>
                                ${registro.correo}
                            </td>
                            <td>
                                ${registro.contrasena}
                            </td>
                            <td>
                                ${registro.categoria}
                            </td>
                            <td>
                                ${registro.fecha_creacion}
                            </td>
                            <td>
                                <i
                                    class="
                                        fa-solid
                                        fa-eye
                                        btn_vista_previa
                                    "
                                    data-id="${registro.id}"
                                    data-usuario="${registro.usuario}"
                                    data-correo="${registro.correo}"
                                    data-contrasena="${registro.contrasena}"
                                    data-categoria="${registro.categoria}"
                                    data-fecha="${registro.fecha_creacion}"
                                    title="Vista previa"
                                ></i>
                                <i
                                    class="
                                        fa-solid
                                        fa-pen-to-square
                                        btn_editar
                                    "
                                    data-id="${registro.id}"
                                    data-usuario="${registro.usuario}"
                                    data-correo="${registro.correo}"
                                    data-contrasena="${registro.contrasena}"
                                    data-categoria="${registro.categoria}"
                                    data-fecha="${registro.fecha_creacion}"
                                    title="Editar"
                                ></i>
                                <i
                                    class="
                                        fa-solid
                                        fa-trash
                                        btn_eliminar
                                    "
                                    data-id="${registro.id}"
                                    title="Eliminar"
                                ></i>
                            </td>
                        </tr>
                    `;
                }
            );
        }
    )
    .catch(
        function(error){
            console.error(
                "Error al cargar datos:",
                error
            );
            cuerpoTabla.innerHTML = `
                <tr>
                    <td
                        colspan="7"
                        class="sin_registros"
                    >
                        Error al cargar los datos
                    </td>
                </tr>
            `;
        }
    );
}
//---------------------------------//
//--|vista_previa_de_contraseñas|--//
//---------------------------------//
function vistaPreviaContrasena(
    usuario,
    correo,
    contrasena,
    categoria,
    fecha
){
    alert(
        "Usuario: " +
        usuario +
        "\n\nCorreo: " +
        correo +
        "\n\nContraseña: " +
        contrasena +
        "\n\nCategoría: " +
        categoria +
        "\n\nFecha: " +
        fecha
    );
}
//-----------------------//
//--|editar_contraseña|--//
//-----------------------//
function editarContrasena(
    id,
    usuario,
    correo,
    contrasena,
    categoria,
    fecha
){
    let nuevoUsuario =
        prompt(
            "Editar usuario:",
            usuario
        );
    if(
        nuevoUsuario === null
    ){
        return;
    }
    let nuevoCorreo =
        prompt(
            "Editar correo:",
            correo
        );
    if(
        nuevoCorreo === null
    ){
        return;
    }
    let nuevaContrasena =
        prompt(
            "Editar contraseña:",
            contrasena
        );
    if(
        nuevaContrasena === null
    ){
        return;
    }
    let nuevaFecha =
        prompt(
            "Editar fecha:",
            fecha
        );
    if(
        nuevaFecha === null
    ){
        return;
    }
    const datos =
        new FormData();
    datos.append(
        "accion",
        "editar"
    );
    datos.append(
        "id",
        id
    );
    datos.append(
        "usuario",
        nuevoUsuario
    );
    datos.append(
        "correo",
        nuevoCorreo
    );
    datos.append(
        "contrasena",
        nuevaContrasena
    );
    datos.append(
        "fecha",
        nuevaFecha
    );
    fetch(
        "bloc_de_contrasenas.php",
        {
            method: "POST",
            body: datos
        }
    )
    .then(
        function(respuesta){
            console.log(
                "Estado HTTP:",
                respuesta.status
            );
            return respuesta.json();
        }
    )
    .then(
        function(datos){
            console.log(
                "Respuesta editar:",
                datos
            );
            if(
                datos.estado === true
            ){
                alert(
                    datos.mensaje
                );
                mostrarContrasenas();
            }
            else{
                alert(
                    datos.mensaje
                );
            }
        }
    )
    .catch(
        function(error){
            console.error(
                "Error al editar:",
                error
            );
            alert(
                "Error al actualizar la contraseña"
            );
        }
    );
}
//-------------------------//
//--|eliminar_contraseña|--//
//-------------------------//
function eliminarContrasena(
    id
){
    let confirmar =
        confirm(
            "¿Deseas eliminar esta contraseña?"
        );
    if(
        !confirmar
    ){
        return;
    }
    const datos =
        new FormData();
    datos.append(
        "accion",
        "eliminar"
    );
    datos.append(
        "id",
        id
    );
    fetch(
        "bloc_de_contrasenas.php",
        {
            method: "POST",
            body: datos
        }
    )
    .then(
        function(respuesta){
            console.log(
                "Estado HTTP:",
                respuesta.status
            );
            return respuesta.json();
        }
    )
    .then(
        function(datos){
            console.log(
                "Respuesta eliminar:",
                datos
            );
            if(
                datos.estado === true
            ){
                alert(
                    datos.mensaje
                );
                mostrarContrasenas();
            }
            else{
                alert(
                    datos.mensaje
                );
            }
        }
    )
    .catch(
        function(error){
            console.error(
                "Error al eliminar:",
                error
            );
            alert(
                "Error al eliminar la contraseña"
            );
        }
    );
}
//----------------------------------//
//--|eventos_de_la_celda_acciones|--//
//----------------------------------//
cuerpoTabla.addEventListener(
    "click",
    function(evento){
        let elemento =
            evento.target;
        let id =
            elemento.dataset.id;
        //------------------//
        //--|vista_previa|--//
        //------------------//
        if(
            elemento.classList.contains(
                "btn_vista_previa"
            )
        ){
            vistaPreviaContrasena(
                elemento.dataset.usuario,
                elemento.dataset.correo,
                elemento.dataset.contrasena,
                elemento.dataset.categoria,
                elemento.dataset.fecha
            );
        }
        //------------//
        //--|editar|--//
        //------------//
        if(
            elemento.classList.contains(
                "btn_editar"
            )
        ){
            editarContrasena(
                id,
                elemento.dataset.usuario,
                elemento.dataset.correo,
                elemento.dataset.contrasena,
                elemento.dataset.categoria,
                elemento.dataset.fecha
            );
        }
        //--------------//
        //--|eliminar|--//
        //--------------//
        if(
            elemento.classList.contains(
                "btn_eliminar"
            )
        ){
            eliminarContrasena(
                id
            );
        }
    }
);
document.addEventListener(
    "DOMContentLoaded",
    function(){
        mostrarContrasenas();
    }
);