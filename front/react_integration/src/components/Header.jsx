import phone from "../assets/images/icons/phone.svg"
import adress from "../assets/images/icons/adress.svg"
import mail from "../assets/images/icons/mail.svg"
import logo from "../assets/images/logo.png"
import banniere from "../assets/images/banniere.png"
import { Link } from 'react-router-dom'



export default function Header() {
    return (
        
    <header>
        <div className="limitedWidthBlockContainer informations">
            <div className="limitedWidthBlock">
                <ul>
                <li><img src={phone} alt="logo de téléphone" className="informations__phone" />01 23 45 67 89</li>
                <li><img src={mail} alt="logo d'une enveloppe" className="informations__mail" />support@name.com</li>
                <li><img src={adress} alt="logo d'un point de géolocalisation" className="informations__address" />01 23 45 67 89</li>
                </ul>
            </div>
        </div>
        <div className="limitedWidthBlockContainer menu">
            <div className="limitedWidthBlock">
                <Link to="/">
                    <img className="logo" src={logo} alt="Logo de l'entreprise" />
                </Link>
                <nav>
                <ul>
                    <Link to="/"><li>Accueil</li></Link>
                    <Link to="/cart"><li>Panier</li></Link>
                </ul>
                </nav>
            </div>
        </div>
        <img className="banniere" src={banniere} alt="Baniere" />
    </header>
    )
}
