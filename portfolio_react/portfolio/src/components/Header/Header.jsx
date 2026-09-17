import Navbar from "./Navbar";
import "./Header.css";
import logoSvg from "../../assets/Elements.svg";
import sunSvg from "../../assets/sun.svg";
import { useState, useEffect  } from "react";

export default function Header (){

    // Efecto Scroll del Menu Superior
    const [isScrolled, setIsScrolled] = useState(false);
    
    useEffect(() => {
        const handleScroll = () => {
            // Si el usuario supera los 40px de scroll, se activa el menu fijo.
            if (window.scrollY > 40){
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        }
        
            window.addEventListener("scroll", handleScroll);
            return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return(
        <header className={`header-container ${ isScrolled ? "scrolled":"" }`}>
            
             {/* Logo superior izquierdo */}
            <img src={logoSvg} alt="Logo" className={`logo ${ isScrolled  ? "hide-on-scroll":"" }`}/>
             
             {/* Navbar */}
            <Navbar isScrolled={isScrolled}/>

            {/* Modo oscuro */}
            <button className={`modoOscuroButton ${isScrolled ? "hide-on-scroll":""}`} aria-label="Cambiar modo">
                <img src={sunSvg} alt=""/>
            </button>
        
        </header>
    );
}