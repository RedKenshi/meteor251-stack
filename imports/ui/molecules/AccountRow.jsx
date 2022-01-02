import { padStart } from "lodash";
import React, { Fragment, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import { gql } from 'graphql-tag';
import Button from "../elements/Button";

export const AccountRow = props => {

    //HOOK STATE
    const [modalState, setModalState] = useState(false);
    const [avatarCollection, setAvatarCollection] = useState("spring");

    //GRAPHQL QUERIES AND MUTATIONS
    const setOwnerQuery = gql`mutation setOwner($owner:Boolean!,$_id:String!){
        setOwner(owner:$owner,_id:$_id){
            status
            message
        }
    }`;
    const setAdminQuery = gql`mutation setAdmin($admin:Boolean!,$_id:String!){
        setAdmin(admin:$admin,_id:$_id){
            status
            message
        }
    }`;
    const setAvatarQuery = gql`mutation setAvatar($avatar:String!,$collection:String!,$_id:String!){
        setAvatar(avatar:$avatar,collection:$collection,_id: $_id){
            status
            message
        }
    }`;
    const activateAccountQuery = gql`mutation activateAccount($activate:Boolean!,$_id:String!){
        activateAccount(activate:$activate,_id:$_id){
            status
            message
        }
    }`;
    const deleteAccountQuery = gql`mutation deleteAccount($_id:String!){
        deleteAccount(_id: $_id){
            status
            message
        }
    }`;

    //DATABASE READ AND WRITE
    const setAvatar = a => {
        props.client.mutate({
            mutation:setAvatarQuery,
            variables:{
                avatar:padStart(a.toString(),3,"0"),
                collection:avatarCollection,
                _id:props.account._id
            }
        }).then((data)=>{
            props.loadAccounts();
            setModalState(true)
        })
    }
    const setActivate = activate => {
        props.client.mutate({
            mutation:activateAccountQuery,
            variables:{
                activate:activate,
                _id:props.account._id
            }
        }).then((data)=>{
            props.loadAccounts();
            setModalState(true)
        })
    }
    const setAdmin = admin => {
        props.client.mutate({
            mutation:setAdminQuery,
            variables:{
                admin:admin,
                _id:props.account._id
            }
        }).then((data)=>{
            props.loadAccounts();
            setModalState(true)
        })
    }
    const setOwner = owner => {
        props.client.mutate({
            mutation:setOwnerQuery,
            variables:{
                owner:owner,
                _id:props.account._id
            }
        }).then((data)=>{
            props.loadAccounts();
            setModalState(true)
        })
    }
    const deleteAcc = () => {
        props.client.mutate({
            mutation:deleteAccountQuery,
            variables:{
                _id:props.account._id
            }
        }).then((data)=>{
            props.loadAccounts();
            setModalState(false)
        })
    }

    //CONTENT GETTER
    const getAvatarCollection = () => {
        const avatars = [];
        for (let i = 1; i <= 50; i++) {avatars.push(i)}
        return (
            <div className="flex centered">
                {avatars.map(a=>{
                    return(
                        <figure onClick={()=>setAvatar(a)} key={a} className="image is-64x64 margined8">
                            <img className="pointable" src={"/avatar/" + avatarCollection + "/" + padStart(a.toString(),3,"0") + ".svg"}/>
                        </figure>
                    )
                })}
            </div>
        );
    }
    const getAccountActions = () => {
        console.log("owner:"+props.account.isOwner)
        console.log("admin:"+props.account.isAdmin)
        console.log("===")
        return (
            <Fragment>
                <Button disabled={props.isOwner || props.isAdmin} color="danger" size="small" onClick={()=>setModalState("delete")} icon="fas fa-trash" text="Delete account"/>
            </Fragment>
        )
    }
    const getModalContent = () => {
        switch(modalState){
            case "avatar":{
                return(
                    <div className="columns">
                        <div className="column is-narrow">
                            <div className="box sticky">
                            <p className="menu-label">Categories</p>
                                <ul className="menu-list">
                                    <li onClick={()=>setAvatarCollection("spring")}>
                                        <a className={avatarCollection == "spring" ? "is-active" : ""}>Spring</a>
                                    </li>
                                    <li onClick={()=>setAvatarCollection("halloween")}>
                                        <a className={avatarCollection == "halloween" ? "is-active" : ""}>Halloween</a>
                                    </li>
                                </ul>
                            </div>                    
                        </div>
                        <div className="column">
                            {getAvatarCollection()}
                        </div>
                    </div>
                )
            }
            case "activate":{
                return(
                    <div className="is-info">
                        Activate {props.account.firstname} {props.account.lastname}'s account ?
                    </div>
                )
            }
            case "deactivate":{
                return(
                    <div className="is-info">
                        Deactivate {props.account.firstname} {props.account.lastname}'s account ?
                    </div>
                )
            }
            case "admin":{
                return(
                    <div className="is-info">
                        Give {props.account.firstname} {props.account.lastname}'s account administrator power ?
                    </div>
                )
            }
            case "unadmin":{
                return(
                    <div className="is-info">
                        Remove {props.account.firstname} {props.account.lastname}'s account its administrator power ?
                    </div>
                )
            }
            case "owner":{
                return(
                    <div className="is-info">
                        Give {props.account.firstname} {props.account.lastname}'s account the ownership of the platform ?
                    </div>
                )
            }
            case "unowner":{
                return(
                    <div className="is-info">
                        Remove {props.account.firstname} {props.account.lastname}'s account its ownership of the platform ?
                    </div>
                )
            }
            case "delete":{
                return(
                    <div className="is-info">
                        Delete {props.account.firstname} {props.account.lastname}'s account ?
                    </div>
                )
            }
            default:{
                return(
                    <Fragment>
                        <div className="card evenshadow">
                            <div className="card-content">
                                <div className="media">
                                    <div className="media-left">
                                        <figure onClick={()=>setModalState("avatar")} className="image pointable is-128x128">
                                            <img src={"/avatar/"+props.account.avatar+".svg"} alt="Placeholder image"/>
                                        </figure>
                                    </div>
                                    <div className="media-content">
                                        <p className="title is-4">{props.account.firstname + " " + props.account.lastname}</p>
                                        <p className="subtitle is-6">{props.account.mail}</p>
                                    </div>
                                </div>
                                <div className="content">
                                    <p> Activated : 
                                        {(!props.account.isOwner  ? 
                                            <div className="tags spaced-from-left8 inline has-addons">
                                                <span onClick={()=>setModalState("deactivate")} className={"tag pointable" + (props.account.activated ? " is-dark" : " is-danger")}>Deactivated</span>
                                                <span onClick={()=>setModalState("activate")} className={"tag pointable" + (props.account.activated ? " is-success" : " is-dark")}>Activated</span>
                                            </div>
                                            :
                                            <div className="tags spaced-from-left8 inline has-addons">
                                                <span className={"tag pointable" + (props.account.activated ? " is-success" : " is-danger")}>{(props.account.activated ? "Yes" : "No")}</span>
                                            </div>
                                        )}
                                    </p>
                                    <p> Admin : 
                                        {(!props.account.isOwner  ? 
                                            <div className="tags spaced-from-left8 inline has-addons">
                                                <span onClick={()=>setModalState("unadmin")} className={"tag pointable" + (props.account.isAdmin ? " is-dark" : " is-danger")}>Non</span>
                                                <span onClick={()=>setModalState("admin")} className={"tag pointable" + (props.account.isAdmin ? " is-success" : " is-dark")}>Admin</span>
                                            </div>
                                            :
                                            <div className="tags spaced-from-left8 inline has-addons">
                                                <span className={"tag pointable" + (props.account.isAdmin ? " is-success" : " is-danger")}>{(props.account.isAdmin ? "Yes" : "No")}</span>
                                            </div>
                                        )}
                                    </p>
                                    <p> Owner : 
                                        {(props.isOwner ? 
                                            <div className="tags spaced-from-left8 inline has-addons">
                                                <span onClick={()=>setModalState("unowner")} className={"tag pointable" + (props.account.isOwner ? " is-dark" : " is-danger")}>Non</span>
                                                <span onClick={()=>setModalState("owner")} className={"tag pointable" + (props.account.isOwner ? " is-success" : " is-dark")}>Owner</span>
                                            </div>
                                            :
                                            <div className="tags spaced-from-left8 inline has-addons">
                                                <span className={"tag pointable" + (props.account.isOwner ? " is-success" : " is-danger")}>{(props.account.isOwner ? "Yes" : "No")}</span>
                                            </div>
                                        )}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="box evenshadow flex centered spaced-from-top16">
                            {getAccountActions()}
                        </div>
                    </Fragment>
                )
            }
        }
    }
    const getModalFooter = () => {
        switch(modalState){
            case "avatar":{
                return(
                    <Fragment>
                        <Button color="danger" icon="fas fa-arrow-left" text="Go back" onClick={()=>setModalState(true)}/>
                    </Fragment>
                )
            }
            case "activate":{
                return(
                    <Fragment>
                        <Button color="danger" icon="fas fa-arrow-left" text="Go back" onClick={()=>setModalState(true)}/>
                        <Button color="success" icon="fas fa-check" text="Activate" onClick={()=>setActivate(true)}/>
                    </Fragment>
                )
            }
            case "deactivate":{
                return(
                    <Fragment>
                        <Button color="danger" icon="fas fa-arrow-left" text="Go back" onClick={()=>setModalState(true)}/>
                        <Button color="warning" icon="fas fa-times" text="Deactivate" onClick={()=>setActivate(false)}/>
                    </Fragment>
                )
            }
            case "admin":{
                return(
                    <Fragment>
                        <Button color="danger" icon="fas fa-arrow-left" text="Go back" onClick={()=>setModalState(true)}/>
                        <Button color="success" icon="fas fa-shield-alt" text="Give admin powers" onClick={()=>setAdmin(true)}/>
                    </Fragment>
                )
            }
            case "unadmin":{
                return(
                    <Fragment>
                        <Button color="danger" icon="fas fa-arrow-left" text="Go back" onClick={()=>setModalState(true)}/>
                        <Button color="warning" icon="fas fa-times" text="Remove admin power" onClick={()=>setAdmin(false)}/>
                    </Fragment>
                )
            }
            case "owner":{
                return(
                    <Fragment>
                        <Button color="danger" icon="fas fa-arrow-left" text="Go back" onClick={()=>setModalState(true)}/>
                        <Button color="success" icon="fas fa-award" text="Give ownership" onClick={()=>setOwner(true)}/>
                    </Fragment>
                )
            }
            case "unowner":{
                return(
                    <Fragment>
                        <Button color="danger" icon="fas fa-arrow-left" text="Go back" onClick={()=>setModalState(true)}/>
                        <Button color="warning" icon="fas fa-times" text="Remove ownership" onClick={()=>setOwner(false)}/>
                    </Fragment>
                )
            }
            case "delete":{
                return(
                    <Fragment>
                        <Button color="danger" icon="fas fa-arrow-left" text="Go back" onClick={()=>setModalState(true)}/>
                        <Button color="danger" icon="fas fa-trash" text="Delete" onClick={()=>deleteAcc()}/>
                    </Fragment>
                )
            }
            default:{
                return(
                    <Fragment>
                        <Button color="danger" icon="fas fa-times" text="Close" onClick={()=>setModalState(false)}/>
                    </Fragment>
                )
            }
        }
    }

    return (
        <Fragment>
            <tr>
                <td>{props.index+1}</td>
                <td>{props.account.firstname + " " + props.account.lastname}</td>
                <td>{props.account.mail}</td>
                <td>{(props.account.activated ? <span className="tag is-success">Oui</span> : <span className="tag is-danger">Non</span>)}</td>
                <td className="is-narrow">
                    <Button color="info" size="small" light onClick={()=>setModalState("user")} icon="far fa-user"/>
                </td>
            </tr>
            <div className={"modal" + (modalState != false ? " is-active" : "")}>
                <div className="modal-background"></div>
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">User ID Card</p>
                        <button className="delete" aria-label="close" onClick={()=>setModalState(false)}></button>
                    </header>
                    <section className="modal-card-body">
                        {getModalContent()}
                    </section>
                    <footer className="modal-card-foot">
                        {getModalFooter()}
                    </footer>
                </div>
            </div>
        </Fragment>
    )
}

const withUserContext = WrappedComponent => props => (
    <UserContext.Consumer>
        {ctx => <WrappedComponent {...ctx} {...props}/>}
    </UserContext.Consumer>
)
  
export default wrappedInUserContext = withUserContext(AccountRow);
