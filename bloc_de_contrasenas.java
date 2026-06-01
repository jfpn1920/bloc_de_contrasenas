import java.util.ArrayList;
import java.util.HashMap;
import java.util.Scanner;
public class bloc_de_contrasenas {
    public static void main(String[] args) {
        Scanner entrada = new Scanner(System.in);
        ArrayList<HashMap<String, String>> contrasenas = new ArrayList<>();
        while (true) {
            //-------------------------------------------//
            //--|menu_principal_de_bloc_de_contrasenas|--//
            //-------------------------------------------//
            System.out.println("-------------------------------------------");
            System.out.println("--|Menu principal de bloc de contraseñas|--");
            System.out.println("-------------------------------------------");
            System.out.println("1. Agregar contraseña");
            System.out.println("2. Mostrar contraseñas");
            System.out.println("3. Editar contraseña");
            System.out.println("4. Eliminar contraseña");
            System.out.println("5. Salir");
            System.out.println("===================================");
            System.out.print("Seleccione una opción: ");
            int opcion = Integer.parseInt(entrada.nextLine());
            //------------------------//
            //--|agregar_contrasena|--//
            //------------------------//
            if (opcion == 1) {
                System.out.print("Nombre de usuario: ");
                String usuario = entrada.nextLine();
                System.out.print("Correo: ");
                String correo = entrada.nextLine();
                System.out.print("Contraseña: ");
                String contrasena = entrada.nextLine();
                System.out.println("\nCategorías:");
                System.out.println("1. Redes sociales");
                System.out.println("2. Correo electrónico");
                System.out.println("3. Bancos");
                System.out.println("4. Trabajo");
                System.out.println("5. Juegos");
                System.out.print("Seleccione una categoría: ");
                String categoria = entrada.nextLine();
                System.out.print("Fecha de creación: ");
                String fechaCreacion = entrada.nextLine();
                HashMap<String, String> registro = new HashMap<>();
                registro.put("usuario", usuario);
                registro.put("correo", correo);
                registro.put("contrasena", contrasena);
                registro.put("categoria", categoria);
                registro.put("fecha_creacion", fechaCreacion);
                registro.put("fecha_modificacion", "Sin modificar");
                contrasenas.add(registro);
                System.out.println("\nRegistro guardado correctamente.");
            }
            //-------------------------//
            //--|mostrar_contrasenas|--//
            //-------------------------//
            else if (opcion == 2) {
                if (contrasenas.size() == 0) {
                    System.out.println("\nNo hay registros.");
                } else {
                    for (int i = 0; i < contrasenas.size(); i++) {
                        HashMap<String, String> registro = contrasenas.get(i);
                        System.out.println("\n----------------------------");
                        System.out.println("Registro #" + (i + 1));
                        System.out.println("Usuario: " + registro.get("usuario"));
                        System.out.println("Correo: " + registro.get("correo"));
                        System.out.println("Contraseña: " + registro.get("contrasena"));
                        System.out.println("Categoría: " + registro.get("categoria"));
                        System.out.println("Fecha creación: " + registro.get("fecha_creacion"));
                        System.out.println("Fecha modificación: " + registro.get("fecha_modificacion"));
                    }
                }
            }
            //-----------------------//
            //--|editar_contrasena|--//
            //-----------------------//
            else if (opcion == 3) {
                if (contrasenas.size() == 0) {
                    System.out.println("\nNo hay registros para editar.");
                } else {
                    System.out.print("Número de registro a editar: ");
                    int posicion = Integer.parseInt(entrada.nextLine());
                    if (posicion >= 1 && posicion <= contrasenas.size()) {
                        HashMap<String, String> registro =
                                contrasenas.get(posicion - 1);
                        System.out.print("Nuevo usuario: ");
                        registro.put("usuario", entrada.nextLine());
                        System.out.print("Nuevo correo: ");
                        registro.put("correo", entrada.nextLine());
                        System.out.print("Nueva contraseña: ");
                        registro.put("contrasena", entrada.nextLine());
                        System.out.print("Nueva categoría: ");
                        registro.put("categoria", entrada.nextLine());
                        System.out.print("Fecha de modificación: ");
                        registro.put(
                                "fecha_modificacion",
                                entrada.nextLine()
                        );
                        System.out.println("\nRegistro actualizado.");
                    } else {
                        System.out.println("\nRegistro no encontrado.");
                    }
                }
            }
            //-------------------------//
            //--|eliminar_contrasena|--//
            //-------------------------//
            else if (opcion == 4) {
                if (contrasenas.size() == 0) {
                    System.out.println("\nNo hay registros para eliminar.");
                } else {
                    System.out.print(
                            "Número de registro a eliminar: "
                    );
                    int eliminar =
                            Integer.parseInt(entrada.nextLine());
                    if (eliminar >= 1 &&
                            eliminar <= contrasenas.size()) {
                        contrasenas.remove(eliminar - 1);
                        System.out.println(
                                "\nRegistro eliminado."
                        );
                    } else {
                        System.out.println(
                                "\nRegistro no encontrado."
                        );
                    }
                }
            }
            //------------------------------//
            //--|salir_del_menu_principal|--//
            //------------------------------//
            else if (opcion == 5) {
                System.out.println(
                        "\nSaliendo del sistema..."
                );
                break;
            }
            else {
                System.out.println(
                        "\nOpción inválida."
                );
            }
            System.out.println(
                    "\nPresione ENTER para continuar..."
            );
            entrada.nextLine();
        }
        entrada.close();
    }
}