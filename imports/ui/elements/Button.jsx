import React, { Component } from 'react';

export default class Button extends Component {

    render = () => {
        if(this.props.text == "" && this.props.icon == ""){
            console.error("Either provide text or icon fo button to display")
            return"";
        }
        if(this.props.text && this.props.icon){
            return (
                <button onClick={this.props.onClick} className={"btn icon" + (this.props.color ? " " + this.props.color : " base") + (this.props.icon ? (this.props.iconPosition ? " " + this.props.iconPosition : " right") : "")}>
                    <i className={"fafree " + this.props.icon}></i>
                    {this.props.text}
                </button>
            )
        }
        if(this.props.text){
            return (
                <button onClick={this.props.onClick} className={"btn" + (this.props.color ? " " + this.props.color : " base")}>
                    {this.props.text}
                </button>
            )
        }else{
            return (
                <button onClick={this.props.onClick} className={"btn icon only" + (this.props.color ? " " + this.props.color : " base")}>
                    <i className={"fafree " + this.props.icon}></i>
                </button>
            )
        }
    }
}