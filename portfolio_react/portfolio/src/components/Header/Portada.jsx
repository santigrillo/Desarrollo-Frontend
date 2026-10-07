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
        <a
          href="/cv.pdf"
          className="btn btn-outline"
          download="CV-Santiago-Grillo.pdf"
          aria-label="Descargar currículum vitae en formato PDF"
        >
          Descargar CV
          <img
            src={download}
            alt=""
            aria-hidden="true"
            width="13"
            height="13"
            className="btn-icon"
          />
        </a>

        {/* Contacto */}
        <a href="#contacto" className="btn btn-primary">
          Contactame
          <img
            src={arrowRight}
            alt=""
            aria-hidden="true"
            width="13"
            height="13"
            className="btn-icon"
          />
        </a>

        {/* Redes con rel="noopener noreferrer" y aviso accesible de nueva pestaña (H-19, H-21, H-22, H-25) */}
        <a
          href="https://github.com/santigrillo"
          target="_blank"
          rel="noopener noreferrer"
          className="linkSocial"
          aria-label="GitHub de Santiago Grillo (se abre en una nueva pestaña)"
        >
          <img
            src={githublogo}
            alt=""
            aria-hidden="true"
            width="24"
            height="24"
          />
        </a>

        <a
          href="https://instagram.com/grillosanti_"
          target="_blank"
          rel="noopener noreferrer"
          className="linkSocial"
          aria-label="Instagram de Santiago Grillo (se abre en una nueva pestaña)"
        >
          <img
            src={instagramlogo}
            alt=""
            aria-hidden="true"
            width="24"
            height="24"
          />
        </a>
      </div>
    </div>
  );
}
