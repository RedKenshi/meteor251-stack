import React, { Component } from 'react';
import { gql } from 'graphql-tag';
import { toast } from 'react-toastify';
toast.configure();
export const UserContext = React.createContext();

export class UserProvider extends Component {

    state = {
        user:"",
        userQuery : gql` query user {user {
            _id
            firstname
            lastname
            mail
            isOwner
            isAdmin
            avatar
            activated
          }}`
    }

    toast = ({message,type}) => {
        if(type == 'error'){
            toast(message,{type:toast.TYPE.ERROR,toast});
        }
        if(type == 'success'){
            toast(message,{type:toast.TYPE.SUCCESS});
        }
        if(type == 'info'){
            toast(message,{type:toast.TYPE.INFO});
        }
        if(type == 'warning'){
            toast(message,{type:toast.TYPE.WARNING});
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
        this.props.client.query({
            query:this.state.userQuery,
            fetchPolicy:"network-only"
        }).then(({data})=>{
            if(this.state.user != undefined){
                if(this.state.user._id != data.user._id){
                    this.setState({
                        user:data.user,
                        isOwner:data.user.isOwner,
                        isAdmin:data.user.isAdmin,
                        isActivated:data.user.activated
                    })
                }
            }
        })
    }

    componentDidMount = () => {
        this.loadUser();
    }
    componentDidUpdate = () => {
        this.loadUser();
    }

    render(){
        return (
            <UserContext.Provider value={{
                user: this.state.user,
                isOwner:this.state.isOwner,
                isAdmin:this.state.isAdmin,
                isActivated:this.state.isActivated,
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