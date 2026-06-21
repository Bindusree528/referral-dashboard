import { Link } from "react-router-dom";
import Layout from "../components/Layout";

function NotFound() {
  return (
    <Layout>
      <div className="state-screen">
        <div className="state-block">
          <div className="notfound-code">404</div>
          <h2 className="state-title">Page not found</h2>
          <p className="state-text">
            The page you're looking for doesn't exist or may have been moved.
          </p>
          <Link to="/" className="btn">
            Back to dashboard
          </Link>
        </div>
      </div>
    </Layout>
  );
}

export default NotFound;
