import React, { Component } from 'react'
import { toast } from 'react-toastify';

export const UserContext = React.createContext();

export class UserProvider extends Component {

    state = {
        user:""
    }

    toast = ({message,type}) => {
        if(type == 'error'){
            toast.error(message);
        }
        if(type == 'success'){
            toast.success(message);
        }
        if(type == 'info'){
            toast.info(message);
        }
        if(type == 'warning'){
            toast.warn(message);
        }
    }
    logout = () => {
        Meteor.logout(()=>{
            this.setState({
                user:""
            })
            this.props.client.cache.reset();
            this.props.client.resetStore();
        });
    }
    loadUser = () => {
        this.setState({
            user:Meteor.user()
        })
    }

    render(){
        return (
            <UserContext.Provider value={{
                user: this.state.user,
                loadUser:this.loadUser,
                toast: this.toast,
                logout: this.logout,
                client: this.props.client
            }}>
                {this.props.children}
            </UserContext.Provider>
        );
    }
}