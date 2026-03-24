function Navbar({ irInicio }) {
  return (
    <div className="navbar">

      <h2 className="logo">VisionScan 🔎</h2>

      <div className="nav-buttons">
        <button onClick={irInicio}>Inicio</button>
      </div>

    </div>
  )
}

export default Navbar
