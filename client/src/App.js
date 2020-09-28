import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Taskpage } from "./imports";
import {
  FetchTaskAsync,
  CreateTaskAsync,
  EditTaskAsync
} from "./store/taskAction";

const App = props => {
  const { FetchTaskAsync } = props;
  useEffect(() => {
    FetchTaskAsync();
  }, [FetchTaskAsync]);

  const onCreateTask = ({ title, description }) => {
    props.CreateNewTask({ title, description });
  };

  const onStatusChange = (id, status) => {
    props.EditTask(id, status);
  };

  console.log(props.tasks, "props.task");
  return (
    <div className="app">
      <Taskpage
        tasks={props.tasks}
        onCreateTask={onCreateTask}
        onStatusChange={onStatusChange}
        isLoading={props.isLoading}
      />
    </div>
  );
};

const mapStateToProps = state => {
  const { tasks, isLoading } = state;
  return {
    tasks,
    isLoading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    FetchTaskAsync: () => dispatch(FetchTaskAsync()),
    CreateNewTask: ({ title, description }) =>
      dispatch(CreateTaskAsync({ title, description })),
    EditTask: (id, status) => dispatch(EditTaskAsync(id, { status }))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
