import React, { useEffect } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import ReactDOM from 'react-dom/client';
import { createStore, taskRemove, titleChanged } from './store';
import { completeTask, getTasks } from './store/task';

export const store = createStore();

const App = (params) => {
  const state = useSelector((store) => store.entities);
  const isLoading = useSelector((store) => store.isLoading);
  const error = useSelector((store) => store.errors.entities);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTasks());
  }, []);

  const changeTitle = (taskId) => {
    dispatch(titleChanged(taskId));
  };

  const deleteTask = (taskId) => {
    dispatch(taskRemove(taskId));
  };

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <h1>App</h1>
      <ul>
        {isLoading ? (
          <h1>Loading...</h1>
        ) : (
          state.map((el) => (
            <li key={el.id}>
              <p>Title: {el.title}</p>
              <p>completed: {`${el.completed}`}</p>
              <button onClick={() => dispatch(completeTask(el.id))}>
                Complete
              </button>
              <button onClick={() => changeTitle(el.id)}>Change title</button>
              <button onClick={() => deleteTask(el.id)}>Delete</button>
              <hr></hr>
            </li>
          ))
        )}
      </ul>
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
