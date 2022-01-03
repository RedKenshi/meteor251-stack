import React, { Component } from 'react';

export default class Button extends Component {

    render = () => {
        if(this.props.text == "Delete account"){
            console.log(this.props.text + ":" + this.props.disabled)
        }
        if(this.props.icon){
            if(this.props.text){
                return (
                    <button disabled={this.props.disabled} onClick={this.props.onClick} className={
                        "button" + 
                        (this.props.size ? " is-"+this.props.size : "") +
                        (this.props.color ? " is-"+this.props.color : "") +
                        (this.props.outlined ? " is-outlined" : "") +
                        (this.props.light ? " is-light": "")
                    }>
                        <span className={"icon"}>
                            <i className={this.props.icon}></i>
                        </span>
                        <span>{this.props.text}</span>
                    </button>
                )
            }else{
                return (
                    <button disabled={this.props.disabled} onClick={this.props.onClick} className={
                        "button" + 
                        (this.props.size ? " is-"+this.props.size : "") +
                        (this.props.color ? " is-"+this.props.color : "") +
                        (this.props.outlined ? " is-outlined" : "") +
                        (this.props.light ? " is-light": "")
                    }>
                        <span className={"icon"}>
                            <i className={this.props.icon}></i>
                        </span>
                    </button>
                )
            }
        }else{
            return (
                <button disabled={this.props.disabled} onClick={this.props.onClick} className={
                    "button" + 
                    (this.props.size ? " is-"+this.props.size : "") +
                    (this.props.color ? " is-"+this.props.color : "") +
                    (this.props.outlined ? " is-outlined" : "") +
                    (this.props.light ? " is-light": "")
                }>
                    {this.props.text}
                </button>
            )
        }
    }
}