import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import bottomPillImage from "../assets/bottom_pill.JPG";

function Home() {
  const [typedText, setTypedText] = useState("");

  useEffect(() => {
    const phrases = ["Donate!", "Make a difference!"];
    let phraseIndex = 0;
    let charIndex = 0;
    let typingForward = true;
    let timeoutId;

    function typeLoop() {
      const current = phrases[phraseIndex];
      let delay;

      if (typingForward) {
        charIndex++;
        setTypedText(current.slice(0, charIndex));
        if (charIndex === current.length) {
          typingForward = false;
          delay = 1400;
        } else {
          delay = 75;
        }
      } else {
        charIndex--;
        setTypedText(current.slice(0, charIndex));
        if (charIndex === 0) {
          typingForward = true;
          phraseIndex = (phraseIndex + 1) % phrases.length;
          delay = 400;
        } else {
          delay = 40;
        }
      }

      timeoutId = setTimeout(typeLoop, delay);
    }

    typeLoop();

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className="home-shell">
      <Navbar />

      <section className="hero">
        <div className="hero-inner">
          <div className="hero-content">
            <p className="hero-eyebrow">Donarium:</p>
            <h1 className="hero-headline">
              It's a great day to
              <br />
              <span className="hero-highlight">{typedText}</span>
              <span className="hero-cursor">|</span>
            </h1>
            <p className="hero-sub">
              "We make a living by what we get, but we make a life by what we give." —Winston Churchill
            </p>
            <div className="hero-cta-group">
              <Link to="/register" className="btn btn-primary btn-pill-lg">Get started</Link>
              <Link to="/organizations" className="btn btn-secondary btn-pill-lg">View the map</Link>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-oval hero-oval-top">
              <i className="ri-hand-heart-line"></i>
            </div>
            <div className="hero-oval hero-oval-main">
              <i className="ri-hand-coin-line"></i>
            </div>
            <div className="hero-oval hero-oval-bottom">
              <img src={bottomPillImage} alt="" className="hero-oval-img" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;