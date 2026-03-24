import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"

function Box() {
  return (
    <mesh>
      <boxGeometry />
      <meshStandardMaterial color="cyan" />
    </mesh>
  )
}

function Sphere() {
  return (
    <mesh>
      <sphereGeometry />
      <meshStandardMaterial color="orange" />
    </mesh>
  )
}

function ModelViewer({ objeto }) {

  const renderModel = () => {
    if (objeto === "cell phone") return <Box />
    if (objeto === "ball") return <Sphere />
    if (objeto === "bottle") return <Sphere />
    return <Box />
  }

  return (
    <Canvas style={{ height: "100%" }}>
      <ambientLight />
      <directionalLight position={[2, 2, 2]} />
      {renderModel()}
      <OrbitControls />
    </Canvas>
  )
}

export default ModelViewer
