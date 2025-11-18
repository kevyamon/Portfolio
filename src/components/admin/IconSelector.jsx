// src/components/admin/IconSelector.jsx
import React from 'react';
import { iconLibrary } from '../../utils/iconLibrary';
// --- CORRECTION DU CHEMIN ---
// On remonte de 2 crans (../../) pour aller chercher le CSS dans 'pages/admin'
import '../../pages/admin/Parcours.css'; 

function IconSelector({ selectedIcon, onSelectIcon }) {
  return (
    <div className="form-group">
      <label className="icon-selector-label">Choisir une icône</label>
      
      <div className="icon-selector-grid" style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(50px, 1fr))', 
        gap: '10px',
        maxHeight: '200px',
        overflowY: 'auto',
        padding: '10px',
        background: 'rgba(0,0,0,0.2)',
        borderRadius: '8px'
      }}>
        {Object.keys(iconLibrary).map((iconKey) => {
          const IconComponent = iconLibrary[iconKey].component;
          const label = iconLibrary[iconKey].label;
          const isSelected = selectedIcon === iconKey;

          return (
            <div
              key={iconKey}
              className={`icon-option ${isSelected ? 'selected' : ''}`}
              onClick={() => onSelectIcon(iconKey)}
              title={label}
              style={{
                width: '100%',
                aspectRatio: '1',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '8px',
                cursor: 'pointer',
                border: isSelected ? '2px solid #4ade80' : '1px solid rgba(255,255,255,0.1)',
                background: isSelected ? 'rgba(74, 222, 128, 0.2)' : 'rgba(255,255,255,0.05)',
                color: isSelected ? '#4ade80' : '#aaa',
                fontSize: '1.5rem',
                transition: 'all 0.2s ease'
              }}
            >
              <IconComponent />
            </div>
          );
        })}
      </div>
      
      {selectedIcon && iconLibrary[selectedIcon] && (
        <p style={{ fontSize: '0.9rem', color: '#4ade80', marginTop: '5px' }}>
          Sélectionné : <strong>{iconLibrary[selectedIcon].label}</strong>
        </p>
      )}
    </div>
  );
}

export default IconSelector;