import React from 'react';
import { Routes, Route } from "react-router-dom";

import { UserContext } from '../contexts/UserContext';

import Home from './pages/Home.jsx';
import Navbar from './navbar/Navbar';
import Login from './pages/Login.jsx';
import Accounts from './pages/Accounts.jsx';

export const AppBody = props => {
  if(Meteor.userId() != null){
    return (
      <Routes>
        <Route path="/" element={withNavbar(Home)({...props})} />

        <Route exact path="/home" element={withNavbar(Home)({...props})}/>

        <Route exact path="/curriculums" element={withNavbar(Home)({...props})}/>
        
        <Route exact path="/admin" element={withNavbar(Accounts)({...props})}/>
        <Route exact path="/admin/accounts" element={withNavbar(Accounts)({...props})}/>
      </Routes>
    )
  }else{
    return(
      <Routes>
          <Route path="*" element={<Login />} />
      </Routes>
    )
  }
}

const withNavbar = Component => props => (
  <div className="main-container-navbar">
      <Navbar />
      <div className="main-content-navbar">
        <Component {... props}/>
      </div>
  </div>
)
const withoutNavbar = Component => props => (
  <div className="main-container-fullscreen">
        <Component {... props}/>
  </div>
)

const withUserContext = WrappedComponent => props => (
    <UserContext.Consumer>
        {ctx => <WrappedComponent {...ctx} {...props}/>}
    </UserContext.Consumer>
  )
  
export default withUserContext(AppBody);