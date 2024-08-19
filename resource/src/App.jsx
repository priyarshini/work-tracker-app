import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import {
  Home,
  Landing,
  Register,
  Login,
  Dashboard,
  Error,
  AddTask,
  AllTasks,
  EditTask
} from './pages';

import { action as registerAction } from './pages/Register';
import { action as loginAction } from './pages/Login';
import { loader as dashboardLoader } from './pages/Dashboard';
import { action as addTaskAction } from './pages/AddTask';
import { loader as allTasksLoader } from './pages/AllTasks';
import { loader as addTaskLoader } from './pages/AddTask';
import { loader as editTaskLoader } from './pages/EditTask';
import { action as editTaskAction } from './pages/EditTask';
import { action as deleteTaskAction } from './pages/DeleteTask';
import ErrorElement from './components/ErrorElement';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: 'register',
        element: <Register />,
        action: registerAction,
      },
      {
        path: 'login',
        element: <Login />,
        action: loginAction,
      },
      {
        path: 'dashboard',
        element: <Dashboard />,
        loader: dashboardLoader,
        children: [
          {
            index: true,
            element: <AddTask />,
            action: addTaskAction,
            loader: addTaskLoader,
          },
          {
            path: 'all-tasks',
            element: <AllTasks />,
            loader: allTasksLoader,
            errorElement: <ErrorElement />,
          },
          {
            path: 'edit-task/:id',
            element: <EditTask />,
            loader: editTaskLoader,
            action: editTaskAction,
          },
          { path: 'delete-task/:id',
             action: deleteTaskAction
             },
        ]
      },
    ],
  },
]);

const App = () => {
  return (
      <RouterProvider router={router} />
  );
};
export default App;