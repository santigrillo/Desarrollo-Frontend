import "./Footer.css";

const CURRENT_YEAR = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="footer">
      <p className="footer-texto">
        © {CURRENT_YEAR} Santiago Grillo. Ningún derecho reservado.
      </p>
    </footer>
  );
}
