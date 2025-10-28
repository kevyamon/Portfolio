import '../styles/pages.css';
import MenuHint from '../components/MenuHint';

function Home() {
  return (
    <section className="home-page">
      <div className="home-content">
        <div className="home-image">
          <img src="/src/assets/profile.jpg" alt="Kevy" className="profile-img" />
        </div>
        <div className="home-text">
          <h1 className="home-title">
            <span className="line">Bonjour, je suis</span>
            <span className="line highlight">Kevy</span>
            <span className="line">Étudiant en I.A.C. – Option Contrôle</span>
          </h1>
          <p className="home-subtitle">
            Spécialisé en contrôle qualité, analyse sensorielle et sécurité alimentaire. 
            Passionné par la science au service de l’industrie agroalimentaire.
          </p>
          <button className="cta-button" onClick={() => document.querySelector('.hamburger')?.click()}>
            Explorer via le menu
          </button>
        </div>
      </div>
      <MenuHint />
    </section>
  );
}

export default Home;