import { useState } from "react";
import "./Main.css";
import CardItem from "./CardItem";

// Arrays con información (estructura JSON para escalar)
const EXPERIENCIAS = [
  {
    id: 1,
    fecha: "Mayo 2026 - Actualidad",
    rol: "Full Stack Developer",
    lugar: "HR.DEV",
    descripcion:
      "Desarrollo integral de aplicaciones web y móviles. Diseño visual y conceptual de la aplicación Repumovil. Construcción y optimización de delivery app y APIs REST mediante la creación de endpoints robustos.",
    tecnologias: ["Laravel", "API REST", "Mobile", "UI Design"],
  },
  {
    id: 2,
    fecha: "Sep 2021 - Mar 2022",
    rol: "Creación de contenido y comunicación",
    lugar: "Neurosport, PlayOFF y M&E",
    descripcion:
      "Manejo estratégico de redes sociales, creación de piezas gráficas (flyers), administración de formularios digitales y comunicación directa con clientes para optimizar la experiencia de usuario.",
    tecnologias: ["Facebook Business", "Instagram", "Facebook"],
  },
];

const PROYECTOS_PERSONALES = [
  {
    id: 1,
    fecha: "2026",
    titulo: "API de Gestión Financiera",
    subtitulo: "Proyecto personal independiente",
    descripcion:
      "Microservicio backend con autenticación JWT, arquitectura por capas y persistencia en PostgreSQL.",
    tecnologias: ["Node.js", "Express", "PostgreSQL", "Docker", "JWT"],
    linkRepo: "https://github.com/santigrillo/proyecto-financiero",
  },
];

const PROYECTOS_ACADEMICOS = [
  {
    id: 1,
    fecha: "2026",
    titulo: "Tracker de juegos PHP / C#",
    subtitulo: "Juegos",
    descripcion:
      "Tracker de juegos desarrollado en PHP con Laravel y C# con ASP .NET, consumiendo API externa (RAWG), aplicando principios REST, Clean code y SOLID.",
    tecnologias: ["PHP", "Laravel", "C#", "ASP.NET"],
    linkRepo: "https://github.com/santigrillo/Tracker-Juegos-C",
  },{
    id: 2,
    fecha: "2025",
    titulo: "TEASSIST",
    subtitulo: "Salud",
    descripcion:
      "Aplicación web para acompañantes terapéuticos con pacientes con trastorno espectro autista. Desarrollado en PHP con Laravel.",
    tecnologias: ["PHP", "Laravel"],
    linkRepo: "",
  }
];

const HABILIDADES = [
  "HTML",
  "CSS",
  "JavaScript",
  "React",
  "Python",
  "PostgreSQL",
  "Git",
  "APIs REST",
];

const EDUCACION = [
  {
    id: 1,
    titulo: "Tecnicatura Universitaria en Programación Web",
    institucion: "Universidad Nacional de San Juan 2023-ACT.",
  },
  {
    id: 2,
    titulo: "Licenciatura en Sistemas de Información",
    institucion: "Universidad Nacional de San Juan 2022-ACT.",
  },
];

const EMAIL_CONTACTO = "santiagogrillo.dv@gmail.com";

export default function Main() {
  const [copiado, setCopiado] = useState(false);

  const handleCopiarEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL_CONTACTO);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    } catch {
    }
  };

  return (
    <main className="main-content">
      {/* 1. Sección Perfil */}
      <section id="perfil" className="seccion">
        <h2 className="seccion-titulo">PERFIL</h2>
        <div className="seccion-contenido">
          <p>
            Estudiante avanzado de Tecnicatura en Programación Web y Licenciatura en Sistemas de Información, con experiencia en proyectos de desarrollo web y programación. Habilidades de organización, trabajo en equipo, resolución de problemas y toma de decisiones. Busco oportunidades como programador junior para aportar valor y continuar mi crecimiento.
          </p>
        </div>
      </section>

      {/* 2. Sección Experiencia */}
      <section id="experiencia" className="seccion">
        <h2 className="seccion-titulo">EXPERIENCIA LABORAL</h2>
        <div className="cards-lista">
          {EXPERIENCIAS.map((exp) => (
            <CardItem key={exp.id} {...exp} />
          ))}
        </div>
      </section>

      {/* 3. Sección Proyectos Personales */}
      <section id="proyectos" className="seccion">
        <h2 className="seccion-titulo">PROYECTOS PERSONALES</h2>
        <div className="cards-lista">
          {PROYECTOS_PERSONALES.map((proy) => (
            <CardItem key={proy.id} {...proy} />
          ))}
        </div>
      </section>

      {/* 4. Sección Proyectos Académicos */}
      <section id="proyectos-academicos" className="seccion">
        <h2 className="seccion-titulo">PROYECTOS ACADÉMICOS</h2>
        <div className="cards-lista">
          {PROYECTOS_ACADEMICOS.map((acad) => (
            <CardItem key={acad.id} {...acad} />
          ))}
        </div>
      </section>

      {/* 5. Sección Habilidades */}
      <section id="habilidades" className="seccion">
        <h2 className="seccion-titulo">HABILIDADES</h2>
        <ul className="habilidades-tags" aria-label="Lista de habilidades técnicas">
          {HABILIDADES.map((habilidad) => (
            <li key={habilidad} className="habilidad-tag">
              {habilidad}
            </li>
          ))}
        </ul>
      </section>

      {/* 6. Sección Educación */}
      <section id="educacion" className="seccion">
        <h2 className="seccion-titulo">EDUCACIÓN</h2>
        <ul className="educacion-lista" aria-label="Historial académico">
          {EDUCACION.map((item) => (
            <li key={item.id} className="educacion-item">
              <span className="educacion-titulo">{item.titulo}</span>
              <span className="educacion-lugar">{item.institucion}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* 7. Sección Contacto */}
      <section id="contacto" className="seccion">
        <h2 className="seccion-titulo">CONTACTO</h2>
        <div className="card-contacto">
          
          {/* Badge de disponibilidad */}
          <div className="contacto-disponibilidad" role="status">
            <span className="dot-disponible" aria-hidden="true"></span>
            <span>Disponible para nuevas oportunidades laborales</span>
          </div>

          <p className="contacto-descripcion">
            ¿Tenés una propuesta, consulta o proyecto en mente? Podés escribirme directamente por correo electrónico o a través de mis redes sociales.
          </p>

          <div className="contacto-email-box">
            <a
              href={`mailto:${EMAIL_CONTACTO}`}
              className="contacto-email-link"
              aria-label={`Enviar correo a ${EMAIL_CONTACTO}`}
            >
              <span>{EMAIL_CONTACTO}</span>
            </a>
            <button
              type="button"
              onClick={handleCopiarEmail}
              className="btn-copiar"
              aria-label="Copiar correo electrónico al portapapeles"
            >
              {copiado ? "¡Copiado! ✓" : "Copiar"}
            </button>
          </div>

          <div className="contacto-redes">
            <a
              href="https://github.com/santigrillo"
              target="_blank"
              rel="noopener noreferrer"
              className="contacto-red-link"
              aria-label="GitHub de Santiago Grillo (se abre en una nueva pestaña)"
            >
              GitHub ↗
            </a>
            <a
              href="https://www.linkedin.com/in/santigrillo"
              target="_blank"
              rel="noopener noreferrer"
              className="contacto-red-link"
              aria-label="LinkedIn de Santiago Grillo (se abre en una nueva pestaña)"
            >
              LinkedIn ↗
            </a>
            <a
              href="https://instagram.com/grillosanti_"
              target="_blank"
              rel="noopener noreferrer"
              className="contacto-red-link"
              aria-label="Instagram de Santiago Grillo (se abre en una nueva pestaña)"
            >
              Instagram ↗
            </a>
          </div>

          <p className="contacto-ubicacion">
            📍 San Juan, Argentina • Modalidad remota / híbrida
          </p>
        </div>
      </section>
    </main>
  );
}