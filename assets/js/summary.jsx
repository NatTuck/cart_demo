
import React from 'react';
import { Provider, connect } from 'react-redux';
import { createRoot } from 'react-dom/client';
import $ from 'cash-dom';

import store from './store';

const Summary = connect(({products, counts}) =>
  ({products, counts}))(({products, counts}) => {

  function sumPrices(acc, item) {
    const count = counts.get(item.id, 0);
    return acc + count * item.price;
  }
  let total = products.reduce(sumPrices, 0);

  return (
    <div className="mt-4 mb-0">
      <p>Cart Total: {total.toFixed(2)}</p>
    </div>
  );
});

function init() {
  const root = createRoot(document.getElementById('summary-slot'));
  root.render(
    <Provider store={store}>
      <Summary />
    </Provider>
  );
}

$(init);
