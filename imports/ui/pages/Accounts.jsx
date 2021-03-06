import React, { useState, useEffect } from "react"
import { UserContext } from '../../contexts/UserContext';
import { gql } from 'graphql-tag';
import AccountRow from "../molecules/AccountRow";
import _ from 'lodash';

const Accounts = props => {

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
    return accountsRaw.filter(a=> a.firstname.toLowerCase().includes(userFilter.toLowerCase()) || a.lastname.toLowerCase().includes(userFilter.toLowerCase()) || a.mail.toLowerCase().includes(userFilter.toLowerCase()))
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
    loadAccounts();
  })

  return (
    <div className="page padded is-8 columns">
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
          <input className="input is-large" name="usersFilter" onChange={e=>handleFilter(e.target.value)} placeholder='Search account by name or mail ...'/>
        </div>
        <table className="table is-fullwidth is-stripped is-hoverable">
          <thead>
            <tr>
              <td>#</td>
              <td></td>
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