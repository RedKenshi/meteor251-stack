import React, { Component } from 'react';
import { UserContext } from '../../contexts/UserContext';
import Button from '../elements/Button';

class AppBody extends Component {

    state={
        mail:"",
        pass:"",
        newmail:"",
        newpass:"",
        action:"login"
    }

    handleChange = e => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    login = () => {
        Meteor.loginWithPassword(this.state.mail, this.state.pass,
            error=>{
                if(!error){
                    this.props.loadUser();
                }else{
                    this.props.toast("login failed","error")
                }
            }
        );
    }
    register = () => {
        Accounts.createUser({
            email: this.state.mail,
            password: this.state.pass
        })
    }

    render(){
        if(this.state.action == "login"){
            return (
                <div>
                    <h1>Welcome please login or register</h1>
                    <input className="input text" name="mail" placeholder="mail" onChange={this.handleChange}/>
                    <input className="input text" name="pass" placeholder="pass" onChange={this.handleChange}/>
                    <Button onClick={this.login} iconPosition="right" icon="fas fa-arrow-right" color="green" text="Login"/>
                    <Button onClick={()=>this.setState({action:"register"})} iconPosition="left" text="Register"/>
                </div>
            );
        }else{
            return (
                <div>
                    <h1>Welcome please login or register</h1>
                    <input className="input text" name="newmail" placeholder="mail" onChange={this.handleChange}/>
                    <input className="input text" name="newpass" placeholder="pass" onChange={this.handleChange}/>
                    <Button onClick={this.register} iconPosition="right" icon="fas fa-arrow-right" color="green" text="Register"/>
                    <Button onClick={()=>this.setState({action:"login"})} iconPosition="left" color="" text="Log in"/>
                </div>
            );
        }
    }
};

const withUserContext = WrappedComponent => props => (
    <UserContext.Consumer>
        {ctx => <WrappedComponent {...ctx} {...props}/>}
    </UserContext.Consumer>
  )
  
export default withUserContext(AppBody);