import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CardComponent({ data }) {
    let title = data.title;
    let description = data.description;
    let idproduct = data.id;
    const idpro = data.id;

    const navigate = useNavigate();
  const update = () => {
    
    navigate("/update-prodcuts" , {state : {
      title: title,
      description: description,
      id: idproduct,
    }});
  }
const remove = () => {
    axios
    .delete(`http://localhost:3000/products/${idpro}`,  {
      headers: {
        authorization: localStorage.getItem("accessToken"),
      },
    })
    .then((res) => {
      if (res.status == 200) {
        navigate("/home");
      }
    });
  }
  return (
    <Card className="mt-5">
      {data?.images ? <Card.Img variant="top" src={data?.images[0]} /> : null}

      <Card.Body>
        <Card.Title>{data.title}</Card.Title>
        <Card.Text>{data.description}</Card.Text>
        <Button className="mx-2" onClick={update} variant="primary">Update</Button>
        <Button onClick={remove} variant="primary">Delelet</Button>
      </Card.Body>
    </Card>
  );
}

export default CardComponent;
