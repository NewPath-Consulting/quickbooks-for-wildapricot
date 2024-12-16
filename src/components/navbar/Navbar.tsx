import "./Navbar.css";


export const Navbar = () => {

  return (
    <nav>
      <img width={118} height={26} src={"logo.png"} alt={"NewPaths logo"}/>
      <button className={"btn btn-primary"}>Help ?</button>
    </nav>
  )
}