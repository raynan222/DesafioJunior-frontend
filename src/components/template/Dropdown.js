import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Icons from '../../sets/Icons';
import getMessage from '../../sets/Messages';
import AuthService from '../../services/Auth';
import RestService from '../../services/Rest';

const Rest = new RestService()
const Auth = new AuthService();

class NavTopBarDropDown extends Component
{   
    static defaultProps = {
        icon: "notification",
        name: "alerts",
        title: "app.layout.labels.notifications",
        count: 2,
        showAllMessage: "app.layout.labels.show-all",
        showAllUrl: "#",
        data: [
            {"url": "#", "type": "warning", "icon": "document", "date": "December 12, 2019", "message": "A new monthly report is ready to download!"},
            {"url": "#", "type": "danger",  "icon": "document", "date": "December 12, 2019", "message": "A new monthly report is ready to download!"}
        ] 
    }

    render()
    {
        let key = 0;
        const itensList = this.props.data.map((item) => 
            <Link className="dropdown-item d-flex align-items-center" to={ item.url } key={ key++ }>
                <div className="mr-3">
                    <div className={ "icon-circle bg-" + item.type }>
                        <i className={ Icons[item.icon] + " text-white" }></i>
                    </div>
                </div>
                <div>
                    <div className="small text-gray-500">{ item.date }</div>
                    <span className="font-weight-bold">{ item.message }</span>
                </div>
            </Link>
        );

        return (
            <li className="nav-item dropdown no-arrow mx-1">
                <Link className="nav-link dropdown-toggle" to="#" id={ this.props.name + "Dropdown" } role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i className={ Icons[this.props.icon] }></i>
                    { this.props.count > 0 && <span className="badge badge-danger badge-counter">{ this.props.count }</span> }
                </Link>
                <div className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby={ this.props.name + "Dropdown" }>
                    <h6 className="dropdown-header">{ getMessage(this.props.title) }</h6>
                    { itensList }
                    <Link className="dropdown-item text-center small text-gray-500" to={ this.props.showAllUrl }>{ getMessage(this.props.showAllMessage) }</Link>
                </div>
            </li>
        )
    }
}

/*----------------------------------------------------------------------------------------------------*/

class NavTopBarUserDropDown extends Component
{   
    constructor(props)
    {
        super(props)
        this.state = {
            name: ""
        }

        this.handleLogout = this.handleLogout.bind(this);
    }

    static defaultProps = {
        icon: "notification",
        title: "app.layout.labels.notifications",
        img: "https://source.unsplash.com/QAB-WJcbgJk/60x60",
        urlSignOut: "#",
        data: [
            {name: "Edita meus dados", url: "/user/edit", icon: "user"},
            {name: "Mudar Senha", url: "/user/password", icon: "password"},
        ]
    }

    componentDidMount()
    {
        const self = this;
        Rest.get("loginview").then(res => {
            self.setState({
                name: res.data.username 
            })
        });
    }

    handleLogout(e)
    {
        e.preventDefault();
        Auth.logout();
    }

    render()
    {
        let key = 0;
        const itensList = this.props.data.map((item) => 
            <Link className="dropdown-item" to={ item.url } key={ key++ }>
                <i className={ Icons[item.icon] + " fa-sm fa-fw mr-2 text-gray-400" }></i>
                { item.name }
            </Link>
        );

        return (
            <li className="nav-item dropdown no-arrow">
                <Link className="nav-link dropdown-toggle" to="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <span className="mr-2 d-none d-lg-inline text-gray-600 small">{ this.state.name }</span>
                    <img className="img-profile rounded-circle" src={ this.props.img } alt={ this.state.name } />
                </Link>
                <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
                    { itensList }
                    <div className="dropdown-divider"></div>
                    <Link className="dropdown-item" to={ this.props.urlSignOut } data-toggle="modal" data-target="#logoutModal" onClick={ this.handleLogout }>
                        <i className={ Icons['signout'] + " fa-sm fa-fw mr-2 text-gray-400" }></i>
                        { getMessage("app.layout.labels.signout") } 
                    </Link>
                </div>
            </li>
        )
    }
}

/*----------------------------------------------------------------------------------------------------*/

class CardDropDown extends Component
{
    static defaultProps = {
        title: "app.layout.topbar.notifications",
        data: [
            {type: "link", label: "app.layout.topbar.notifications", url: "#"},
            {type: "divider"},
            {type: "link", label: "app.layout.topbar.notifications", url: "#"},
        ]
    }

    render()
    {
        let key = 0;

        const links = this.props.data.map(item => 
        {
            let obj = "";

            if (item.type === "link") {
                obj = (<Link className="dropdown-item" to={ item.url } key={ key++ }>{ getMessage(item.label) }</Link>);
            } else if (item.type === "divider") {
                obj = (<div className="dropdown-divider" key={ key++ }></div>);
            }

            return obj;
        });

        return (
            <div className="dropdown no-arrow">
                <a className="dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i className="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                </a>
                <div className="dropdown-menu dropdown-menu-right shadow animated--fade-in" aria-labelledby="dropdownMenuLink">
                    <div className="dropdown-header">{ getMessage(this.props.title) }</div>
                    { links }
                </div>
            </div>
        );
    }
}

export { NavTopBarDropDown, NavTopBarUserDropDown, CardDropDown };