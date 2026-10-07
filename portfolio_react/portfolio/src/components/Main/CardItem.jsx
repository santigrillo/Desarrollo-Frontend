export default function CardItem({
  fecha,
  titulo,
  rol,
  subtitulo,
  lugar,
  descripcion,
  tecnologias = [],
  linkRepo,
  linkDemo,
}) {
  const heading = titulo || rol;
  const subtitle = subtitulo || lugar;

  return (
    <article className="card-item">
      {fecha && <span className="card-fecha">{fecha}</span>}
      <h3 className="card-titulo">{heading}</h3>
      {subtitle && <p className="card-subtitulo">{subtitle}</p>}
      <p className="card-descripcion">{descripcion}</p>

      {/* Chips de tecnologías */}
      {tecnologias.length > 0 && (
        <ul className="card-tags" aria-label={`Tecnologías utilizadas en ${heading}`}>
          {tecnologias.map((tech) => (
            <li key={tech} className="card-tag">
              {tech}
            </li>
          ))}
        </ul>
      )}

      {/* Enlaces opcionales a repositorio o demo */}
      {(linkRepo || linkDemo) && (
        <div className="card-links">
          {linkRepo && (
            <a
              href={linkRepo}
              target="_blank"
              rel="noopener noreferrer"
              className="card-link"
              aria-label={`Repositorio de ${heading} (se abre en una nueva pestaña)`}
            >
              Ver Repositorio ↗
            </a>
          )}
          {linkDemo && (
            <a
              href={linkDemo}
              target="_blank"
              rel="noopener noreferrer"
              className="card-link"
              aria-label={`Demo en vivo de ${heading} (se abre en una nueva pestaña)`}
            >
              Demo en Vivo ↗
            </a>
          )}
        </div>
      )}
    </article>
  );
}