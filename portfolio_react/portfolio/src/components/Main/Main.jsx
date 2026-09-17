import "./Main.css";
import githublogo from "../../assets/github.svg";
import instagramlogo from "../../assets/instagram.svg";


export default function Main(){
    return(
        <div className="portada">
            
            <h1>Santiago Grillo</h1>
            
            <h2>Desarrollador Backend</h2>
            
            <div className="sub">
               
                    <a href="">
                        Descargar CV
                        <img src="" />
                    </a>
                
                    <a href="">
                        Contactame
                        <img src="" alt="" />
                    </a>
                
                    <a href="">
                        <img src={githublogo} alt="" />
                    </a>
                
                    <a href="">
                        <img src={instagramlogo} />
                    </a>
            
            </div>
        </div>
    );
}