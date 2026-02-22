let usuarioCorrecto = "pepe2015";
let contraseñaCorrecta = "2214";
let saldo = 2000;

const btnIniciar = document.getElementById("btn-iniciar");
const divInfo = document.getElementById("info-usuario");
const menuProductos = document.getElementById("menu-productos");
const mensaje = document.getElementById("mensaje-bienvenida");
const btnSalir = document.getElementById("btn-salir");
const galeria = document.getElementById("galeria-productos");


const inputProducto = document.getElementById("input-producto");
const btnComprarInput = document.getElementById("btn-comprar-input");

btnIniciar.addEventListener("click", () => {
    if (usuLog()) {
        iniciarTienda();
    }
});


btnComprarInput.addEventListener("click", () => {
    const seleccion = inputProducto.value.toLowerCase().trim();
    
    if (seleccion === "remeras" || seleccion === "remera") {
        ejecutarCompra("Remera", 500);
    } else if (seleccion === "pantalones" || seleccion === "pantalon") {
        ejecutarCompra("Pantalon", 1000);
    } else if (seleccion === "calzado") {
        ejecutarCompra("Calzado", 1500);
    } else {
        alert("Producto no encontrado. Intenta con: Remeras, Pantalones o Calzado.");
    }
    
    inputProducto.value = ""; 
});

function usuLog() {
    let usuario = prompt("Ingrese su usuario");
    let contraseña = prompt("Ingrese su contraseña");
    
    for (let i = 2; i > 0; i--) {
        if (usuarioCorrecto == usuario && contraseñaCorrecta == contraseña) {
            alert("Bienvenido");
            return true;
        } else {
            alert("Usuario o contraseña incorrecto, te quedan " + i + " intentos");
            usuario = prompt("Ingrese su usuario");
            contraseña = prompt("Ingrese su contraseña");
        }
    }
    return false;
}

function iniciarTienda() {
    btnIniciar.style.display = "none";
    menuProductos.style.display = "block";
    if (galeria) {
        galeria.style.display = "grid";
    }
    mensaje.innerText = "Selecciona una categoría";
    actualizarPantallaSaldo();
}

function actualizarPantallaSaldo() {
    divInfo.innerHTML = `<h3>Tu saldo actual: $${saldo}</h3>`;
}

function ejecutarCompra(nombre, precio) {
    if (saldo >= precio) {
        saldo -= precio;
        alert(`Compraste ${nombre}. Se descontaron $${precio}`);
        actualizarPantallaSaldo(); 
    } else {
        alert("Saldo insuficiente");
    }
}

btnSalir.addEventListener("click", () => {
    alert("Saldo final: $" + saldo + ". ¡Hasta pronto!");
    window.location.href = "https://www.google.com";
});

if (galeria) {
    galeria.addEventListener("click", (e) => {
        const card = e.target.closest(".producto");
        if (!card) return;
        const nombre = card.dataset.nombre;
        const precio = parseInt(card.dataset.precio, 10);

        if (e.target.classList.contains("btn-seleccionar")) {
            const preset = card.dataset.input || nombre.toLowerCase();
            inputProducto.value = preset;
            inputProducto.focus();
        } else if (e.target.tagName === "IMG") {
            ejecutarCompra(nombre, precio);
        }
    });
}
