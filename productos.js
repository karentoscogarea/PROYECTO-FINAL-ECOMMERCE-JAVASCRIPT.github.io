const contenedorProductos = document.querySelector('#contenedor-productos');
let botonesComprar = document.querySelectorAll('.btn-comprar');
// const numerito = document.querySelectorAll('#numerito');

function cargarProductos(){
    productosEnCarritoLS.foreach(producto => {
        const div = document.createElement('div');
        div.classList.add('producto');
        div.innerHTML = `
        <div class="product-card">
        <div class="icons">
            <a href="./index.html"><i class='bx bx-left-arrow-circle'></i></a>
            <a href="./carrito.html"><i class='bx bx-right-arrow-circle'></i></a>
        </div>
        <div class="product-content">
            <div class="product-txt">
                <span>$${producto.precio}</span>
                <h3>${producto.titulo}</h3>
                <p>${producto.descripcion}</p>
            </div>
            <div class="product-img">
                <img src="${producto.imagen}" alt="">
            </div>
            </div>
            <button class="btn-comprar" id="${producto.id}">Comprar<i class='bx bxs-shopping-bag'></i></button>
        </div>
        `
        contenedorProductos.append(div);
    })
    actualizarBotonesComprar();
}

function actualizarBotonesComprar(){
    botonesComprar = document.querySelectorAll('.btn-comprar');

    botonesComprar.foreach(boton => {
        boton.addEventListener('click', agregarAlCarrito);
    });
}

let productosEnCarrito;

let productosEnCarritoLS = localStorage.getItem('productos-en-carrito');

if(productosEnCarritoLS){
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    // actualizarNumerito();
}else{
    productosEnCarrito = [];
}

function agregarAlCarrito(){
    const idBoton = e.currentTarget.id;
    const productoAgregado = producto.find(producto => producto.id === idBoton);

    if(productosEnCarrito.some(producto => producto.id === idBoton)){
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    }else{
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }

    // actualizarNumerito();
    localStorage.setItem('productos-en-carrito', JSON.stringify(productosEnCarrito));
}

// function actualizarNumerito(){
//     let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
//     numerito.innerText = nuevoNumerito;
// }