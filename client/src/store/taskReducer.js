import * as actionType from "./types";

const initialState = { tasks: [], isLoading: false };

const TaskReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case actionType.CREATE_TASK:
      return {
        ...state,
        tasks: state.tasks.concat(payload)
      };
    case actionType.EDIT_TASK: {
      return {
        tasks: state.tasks.map(task => {
          if (task.id === payload.id) {
            return Object.assign({}, task, payload.params);
          }
          return task;
        })
      };
    }
    case actionType.FETCH_TASKS_SUCCEEDED:
      return {
        ...state,
        isLoading: false,
        tasks: payload.tasks
      };
    case actionType.CREATE_TASK_SUCCEEDED:
      return {
        ...state,
        tasks: state.tasks.concat(payload.task)
      };
    case actionType.EDIT_TASK_SUCCEEDED:
      const nextTasks = state.tasks.map(task => {
        if (task.id === payload.task.id) {
          return payload.task;
        }
        return task;
      });
      return {
        ...state,
        tasks: nextTasks
      };
    case actionType.FETCH_TASKS_STARTED:
      return {
        ...state,
        isLoading: true
      };

    default:
      return state;
  }
};
export default TaskReducer;
