import { useState } from "react"
import Navbar from "./components/Navbar"
import Camera from "./components/Camera"
import ModelViewer from "./components/ModelViewer"
import InfoPanel from "./components/InfoPanel"
import "./App.css"

function App() {

  // Control de pantallas
  const [pantalla, setPantalla] = useState("inicio")

  // Datos detectados
  const [objetoDetectado, setObjetoDetectado] = useState(null)
  const [parteSeleccionada, setParteSeleccionada] = useState(null)

  // Cuando detecta algo
  const manejarDeteccion = (objeto) => {
    setObjetoDetectado(objeto)
    setPantalla("resultado") // cambia automáticamente
  }

  // Reiniciar todo
  const reiniciar = () => {
    setObjetoDetectado(null)
    setParteSeleccionada(null)
    setPantalla("inicio")
  }

  return (
    <div className="app">
      <Navbar irInicio={reiniciar} />

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

        {/* ===== PANTALLA ESCANEAR ===== */}
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

            {/* 🔥 AQUÍ YA SIEMPRE MUESTRA ALGO */}
            <p className="detected-text">
              Objeto detectado: <strong>{objetoDetectado || "Detectando..."}</strong>
            </p>

            <div className="container">

              {/* MODELO 3D */}
              <div className="viewer">
                <ModelViewer 
                  objeto={objetoDetectado}
                  onSelect={setParteSeleccionada}
                />
              </div>

              {/* INFORMACIÓN */}
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
