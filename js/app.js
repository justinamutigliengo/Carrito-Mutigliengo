const productos = [
    { id: 1, nombre: "Teclado Logitech", precio: 55.000 },
    { id: 2, nombre: "Monitor Samsung", precio: 125.000 },
    { id: 3, nombre: "Parlantes Thonet & Vander", precio: 435.925 },
    { id: 4, nombre: "Mouse Gamer Logitech", precio: 33.425 },
    { id: 5, nombre: "Disco duro", precio: 57.120 }
  ];
   
const carrito = [];
   
function agregarAlCarrito(productoId) {
  const productoEncontrado = productos.find(producto => producto.id === productoId);
  
  if (productoEncontrado) {
     carrito.push(productoEncontrado);
     console.log(`Producto "${productoEncontrado.nombre}" agregado al carrito.`);
  } else {
    console.log('Producto no encontrado.');
  }
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
  
