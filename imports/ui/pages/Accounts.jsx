import React, { useState, useEffect } from "react"
import { UserContext } from '../../contexts/UserContext';
import { gql } from 'graphql-tag';
import AccountRow from "../molecules/AccountRow";
import { useIsMount } from "../useIsMount";
import _ from 'lodash';

const Accounts = props => {

  const isMount = useIsMount();
  const [active, setActive] = useState('accounts');
  const [userFilter, setUserFilter] = useState('');
  const [accountsRaw, setAccountsRaw] = useState([]);
  const accountsQuery = gql` query accounts {accounts {
    _id
    firstname
    lastname
    mail
    isOwner
    isAdmin
    avatar
    activated
  }}`;
  const accounts = () => {
    return accountsRaw.filter(a=> a.firstname.toLowerCase().includes(userFilter) || a.lastname.toLowerCase().includes(userFilter) || a.mail.toLowerCase().includes(userFilter))
  }
  const handleFilter = value => {
    console.log(value)
    setUserFilter(value);
  }
  const loadAccounts = () => {
    props.client.query({
      query:accountsQuery,
      fetchPolicy:"network-only",
    }).then(({data})=>{
      setAccountsRaw(data.accounts)
    })
  }
  useEffect(() => {
    if(isMount){
      loadAccounts();
    }
  })

  return (
    <div className="page is-variable is-8 columns">
      <div className="column is-narrow">
        <div className="box">
          <p className="menu-label">Administration</p>
          <ul className="menu-list">
            <li onClick={()=>setActive("accounts")}>
              <a className={active == "accounts" ? "is-active" : ""}>
                User Accounts
              </a>
            </li>
            <li onClick={()=>setActive("roles")}>
              <a className={active == "roles" ? "is-active" : ""}>
                User roles
              </a>
            </li>
          </ul>
          <p className="menu-label">Settings</p>
          <ul className="menu-list">
            <li onClick={()=>setActive("settings")}>
              <a className={active == "settings" ? "is-active" : ""}>
                Settings
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="column">
        <div className="box">
          <input className="input is-large" name="usersFilter" onChange={e=>handleFilter(e.target.value)} placeholder='Rechercher un compte ...'/>
        </div>
        <table className="table is-fullwidth is-stripped is-hoverable">
          <thead>
            <tr>
              <td>#</td>
              <td>Name</td>
              <td>Mail</td>
              <td>Activated</td>
              <td>isAdmin</td>
              <td>isOwner</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {accounts().map((a,i) => <AccountRow key={a._id} loadAccounts={loadAccounts} account={a} index={i}/>)}
          </tbody>
        </table>
      </div>
    </div>
  )
}

const withUserContext = WrappedComponent => props => (
  <UserContext.Consumer>
      {ctx => <WrappedComponent {...ctx} {...props}/>}
  </UserContext.Consumer>
)

export default wrappedInUserContext = withUserContext(Accounts);
