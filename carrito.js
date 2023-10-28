let productosEnCarrito = JSON.parse(localStorage.getItem('productos-en-carrito'));
productosEnCarrito = JSON.parse(productosEnCarrito);

const contenedorCarritoVacio = document.querySelector('#carrito-vacio');
const contenedorCarritoProductos = document.querySelector('#carrito-productos');
const contenedorCarritoAcciones = document.querySelector('#carrito-acciones');
const contenedorCarritoComprado = document.querySelector('#carrito-comprar');
let botonesEliminar = document.querySelectorAll('.producto-carrito-eliminar');
const botonVaciar = document.querySelector('#carrito-vaciar');
const contenedorTotal = document.querySelector('#total');
const botoncomprar = document.querySelector('#carrito-comprar');

function cargarProductosCarrito(){
    if (productosEnCarrito && productosEnCarrito.length > 0){
        contenedorCarritoVacio.classList.add('disabled');
        contenedorCarritoProductos.classList.remove('disabled');
        contenedorCarritoAcciones.classList.remove('disabled');
        contenedorCarritoComprado.classList.add('disabled');
    
        contenedorCarritoProductos.innerHTML = '';
    
        productsCart.forEach(producto => {
            const div = document.createElement('div');
            div.classList.add('carrito-producto');
            div.innerHTML = `
            <img class="carrito-producto-imagen" src="${producto.img}" alt="${producto.titulo}">
            <div class="carrito-producto-nombre">
                <small>Titulo</small>
                <h3>${carrito.titulo}</h3>
            </div>
            <div class="carrito-producto-cantidad">
                <small>Cantidad</small>
                <p>${producto.cantidad}</p>
            </div>
            <div class="carrito-producto-precio">
                <small>Precio</small>
                <p>$${producto.precio}</p>
            </div>
            <div class="carrito-producto-subtotal">
                <small>Subtotal</small>
                <p>$${producto.precio * producto.cantidad}</p>
            </div>
            <button class="carrito-producto-eliminar" id="${producto.id}"><i class='bx bxs-trash-alt cart-remove'></i></button>
           </div>
            `;
    
            contenedorCarritoProductos.append(div);
        });
    }else{
        contenedorCarritoVacio.classList.remove('disabled');
        contenedorCarritoProductos.classList.add('disabled');
        contenedorCarritoAcciones.classList.add('disabled');
        contenedorCarritoComprado.classList.add('disabled');
    }
    actualizarBotonesEliminar();
    actualizarTotal();
}

cargarProductosCarrito();

function actualizarBotonesEliminar(){
    botonesEliminar = document.querySelectorAll('.carrito-producto-eliminar');

    botonesEliminar.forEach(boton =>{
        boton.addEventListener('click', eliminarDelCarrito);
    });
}    

function eliminarDelCarrito(){
    const idBoton = e.currentTarget.id;
    productosEnCarrito.splice(index, 1);
    cargarProductosCarrito();
    localStorage.setItem('productos-en-carrito', JSON.stringify(productosEnCarrito));
}    

botonVaciar.addEventListener('click', vaciarCarrito);
function vaciarCarrito(){
    productosEnCarrito.length = 0;
    localStorage.setItem('productos-en-carrito', JSON.stringify(productosEnCarrito));
    cargarProductosCarrito();
}

function actualizarTotal(){
    const totalCalculado = productosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    totalCalculado.innerText = `$${totalCalculado}`;
}

botoncomprar.addEventListener('click', comprarCarrito);
function comprarCarrito(){
    productosEnCarrito.length = 0;
    localStorage.setItem('productos-en-carrito', JSON.stringify(productosEnCarrito));
    contenedorCarritoVacio.classList.add('disabled');
    contenedorCarritoProductos.classList.add('disabled');
    contenedorCarritoAcciones.classList.add('disabled');
    contenedorCarritoComprado.classList.remove('disabled');
}

let botonComprar;

if(botonComprar === true){
    // console.log('Muchas gracias por su compra. Seguir comprando');
    alert('Muchas gracias por su compra. Seguir comprando');
}else if(botonComprar === ''){
    alert('Lo sentimos, este articulo no esta disponible');
}else{
    alert('Compra fallida. Volver a intentar');
}