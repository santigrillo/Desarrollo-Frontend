import "./Main.css";

export default function Main() {
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
        <div className="seccion-contenido">
          <p>Proyectos académicos y de desarrollo independiente orientados al diseño de APIs y lógica de servidor.</p>
          {/* JSON */}
        </div>
      </section>
      
      {/* 3. Sección Proyectos */}
      <section id="proyectos" className="seccion">
        <h2 className="seccion-titulo">PROYECTOS</h2>
        <div className="seccion-contenido">
          <p>Repositorios y aplicaciones web desarrolladas en NodeJS, bases de datos SQL y frontend React.</p>
          {/* JSON */}
        </div>
      </section>
      
      {/* 4. Sección Habilidades */}
      <section id="habilidades" className="seccion">
        <h2 className="seccion-titulo">HABILIDADES</h2>
        <div className="seccion-contenido">
          <p>JavaScript, React, Node.js, Express, PostgreSQL, MySQL, Git y arquitectura REST.</p>
        </div>
      </section>
      
      {/* 5. Sección Contacto */}
      <section id="contacto" className="seccion">
        <h2 className="seccion-titulo">CONTACTO</h2>
        <div className="seccion-contenido">
          <p>
            ¿Tenés alguna propuesta o consulta? Podés escribirme directamente a mi correo o a través de mis redes sociales.
          </p>
        </div>
      </section>
    </main>
  );
}