import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function Home() {
  return (
    <div className="home-shell">
        <Navbar />

      <div className="home-row home-announce">
        <span>It's a great day to donate!</span>
        <Link to="/requests" className="btn btn-inverse btn-small">Fulfill a request</Link>
      </div>

      <section className="home-row home-section home-section-dark">
        <div className="home-section-inner">
          <div className="home-section-media">
            <div className="home-media-icon home-media-icon-dark">
              <i className="ri-hand-heart-line"></i>
            </div>
          </div>
          <div className="home-section-content">
            <h2>Connect classrooms with the community that supports them.</h2>
            <p>
              Donarium lets teachers and organizations post what they need,
              and donors nearby step in to help.
            </p>
            <div className="home-cta-group">
              <Link to="/register" className="btn btn-inverse">Get started</Link>
              <Link to="/login" className="btn btn-ghost-inverse">Log in</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="home-row home-section home-section-light home-section-reverse">
        <div className="home-section-inner">
          <div className="home-section-media">
            <div className="home-media-icon home-media-icon-light">
              <i className="ri-map-pin-line"></i>
            </div>
          </div>
          <div className="home-section-content">
            <h2>See what's needed, right on the map.</h2>
            <p>
              Every organization's drop-off location is geocoded and shown on
              an interactive map — no account required to look.
            </p>
            <div className="home-cta-group">
              <Link to="/organizations" className="btn btn-primary">View the map</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="home-row home-section home-section-dark">
        <div className="home-section-inner">
          <div className="home-section-media">
            <div className="home-media-icon home-media-icon-dark">
              <i className="ri-hand-coin-line"></i>
            </div>
          </div>
          <div className="home-section-content">
            <h2>Post a need. Fulfill a request. It only takes a minute.</h2>
            <p>
              Whether you're asking for help or offering it, Donarium makes
              it simple to connect.
            </p>
            <div className="home-cta-group">
              <Link to="/register" className="btn btn-inverse">Create an account</Link>
              <Link to="/login" className="btn btn-ghost-inverse">Log in</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;