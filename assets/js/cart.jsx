
import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import $ from 'cash-dom';

import { Button, Container, Row, Col } from 'react-bootstrap';

import { Map } from 'immutable'

const products = [
  { id: 1, name: "Shirt", price: "19.99" },
  { id: 2, name: "Hat", price: "14.99" },
  { id: 3, name: "Sticker", price: "7.99" },
];

function Cart(_props) {
  const [counts, setCounts] = useState(Map());

  function update(id, change) {
    return (ev) => {
      ev.preventDefault();
      var v0 = counts.get(id, 0);
      var c1 = counts.set(id, v0 + change);
      setCounts(c1);
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
}

function init() {
  const root = createRoot(document.getElementById('cart-slot'));
  root.render(<Cart />);
}

$(init);
