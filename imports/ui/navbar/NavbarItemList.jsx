import React, { Fragment,Component } from 'react';
import { useNavigate } from 'react-router-dom';

import DuoIcon from '../elements/DuoIcon';

import { FAFree } from '../elements/FAFree';

export const NavbarItemList = props => {
  const navigate = useNavigate()
  const { menuItems } = props;
  const list = [];
  menuItems.forEach(item => {
    if(item.display){
      list.push(
        <li className="nav-item" name={item.name} key={item.name}>
          <a className="nav-link" key={item.name} onClick={()=>{navigate('/' + item.name)}} style={{textDecoration: 'none'}}>
            <FAFree code={item.icon} color={item.color}/>
            <span className="link-text">{item.label}</span>
          </a>
        </li>
      )
    }
  });
  return (
    list
  );
}