Option Strict On
Imports System
Imports System.Collections.Generic
Module bloc_de_contrasenas
    Sub Main(args As String())
        Dim contrasenas As New List(Of Dictionary(Of String, String))
        While True
            '-------------------------------------------'
            '--|menu_principal_de_bloc_de_contrasenas|--'
            '-------------------------------------------'
            Console.Clear()
            Console.WriteLine("-------------------------------------------")
            Console.WriteLine("--|Menu principal de bloc de contraseñas|--")
            Console.WriteLine("-------------------------------------------")
            Console.WriteLine("1. Agregar contraseña")
            Console.WriteLine("2. Mostrar contraseñas")
            Console.WriteLine("3. Editar contraseña")
            Console.WriteLine("4. Eliminar contraseña")
            Console.WriteLine("5. Salir")
            Console.WriteLine("===================================")
            Console.Write("Seleccione una opción: ")
            Dim opcion As Integer =
                Convert.ToInt32(Console.ReadLine())
            '------------------------'
            '--|agregar_contrasena|--'
            '------------------------'
            If opcion = 1 Then
                Console.Write("Nombre de usuario: ")
                Dim usuario As String = Console.ReadLine()
                Console.Write("Correo: ")
                Dim correo As String = Console.ReadLine()
                Console.Write("Contraseña: ")
                Dim contrasena As String = Console.ReadLine()
                Console.WriteLine()
                Console.WriteLine("Categorías:")
                Console.WriteLine("1. Redes sociales")
                Console.WriteLine("2. Correo electrónico")
                Console.WriteLine("3. Bancos")
                Console.WriteLine("4. Trabajo")
                Console.WriteLine("5. Juegos")
                Console.Write("Seleccione una categoría: ")
                Dim categoria As String =
                    Console.ReadLine()
                Console.Write("Fecha de creación: ")
                Dim fechaCreacion As String =
                    Console.ReadLine()
                Dim registro As New Dictionary(Of String, String)
                registro("usuario") = usuario
                registro("correo") = correo
                registro("contrasena") = contrasena
                registro("categoria") = categoria
                registro("fecha_creacion") = fechaCreacion
                registro("fecha_modificacion") = "Sin modificar"
                contrasenas.Add(registro)
                Console.WriteLine()
                Console.WriteLine(
                    "Registro guardado correctamente."
                )
                '-------------------------'
                '--|mostrar_contrasenas|--'
                '-------------------------'
            ElseIf opcion = 2 Then
                If contrasenas.Count = 0 Then
                    Console.WriteLine()
                    Console.WriteLine(
                        "No hay registros."
                    )
                Else
                    For i As Integer = 0 To contrasenas.Count - 1
                        Dim registro As Dictionary(Of String, String) =
                            contrasenas(i)
                        Console.WriteLine()
                        Console.WriteLine(
                            "----------------------------"
                        )
                        Console.WriteLine(
                            "Registro #" & (i + 1)
                        )
                        Console.WriteLine(
                            "Usuario: " &
                            registro("usuario")
                        )
                        Console.WriteLine(
                            "Correo: " &
                            registro("correo")
                        )
                        Console.WriteLine(
                            "Contraseña: " &
                            registro("contrasena")
                        )
                        Console.WriteLine(
                            "Categoría: " &
                            registro("categoria")
                        )
                        Console.WriteLine(
                            "Fecha creación: " &
                            registro("fecha_creacion")
                        )
                        Console.WriteLine(
                            "Fecha modificación: " &
                            registro("fecha_modificacion")
                        )
                    Next
                End If
                '-----------------------'
                '--|editar_contrasena|--'
                '-----------------------'
            ElseIf opcion = 3 Then
                If contrasenas.Count = 0 Then
                    Console.WriteLine()
                    Console.WriteLine(
                        "No hay registros para editar."
                    )
                Else
                    Console.Write(
                        "Número de registro a editar: "
                    )
                    Dim posicion As Integer =
                        Convert.ToInt32(
                            Console.ReadLine()
                        )
                    If posicion >= 1 And
                       posicion <= contrasenas.Count Then
                        Dim registro As Dictionary(Of String, String) =
                            contrasenas(posicion - 1)
                        Console.Write(
                            "Nuevo usuario: "
                        )
                        registro("usuario") =
                            Console.ReadLine()
                        Console.Write(
                            "Nuevo correo: "
                        )
                        registro("correo") =
                            Console.ReadLine()
                        Console.Write(
                            "Nueva contraseña: "
                        )
                        registro("contrasena") =
                            Console.ReadLine()
                        Console.Write(
                            "Nueva categoría: "
                        )
                        registro("categoria") =
                            Console.ReadLine()
                        Console.Write(
                            "Fecha de modificación: "
                        )
                        registro("fecha_modificacion") =
                            Console.ReadLine()
                        Console.WriteLine()
                        Console.WriteLine(
                            "Registro actualizado."
                        )
                    Else
                        Console.WriteLine()
                        Console.WriteLine(
                            "Registro no encontrado."
                        )
                    End If
                End If
                '-------------------------'
                '--|eliminar_contrasena|--'
                '-------------------------'
            ElseIf opcion = 4 Then
                If contrasenas.Count = 0 Then
                    Console.WriteLine()
                    Console.WriteLine(
                        "No hay registros para eliminar."
                    )
                Else
                    Console.Write(
                        "Número de registro a eliminar: "
                    )
                    Dim eliminar As Integer =
                        Convert.ToInt32(
                            Console.ReadLine()
                        )
                    If eliminar >= 1 And
                       eliminar <= contrasenas.Count Then
                        contrasenas.RemoveAt(
                            eliminar - 1
                        )
                        Console.WriteLine()
                        Console.WriteLine(
                            "Registro eliminado."
                        )
                    Else
                        Console.WriteLine()
                        Console.WriteLine(
                            "Registro no encontrado."
                        )
                    End If
                End If
                '------------------------------'
                '--|salir_del_menu_principal|--'
                '------------------------------'
            ElseIf opcion = 5 Then
                Console.WriteLine()
                Console.WriteLine(
                    "Saliendo del sistema..."
                )
                Exit While
            Else
                Console.WriteLine()
                Console.WriteLine(
                    "Opción inválida."
                )
            End If
            Console.WriteLine()
            Console.WriteLine(
                "Presione ENTER para continuar..."
            )
            Console.ReadLine()
        End While
    End Sub
End Module