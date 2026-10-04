import { useState, useEffect } from "react";
import "./Navbar.css";
import logoSvg from "../../assets/Elements.svg";
import sunSvg from "../../assets/sun.svg";

export default function Navbar() {
  // Efecto para scroll desde el navbar.
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  // Preferencia de tema del sistema.
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

  return (
    <div className={`header-container ${isScrolled ? "scrolled" : ""}`}>
      
      {/* Logo */}
      <a href="#perfil" aria-label="Ir al inicio" className="logo-link">
        <img
          src={logoSvg}
          alt=""
          aria-hidden="true"
          className={`logo ${isScrolled ? "hide-on-scroll" : ""}`}
        />
      </a>
      
      {/* Menú de navegación accesible */}
      <nav className={`navbar ${isScrolled ? "scrolled" : ""}`} aria-label="Navegación principal">
        <a href="#perfil">PERFIL</a>
        <a href="#experiencia">EXPERIENCIA</a>
        <a href="#proyectos">PROYECTOS</a>
        <a href="#habilidades">HABILIDADES</a>
        <a href="#contacto">CONTACTO</a>
      </nav>

      {/* Botón modo oscuro funcional */}
      <button
        type="button"
        onClick={toggleTheme}
        className={`modoOscuroButton ${isScrolled ? "hide-on-scroll" : ""}`}
        aria-label={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
        title={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
      >
        <img src={sunSvg} alt="" aria-hidden="true" />
      </button>
    </div>
  );
}