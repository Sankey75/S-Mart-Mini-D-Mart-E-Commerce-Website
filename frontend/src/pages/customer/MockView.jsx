import React from 'react';

function MockView({ title, emptyMessage }) {
  return (
    <div className="cd-mock-view">
      <h2 className="cd-view-title">{title}</h2>
      <div className="cd-empty-state">
        <span className="cd-empty-icon">🍃</span>
        <h3>{emptyMessage}</h3>
        <p>This feature is currently under development. Check back later!</p>
        <button className="btn-primary" style={{ marginTop: '1rem' }} onClick={() => window.history.back()}>
          Go Back
        </button>
      </div>
    </div>
  );
}

export default MockView;
