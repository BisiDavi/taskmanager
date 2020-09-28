import React from "react";
import { Card, Container, Form, Row } from "react-bootstrap";

const STATUS = ["Not Started", "In Progress", "Completed"];

const Task = props => {
  const editStatus = event => {
    props.taskStatus(props.task.id, event.target.value);
  };

  const style = {
    cardHeader: {
      width: "100%",
      marginLeft: "0px",
      height: "65px"
    },
    card: {
      width: "20rem"
    }
  };

  return (
    <div className="Task">
      <Container className="container">
        <Row className="row">
          <Card border="light" className="mb-3" style={style.card}>
            <Card.Header style={style.cardHeader} className="row px-0">
              <div className="col-6">
                <strong>{props.task.title}</strong>
              </div>
              <div className="col-6">
                <Form.Group controlId="selectTaskStatus">
                  <Form.Control
                    as="select"
                    value={props.task.status}
                    onChange={editStatus}
                  >
                    {STATUS.map(item => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </div>
            </Card.Header>
            <Card.Body className="description  p-0 py-2">
              <Card.Text className="col-12">{props.task.description}</Card.Text>
            </Card.Body>
          </Card>
        </Row>
      </Container>
    </div>
  );
};

export default Task;
