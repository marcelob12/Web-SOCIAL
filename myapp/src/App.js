import React from 'react';
import Login from './Pages/Login/Login';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import CreatePost from './Pages/CreatePost/CreatePost';
import RouteLogin  from './Components/RouteLogin/RouteLogin';
import Redirect from './Pages/Redirect/Redirect';
import UserMain from './Pages/UserMain/UserMain';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate replace to={"/login"} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Redirect" element={<Redirect />} />

      <Route
          path="/AdminMain"
          element={
            <RouteLogin role="admin">
              <CreatePost />
            </RouteLogin>
          } />

        <Route
          path="/UserMain"
          element={
            <RouteLogin role="user">
              <UserMain />
            </RouteLogin>
          } />

          </Routes>
      </BrowserRouter>
    
  );
}

export default App;