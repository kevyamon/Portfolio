import '../styles/pages.css';
import MenuHint from '../components/MenuHint';

function Travaux() {
  return (
    <section className="travaux-page">
      <div className="container">
        <h2>Travaux Pratiques</h2>
        <p style={{ textAlign: 'center', color: '#ccc' }}>Galerie photo & vidéos à venir</p>
      </div>
      <MenuHint />
    </section>
  );
}

export default Travaux;