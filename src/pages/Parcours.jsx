import '../styles/pages.css';
import MenuHint from '../components/MenuHint';

function Parcours() {
  return (
    <section className="parcours-page">
      <div className="container">
        <h2>Mon Parcours</h2>
        <p style={{ textAlign: 'center', color: '#ccc', margin: '40px 0' }}>
          Timeline ici (à compléter plus tard)
        </p>
      </div>
      <MenuHint />
    </section>
  );
}

export default Parcours;