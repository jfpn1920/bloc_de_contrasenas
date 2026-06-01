contrasenas = []
while True:
    print("-------------------------------------------")
    print("--|Menu principla de bloc de contraseñas|--")
    print("-------------------------------------------")
    print("1. Agregar contraseña")
    print("2. Mostrar contraseñas")
    print("3. Editar contraseña")
    print("4. Eliminar contraseña")
    print("5. Salir")
    print("===================================")
    opcion = int(input("Seleccione una opción: "))
    #------------------------#
    #--|agregar_contrasena|--#
    #------------------------#
    if opcion == 1:
        usuario = input("Nombre de usuario: ")
        correo = input("Correo: ")
        contrasena = input("Contraseña: ")
        print("\nCategorías:")
        print("1. Redes sociales")
        print("2. Correo electrónico")
        print("3. Bancos")
        print("4. Trabajo")
        print("5. Juegos")
        categoria = input("Seleccione una categoría: ")
        fecha_creacion = input("Fecha de creación: ")
        registro = {
            "usuario": usuario,
            "correo": correo,
            "contrasena": contrasena,
            "categoria": categoria,
            "fecha_creacion": fecha_creacion,
            "fecha_modificacion": "Sin modificar"
        }
        contrasenas.append(registro)
        print("\nRegistro guardado correctamente.")
    #-------------------------#
    #--|mostrar_contrasenas|--#
    #-------------------------#
    elif opcion == 2:
        if len(contrasenas) == 0:
            print("\nNo hay registros.")
        else:
            for i, registro in enumerate(contrasenas, start=1):
                print("\n----------------------------")
                print("Registro #", i)
                print("Usuario:", registro["usuario"])
                print("Correo:", registro["correo"])
                print("Contraseña:", registro["contrasena"])
                print("Categoría:", registro["categoria"])
                print("Fecha creación:", registro["fecha_creacion"])
                print("Fecha modificación:", registro["fecha_modificacion"])
    #-----------------------#
    #--|editar_contrasena|--#
    #-----------------------#
    elif opcion == 3:
        if len(contrasenas) == 0:
            print("\nNo hay registros para editar.")
        else:
            posicion = int(input("Número de registro a editar: "))
            if 1 <= posicion <= len(contrasenas):
                registro = contrasenas[posicion - 1]
                registro["usuario"] = input("Nuevo usuario: ")
                registro["correo"] = input("Nuevo correo: ")
                registro["contrasena"] = input("Nueva contraseña: ")
                registro["categoria"] = input("Nueva categoría: ")
                registro["fecha_modificacion"] = input("Fecha de modificación: ")
                print("\nRegistro actualizado.")
            else:
                print("\nRegistro no encontrado.")
    #-------------------------#
    #--|eliminar_contrasena|--#
    #-------------------------#
    elif opcion == 4:
        if len(contrasenas) == 0:
            print("\nNo hay registros para eliminar.")
        else:
            eliminar = int(input("Número de registro a eliminar: "))
            if 1 <= eliminar <= len(contrasenas):
                contrasenas.pop(eliminar - 1)
                print("\nRegistro eliminado.")
            else:
                print("\nRegistro no encontrado.")
    #------------------------------#
    #--|salir_del_menu_principal|--#
    #------------------------------#
    elif opcion == 5:
        print("\nSaliendo del sistema...")
        break
    else:
        print("\nOpción inválida.")
    input("\nPresione ENTER para continuar...")