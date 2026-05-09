import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram, faFacebook, faTiktok } from '@fortawesome/free-brands-svg-icons'

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-brand">
                <span className="footer-brand-name">Montana Luxe</span>
                <span className="footer-brand-sub">Collection Premium</span>
            </div>
            <div className="footer-social">
                <a href="https://instagram.com/yourpage" target="_blank" className="instagram"><FontAwesomeIcon icon={faInstagram} /></a>
                <a href="https://facebook.com/yourpage" target="_blank" className="facebook"><FontAwesomeIcon icon={faFacebook} /></a>
                <a href="https://tiktok.com/@yourpage" target="_blank" className="tiktok"><FontAwesomeIcon icon={faTiktok} /></a>
            </div>
            <p className="footer-copy">&copy;{new Date().getFullYear()} Montana Luxe. All rights reserved.</p>
        </footer>
    )
}

export default Footer