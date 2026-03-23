import { useEffect, useRef, useState } from "react"
import * as cocoSsd from "@tensorflow-models/coco-ssd"
import "@tensorflow/tfjs"

export default function Camera({ onDetect }) {
  const videoRef = useRef(null)
  const [modelo, setModelo] = useState(null)
  const [mensaje, setMensaje] = useState("Cargando modelo IA...")

  // Activar cámara
  const activarCamara = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      videoRef.current.srcObject = stream
      setMensaje("Cámara activada")
    } catch (error) {
      setMensaje("Error al activar la cámara")
      console.error(error)
    }
  }

  // Cargar modelo IA
  useEffect(() => {
    cocoSsd.load().then(model => {
      setModelo(model)
      setMensaje("Modelo listo, activa la cámara")
      console.log("Modelo cargado")
    })
  }, [])

  // Analizar objeto
  const analizar = async () => {
    if (!modelo || !videoRef.current) {
      setMensaje("Modelo o cámara no listos")
      return
    }

    const predicciones = await modelo.detect(videoRef.current)

    if (predicciones.length > 0) {
      const objeto = predicciones[0].class
      setMensaje("Detectado: " + objeto)

      onDetect(objeto) // enviar al App
    } else {
      setMensaje("No se detectó nada")
      onDetect(null)
    }
  }

  return (
    <div>
      <video
        ref={videoRef}
        autoPlay
        width="300"
        style={{ borderRadius: "10px" }}
      />

      <br />

      <button onClick={activarCamara}>Activar cámara</button>
      <button onClick={analizar}>Analizar objeto</button>

      <p>{mensaje}</p>
    </div>
  )
}