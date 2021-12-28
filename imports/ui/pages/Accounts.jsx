import React, { Component, Fragment } from "react"
import { UserContext } from '../../contexts/UserContext';
import { gql } from 'graphql-tag';


export class Accounts extends Component {

  state = {
    active:"accounts",
    accountsRaw:[],
    accountsQuery : gql` query accounts {accounts {
      _id
      mail
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
      <div className="accounts page page-sidemenu">
        <div className="side-menu-container">
          <div className="side-menu">
            <ul>
              <li onClick={()=>this.setState({active:"accounts"})} className={this.state.active == "accounts" ? "active" : ""}>User Accounts</li>
              <li onClick={()=>this.setState({active:"roles"})} className={this.state.active == "roles" ? "active" : ""}>User roles</li>
              <li onClick={()=>this.setState({active:"settings"})} className={this.state.active == "settings" ? "active" : ""}>Settings</li>
            </ul>
          </div>
        </div>
        <div className="page-content">
          <input className="input text" name="usersFilter" onChange={this.handleFilter} size='massive' icon='search' placeholder='Rechercher un compte ...' />
          <table className="table">
            <thead>
              <tr>
                <td>#</td>
                <td>_id</td>
                <td>mail</td>
              </tr>
            </thead>
            <tbody>
              {this.state.accountsRaw.map((a,i)=>{
                return(
                  <>
                    <tr>
                      <td>{i+1}</td>
                      <td>{a._id}</td>
                      <td>{a.mail}</td>
                    </tr>
                      <tr>
                      <td>{i+1}</td>
                      <td>{a._id}</td>
                      <td>{a.mail}</td>
                    </tr>
                      <tr>
                      <td>{i+1}</td>
                      <td>{a._id}</td>
                      <td>{a.mail}</td>
                    </tr>
                  </>
                )
              })}
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
