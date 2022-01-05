import React from 'react';
import { UserContext } from '../../contexts/UserContext';

const AppBody = props => {
    return (
        <div className="home-container text-light">
            <section className="one-screen-height padded-top128 flex flex-column flex-between">
                <div class="hero is-link is-medium glass padded-left64 between">
                    <figure onClick={()=>setModalState("avatar")} className="image is-192x192">
                        <img src={"/avatar/"+props.avatar+".svg"} alt="Placeholder image"/>
                    </figure>
                    <div class="hero-body">
                        <p class="title">
                            Welcome
                        </p>
                        <p class="subtitle">
                            {props.user.firstname + " " + props.user.lastname}
                        </p>
                    </div>
                </div>
                <div className="margined-bottom64 flex center flex-column align">
                    <h1 className="meteor-title-container">
                        <span className="meteor-title">meteor251</span>
                    </h1>
                    <p>What's inside ?</p>
                    <span class="scrollme-container bounce icon center">
                        <i class="fa fas fa-chevron-down"></i>
                    </span>
                </div>
            </section>
            <section className="one-screen-height padded">
                <div className="columns">
                    <div className="column is-half">
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
                    <div className="column is-half">
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
                                        <li><p>Apollo Server 3.5.6</p></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="columns">
                    <div className="column is-half">
                        <div className="box margined16 glass home-card">
                            <div className="columns">
                                <div className="is-full">
                                    <h1 className="title">Data layer</h1>
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
                                        <li><p>Mongo 4.4.4</p></li>
                                        <li><p>Graphql 15.8.0</p></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="column is-half">
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
                </div>
            </section>
        </div>
    );
};

const withUserContext = WrappedComponent => props => (
    <UserContext.Consumer>
        {ctx => <WrappedComponent {...ctx} {...props}/>}
    </UserContext.Consumer>
  )
  
export default withUserContext(AppBody);