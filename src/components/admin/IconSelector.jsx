// src/components/admin/IconSelector.jsx
import React from 'react';
// CORRECTION : Le chemin a été mis à jour
import '../../pages/admin/Parcours.css'; // Pour le style .icon-option

// Les chemins vers vos icônes (assurez-vous qu'ils sont corrects)
const ICONS = {
  diploma: '/src/assets/icons/diploma.svg',
  stage: '/src/assets/icons/stage.svg',
  lab: '/src/assets/icons/lab.svg',
  code: '/src/assets/icons/code.svg',
};

function IconSelector({ selectedIcon, onSelectIcon }) {
  return (
    <div className="form-group">
      <label className="icon-selector-label">Icône</label>
      <div className="icon-selector">
        {Object.keys(ICONS).map((iconKey) => (
          <div
            key={iconKey}
            // Applique la classe .selected si c'est l'icône choisie
            className={`icon-option ${selectedIcon === iconKey ? 'selected' : ''}`}
            onClick={() => onSelectIcon(iconKey)}
            title={iconKey} // Titre au survol
          >
            <img src={ICONS[iconKey]} alt={iconKey} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default IconSelector;