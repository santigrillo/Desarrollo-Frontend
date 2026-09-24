import { useState, useEffect } from "react";
import "./Navbar.css";
import logoSvg from "../../assets/Elements.svg";
import sunSvg from "../../assets/sun.svg";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`header-container ${isScrolled ? "scrolled" : ""}`}>
      {/* Logo superior izquierdo */}
      <img src={logoSvg} alt="Logo" className={`logo ${isScrolled ? "hide-on-scroll" : ""}`}
      />

      {/* Menú de navegación */}
      <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
        <a href="#perfil">PERFIL</a>
        <a href="#proyectos">PROYECTOS</a>
        <a href="#habilidades">HABILIDADES</a>
      </nav>

      {/* Modo oscuro */}
      <button className={`modoOscuroButton ${isScrolled ? "hide-on-scroll" : ""}`}>
        <img src={sunSvg} alt="" />
      </button>
    </div>
  );
}