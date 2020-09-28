import React, { useState } from "react";
import { Container, Row, Button, Form, Modal } from "react-bootstrap";
import { Tasklist } from "../imports";

const taskColumn = ["Not Started", "In Progress", "Completed"];

const Taskpage = props => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    showForm: false
  });

  const style = {
    container: {
      position: "relative",
      height: "100vh",
      background: "#eee"
    },
    form: {
      display: formData.showForm === false ? "none" : "block",
      position: "absolute",
      top: "20%",
      left: "30%"
    },
    task: {
      position: "absolute",
      top: "110px",
      left: "150px"
    }
  };

  const handleClose = () =>
    setFormData({
      ...formData,
      showForm: false
    });
  const handleShow = () =>
    setFormData({
      ...formData,
      showForm: true
    });

  const onInputChange = event => {
    console.log(event.value, event.target.value);
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      showForm: false
    });
  };

  const onSubmitForm = event => {
    event.preventDefault();
    props.onCreateTask({
      title: formData.title,
      description: formData.description,
      ...formData
    });
    resetForm();
    console.log("new task", props.onCreateTask);
  };

  const displayForm = () => {
    setFormData({
      ...formData,
      showForm: !formData.showForm
    });
    return formData.showForm;
  };

  const renderList = () => {
    const { tasks } = props.tasks;
    return taskColumn.map(taskCategory => {
      const taskStatus = tasks.filter(task => task.status === taskCategory);
      return (
        <Tasklist
          key={taskCategory}
          status={taskCategory}
          tasks={taskStatus}
          onStatusChange={props.onStatusChange}
        />
      );
    });
  };

  if (props.isLoading) {
    return <div className="task-loading">Loading ...</div>;
  }

  return (
    <Container style={style.container} fluid>
      <Container className="taskpage">
        <Button
          onClick={displayForm}
          className="btn btn-primary text-white float-right mr-5 mt-5"
        >
          + New Task
        </Button>

        <Row style={style.form}>
          <Modal show={formData.showForm} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={onSubmitForm}>
                <Form.Group controlId="taskTitle">
                  <Form.Control
                    type="text"
                    name="title"
                    onChange={onInputChange}
                    value={formData.title}
                    placeholder="Title"
                  />
                </Form.Group>
                <Form.Group controlId="taskDescription">
                  <Form.Control
                    type="text"
                    name="description"
                    placeholder="description"
                    onChange={onInputChange}
                    value={formData.description}
                  />
                </Form.Group>

                <Button type="submit" variant="success">
                  Save
                </Button>
              </Form>
            </Modal.Body>
          </Modal>
        </Row>
      </Container>
      <Container style={style.task}>
        <Row className="tasklist">{renderList()}</Row>
      </Container>
    </Container>
  );
};

export default Taskpage;
