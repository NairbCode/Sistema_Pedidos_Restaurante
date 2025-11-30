

/**VARIABLES QUE SON ARRAYS Y OBJETOS QUE SE NECESITARAN PARA ALGUNAS FUNCIONES */
/**ESTA ARRAY CON OBJETOS DENTRO SERVIRA PARA LAS COMIDAD QUE HAY DISPONIBLES */
let menu = [
    {nombre: "Hamburguesa", precio: 15000, tiempo: 10},
    {nombre: "Gaseosa", precio: 3000, tiempo: 1},
    {nombre: "Papas fritas", precio: 6000, tiempo: 8}
];

/**ESTA ARRAY EN PARA LAS MESAS */
let mesas = [[], [], [], []]


/**FUNCION PRINCIPAL INICIAR EL SISTEMA */
/**=================================== */
function iniciarSistema() {
    let opciones;

    /**DO WHILE POR SI ESCRIBE ALGO DE LO CONTRARIO QUE SE MUESTRA*/
    do{

        /**EL PROMPT CON LAS OPCIONES */
        opciones = prompt(
            "BIENVENIDO AL MENU PRINCIPAL\n" +
            "======================\n" +
            "1. Hacer un pedido.\n" +
            "2. Ver estado de preparacion.\n" +
            "3. Pagar la cuenta.\n" +
            "4. Modo administrador.\n" +
            "5. Salir.\n\n" +
            "Seleccione una opcion: "
        );

        /**DIFERENTES OPCIONES, DEPENDIENDO LO QUE INGRESE EL USUARIO*/
        switch (opciones) {
            case "1":
                hacerPedido();
                break;
            case "2":
                verEstado();
                break;
            case "3":
                pagarCuenta();
                break;
            case "4":
                modoAdmin();
                break;
            case "5":
                alert("Saliendo del sistema...");
                break;
            default:
                alert("Por favor ingrese una opcion valida.");
        }

    } while (opciones !== "5");

}

//////////////////////////////////////////////////////////////////////////////////////////
//  SECCIÓN 1 SANTRIAGO: VALIDACIÓN DE CLAVE

// Contraseña de acceso


// Crear el mensaje de error
const mensajeError = document.createElement("p");
mensajeError.textContent = "❌ Clave incorrecta ❌";
mensajeError.style.color = "red";
mensajeError.style.display = "none";
document.querySelector("main").appendChild(mensajeError);



    // Función para verificar la clave
    function modoAdmin() {
    const claveIngresada = inputClave.value;
    const CLAVE_CORRECTA = "1234";

    // Seleccionamos elementos del HTML
    const inputClave = document.querySelector('input[type="password"]');
    const boton = document.querySelector('button');

    if (claveIngresada === CLAVE_CORRECTA) {
        alert("✅ Acceso concedido ✅");
        mensajeError.style.display = "none";
        modoAdmin(); // Entrar al modo administrador
    } else {
        mensajeError.style.display = "block";
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////
//  SECCIÓN 3 Santiago : MODO ADMINISTRADOR


function modoAdmin() {
    let opcion;
    do {
        opcion = prompt(
        " MODO ADMINISTRADOR\n" +
        "1. Agregar producto\n" +
        "2. Modificar producto\n" +
        "3. Eliminar producto\n" +
        "4. Salir"
    );

    switch (opcion) {
        case "1":
            agregarProducto();
            break;
        case "2":
            modificarProducto();
            break;
        case "3":
            eliminarProducto();
            break;
        case "4":
            alert(" Saliendo del modo administrador.");
            break;
        default:
            alert(" Opción inválida. Intente de nuevo.");
        }
    } while (opcion !== "4");
}

