import React, { Component } from 'react';
import ReactDOM from 'react-dom/client';
import 'semantic-ui-css/semantic.min.css'
import App from './components/App';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import {getAuth,onAuthStateChanged} from "./firebase"
import { redirect } from "react-router-dom";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";






  const router = createBrowserRouter(
    
  createRoutesFromElements(
    loader = async () => {
      const user = await getUser();
      if (!user) {
        return redirect("/login");
      }
    },
    <Route  >
      <Route  path="/" 
      loader={
        async ({user}) => {
          const User = await getUser;
          return User;
        }
      }
      element={<App />} />
      <Route  path="login" 
      loader={async (user) => {
        const User = await user.uid;
        console.log(user.uid)
        if (User) {
          return redirect("/login");
        }
      }}
      element={<Login />} />
      <Route  path="register"  element={<Register />} />
      {}
    </Route>
    
  )
);











const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<RouterProvider router={router} />  

);

