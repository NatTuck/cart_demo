import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider, connect } from 'react-redux';
import $ from 'cash-dom';

import { Button, Container, Row, Col } from 'react-bootstrap';

import { Map } from 'immutable';

import store from './store';

const Cart = connect(({products, counts}) =>
  ({products, counts}))(({products, counts, dispatch}) => {
  function update(id, change) {
    return (ev) => {
      ev.preventDefault();
      let data = {
        item_id: id,
        change: change,
      }
      dispatch({type: 'counts/change', data: data});
    };
  }

  let cart_rows = products.map((item) => {
    const count = counts.get(item.id, 0);

    return (
      <Row className="border border-1" key={item.id}>
        <Col>Name: { item.name }</Col>
        <Col>Price: { item.price }</Col>
        <Col>Count: { count }</Col>
        <Col>Total: { (item.price * count).toFixed(2) }</Col>
        <Col>
          <Button onClick={update(item.id, +1)}>+1</Button>
          <Button onClick={update(item.id, -1)}>-1</Button>
        </Col>
      </Row>
    );
  });

  function sumPrices(acc, item) {
    const count = counts.get(item.id, 0);
    return acc + count * item.price;
  }
  let total = products.reduce(sumPrices, 0);

  return (
    <Container>
      <Row>
        <Col>
          <h1>Shopping Cart</h1>
          <Container>
            { cart_rows }
          </Container>
        </Col>
      </Row>
      <Row className="py-2">
        <Col>
          <p>Total: {total.toFixed(2)}</p>
        </Col>
      </Row>
    </Container>
  );
});

function init() {
  const root = createRoot(document.getElementById('cart-slot'));
  root.render(
    <Provider store={store}>
      <Cart />
    </Provider>
  );
}

$(init);
