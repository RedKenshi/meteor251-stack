import React, { useEffect, useState } from 'react';
import { gql } from 'graphql-tag';
import { toast as TOASTER } from 'react-toastify';
TOASTER.configure();

export const UserContext = React.createContext();

export const UserProvider = props => {
    const [user, setUser] = useState("loading");
    const [isActivated, setIsActivated] = useState("loading");
    const [isAdmin, setIsAdmin] = useState("loading");
    const [isOwner, setIsOwner] = useState("loading");
    const [avatar, setAvatar] = useState("loading");
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
        console.log(message,type)
        if(type == 'error'){
            TOASTER(message,{type:TOASTER.TYPE.ERROR});
        }
        if(type == 'success'){
            TOASTER(message,{type:TOASTER.TYPE.SUCCESS});
        }
        if(type == 'info'){
            TOASTER(message,{type:TOASTER.TYPE.INFO});
        }
        if(type == 'warning'){
            TOASTER(message,{type:TOASTER.TYPE.WARNING});
        }
    }
    const toastQRM = data => {
        data.map(d=>{
            toast({message:d.message,type:d.status})
        })
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
                    setAvatar(data.user.avatar)
                }
            }
        })
    }

    useEffect (()=>{
        loadUser();
    });

    return (
        <UserContext.Provider value={{
            user: user,
            isOwner: isOwner,
            isAdmin: isAdmin,
            isActivated: isActivated,
            avatar: avatar,
            loadUser: loadUser,
            toast: toast,
            toastQRM: toastQRM,
            logout: logout,
            client: props.client
        }}>
            {props.children}
        </UserContext.Provider>
    );
}