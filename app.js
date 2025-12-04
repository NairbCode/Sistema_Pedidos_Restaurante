

/**VARIABLES QUE SON ARRAYS Y OBJETOS QUE SE NECESITARAN PARA ALGUNAS FUNCIONES */
/**ESTA ARRAY CON OBJETOS DENTRO SERVIRA PARA LAS COMIDAD QUE HAY DISPONIBLES */
let menu = [
    {nombre: "Hamburguesa", precio: 15000, tiempo: 10},
    {nombre: "Gaseosa", precio: 3000, tiempo: 1},
    {nombre: "Papas fritas", precio: 6000, tiempo: 8}
];

/**ESTA ARRAY EN PARA LAS MESAS */
let mesas = [
    {id: 1, pedido: []}, 
    {id: 2, pedido: []}, 
    {id: 3, pedido: []},
    {id: 4, pedido: []}
];


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
                validarContrasena();
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


    
    let seguirPidiendo;

    do {

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

        mesas[mesa - 1].pedido.push(pedido);

        /**AQUI EN ESTA PARTE LLAMAMOS LA FUNCION DE CALCULARTIEMPO */
        let tiempoTotal = calcularTiempo(mesa - 1);

        alert(
            "Pedido registrado:\n" +
            `${pedido.cantidad} x ${pedido.nombre}\n` +
            `Tiempo total estimado: ${tiempoTotal} min`
        );

        let elijaOpcionSeguirOrden = prompt( "Elija una opcion si desea algo mas: \n" +
                    "1. Si\n" +
                    "2. No"
            );

            seguirPidiendo = parseInt(elijaOpcionSeguirOrden);

            if (seguirPidiendo === 1) {
                seguirPidiendo = true;
            }

            if (seguirPidiendo === 2) {
                seguirPidiendo = false;
            }

    
    } while (seguirPidiendo === true);
    
}



/**FUNCION PARA CALCULAR TIEMPO QUE SE DEMORA EL PEDIDO*/
/**====================================================*/
function calcularTiempo(mesaIdx) {

    let total = 0;

    mesas[mesaIdx].pedido.forEach(p => {
        total += p.tiempo;
    });

    return total;

}

/**FUNCION PAFRA VER LOS ESTADOS DE LOS PEDIDOS DE LAS MESAS */
/**========================================================= */
function verEstado() {

    let textEstado = "ESTADOS DE PREPARACION\n" +
                    "==================\n";
    /**RECORRE LA ARRAY DE MESAS Y VERIFICA SI HAY ALGUNA ARRAY QUE ESTE LLENA O NO */
    mesas.forEach((mesa, i) => {
        if (mesa.pedido.length === 0) {

            textEstado += `Mesa ${i + 1}: Sin pedidos.\n`;

        } else {

            let tiempo = calcularTiempo(i);
            textEstado += `Mesa ${mesa.id}: ${tiempo} min Restantes.\n`;


            mesa.pedido.forEach(p => {
                let subtotal = p.cantidad * p.precio;
                textEstado += ` ${p.cantidad} x ${p.nombre} = $${subtotal}\n`;
            });

            textEstado += "\n";

        }
    });

    alert(textEstado);

}


/**FUNCION DE PAGAR CUENTA */
/**======================= */
function pagarCuenta() {

    /**AQUI ABAJO LE PIDE AL USUARIO CUAL ES LA MESA QUE QUIERE PAGAR*/
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

    let pedidos = mesas[mesa - 1].pedido;

    if (pedidos.length === 0) {
        alert("No hay cuenta pendiente.");
        return;
    }

    let textoPagarCuenta = "DETALLES DE LA CUENTA\n" +
                            "=================\n";
    let total = 0;

    /**RECORRE LA ARRAY DE PEDIDOS Y HACE EL SUDTOTAL Y TOTAL CON ELLO, MIRA LOS PRECIOS Y CANTIDAD*/
    pedidos.forEach(p => {
        let sudTotal = p.cantidad * p.precio;
        total += sudTotal;
        textoPagarCuenta += `${p.cantidad} x ${p.nombre} = $${sudTotal}\n`;
    })

    textoPagarCuenta += `\nTOTAL: $${total} `;

    let confirmar = confirm(textoPagarCuenta + "\nConfirmar pago: ");

    /**AQUI SE PONE LA CONDICION DE SI PAGA LA CUENTA O NO, EN CASO QUE SEA SI MUESTRA UN MENSAJE QUE FUE UN PAGO EXITOSO */
    if (confirmar === true) {
        mesas[mesa - 1].pedido = [];
        alert("Pago exitoso.");
    }

}
//////////////////////////////////////////////////////////////////////////////////////////
//  SECCIÓN 1 SANTRIAGO: VALIDACIÓN DE CLAVE

// Contraseña de acceso


/**FUNCION PARA VALIDAR CONTRASEÑA */
function validarContrasena() {
    const CLAVE_CORRECTA = "1234";
    const claveIngresada = prompt("Ingrese la clave de administrador:");

    if (claveIngresada === CLAVE_CORRECTA) {
        alert("Acceso permitido ");
        modoAdmin(); // solo se ejecuta si la clave es correcta
    } else {
        alert("Clave incorrecta ");
    }
}

/**FUNCION MODO ADMIN */
function modoAdmin() {
    alert("Modo Admin ACTIVADO");
    // Aquí colocas las funciones exclusivas del administrador
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



//////////////////////////////////////////////////////////////////////
//  fUNCION 3 SANTIUAGO: AGREGAR PRODUCTO

function agregarProducto() {
    const nombre = prompt(" Nombre del nuevo producto:");
    const precio = parseFloat(prompt(" Precio del producto:"));
    const tiempo = parseInt(prompt(" Tiempo de preparación (minutos):"));

    if (!nombre || isNaN(precio) || isNaN(tiempo)) {
        alert(" Datos inválidos. Intente de nuevo.");
        return;
    }

    menu.push({ nombre, precio, tiempo });
    alert(` Producto "${nombre}" agregado al menú.`);
    }

///////////////////////////////////////////////////////////////////////////////////////////
//  FUNCION 4: SANTIAGO MODIFICAR PRODUCTO


function modificarProducto() {
    if (menu.length === 0) {
        alert(" El menú está vacío.");
        return;
    }

    let lista = " Productos disponibles:\n";
    menu.forEach((prod, i) => {
        lista += `${i + 1}. ${prod.nombre} - $${prod.precio} - ${prod.tiempo} min\n`;
    });

    const index = parseInt(prompt(lista + "\nSeleccione el número del producto a modificar:")) - 1;

    if (isNaN(index) || index < 0 || index >= menu.length) {
        alert("Selección inválida.");
        return;
    }

    const nuevoPrecio = parseFloat(prompt("Nuevo precio:"));
    const nuevoTiempo = parseInt(prompt("Nuevo tiempo de preparación:"));

    if (isNaN(nuevoPrecio) || isNaN(nuevoTiempo)) {
        alert(" Datos inválidos.");
        return;
    }

    menu[index].precio = nuevoPrecio;
    menu[index].tiempo = nuevoTiempo;
    alert(` Producto "${menu[index].nombre}" actualizado.`);
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////
//  fUNCION 5 santiago: ELIMINAR PRODUCTO


function eliminarProducto() {
    if (menu.length === 0) {
        alert(" El menú está vacío.");
        return;
    }

    let lista = " Productos disponibles:\n";
    menu.forEach((prod, i) => {
        lista += `${i + 1}. ${prod.nombre}\n`;
    });

    const index = parseInt(prompt(lista + "\nSeleccione el número del producto a eliminar:")) - 1;

    if (isNaN(index) || index < 0 || index >= menu.length) {
        alert("❗ Selección inválida.");
        return;
    }

    const eliminado = menu.splice(index, 1);
    alert(` Producto "${eliminado[0].nombre}" eliminado del menú.`);
    }
