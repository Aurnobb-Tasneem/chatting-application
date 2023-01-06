import React, { Component } from 'react'
import App from './components/App';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider
  } from "react-router-dom";

export default class Router extends Component {
  render() {
    return (
      <RouterProvider>
         createBrowserRouter(
            createRoutesFromElements(
              <Route  >
                <Route  path="/" element={<App />} />
                <Route  path="login"  element={<Login />} />
                <Route  path="register"  element={<Register />} />
                {}
              </Route>
              
            )
          ) 
      </RouterProvider>
       
    )
  }
}
