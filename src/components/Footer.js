import { Link } from "react-router-dom";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand-block">
          <div className="footer-brand">
            <span className="navbar-brand-mark">GB</span>
            Go Business
          </div>
          <p className="footer-tagline">
            Helping businesses grow through referrals.
          </p>
        </div>

        <div>
          <div className="footer-links-title">Quick Links</div>
          <div className="footer-links">
            <Link to="/" className="footer-link">
              Dashboard
            </Link>
            <Link to="/" className="footer-link">
              Referrals
            </Link>
            <Link to="/" className="footer-link">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        © {year} Go Business. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
