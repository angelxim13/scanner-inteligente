function Navbar({ irInicio }) {
  return (
    <div className="navbar">

      <h2 className="logo" onClick={irInicio}>
        VisionScan 🔎
      </h2>

      <div className="nav-buttons">
        <button onClick={irInicio}>Inicio</button>
        <button>Información</button>
      </div>

    </div>
  )
}

export default Navbar
