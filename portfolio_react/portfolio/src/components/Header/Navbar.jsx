import { useState, useEffect } from "react";
import "./Navbar.css";
import logoSvg from "../../assets/Elements.svg";
import sunSvg from "../../assets/sun.svg";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuAbierto, setMenuAbierto] = useState(false);

  // Efecto para scroll desde el navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Preferencia de tema del sistema o localStorage
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved) return saved === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  // Efecto para aplicar el modo oscuro al <html>
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  const cerrarMenu = () => {
    setMenuAbierto(false);
  };

  return (
    <div className={`header-container ${isScrolled ? "scrolled" : ""}`}>
      {/* Logo */}
      <a href="#perfil" aria-label="Ir al inicio" className="logo-link" onClick={cerrarMenu}>
        <img
          src={logoSvg}
          alt=""
          aria-hidden="true"
          width="36"
          height="36"
          className={`logo ${isScrolled && !menuAbierto ? "hide-on-scroll" : ""}`}
        />
      </a>

      {/* Menú de navegación accesible estructurado en lista (H-09) */}
      <nav
        className={`navbar ${menuAbierto ? "menu-abierto" : ""} ${isScrolled ? "scrolled" : ""}`}
        aria-label="Navegación principal"
      >
        <ul className="navbar-menu">
          <li><a href="#perfil" onClick={cerrarMenu}>PERFIL</a></li>
          <li><a href="#experiencia" onClick={cerrarMenu}>EXPERIENCIA</a></li>
          <li><a href="#proyectos" onClick={cerrarMenu}>PROYECTOS</a></li>
          <li><a href="#habilidades" onClick={cerrarMenu}>HABILIDADES</a></li>
          <li><a href="#educacion" onClick={cerrarMenu}>EDUCACIÓN</a></li>
          <li><a href="#contacto" onClick={cerrarMenu}>CONTACTO</a></li>
        </ul>
      </nav>

      {/* Acciones derecha: Modo Oscuro + Hamburguesa móvil */}
      <div className="header-acciones-derecha">
        {/* Botón modo oscuro funcional */}
        <button
          type="button"
          onClick={toggleTheme}
          className={`modoOscuroButton ${isScrolled && !menuAbierto ? "hide-on-scroll" : ""}`}
          aria-label={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
          title={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
        >
          <img src={sunSvg} alt="" aria-hidden="true" width="22" height="22" />
        </button>

        {/* Botón hamburguesa accesible para dispositivos móviles */}
        <button
          type="button"
          onClick={() => setMenuAbierto(!menuAbierto)}
          className={`btn-hamburguesa ${menuAbierto ? "abierto" : ""}`}
          aria-label={menuAbierto ? "Cerrar menú de navegación" : "Abrir menú de navegación"}
          aria-expanded={menuAbierto}
        >
          <span className="linea-hamburguesa"></span>
          <span className="linea-hamburguesa"></span>
          <span className="linea-hamburguesa"></span>
        </button>
      </div>
    </div>
  );
}