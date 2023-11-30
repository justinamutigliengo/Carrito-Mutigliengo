const productos = [
  { id: 1, nombre: "Teclado Logitech", precio: 55.500 },
  { id: 2, nombre: "Monitor Samsung", precio: 125.250 },
  { id: 3, nombre: "Parlantes Thonet & Vander", precio: 435.925 },
  { id: 4, nombre: "Mouse Gamer Logitech", precio: 33.425 },
  { id: 5, nombre: "Disco duro", precio: 57.120 }
];

for (const producto of productos) {
  let contenedor = document.createElement("div");
  contenedor.innerHTML = `<h3>${producto.id}</h3>
                          <p>${producto.nombre}</p>
                          <b>$ ${producto.precio}</b>
                          <button onclick="agregarAlCarrito(${producto.id})">Agregar al carrito</button>`;
  document.body.appendChild(contenedor);
}

const carrito = [];

function agregarAlCarrito(productoId) {
  const productoEncontrado = productos.find(producto => producto.id === productoId);
  
  if (productoEncontrado) {
     carrito.push(productoEncontrado);
     console.log(`Producto "${productoEncontrado.nombre}" agregado al carrito.`);
     mostrarCarrito();
  } else {
    console.log('Producto no encontrado.');
  }
}

function mostrarCarrito() {
  console.log('Carrito de Compras:');
  carrito.forEach(producto => {
    console.log(`- ${producto.nombre} - $${producto.precio}`);
  });

  const total = carrito.reduce((sum, producto) => sum + producto.precio, 0);
  console.log(`Total: $${total.toFixed(2)}`);
}

function buscarProductoPorNombre(nombre) {
  const productosEncontrados = productos.filter(producto =>
    producto.nombre.toLowerCase().includes(nombre.toLowerCase())
  );
  
  if (productosEncontrados.length > 0) {
    console.log(`Productos encontrados con el nombre "${nombre}":`);
    productosEncontrados.forEach(producto => {
      console.log(`- ${producto.nombre} - $${producto.precio}`);
    });
  } else {
    console.log(`No se encontraron productos con el nombre "${nombre}".`);
  }
}

