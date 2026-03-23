import { useEffect, useRef, useState } from "react"
import * as cocoSsd from "@tensorflow-models/coco-ssd"
import "@tensorflow/tfjs"

export default function Camera({ onDetect }) {
  const videoRef = useRef(null)
  const [modelo, setModelo] = useState(null)
  const [mensaje, setMensaje] = useState("Cargando modelo IA...")

  const activarCamara = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      videoRef.current.srcObject = stream
      setMensaje("Cámara activada")
    } catch (error) {
      setMensaje("Error al activar la cámara")
    }
  }

  useEffect(() => {
    cocoSsd.load().then(model => {
      setModelo(model)
      setMensaje("Modelo listo, activa la cámara")
    })
  }, [])

  const analizar = async () => {
    if (!modelo || !videoRef.current) {
      setMensaje("Modelo o cámara no listos")
      return
    }

    const predicciones = await modelo.detect(videoRef.current)

    if (predicciones.length > 0) {
      const objeto = predicciones[0].class
      setMensaje("Detectado: " + objeto)
      onDetect(objeto)
    } else {
      setMensaje("No se detectó nada")
      onDetect(null)
    }
  }

  return (
    <div style={{ textAlign: "center", marginBottom: "20px" }}>
      <video
        ref={videoRef}
        autoPlay
        width="300"
        style={{
          borderRadius: "15px",
          boxShadow: "0 6px 15px rgba(0,0,0,0.5)"
        }}
      />

      <br />

      <button onClick={activarCamara}>Activar cámara</button>
      <button onClick={analizar}>Analizar objeto</button>

      <p>{mensaje}</p>
    </div>
  )
}
