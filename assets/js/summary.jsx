
import React from 'react';
import { createRoot } from 'react-dom/client';
import $ from 'cash-dom';

function Summary(_props) {
  return (
    <div className="mt-4 mb-0">
      <p>Cart Total: $75.33</p>
    </div>
  );
}

function init() {
  const root = createRoot(document.getElementById('summary-slot'));
  root.render(<Summary />);
}

$(init);
