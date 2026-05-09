import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram, faFacebook, faTiktok } from '@fortawesome/free-brands-svg-icons'

function Header() {
    return (
        <header className="header">

            <div className="header-left">
                <div className="header-logo-circle">
                    <img src="/images/logo.PNG" alt="logo" />
                </div>
                <span className="header-site-name">Montana luxe</span>
            </div>

            <div className="header-right">
              <a href="https://instagram.com/yourpage" target="_blank" className="header-social instagram"><FontAwesomeIcon icon={faInstagram} /></a>
              <a href="https://facebook.com/yourpage" target="_blank" className="header-social facebook"><FontAwesomeIcon icon={faFacebook} /></a>
              <a href="https://tiktok.com/@yourpage" target="_blank" className="header-social tiktok"><FontAwesomeIcon icon={faTiktok} /></a>
            </div>
        </header>
    )
}

export default Header