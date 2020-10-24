import React from "react";
import { Col, Row } from "react-bootstrap";

const DarkMode = () => {
  const toggleDarkMode = () => {
    const body = document.body;
    const container = document.getElementById("container");
    const toggler = document.getElementById("toggler");
    body.classList.toggle("dark-mode");
    container.classList.toggle("text-white");
    toggler.classList.toggle("transform");
  };
  return (
    <Col md="2">
      <Row>
        <Col md="2">
          <i className="fa fa-sun-o"></i>
        </Col>
        <Col md="1">
          <span
            className="slider round pointer"
            onClick={toggleDarkMode}
            id="toggler"
          ></span>
        </Col>
        <Col md="2">
          <i className="fa fa-moon-o"></i>
        </Col>
      </Row>
    </Col>
  );
};

export default DarkMode;
