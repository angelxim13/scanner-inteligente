import { useEffect, useRef } from "react"
import * as cocoSsd from "@tensorflow-models/coco-ssd"
import "@tensorflow/tfjs"

function Camera({ onDetect }) {

  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const modelRef = useRef(null)

  // Activar cámara
  const startCamera = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true })
    videoRef.current.srcObject = stream
  }

  // Cargar modelo
  const loadModel = async () => {
    modelRef.current = await cocoSsd.load()
    console.log("Modelo IA cargado")
  }

  // Dibujar cuadros
  const drawBoxes = (predictions) => {
    const ctx = canvasRef.current.getContext("2d")

    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)

    predictions.forEach(pred => {
      const [x, y, width, height] = pred.bbox

      // Cuadro
      ctx.strokeStyle = "#00e5ff"
      ctx.lineWidth = 3
      ctx.strokeRect(x, y, width, height)

      // Texto
      ctx.fillStyle = "#00e5ff"
      ctx.font = "16px Arial"
      ctx.fillText(
        `${pred.class} (${Math.round(pred.score * 100)}%)`,
        x,
        y > 10 ? y - 5 : 10
      )
    })
  }

  // Detectar objetos
  const detectObjects = async () => {
    if (
      modelRef.current &&
      videoRef.current &&
      videoRef.current.readyState === 4
    ) {
      const predictions = await modelRef.current.detect(videoRef.current)

      // 🔥 Enviar el objeto principal al App
      if (predictions.length > 0) {
        onDetect(predictions[0].class)
      }

      drawBoxes(predictions)
    }

    requestAnimationFrame(detectObjects)
  }

  useEffect(() => {
    startCamera()
    loadModel()
  }, [])

  useEffect(() => {
    detectObjects()
  }, [])

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      
      <video
        ref={videoRef}
        autoPlay
        playsInline
        width="300"
        height="220"
        style={{ borderRadius: "15px" }}
      />

      <canvas
        ref={canvasRef}
        width="300"
        height="220"
        style={{
          position: "absolute",
          top: 0,
          left: 0
        }}
      />

    </div>
  )
}

export default Camera
