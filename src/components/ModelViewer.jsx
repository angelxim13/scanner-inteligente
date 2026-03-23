import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"

// 🖱️ Mouse
function Mouse({ onSelect }) {
  return (
    <>
      <mesh onClick={() => onSelect("Cuerpo")}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="gray" />
      </mesh>
    </>
  )
}

// 📱 Celular
function Celular({ onSelect }) {
  return (
    <>
      <mesh onClick={() => onSelect("Pantalla")}>
        <boxGeometry args={[1, 2, 0.1]} />
        <meshStandardMaterial color="black" />
      </mesh>

      <mesh 
        position={[0, -0.9, 0.1]} 
        onClick={() => onSelect("Botón")}
      >
        <boxGeometry args={[0.3, 0.2, 0.1]} />
        <meshStandardMaterial color="gray" />
      </mesh>
    </>
  )
}

// 💻 Laptop
function Laptop({ onSelect }) {
  return (
    <>
      <mesh onClick={() => onSelect("Pantalla")}>
        <boxGeometry args={[2, 1, 0.1]} />
        <meshStandardMaterial color="blue" />
      </mesh>

      <mesh 
        position={[0, -1, 0]} 
        onClick={() => onSelect("Teclado")}
      >
        <boxGeometry args={[2, 0.2, 1]} />
        <meshStandardMaterial color="gray" />
      </mesh>
    </>
  )
}

export default function ModelViewer({ objeto, onSelect }) {
  return (
    <Canvas style={{ borderRadius: "20px" }}>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />

      {objeto === "mouse" && <Mouse onSelect={onSelect} />}
      {objeto === "cell phone" && <Celular onSelect={onSelect} />}
      {objeto === "laptop" && <Laptop onSelect={onSelect} />}

      <OrbitControls />
    </Canvas>
  )
}
