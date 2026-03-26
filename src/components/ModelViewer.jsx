import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, useGLTF } from "@react-three/drei"
import { useRef } from "react"

function Modelo({ url }) {
  const { scene } = useGLTF(url)
  const ref = useRef()

  // 🔄 ROTACIÓN AUTOMÁTICA
  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.01
    }
  })

  return <primitive ref={ref} object={scene} scale={1.5} />
}

function ModelViewer({ objeto }) {

  const getModel = () => {
    if (objeto === "cell phone") return "/models/phone.glb"
    if (objeto === "laptop") return "/models/laptop.glb"
    if (objeto === "person") return "/models/person.glb"
    return null
  }

  const modelUrl = getModel()

  if (!modelUrl) return <p>No hay modelo</p>

  return (
    <Canvas>
      <ambientLight intensity={1} />
      <directionalLight position={[2, 2, 2]} />
      <Modelo url={modelUrl} />
      <OrbitControls />
    </Canvas>
  )
}

export default ModelViewer
