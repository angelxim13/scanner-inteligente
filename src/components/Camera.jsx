import { useEffect, useRef } from "react"
import * as cocoSsd from "@tensorflow-models/coco-ssd"
import "@tensorflow/tfjs"

function Camera({ onDetect }) {

  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const modelRef = useRef(null)
  const streamRef = useRef(null)
  const animationRef = useRef(null)
  const detectedRef = useRef(false)

  const startCamera = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true })
    videoRef.current.srcObject = stream
    streamRef.current = stream
  }

  const stopCamera = () => {
    // 🔥 detener animación
    cancelAnimationFrame(animationRef.current)

    // 🔥 apagar cámara
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop())
    }
  }

  const loadModel = async () => {
    modelRef.current = await cocoSsd.load()
  }

  const drawBoxes = (predictions) => {
    const ctx = canvasRef.current.getContext("2d")
    ctx.clearRect(0, 0, 300, 220)

    predictions.forEach(pred => {
      const [x, y, width, height] = pred.bbox

      ctx.strokeStyle = "#00e5ff"
      ctx.lineWidth = 3
      ctx.strokeRect(x, y, width, height)

      ctx.fillStyle = "#00e5ff"
      ctx.font = "14px Arial"
      ctx.fillText(
        `${pred.class} (${Math.round(pred.score * 100)}%)`,
        x,
        y > 10 ? y - 5 : 10
      )
    })
  }

  const detectObjects = async () => {
    if (
      modelRef.current &&
      videoRef.current &&
      videoRef.current.readyState === 4
    ) {
      const predictions = await modelRef.current.detect(videoRef.current)

      drawBoxes(predictions)

      if (!detectedRef.current && predictions.length > 0) {
        detectedRef.current = true

        stopCamera() // 🔥 ahora sí es inmediato

        onDetect(predictions[0].class)
        return // 🔥 corta ejecución
      }
    }

    animationRef.current = requestAnimationFrame(detectObjects)
  }

  useEffect(() => {
    startCamera()
    loadModel().then(() => detectObjects())
  }, [])

  return (
    <div style={{ position: "relative" }}>
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
