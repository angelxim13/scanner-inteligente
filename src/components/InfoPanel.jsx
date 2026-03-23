export default function InfoPanel({ objeto, parte }) {

  if (!objeto) return <p>No se ha detectado ningún objeto</p>

  // 🖱️ Mouse
  if (objeto === "mouse") {
    const info = {
      "Cuerpo": "Parte principal del mouse."
    }

    if (!parte) return <p>Selecciona una parte del mouse</p>

    return (
      <>
        <h2>{parte}</h2>
        <p>{info[parte]}</p>
      </>
    )
  }

  // 📱 Celular
  if (objeto === "cell phone") {
    const info = {
      "Pantalla": "Muestra la información.",
      "Botón": "Permite interactuar."
    }

    if (!parte) return <p>Selecciona una parte del celular</p>

    return (
      <>
        <h2>{parte}</h2>
        <p>{info[parte]}</p>
      </>
    )
  }

  // 💻 Laptop
  if (objeto === "laptop") {
    const info = {
      "Pantalla": "Muestra la imagen.",
      "Teclado": "Permite escribir."
    }

    if (!parte) return <p>Selecciona una parte de la laptop</p>

    return (
      <>
        <h2>{parte}</h2>
        <p>{info[parte]}</p>
      </>
    )
  }

  return <p>Objeto detectado: {objeto}</p>
}