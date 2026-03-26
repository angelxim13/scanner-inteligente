function InfoPanel({ objeto }) {

  const info = {
    "cell phone": {
      descripcion: "Dispositivo portátil usado para comunicación, internet y aplicaciones.",
      partes: ["Pantalla", "Cámara", "Batería"]
    },
    "laptop": {
      descripcion: "Computadora portátil para trabajo, estudio y entretenimiento.",
      partes: ["Teclado", "Pantalla", "Procesador"]
    },
    "person": {
      descripcion: "Ser humano detectado por el sistema.",
      partes: ["Cabeza", "Torso", "Extremidades"]
    }
  }

  if (!objeto || !info[objeto]) {
    return <p>No hay información disponible</p>
  }

  return (
    <div>
      <h2>Información</h2>
      <p>{info[objeto].descripcion}</p>

      <h3>Partes:</h3>
      <ul>
        {info[objeto].partes.map((p, i) => (
          <li key={i}>{p}</li>
        ))}
      </ul>
    </div>
  )
}

export default InfoPanel
