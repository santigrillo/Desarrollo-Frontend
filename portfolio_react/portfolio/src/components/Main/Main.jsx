import "./Main.css";

export default function Main() {
  return (
    <main className="main-content">
      {/* Sección Perfil */}
      <section id="perfil" className="seccion">
        <h2 className="seccion-titulo">PERFIL</h2>
        <div className="seccion-contenido">
          <p>
            Estudiante avanzado de Tecnicatura en Programación Web y Licenciatura en Sistemas de Información, con experiencia en proyectos de desarrollo web y programación. Habilidades de organización, trabajo en equipo, resolución de problemas y toma de decisiones. Busco oportunidades como programador junior para aportar valor y continuar mi crecimiento.
          </p>
        </div>
      </section>

      {/* Sección de Proyectos */}
      <section className="seccion">
        <h2 className="seccion-titulo">EXPERIENCIA LABORAL</h2>
        <div className="seccion-contenido">
          <p>Texto</p>
          {/* Aca va a ir un JSON para recorrer y crear una card por cada experiencia laboral. */}
        </div>
      </section>

      {/* Sección de Habilidades */}
      <section className="seccion">
        <h2 className="seccion-titulo">PROYECTOS</h2>
        <div className="seccion-contenido">
          <p>Texto</p>
          {/* Aca va ir otro JSON. */}
        </div>
      </section>
    </main>
  );
}