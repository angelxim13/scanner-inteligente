import { useEffect, useRef } from "react"
import * as cocoSsd from "@tensorflow-models/coco-ssd"
import "@tensorflow/tfjs"

function Camera({ onDetect }) {

  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const modelRef = useRef(null)
  const detectedRef = useRef(false) // 🔥 evita múltiples detecciones

  const startCamera = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true })
    videoRef.current.srcObject = stream
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

      // 🔥 SOLO DETECTA UNA VEZ
      if (!detectedRef.current && predictions.length > 0) {
        detectedRef.current = true
        onDetect(predictions[0].class)
      }
    }

    requestAnimationFrame(detectObjects)
  }

  useEffect(() => {
    startCamera()
    loadModel()
    detectObjects()
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
