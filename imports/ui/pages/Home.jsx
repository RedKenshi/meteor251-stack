import React, { Component, Fragment } from 'react';

import { UserContext } from '../../contexts/UserContext';

import Navbar from '../navbar/Navbar';

class AppBody extends Component {

    logout = () => {
        this.props.logout()
    }

    render(){
        return (
            <div className="home-container text-light">
                <h1 className="title meteor-title-container">Welcome on <span className="meteor-title">meteor251</span> boilerplate, here's what's embedded :</h1>
                <div className="columns">
                    <div className="column is-one-third">
                        <div className="box margined16 glass home-card">
                            <div className="columns">
                                <div className="is-full">
                                    <h1 className="title">In the front</h1>
                                </div>
                            </div>
                            <div className="columns flexwrap">
                                <div className="column is-narrow">
                                    <figure className="image is-128x128">
                                        <img src="/img/atom.svg"/>
                                    </figure>
                                </div>
                                <div className="column">
                                    <ul>
                                        <li><p>React 17.0.2</p></li>
                                        <li><p>Express 4.17.2</p></li>
                                        <li><p>Apollo Client 3.5.6</p></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="column is-one-third">
                        <div className="box margined16 glass home-card">
                            <div className="columns">
                                <div className="is-full">
                                    <h1 className="title">In the back</h1>
                                </div>
                            </div>
                            <div className="columns flexwrap">
                                <div className="column is-narrow">
                                    <figure className="image is-128x128">
                                        <img src="/img/meteor.svg"/>
                                    </figure>
                                </div>
                                <div className="column">
                                    <ul>
                                        <li><p>Meteor 2.5.1</p></li>
                                        <li><p>Mongo 4.4.4</p></li>
                                        <li><p>Apollo Server 3.5.6</p></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="column is-one-third">
                        <div className="box margined16 glass home-card">
                            <div className="columns">
                                <div className="is-full">
                                    <h1 className="title">Requesting data</h1>
                                </div>
                            </div>
                            <div className="columns flexwrap">
                                <div className="column is-narrow">
                                    <figure className="image is-128x128">
                                        <img src="/img/gql.svg"/>
                                    </figure>
                                </div>
                                <div className="column">
                                    <ul>
                                        <li><p>Graphql 15.8.0</p></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="columns">
                    <div className="column is-one-third">
                        <div className="box margined16 glass home-card">
                            <div className="columns">
                                <div className="is-full">
                                    <h1 className="title">Style</h1>
                                </div>
                            </div>
                            <div className="columns flexwrap">
                                <div className="column is-narrow">
                                    <figure className="image is-128x128">
                                        <img src="/img/sass.svg"/>
                                    </figure>
                                </div>
                                <div className="column">
                                    <ul>
                                        <li><p>Sass 1.45.1</p></li>
                                        <li><p>Bulma 0.9.3</p></li>
                                        <li><p>Gulp 4.0.2</p></li>
                                        <li><p>Gulp-sass 5.0.0</p></li>
                                        <li><p>Node-sass 7.0.0</p></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="column is-one-third">
                        <div className="box margined16 glass home-card">
                            <div className="columns">
                                <div className="is-full">
                                    <h1 className="title">User management</h1>
                                </div>
                            </div>
                            <div className="columns flexwrap">
                                <div className="column is-narrow">
                                    <figure className="image is-128x128">
                                        <img src="/img/team.svg"/>
                                    </figure>
                                </div>
                                <div className="column">
                                    <ul>
                                        <li><p>A user system ready to use, manage admin and platform owner roles, fancy avatars (check them out) and more to come !</p></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="column is-one-third">
                        <div className="box margined16 glass home-card">
                            <div className="columns">
                                <div className="is-full">
                                    <h1 className="title">Ready to code</h1>
                                </div>
                            </div>
                            <div className="columns flexwrap">
                                <div className="column is-narrow">
                                    <figure className="image is-128x128">
                                        <img src="/img/coding.svg"/>
                                    </figure>
                                </div>
                                <div className="column">
                                    <ul>
                                        <li><p>Add routes, pages ...</p></li>
                                        <li><p>Add component, class or functional ...</p></li>
                                        <li><p>Add new styles or overide existing ...</p></li>
                                        <li><p>Let's-a-go</p></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

const withUserContext = WrappedComponent => props => (
    <UserContext.Consumer>
        {ctx => <WrappedComponent {...ctx} {...props}/>}
    </UserContext.Consumer>
  )
  
export default withUserContext(AppBody);