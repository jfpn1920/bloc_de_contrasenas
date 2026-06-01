Algoritmo bloc_de_contrasenas
	Definir opcion Como Entero
    Definir cantidad Como Entero
	cantidad <- 0
    Dimension usuario[100]
    Dimension correo[100]
    Dimension contrasena[100]
    Dimension categoria[100]
    Dimension fecha_creacion[100]
    Dimension fecha_modificacion[100]
	//----------------------------------------#
	//--|menu_principal_de_bloc_contrasenas|--#
	//----------------------------------------#
	Repetir
        Limpiar Pantalla
        Escribir "==================================="
        Escribir "      BLOC DE CONTRASEÑAS"
        Escribir "==================================="
        Escribir "1. Agregar contraseña"
        Escribir "2. Mostrar contraseñas"
        Escribir "3. Editar contraseña"
        Escribir "4. Eliminar contraseña"
        Escribir "5. Salir"
        Escribir "==================================="
        Escribir "Seleccione una opción:"
        Leer opcion
        Segun opcion Hacer
			//------------------------#
			//--|agregar_contrasena|--#
			//------------------------#
            1:
                cantidad <- cantidad + 1
                Escribir "Nombre de usuario:"
                Leer usuario[cantidad]
                Escribir "Correo:"
                Leer correo[cantidad]
                Escribir "Contraseña:"
                Leer contrasena[cantidad]
                Escribir "Categoría:"
                Escribir "1. Redes sociales"
                Escribir "2. Correo electrónico"
                Escribir "3. Bancos"
                Escribir "4. Trabajo"
                Escribir "5. Juegos"
                Leer categoria[cantidad]
                Escribir "Fecha de creación:"
                Leer fecha_creacion[cantidad]
                fecha_modificacion[cantidad] <- "Sin modificar"
                Escribir "Registro guardado correctamente"
			//-------------------------#
			//--|mostrar_contrasenas|--#
			//-------------------------#
            2:
                Si cantidad = 0 Entonces
                    Escribir "No hay registros"
                SiNo
                    Para i <- 1 Hasta cantidad Con Paso 1
                        Escribir "----------------------------"
                        Escribir "Registro #", i
                        Escribir "Usuario: ", usuario[i]
                        Escribir "Correo: ", correo[i]
                        Escribir "Contraseña: ", contrasena[i]
                        Escribir "Categoría: ", categoria[i]
                        Escribir "Fecha creación: ", fecha_creacion[i]
                        Escribir "Fecha modificación: ", fecha_modificacion[i]
                    FinPara
                FinSi
			//-----------------------#
			//--|editar_contrasena|--#
			//-----------------------#
            3:
                Definir posicion Como Entero
                Escribir "Número de registro a editar:"
                Leer posicion
                Si posicion >= 1 Y posicion <= cantidad Entonces
                    Escribir "Nuevo usuario:"
                    Leer usuario[posicion]
                    Escribir "Nuevo correo:"
                    Leer correo[posicion]
                    Escribir "Nueva contraseña:"
                    Leer contrasena[posicion]
                    Escribir "Nueva categoría:"
                    Leer categoria[posicion]
                    Escribir "Fecha de modificación:"
                    Leer fecha_modificacion[posicion]
                    Escribir "Registro actualizado"
                SiNo
                    Escribir "Registro no encontrado"
                FinSi
			//-------------------------#
			//--|eliminar_contrasena|--#
			//-------------------------#
            4:
                Definir eliminar Como Entero
                Escribir "Número de registro a eliminar:"
                Leer eliminar
                Si eliminar >= 1 Y eliminar <= cantidad Entonces
                    Para i <- eliminar Hasta cantidad - 1 Con Paso 1
                        usuario[i] <- usuario[i + 1]
                        correo[i] <- correo[i + 1]
                        contrasena[i] <- contrasena[i + 1]
                        categoria[i] <- categoria[i + 1]
                        fecha_creacion[i] <- fecha_creacion[i + 1]
                        fecha_modificacion[i] <- fecha_modificacion[i + 1]
                    FinPara
                    cantidad <- cantidad - 1
                    Escribir "Registro eliminado"
                SiNo
                    Escribir "Registro no encontrado"
                FinSi
			//------------------------------#
			//--|salir_del_menu_principal|--#
			//------------------------------#
            5:
                Escribir "Saliendo del sistema..."
            De Otro Modo:
                Escribir "Opción inválida"
        FinSegun
        Si opcion <> 5 Entonces
            Escribir ""
            Escribir "Presione una tecla para continuar..."
            Esperar Tecla
        FinSi
    Hasta Que opcion = 5
FinAlgoritmo