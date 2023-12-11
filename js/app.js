let carrito = [];

const productos = [
  {
    id: 1,
    nombre: "Teclado Logitech",
    precio: 55500,
    img: "../images/teclado.webp",
  },
  {
    id: 2,
    nombre: "Monitor Samsung",
    precio: 125250,
    img: "../images/monitor.webp",
  },
  {
    id: 3,
    nombre: "Parlantes Thonet & Vander",
    precio: 435920,
    img: "../images/parlantes.webp",
  },
  {
    id: 4,
    nombre: "Mouse Gamer Logitech",
    precio: 33420,
    img: "../images/mouse.webp",
  },
  {
    id: 5,
    nombre: "Disco sólido",
    precio: 38120,
    img: "../images/discosolido.webp",
  },
];

for (const producto of productos) {
  let contenedor = document.createElement("div");

  contenedor.innerHTML = `<p>${producto.nombre}</p>
  <img src="${producto.img}" alt="${producto.nombre}" class="img-fluid">
                          <b>$ ${producto.precio}</b>
                          <button onclick="agregarAlCarrito(${producto.id})">Agregar al carrito</button>`;
  document.body.appendChild(contenedor);
}

function agregarAlCarrito(productoId) {
  const productoEncontrado = productos.find(
    (producto) => producto.id === productoId
  );

  if (productoEncontrado) {
    carrito.push(productoEncontrado);
    console.log(`Producto "${productoEncontrado.nombre}" agregado al carrito.`);
    mostrarCarrito();
  } else {
    console.log("Producto no encontrado.");
  }
}

function mostrarCarrito() {
  console.log("Carrito de Compras:");
  carrito.forEach((producto) => {
    console.log(`- ${producto.nombre} - $${producto.precio}`);
  });

  const total = carrito.reduce((sum, producto) => sum + producto.precio, 0);
  console.log(`Total: $${total.toFixed(2)}`);
}

function buscarProductoPorNombre(nombre) {
  const productosEncontrados = productos.filter((producto) =>
    producto.nombre.toLowerCase().includes(nombre.toLowerCase())
  );

  if (productosEncontrados.length > 0) {
    console.log(`Productos encontrados con el nombre "${nombre}":`);
    productosEncontrados.forEach((producto) => {
      console.log(`- ${producto.nombre} - $${producto.precio}`);
    });
  } else {
    console.log(`No se encontraron productos con el nombre "${nombre}".`);
  }
}

function filtrarProductos() {
  const textoBusqueda = document
    .getElementById("buscadorProducto")
    .value.toLowerCase();
  const productosFiltrados = productos.filter((productos) =>
    producto.nombre.toLowerCase().includes(textoBusqueda)
  );
  mostrarProductos(productosFiltrados);
}

document
  .getElementById("buscadorProducto")
  .addEventListener("input", filtrarProductos);

function mostrarModalCarrito() {
  const modal = document.getElementById("modalCarrito");
  const contenidoCarrito = document.getElementById("contenidoCarrito");
  const totalCarrito = document.getElementById("totalCarrito");

  contenidoCarrito.innerHTML = "";

  carrito.forEach((producto, index) => {
    const productoDiv = document.createElement("div");
    productoDiv.innerHTML = `${producto.nombre} - $${producto.precio} 
      <button onclick="eliminarDelCarrito(${index})">Eliminar</button>`;
    contenidoCarrito.appendChild(productoDiv);
  });

  const total = carrito.reduce((sum, producto) => sum + producto.precio, 0);
  totalCarrito.textContent = `Total: $${total.toFixed(2)}`;

  modal.style.display = "block";
}

function cerrarModalCarrito() {
  const modal = document.getElementById("modalCarrito");
  modal.style.display = "none";
}

window.addEventListener("click", (event) => {
  const modal = document.getElementById("modalCarrito");
  if (event.target === modal) {
    cerrarModalCarrito();
  }
});

function guardarCarritoLocalStorage() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

agregarAlCarrito();

mostrarCarrito();

buscarProductoPorNombre();

filtrarProductos();

mostrarModalCarrito();

cerrarModalCarrito();

guardarCarritoLocalStorage();
