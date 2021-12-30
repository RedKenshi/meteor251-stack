import React, { Component, Fragment } from "react"
import { UserContext } from '../../contexts/UserContext';
import { gql } from 'graphql-tag';
import AccountRow from "../molecules/AccountRow";

export class Accounts extends Component {

  state = {
    active:"accounts",
    accountsRaw:[],
    accountsQuery : gql` query accounts {accounts {
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

  loadAccounts = () => {
    this.props.client.query({
      query:this.state.accountsQuery,
      fetchPolicy:"network-only"
    }).then(({data})=>{
      this.setState({
        accountsRaw:data.accounts
      })
    })
  }

  componentDidMount = () => {
    this.loadAccounts();
  }

  render() {
    return (
      <div className="page is-variable is-8 columns">
        <div className="column is-narrow">
          <div className="box">
            <p className="menu-label">Administration</p>
            <ul className="menu-list">
              <li onClick={()=>this.setState({active:"accounts"})}>
                <a className={this.state.active == "accounts" ? "is-active" : ""}>
                  User Accounts
                </a>
              </li>
              <li onClick={()=>this.setState({active:"roles"})}>
                <a className={this.state.active == "roles" ? "is-active" : ""}>
                  User roles
                </a>
              </li>
            </ul>
            <p className="menu-label">Settings</p>
            <ul className="menu-list">
              <li onClick={()=>this.setState({active:"settings"})}>
                <a className={this.state.active == "settings" ? "is-active" : ""}>
                  Settings
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="column">
          <div className="box">
            <input className="input is-large" name="usersFilter" onChange={this.handleFilter} placeholder='Rechercher un compte ...'/>
          </div>
          <table className="table is-fullwidth is-stripped is-hoverable">
            <thead>
              <tr>
                <td>#</td>
                <td>Name</td>
                <td>Mail</td>
                <td>Activated</td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              {this.state.accountsRaw.map((a,i) => <AccountRow loadAccounts={this.loadAccounts} account={a} index={i}/>)}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

const withUserContext = WrappedComponent => props => (
  <UserContext.Consumer>
      {ctx => <WrappedComponent {...ctx} {...props}/>}
  </UserContext.Consumer>
)

export default wrappedInUserContext = withUserContext(Accounts);
