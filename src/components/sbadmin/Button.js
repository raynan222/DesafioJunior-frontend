import React, { Component } from 'react';
import Icons from '../../sets/Icons';
import './Layout.css'
import getMessage from '../../sets/Messages';

class CircleButton extends Component
{
    static defaultProps = {
        icon: "users",
        type: "primary"
    }
    
    render()
    {
        return (
            <button to="#" className={ "btn btn-" + this.props.type + " btn-circle" } onClick={ this.props.onClick } data-toggle="tooltip" data-placement="top" title={ getMessage(this.props.text) }>
                <i className={ Icons[ this.props.icon ] }></i>
            </button>
        );
    }
}

/*----------------------------------------------------------------------------------------------------*/

class CircleButtonSmall extends Component
{
    static defaultProps = {
        icon: "users",
        type: "primary"
    }

    render()
    {
        return (
            <button to="#" className={ "btn btn-" + this.props.type + " btn-circle btn-sm" } onClick={ this.props.onClick } data-toggle="tooltip" data-placement="top" title={ getMessage(this.props.text) }>
                <i className={ Icons[ this.props.icon ] }></i>
            </button>
        );
    }
}

/*----------------------------------------------------------------------------------------------------*/

class CircleButtonLarge extends Component
{
    static defaultProps = {
        icon: "users",
        type: "primary"
    }

    render()
    {
        return (
            <button to="#" className={ "btn btn-" + this.props.type + " btn-circle btn-lg" } onClick={ this.props.onClick } data-toggle="tooltip" data-placement="top" title={ getMessage(this.props.text) }>
                <i className={ Icons[ this.props.icon ] }></i>
            </button>
        );
    }
}

/*----------------------------------------------------------------------------------------------------*/

class SplitButton extends Component
{
    static defaultProps = {
        icon: "users",
        type: "primary",
        text: "app.layout.labels.buttons.ok",
    }

    render()
    {
        return (
            <button className={ "btn btn-" + this.props.type + " btn-icon-split" } onClick={ this.props.onClick }>
                <span className="icon text-white-50">
                    <i className={ Icons[ this.props.icon ] }></i>
                </span>
                <span className="text">{ getMessage(this.props.text) }</span>
            </button>            
        );
    }
}

/*----------------------------------------------------------------------------------------------------*/

class SplitButtonSmall extends Component
{
    static defaultProps = {
        icon: "users",
        type: "primary",
        text: "app.layout.labels.buttons.ok",
    }

    render()
    {
        return (
            <button to="#" className={ "btn btn-" + this.props.type + " btn-icon-split btn-sm" } onClick={ this.props.onClick }>
                <span className="icon text-white-50">
                    <i className={ Icons[ this.props.icon ] }></i>
                </span>
                <span className="text">{ getMessage(this.props.text) }</span>
            </button>            
        );
    }
}

/*----------------------------------------------------------------------------------------------------*/

export { CircleButton, CircleButtonSmall, CircleButtonLarge, SplitButton, SplitButtonSmall };