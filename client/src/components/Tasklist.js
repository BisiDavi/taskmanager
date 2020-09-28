import React from "react";
import { Container } from "react-bootstrap";
import { Task } from "../imports";

const Tasklist = props => {
  return (
    <Container className="tasklist col-4">
      <div className="col-12">
        <strong>{props.status}</strong>
      </div>
      <div className="col-12 pt-2">
        {props.tasks.map(task => (
          <Task key={task.id} task={task} taskStatus={props.onStatusChange} />
        ))}
      </div>
    </Container>
  );
};

export default Tasklist;
