import Navbar from "./Navbar";
import Footer from "./Footer";

/**
 * Shared page shell.
 * Wraps authenticated pages with a consistent Navbar + Footer.
 * Purely structural — does not touch routing, auth, or data fetching.
 */
function Layout({ children }) {
  return (
    <div className="app-shell">
      <Navbar />
      <main className="app-main">{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
