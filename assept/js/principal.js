import panaderia from "./panaderia.js";
// Función para actualizar la lista según la búsqueda
function actualizarListaBusqueda(busquedaUsuario) {
  const contenedor = document.getElementById("listado-productos");
  let contenidoHtml = "";
  panaderia.tipos.forEach((tipo) => {
    // Filtra los tipos que tienen un título que coincide con lo que se busca
    if (tipo.nombre.toLowerCase().includes(busquedaUsuario.toLowerCase())) {
      contenidoHtml += `<article>
        <h4>${tipo.nombre}</h4>
        <ol>
          ${tipo.productos
            .filter((producto) => producto.nombre.toLowerCase().includes(busquedaUsuario.toLowerCase()))
            .map((producto) => `<li>${producto.nombre}</li>`).join("")}
        </ol>
      </article>`;
    } else {
      // Si no coincide con el título, busca en los nombres de los productos
      const productosCoincidentes = tipo.productos
        .filter((producto) => producto.nombre.toLowerCase().includes(busquedaUsuario.toLowerCase()));
      // Si hay productos que coinciden, muestra el tipo y los productos
      if (productosCoincidentes.length > 0) {
        contenidoHtml += `<article>
          <h4>${tipo.nombre}</h4>
          <ol>
            ${productosCoincidentes.map((producto) => `<li>${producto.nombre}</li>`).join("")}
          </ol>
        </article>`;
      }
    }
  });
  contenedor.innerHTML = contenidoHtml;
}
// Maneja el evento de cambio en el cuadro de texto de búsqueda
document.getElementById("buscarProducto").addEventListener("input", function (event) {
  const terminoBusqueda = event.target.value.trim();
  actualizarListaBusqueda(terminoBusqueda);
});
// Inicializa la lista con todos los productos al cargar la página
actualizarListaBusqueda("");