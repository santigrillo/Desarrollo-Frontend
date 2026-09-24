import Navbar from "./Navbar";
import Portada from "./Portada";
import "./Header.css";

export default function Header() {
  return (
    <header className="header">
      <Navbar />
      <Portada />
    </header>
  );
}