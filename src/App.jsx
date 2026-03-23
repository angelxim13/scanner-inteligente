import { useState } from "react"
import Navbar from "./components/Navbar"
import Camera from "./components/Camera"
import ModelViewer from "./components/ModelViewer"
import InfoPanel from "./components/InfoPanel"
import "./App.css"

function App() {

  const [objetoDetectado, setObjetoDetectado] = useState(null)
  const [parteSeleccionada, setParteSeleccionada] = useState(null)

  // cuando detecta algo nuevo, reinicia la parte
  const manejarDeteccion = (objeto) => {
    setObjetoDetectado(objeto)
    setParteSeleccionada(null)
  }

  return (
    <div>
      <Navbar />

      <div style={{ padding: "20px" }}>
        <h1>Escáner Inteligente</h1>

        {/* Mensaje dinámico */}
        {objetoDetectado && (
          <p style={{ textAlign: "center", fontSize: "18px" }}>
            Objeto detectado: <strong>{objetoDetectado}</strong>
          </p>
        )}

        {/* Cámara */}
        <Camera onDetect={manejarDeteccion} />

        <div className="container">

          {/* Modelo 3D */}
          <div className="viewer">
            <ModelViewer 
              objeto={objetoDetectado}
              onSelect={setParteSeleccionada}
            />
          </div>

          {/* Información */}
          <div className="panel">
            <InfoPanel 
              objeto={objetoDetectado}
              parte={parteSeleccionada}
            />
          </div>

        </div>

        {/* Footer simple */}
        <p style={{ textAlign: "center", marginTop: "20px", opacity: 0.7 }}>
          Proyecto de reconocimiento con IA 🚀
        </p>
      </div>
    </div>
  )
}

export default App
