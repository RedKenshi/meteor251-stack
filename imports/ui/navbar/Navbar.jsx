/*BASICS*/
import React, { Fragment } from 'react'
import { useNavigate } from 'react-router-dom';
/*CONTEXT*/
import { UserContext } from '../../contexts/UserContext';
/*ELEMENTS*/
import { FAFree } from '../elements/FAFree';
import { DuoIcon } from '../elements/DuoIcon';
/*COMPONENTS*/
import { NavbarItemList } from './NavbarItemList';

export const Navbar = props => {
  const navigate = useNavigate();
  const menuItems = [
    {
      name:"home",
      active:"home",
      label:"Home",
      display:true,
      icon:"fas fa-home",
      color:"blue"
    },
    {
      name:"yournewroute",
      active:"yournewroute",
      label:"Your new route",
      display:true,
      icon:"fas fa-plus",
      color:"blue"
    }
  ];
  const menuItemsAdmin = [
    {
      name:"admin/accounts",
      active:"admin",
      label:"Administration",
      display:true,
      icon:"fas fa-shield-alt",
      color:"orange"
    }
  ]
  const logout = () => {
    props.logout();
    navigate("/")
  }
  const getMenuItemsList = () =>{
   return (menuItems);
  }
  const getAdminMenuItemsList = () =>{
    if(true || props.user.isAdmin){
      return (menuItemsAdmin);
    }else{
      return ([]);
    }
  }
  const getNavbarItems = () => {
    return(
      <Fragment>
        <hr/>
        <NavbarItemList menuItems={getMenuItemsList()}/>
      </Fragment>
    )
  }
  const getAdminNavbarItems = () => {
    if(true || props.user.isAdmin){
      return(
        <Fragment>
          <hr/>
          <NavbarItemList menuItems={getAdminMenuItemsList()}/>
        </Fragment>
      )
    }else{
      return("")
    }
  }
  return (
    <Fragment>
      <div className="navbar">
        <ul className="navbar-nav">
          <li className="logo" >
            <a className="nav-link nav-link-logo" key={"logout"}>
              <span className="link-text">PLATFORM TITLE</span>
              <DuoIcon name="double-chevron-right" color="blue"/>
            </a>
          </li>
          {getNavbarItems()}
          {(props.isAdmin ? getAdminNavbarItems() : "")}
          <li className="nav-item" name={"logout"}>
            <a href="#" className="nav-link" key={"logout"} onClick={()=>logout()}>
              <FAFree code="fas fa-power-off" color="red"/>
              <span className="link-text">SE DÉCONNECTER</span>
            </a>
          </li>
        </ul>
      </div>
    </Fragment>
  )
}

const withUserContext = WrappedComponent => props => (
  <UserContext.Consumer>
      {ctx => <WrappedComponent {...ctx} {...props}/>}
  </UserContext.Consumer>
)

export default wrappedInUserContext = withUserContext(Navbar);