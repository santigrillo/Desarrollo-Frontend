import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <p className="footer-texto">
        © {new Date().getFullYear()} Santiago Grillo. Ningún derecho reservado.
      </p>
    </footer>
  );
}

