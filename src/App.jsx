import { useState } from "react"
import { motion } from "framer-motion"
import Navbar from "./components/Navbar"
import Camera from "./components/Camera"
import ModelViewer from "./components/ModelViewer"
import InfoPanel from "./components/InfoPanel"
import "./App.css"

function App() {

  const [pantalla, setPantalla] = useState("inicio")
  const [objetoDetectado, setObjetoDetectado] = useState(null)
  const [parteSeleccionada, setParteSeleccionada] = useState(null)

  // 🔊 VOZ IA
  const hablar = (texto) => {
    const speech = new SpeechSynthesisUtterance(texto)
    speech.lang = "es-ES"
    speech.rate = 1
    speechSynthesis.speak(speech)
  }

  const manejarDeteccion = (objeto) => {
    setObjetoDetectado(objeto)
    hablar(`Objeto detectado: ${objeto}`)
    setPantalla("resultado")
  }

  const reiniciar = () => {
    setObjetoDetectado(null)
    setParteSeleccionada(null)
    setPantalla("inicio")
  }

  return (
    <div className="app">
      <Navbar irInicio={reiniciar} />

      <div className="main">

        {/* INICIO */}
        {pantalla === "inicio" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h1>Escáner Inteligente</h1>

            <img 
              src="https://cdn-icons-png.flaticon.com/512/1042/1042339.png"
              className="scanner-img"
            />

            <button onClick={() => setPantalla("escanear")}>
              Escanear objeto 📷
            </button>
          </motion.div>
        )}

        {/* ESCANEO */}
        {pantalla === "escanear" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h1>Escaneando...</h1>

            <Camera onDetect={manejarDeteccion} />

            <button onClick={reiniciar}>
              Regresar ⬅️
            </button>
          </motion.div>
        )}

        {/* RESULTADO */}
        {pantalla === "resultado" && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1>Resultado</h1>

            <p className="detected-text">
              Objeto detectado: <strong>{objetoDetectado}</strong>
            </p>

            <div className="container">

              <div className="viewer">
                <ModelViewer objeto={objetoDetectado} />
              </div>

              <div className="panel">
                <InfoPanel objeto={objetoDetectado} />
              </div>

            </div>

            <button onClick={reiniciar}>
              Escanear otro 🔄
            </button>
          </motion.div>
        )}

      </div>
    </div>
  )
}

export default App
