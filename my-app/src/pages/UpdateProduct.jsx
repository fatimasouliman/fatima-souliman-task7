import { Button, Container, Form } from "react-bootstrap";
import "./../App.css";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate , useLocation } from "react-router-dom";

function UpdateProduct() {
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const navigate = useNavigate();
  const location = useLocation();
    
  const addProduct = (event) => {
    console.log(location)
    event.preventDefault();
    axios
      .put(
        `http://localhost:3000/products/${location.state.id}`,
        {
          title : title,
          description: description,
        },
        {
          headers: {
            authorization: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((res) => {
        if (res.status == 200) {
          navigate("/home");
        }
      });
  };

  return (
    <Container className="mt-5">
      <Form onSubmit={addProduct} style={{ width: "800px", margin: "auto" }}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Title</Form.Label>
          <Form.Control
            onChange={(event) => setTitle(event.target.value)}
            type="text"
            placeholder={location.state.title}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>description</Form.Label>
          <Form.Control
            onChange={(event) => setDescription(event.target.value)}
            type="text"
            placeholder={location.state.description}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Edit
        </Button>
      </Form>
    </Container>
  );
}

export default UpdateProduct;
