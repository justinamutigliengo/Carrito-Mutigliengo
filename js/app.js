let carrito = [];

for (const producto of productos) {
  let contenedor = document.createElement("div");

  contenedor.innerHTML = `<p>${producto.nombre}</p>
                          <img src="${producto.img}" alt="${producto.nombre}" class="img-fluid">
                          <b>$ ${producto.precio}</b>
                          <button onclick="agregarAlCarrito(${producto.id})">Agregar al carrito</button>`;
  document.body.appendChild(contenedor);
}

Swal.fire({
  title: "15% OFF",
  text: "Suscribite a nuestro newsletter y recibí un 15% OFF en tu próxima compra",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Confirmar",
  width: 400,
  height: 200,
  customClass: {
    container: "mi-alerta",
  },
}).then((result) => {
  if (result.isConfirmed) {
    Swal.fire("Deleted!", "Your file has been deleted.", "success");
  }
});

async function cargarProductos() {
  try {
    const respuesta = await fetch("productos.json");
    const productos = await respuesta.json();
    return productos;
  } catch (error) {
    console.error("Error al cargar productos:", error);
    return [];
  }
}

function agregarAlCarrito(idProducto) {
  const productos = JSON.parse(localStorage.getItem("carrito")) || [];
  const productoEncontrado = productos.find(
    (producto) => producto.id === idProducto
  );

  try {
    if (productoEncontrado) {
      productoEncontrado.cantidad++;
    } else {
      const producto = productos.find((producto) => producto.id === idProducto);
      productos.push({ id: idProducto, cantidad: 1 });
    }

    localStorage.setItem("carrito", JSON.stringify(productos));
    actualizarCarrito();
  } finally {
    console.log("Se ejecutó el finally");
  }
}

function actualizarCarrito() {
  const productosCarrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const contenedorCarrito = document.getElementById("carrito");
  contenedorCarrito.innerHTML = "";

  const itemsCarrito = productosCarrito.map((producto) => {
    return `
      <li>
        ${producto.nombre} x ${producto.cantidad} - $${
      producto.precio * producto.cantidad
    }
        <button onclick="eliminarDelCarrito(${producto.id})">Eliminar</button>
      </li>
    `;
  });

  contenedorCarrito.innerHTML = itemsCarrito.join("");
}

function eliminarDelCarrito(idProducto) {
  const productos = JSON.parse(localStorage.getItem("carrito")) || [];
  const productosFiltrados = productos.filter(
    (producto) => producto.id !== idProducto
  );
  try {
    localStorage.setItem("carrito", JSON.stringify(productosFiltrados));
    actualizarCarrito();
  } finally {
    console.log("Se ejecutó el finally");
  }
}

function vaciarCarrito() {
  try {
    localStorage.removeItem("carrito");
    actualizarCarrito();
  } finally {
    console.log("Se ejecutó el finally");
  }
}

cargarProductos()
  .then((productos) => {
    const contenedorProductos = document.getElementById("productos");
    productos.forEach((producto) => {
      const productoElement = document.createElement("div");
      productoElement.innerHTML = `
        <h3>${producto.nombre}</h3>
        <img src="${producto.imagen}" alt="${producto.nombre}">
        <p>$${producto.precio}</p>
        <button onclick="agregarAlCarrito(${producto.id})">Agregar al carrito</button>
      `;
      contenedorProductos.appendChild(productoElement);
    });
  })
  .catch((error) => console.error(error));

actualizarCarrito();

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
