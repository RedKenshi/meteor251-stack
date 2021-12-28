import React, { Component } from 'react';

import { UserContext } from '../../contexts/UserContext';

import Navbar from '../navbar/Navbar';

class AppBody extends Component {

    logout = () => {
        this.props.logout()
    }

    render(){
        return (
            <h1>HOME</h1>
        );
    }
};

const withUserContext = WrappedComponent => props => (
    <UserContext.Consumer>
        {ctx => <WrappedComponent {...ctx} {...props}/>}
    </UserContext.Consumer>
  )
  
export default withUserContext(AppBody);