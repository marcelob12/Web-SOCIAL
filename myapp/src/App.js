import React from 'react';
import Login from './Pages/Login/Login';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import CreatePost from './Pages/CreatePost/CreatePost';
import RouteLogin  from './Components/RouteLogin/RouteLogin';
import Redirect from './Pages/Redirect/Redirect';
import CardContainer from './Components/CardContainer/CardContainer';
import MyFavorites from './Pages/MyFavorites/MyFavorites';
import MyPosts from './Pages/MyPosts/MyPosts'
import UpdatePost from './Pages/UpdatePost/UpdatePost';
import ErrorPage from './Pages/ErrorPage/ErrorPage';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate replace to={"/login"} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Redirect" element={<Redirect />} />
        <Route path="/CardContainer" element={<CardContainer />} />
        <Route path="/CreatePost" element={<CreatePost />} />
        <Route path='/MyFavorites' element={<MyFavorites />}/>
        <Route path='/MyPosts' element={<MyPosts />}/>
        <Route path='/UpdatePost' element={<UpdatePost />}/>
        <Route path='/ErrorPage' element={<ErrorPage />}/>



      <Route
          path="/AdminMain"
          element={
            <RouteLogin role="admin">
              <CardContainer />
            </RouteLogin>
          } />

        <Route
          path="/UserMain"
          element={
            <RouteLogin role="user">
              <CardContainer />
            </RouteLogin>
          } />


          <Route
         path="/*"
          element={
          <ErrorPage/>} />
      </Routes>
      </BrowserRouter>
    
  );
}

export default App;