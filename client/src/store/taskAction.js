import * as actionType from "./types";
import * as axiosInstance from "./axiosInstance";

/* Synchronous action creator */
const createTask = task => {
  return {
    type: actionType.CREATE_TASK,
    payload: {
      task
    }
  };
};

const createTaskSucceeded = task => {
  return {
    type: actionType.CREATE_TASK_SUCCEEDED,
    payload: {
      task
    }
  };
};
export const CreateTaskAsync = ({
  title,
  description,
  status = "Not Started"
}) => {
  return dispatch => {
    axiosInstance.createTask({ title, description, status }).then(resp => {
      dispatch(createTaskSucceeded(resp.data));
    });
  };
};

/* Synchronous action creator */
export const editTask = (id, params = {}) => {
  return {
    type: actionType.EDIT_TASK,
    payload: {
      id,
      params
    }
  };
};

export const editTaskSucceeded = task => {
  return {
    type: actionType.EDIT_TASK_SUCCEEDED,
    payload: {
      task
    }
  };
};

const getTaskById = (tasks, id) => {
  return tasks.find(task => task.id === id);
};
export const EditTaskAsync = (id, params = {}) => {
  return (dispatch, getState) => {
    const task = getTaskById(getState().tasks.tasks, id);
    const updatedTask = Object.assign({}, task, params);

    axiosInstance.editTask(id, updatedTask).then(resp => {
      dispatch(editTaskSucceeded(resp.data));
    });
  };
};

/* Synchronous action creator */
const fetchTasksSucceeded = tasks => {
  return {
    type: actionType.FETCH_TASKS_SUCCEEDED,
    payload: {
      tasks
    }
  };
};

export const FetchTaskAsync = () => {
  return dispatch => {
    axiosInstance.fetchTask().then(resp => {
      dispatch(fetchTasksSucceeded(resp.data));
    });
  };
};

const fetchTaskStarted = () => {
  return {
    type: actionType.FETCH_TASKS_STARTED
  };
};

export const FetchTaskStartedAsync = () => {
  return dispatch => {
    dispatch(fetchTaskStarted());
    axiosInstance.fetchTask().then(resp => {
      setTimeout(() => {
        dispatch(fetchTaskStarted(resp.data));
      }, 2000);
    });
  };
};
