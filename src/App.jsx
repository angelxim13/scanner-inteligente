import { useState } from "react"
import Navbar from "./components/Navbar"
import Camera from "./components/Camera"
import ModelViewer from "./components/ModelViewer"
import InfoPanel from "./components/InfoPanel"
import "./App.css"

function App() {

  const [objetoDetectado, setObjetoDetectado] = useState(null)
  const [parteSeleccionada, setParteSeleccionada] = useState(null)

  const manejarDeteccion = (objeto) => {
    setObjetoDetectado(objeto)
    setParteSeleccionada(null)
  }

  return (
    <div className="app">
      <Navbar />

      <div className="main">
        <h1>Escáner Inteligente</h1>

        {/* IMAGEN */}
        <img 
          src="https://cdn-icons-png.flaticon.com/512/1042/1042339.png"
          alt="Escaner"
          className="scanner-img"
        />

        {/* Mensaje dinámico */}
        {objetoDetectado && (
          <p className="detected-text">
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

        {/* Footer */}
        <p className="footer">
          Proyecto de reconocimiento con IA 🚀
        </p>
      </div>
    </div>
  )
}

export default App
