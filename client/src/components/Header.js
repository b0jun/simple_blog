import React from 'react';
import { Col, Row } from 'reactstrap';

const Header = () => {
  return (
    <div id="page-header" className="mb-3">
      <Row>
        <Col md="6" sm="auto" className="text-center m-auto">
          <h1>블로그</h1>
          <p>Jun의 블로그 튜토리얼</p>
        </Col>
      </Row>
    </div>
  );
};

export default Header;
