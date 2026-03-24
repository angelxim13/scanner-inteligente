function InfoPanel({ objeto }) {

  const info = {
    "cell phone": {
      nombre: "Teléfono",
      descripcion: "Dispositivo móvil inteligente",
      partes: ["Pantalla", "Cámara", "Batería"]
    },
    "person": {
      nombre: "Persona",
      descripcion: "Ser humano detectado",
      partes: ["Cabeza", "Brazos", "Piernas"]
    },
    "laptop": {
      nombre: "Laptop",
      descripcion: "Computadora portátil",
      partes: ["Pantalla", "Teclado", "Trackpad"]
    },
    "bottle": {
      nombre: "Botella",
      descripcion: "Recipiente para líquidos",
      partes: ["Tapa", "Cuerpo"]
    },
    "chair": {
      nombre: "Silla",
      descripcion: "Objeto para sentarse",
      partes: ["Respaldo", "Patas"]
    },
    "book": {
      nombre: "Libro",
      descripcion: "Objeto con información escrita",
      partes: ["Portada", "Páginas"]
    }
  }

  const data = info[objeto]

  if (!data) {
    return <p>Objeto detectado: {objeto}</p>
  }

  return (
    <div>
      <h2>{data.nombre}</h2>
      <p>{data.descripcion}</p>

      <h3>Partes:</h3>
      <ul>
        {data.partes.map((p, i) => (
          <li key={i}>{p}</li>
        ))}
      </ul>
    </div>
  )
}

export default InfoPanel
