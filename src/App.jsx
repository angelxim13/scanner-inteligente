import { useState } from "react"
import Navbar from "./components/Navbar"
import Camera from "./components/Camera"
import ModelViewer from "./components/ModelViewer"
import InfoPanel from "./components/InfoPanel"
import "./App.css"

function App() {

  const [pantalla, setPantalla] = useState("inicio")
  const [objetoDetectado, setObjetoDetectado] = useState(null)
  const [parteSeleccionada, setParteSeleccionada] = useState(null)

  const manejarDeteccion = (objeto) => {
    setObjetoDetectado(objeto)
    setPantalla("resultado") // 🔥 cambia a resultado automáticamente
  }

  const reiniciar = () => {
    setObjetoDetectado(null)
    setParteSeleccionada(null)
    setPantalla("inicio")
  }

  return (
    <div className="app">
      <Navbar />

      <div className="main">

        {/* ===== PANTALLA INICIO ===== */}
        {pantalla === "inicio" && (
          <>
            <h1>Escáner Inteligente</h1>

            <img 
              src="https://cdn-icons-png.flaticon.com/512/1042/1042339.png"
              alt="Escaner"
              className="scanner-img"
            />

            <button onClick={() => setPantalla("escanear")}>
              Escanear objeto 📷
            </button>
          </>
        )}

        {/* ===== PANTALLA ESCANEO ===== */}
        {pantalla === "escanear" && (
          <>
            <h1>Escaneando...</h1>

            <Camera onDetect={manejarDeteccion} />

            <button onClick={reiniciar}>
              Regresar ⬅️
            </button>
          </>
        )}

        {/* ===== PANTALLA RESULTADO ===== */}
        {pantalla === "resultado" && (
          <>
            <h1>Resultado</h1>

            <p className="detected-text">
              Objeto detectado: <strong>{objetoDetectado}</strong>
            </p>

            <div className="container">

              <div className="viewer">
                <ModelViewer 
                  objeto={objetoDetectado}
                  onSelect={setParteSeleccionada}
                />
              </div>

              <div className="panel">
                <InfoPanel 
                  objeto={objetoDetectado}
                  parte={parteSeleccionada}
                />
              </div>

            </div>

            <button onClick={reiniciar}>
              Escanear otro 🔄
            </button>
          </>
        )}

      </div>
    </div>
  )
}

export default App
