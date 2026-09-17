import "./Navbar.css"

export default function Navbar ({isScrolled}){
    return(
        <div className={`navbar ${isScrolled ? "scrolled" : ""}`}>
            <a href="">PERFIL</a>
            <a href="">PROYECTOS</a>
            <a href="">HABILIDADES</a>
        </div>
    );
}