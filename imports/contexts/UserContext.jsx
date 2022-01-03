import React, { useEffect, useState } from 'react';
import { gql } from 'graphql-tag';
import { toast } from 'react-toastify';
toast.configure();
export const UserContext = React.createContext();

export const UserProvider = props => {

        const [user, setUser] = useState("");
        const [isActivated, setIsActivated] = useState(false);
        const [isAdmin, setIsAdmin] = useState(false);
        const [isOwner, setIsOwner] = useState(false);
        const userQuery = gql` query user {user {
            _id
            firstname
            lastname
            mail
            isOwner
            isAdmin
            avatar
            activated
        }}`

    const toast = ({message,type}) => {
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
    const logout = () => {
        Meteor.logout(()=>{
            setUser("")
            props.client.cache.reset();
            props.client.resetStore();
        });
    }
    const loadUser = () => {
        props.client.query({
            query:userQuery,
            fetchPolicy:"network-only"
        }).then(({data})=>{
            if(user != undefined){
                if(user._id != data.user._id){
                    setUser(data.user)
                    setIsOwner(data.user.isOwner)
                    setIsAdmin(data.user.isAdmin)
                    setIsActivated(data.user.activated)
                }
            }
        })
    }

    useEffect = () => {
        this.loadUser();
    }

    return (
        <UserContext.Provider value={{
            user: user,
            isOwner: isOwner,
            isAdmin: isAdmin,
            isActivated: isActivated,
            loadUser: loadUser,
            toast: toast,
            logout: logout,
            client: props.client
        }}>
            {props.children}
        </UserContext.Provider>
    );
}