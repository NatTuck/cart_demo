
import React from 'react';
import { createRoot } from 'react-dom/client';
import $ from 'cash-dom';

import { Container, Row, Col } from 'react-bootstrap';

function Cart(_props) {
  return (
    <Container>
      <Row>
        <Col>
          <p>Hello, cart</p>
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
