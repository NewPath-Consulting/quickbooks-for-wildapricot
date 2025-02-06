import "./Navbar.css";


export const Navbar = () => {

  return (
    <nav>
      <img width={100} height={22} src={"logo.png"} alt={"NewPaths logo"}/>
      <button className={"btn btn-primary"}>Help ?</button>
    </nav>
  )
}