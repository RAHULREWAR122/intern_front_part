import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';

import Login from './Components/Login/Login';
import SignUp from './Components/SignUp/SignUp';
import UserDetails from './Components/UserDetails/UserDetails';
import { store } from './Reducer/store';


const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <SignUp /> },
  { path: "/user/:id", element: <UserDetails /> }
]);

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
