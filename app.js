

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

/**FUNCION PARA HACER EL PEDIDO*/
/**=========================== */
function hacerPedido() {
    
    /**PARTE DE LA LOGICA DE LA SELECCION DE LAS MESAS Y SU MENU*/
    let mesa;

    do{

        let mesaSeleccionada = prompt(
            "Ingrese el numero de mesa (1-4): \n" +
            "5. Salir."
        );

        mesa = parseInt(mesaSeleccionada);

        if (mesa > 5 || mesa < 1 || isNaN(mesa)) {
            alert("Ingrese una opcion valida.");
        }

        if (mesa === 5) {
            return;
        }

    } while (isNaN(mesa) || mesa < 1 || mesa > 4);


    /**PARTE DE LA LOGICA DE LA SELECCION DEL MENU DE COMIDA*/
    let menuTexto = "MENU DE COMIDA\n" + 
                    "=============\n";
        menu.forEach((m, i) => {
        menuTexto += `${i + 1}. ${m.nombre} - ${m.precio} - ${m.tiempo}min \n`;
    });

    menuTexto += "5. Salir.\n";
    let comidaSeleccionada;

    do{

        let comidaEscoger = prompt(menuTexto + "\nIngrese lo que disfrutara:");
        comidaSeleccionada = parseInt(comidaEscoger) - 1;

        if ((comidaSeleccionada + 1) === 5) {
            return;
        }

        if (isNaN(comidaSeleccionada) || !menu[comidaSeleccionada]) {
            alert("Ingrese una opcion valida.");
        }

    } while (isNaN(comidaSeleccionada) || !menu[comidaSeleccionada]);

    /**PARTE DE LA CANTIDAD A SELECCIONAR DE LA COMIDA QUE SE ESCOGIO */
    let cantidad;

    do{

        let cantidadIngresada = prompt(
            "-Ingrese (-5) si quiere ir al menu principal\n" +
            "Ingrese la cantidad: " 
        );
        cantidad = parseInt(cantidadIngresada);

        if (cantidad === -5) {
            return;
        }

        if (isNaN(cantidad) || cantidad <= 0) {
            alert("Ingrese una cantidad valida (1 en adelante).");
        }


    } while (isNaN(cantidad) || cantidad <= 0);

    let pedido = {
        nombre: menu[comidaSeleccionada].nombre,
        cantidad: cantidad,
        precio: menu[comidaSeleccionada].precio,
        tiempo: menu[comidaSeleccionada].tiempo,
    };

    mesas[mesa - 1].push(pedido);

    /**AQUI EN ESTA PARTE LLAMAMOS LA FUNCION DE CALCULARTIEMPO */
    let tiempoTotal = calcularTiempo(mesa - 1);

    alert(
        "Pedido registrado:\n" +
        `${pedido.cantidad} x ${pedido.nombre}\n` +
        `Tiempo total estimado: ${tiempoTotal} min`
    );
    
}


/**FUNCION PARA CALCULAR TIEMPO QUE SE DEMORA EL PEDIDO*/
/**====================================================*/
function calcularTiempo(mesaIdx) {

    let total = 0;

    mesas[mesaIdx].forEach(p => {
        total += p.tiempo;
    });

    return total;

}