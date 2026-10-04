import "./Portada.css";
import githublogo from "../../assets/github.svg";
import instagramlogo from "../../assets/instagram.svg";
import arrowRight from "../../assets/arrow-rigth.svg";
import download from "../../assets/download.svg";

export default function Portada() {
  return (
    <div className="portada">
      <h1 className="titulo-portada">Santiago Grillo</h1>
      <h2 className="subtitulo-portada">Desarrollador Backend</h2>

      <div className="acciones-portada">
        {/* Descarga CV */}
        <a href="/cv.pdf" className="btn btn-outline" download="CV-Santiago-Grillo.pdf" aria-label="Descargar CV en PDF">
          Descargar CV
          <img src={download} alt="" className="btn-icon" aria-hidden="true"/>
        </a>

        {/* Contacto */}
        <a href="#contacto" className="btn btn-primary">
          Contactame
          <img src={arrowRight} alt="" className="btn-icon" aria-hidden="true"/>
        </a>


        {/* Redes con rel = "noopener noreferrer" */}
        <a
          href="https://github.com/santigrillo" target="_blank" rel="noopener noreferrer" className="linkSocial" aria-label="Github de Santiago Grillo">
          <img src={githublogo} alt="" />
        </a>

        <a
          href="https://instagram.com/grillosanti_" target="_blank" rel="noopener noreferrer" className="linkSocial" aria-label="Instagram de Santiago Grillo">
          <img src={instagramlogo} alt="" />
        </a>
      </div>
    </div>
  );
}

