//---------------------------------------//
//--|funcionalidad_bloc_de_contraseñas|--//
//---------------------------------------//
const formulario =
    document.querySelector("form");
formulario.addEventListener(
    "submit",
    function(evento){
        evento.preventDefault();
        const usuario =
            document.querySelector(
                'input[type="text"]'
            ).value;
        const correo =
            document.querySelector(
                'input[type="email"]'
            ).value;
        const contrasena =
            document.querySelector(
                'input[type="password"]'
            ).value;
        const categoria =
            document.querySelector(
                "select"
            ).value;
        const fecha =
            document.querySelector(
                'input[type="date"]'
            ).value;
        if(
            usuario === "" &&
            correo === "" &&
            contrasena === "" &&
            categoria === "Ninguna categoría..." &&
            fecha === ""
        ){
            alert(
                "No hay ninguna contraseña guardado"
            );
        }
        else{
            let contrasenas =
                JSON.parse(
                    localStorage.getItem(
                        "contrasenas"
                    )
                ) || [];
            const registro = {
                usuario: usuario,
                correo: correo,
                contrasena: contrasena,
                categoria: categoria,
                fecha: fecha
            };
            contrasenas.push(
                registro
            );
            localStorage.setItem(
                "contrasenas",
                JSON.stringify(
                    contrasenas
                )
            );
            if(
                typeof mostrarContrasenas ===
                "function"
            ){
                mostrarContrasenas();
            }
            alert(
                "Has guardado la contraseña correctamente"
            );
            formulario.reset();
        }
    }
);
//---------------------------------------------//
//--|funcionalidad_contadores_de_contraseñas|--//
//---------------------------------------------//
function actualizarContadores(contrasenas){
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
    let contrasenas =
        JSON.parse(
            localStorage.getItem(
                "contrasenas"
            )
        ) || [];
    actualizarContadores(
        contrasenas
    );
    cuerpoTabla.innerHTML = "";
    if(contrasenas.length === 0){
        cuerpoTabla.innerHTML = `
            <tr>
                <td
                    colspan="7"
                    class="sin_registros"
                >
                    Ningun contraseña añadido en el tablero
                </td>
            </tr>
        `;
        return;
    }
    contrasenas.forEach(
        function(registro, indice){
            cuerpoTabla.innerHTML += `
                <tr>
                    <td>
                        ${indice + 1}
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
                        ${registro.fecha}
                    </td>
                    <td>
                        <i
                            class="
                                fa-solid
                                fa-eye
                                btn_vista_previa
                            "
                            data-indice="${indice}"
                            title="Vista previa"
                        ></i>
                        <i
                            class="
                                fa-solid
                                fa-pen-to-square
                                btn_editar
                            "
                            data-indice="${indice}"
                            title="Editar"
                        ></i>
                        <i
                            class="
                                fa-solid
                                fa-trash
                                btn_eliminar
                            "
                            data-indice="${indice}"
                            title="Eliminar"
                        ></i>
                    </td>
                </tr>
            `;
        }
    );
}
//---------------------------------//
//--|vista_previa_de_contraseñas|--//
//---------------------------------//
function vistaPreviaContrasena(indice){
    let contrasenas =
        JSON.parse(
            localStorage.getItem(
                "contrasenas"
            )
        ) || [];
    let registro =
        contrasenas[indice];
    alert(
        "Usuario: " +
        registro.usuario +
        "\n\nCorreo: " +
        registro.correo +
        "\n\nContraseña: " +
        registro.contrasena +
        "\n\nCategoría: " +
        registro.categoria +
        "\n\nFecha: " +
        registro.fecha
    );
}
//-----------------------//
//--|editar_contraseña|--//
//-----------------------//
function editarContrasena(indice){
    let contrasenas =
        JSON.parse(
            localStorage.getItem(
                "contrasenas"
            )
        ) || [];
    let registro =
        contrasenas[indice];
    let nuevoUsuario =
        prompt(
            "Editar usuario:",
            registro.usuario
        );
    if(
        nuevoUsuario === null
    ){
        return;
    }
    let nuevoCorreo =
        prompt(
            "Editar correo:",
            registro.correo
        );
    if(
        nuevoCorreo === null
    ){
        return;
    }
    let nuevaContrasena =
        prompt(
            "Editar contraseña:",
            registro.contrasena
        );
    if(
        nuevaContrasena === null
    ){
        return;
    }
    let nuevaFecha =
        prompt(
            "Editar fecha:",
            registro.fecha
        );
    if(
        nuevaFecha === null
    ){
        return;
    }
    contrasenas[indice] = {
        usuario:
            nuevoUsuario,
        correo:
            nuevoCorreo,
        contrasena:
            nuevaContrasena,
        categoria:
            registro.categoria,
        fecha:
            nuevaFecha
    };
    localStorage.setItem(
        "contrasenas",
        JSON.stringify(
            contrasenas
        )
    );
    mostrarContrasenas();
}
//-------------------------//
//--|eliminar_contraseña|--//
//-------------------------//
function eliminarContrasena(indice){
    let confirmar =
        confirm(
            "¿Deseas eliminar esta contraseña?"
        );
    if(
        !confirmar
    ){
        return;
    }
    let contrasenas =
        JSON.parse(
            localStorage.getItem(
                "contrasenas"
            )
        ) || [];
    contrasenas.splice(
        indice,
        1
    );
    localStorage.setItem(
        "contrasenas",
        JSON.stringify(
            contrasenas
        )
    );
    mostrarContrasenas();
}
//----------------------------------//
//--|eventos_de_la celda_acciones|--//
//----------------------------------//
cuerpoTabla.addEventListener(
    "click",
    function(evento){
        let indice =
            evento.target.dataset.indice;
        if(
            evento.target.classList.contains(
                "btn_vista_previa"
            )
        ){
            vistaPreviaContrasena(
                indice
            );
        }
        if(
            evento.target.classList.contains(
                "btn_editar"
            )
        ){
            editarContrasena(
                indice
            );
        }
        if(
            evento.target.classList.contains(
                "btn_eliminar"
            )
        ){
            eliminarContrasena(
                indice
            );
        }
    }
);
mostrarContrasenas();