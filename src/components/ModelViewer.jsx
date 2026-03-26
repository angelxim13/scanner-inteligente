import { Canvas } from "@react-three/fiber"
import { OrbitControls, useGLTF } from "@react-three/drei"

function Modelo({ url }) {
  const { scene } = useGLTF(url)
  return <primitive object={scene} scale={1.5} />
}

function ModelViewer({ objeto }) {

  const getModel = () => {
    if (objeto === "cell phone") return "/models/phone.glb"
    if (objeto === "laptop") return "/models/laptop.glb"
    if (objeto === "person") return "/models/person.glb"
    return null
  }

  const modelUrl = getModel()

  if (!modelUrl) {
    return <p>No hay modelo disponible</p>
  }

  return (
    <Canvas>
      <ambientLight />
      <directionalLight position={[2, 2, 2]} />
      <Modelo url={modelUrl} />
      <OrbitControls />
    </Canvas>
  )
}

export default ModelViewer
