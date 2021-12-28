import React, { Component, Fragment } from 'react';
import { UserContext } from '../../contexts/UserContext';

export class FAFree extends Component {

    render() {return (
        <i style={this.props.style} className={"fafree "+ this.props.color + " " + this.props.code}></i>
    )}
}

export default FAFree;