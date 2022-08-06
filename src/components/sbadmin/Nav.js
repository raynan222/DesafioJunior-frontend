import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Icons from '../../sets/Icons';
import getMessage from '../../sets/Messages';
import { Properties } from '../../config';
import { NavTopBarDropDown, NavTopBarUserDropDown } from '../template/Dropdown';
import './Layout.css'

/* eslint-disable */

class NavSideBar extends Component
{
    constructor(props)
    {
        super(props);
        this.handleToggleSidebarClick = this.handleToggleSidebarClick.bind(this);
    }

    static defaultProps = {
        iconBrand: "iconBrand",
        appTitle: Properties.appName,
        menuData: []
    }

    handleToggleSidebarClick(e) 
    {
		e.preventDefault();
		let className = document.getElementsByClassName('sidebar')[0].className;
		let classBodyName = document.getElementsByTagName('body')[0].className;

        if (className.indexOf('toggled') === -1) 
        {
			className = className + " toggled";
			classBodyName = classBodyName + " sidebar-toggled";
		}
        else 
        {
			className = className.replace(" toggled", "");
			classBodyName.replace(" sidebar-toggled", "");
		}

		document.getElementsByClassName('sidebar')[0].className = className;
		document.getElementsByTagName('body')[0].className = classBodyName;
	}

    render()
    {
        let key = 0;
        let colapseId = 0;
        let isAfterGroup = false;
        let isFirstItem = true;

        const genLink = (url, icon, title) => (
            <React.Fragment key={ key++ }>
                { isAfterGroup && <hr className="sidebar-divider my-0" /> }
                <li className="nav-item" key={ key++ }>
                    <Link className="nav-link" to={ url } key={ key++ }>
                        <i className={ Icons[icon] }></i>
                        <span>{ getMessage(title) }</span>
                    </Link>
                </li>
            </React.Fragment>
        );

        const getLabelGroup = (title) => (<div className="sidebar-heading" key={ key++ }>{ getMessage(title) }</div>);
        
        const getColapse = (node) => {
            const topItem = (
                <Link className="nav-link collapsed" to="#" key={ key++ } data-toggle="collapse" data-target={ "#collapse-" + colapseId } aria-expanded="true" aria-controls={ "collapse-" + colapseId }>
                    <i className={ Icons[node.icon] }></i>
                    <span>{ getMessage(node.title) }</span>
                </Link>
            );

            const bodyLinks = node.links.map(elem => 
            {
                let val = "";
                if (elem.type === "label") {
                    val = (<h6 className="collapse-header" key={ key++ }>{ getMessage(elem.title) }</h6>);
                }
                else if (elem.type === "link") {
                    val = (<Link className="collapse-item" to={elem.url} key={ key++ }>{ getMessage(elem.title) }</Link>);
                }

                return val;
            });

            return (
                <React.Fragment key={ key++ }>
                    { isAfterGroup && <hr className="sidebar-divider my-0" /> }
                    <li className="nav-item" key={ key++ }>
                        { topItem }
                        <div id={ "collapse-" + colapseId } key={ key++ } className="collapse" aria-labelledby="headingPages" data-parent="#accordionSidebar">
                            <div className="bg-white py-2 collapse-inner rounded" key={ key++ }>
                                { bodyLinks }
                            </div>
                        </div>
                    </li>
                </React.Fragment>
            );
        }
        
        const menuItens = this.props.menuData.map(item => 
        {
            let val = "";

            if (item.type === 'link') 
            {
                const link = genLink(item.url, item.icon, item.title);
                isAfterGroup = false;
                isFirstItem = false;
                val = link;
            }
            else if (item.type === "colapse") {
                const colapse = getColapse(item);
                colapseId = colapseId + 1;
                isAfterGroup = false;
                isFirstItem = false;
                val = colapse;
            } 
            else if (item.type === 'group')
            {
                const links = item.links.map(lnk => 
                {
                    let vlnk = ""

                    if (lnk.type === "label") {
                        vlnk = getLabelGroup(lnk.title);
                    } 
                    else if (lnk.type === "link") {
                        vlnk = genLink(lnk.url, lnk.icon, lnk.title);
                    } 
                    else if (lnk.type === "colapse") {
                        const colapse = getColapse(lnk);
                        colapseId = colapseId + 1;
                        vlnk = colapse;
                    }

                    return vlnk;
                });

                const group = (
                    <React.Fragment key={ key++ }>
                        {!isFirstItem && <hr className="sidebar-divider" /> }
                        { links }
                    </React.Fragment>
                );
                
                isAfterGroup = true;
                isFirstItem = false;
                val = group;
            }

            return val;
        });

        let firstLine = <hr className="sidebar-divider my-0" />
        
        if (this.props.menuData.length > 0 && this.props.menuData[0].type === "group") {
            firstLine = (<hr className="sidebar-divider" />);
        }

        return (
            <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
                <Link className="sidebar-brand d-flex align-items-center justify-content-center" to="/">
                    <div className="sidebar-brand-icon rotate-n-15">
                        <i className={Icons[this.props.iconBrand]}></i>
                    </div>
                    <div className="sidebar-brand-text mx-3">{ this.props.appTitle }</div>   
                </Link>
                { firstLine } 
                { menuItens }
                <hr className="sidebar-divider d-none d-md-block" />
                <div className="text-center d-none d-md-inline">
                    <button onClick={ this.handleToggleSidebarClick } className="rounded-circle border-0" id="sidebarToggle"></button>
                </div>
            </ul>
        );
    }
}

/*----------------------------------------------------------------------------------------------------*/

class NavTopBar extends Component
{
    render()
    {
        return (
            <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
                <ul className="navbar-nav ml-auto">
                   {/*<NavTopBarDropDown name="notifications" title="app.layout.topbar.notifications" />
                   <NavTopBarDropDown name="messages" title="app.layout.topbar.messages" icon="document" />
                   <div className="topbar-divider d-none d-sm-block"></div>*/}
                   <NavTopBarUserDropDown />
                </ul>
            </nav>
        )
    }
}

/*----------------------------------------------------------------------------------------------------*/

class PaginationPage extends Component {
	constructor(props) {
		super(props);
		this.handleClickPage = this.handleClickPage.bind(this);
	}

	handleClickPage(e) {
		e.preventDefault();
		this.props.onClick(this.props.page);
	}

	render() {
		return (<Link className="page-link" to="#" onClick={this.handleClickPage}>{this.props.text}</Link>)
	}
}

/*----------------------------------------------------------------------------------------------------*/

class Pagination extends Component {
	static defaultProps = {
		numberPagesShow: 5,
		pagination: {
			current: 0,
			pages_count: 0,
			prev: null,
			next: null
		}
	};

	handleUpdatePages() {
		let pages = [];
		let pagesPrior = [];

		let startPage = this.props.pagination.current - this.props.numberPagesShow;
		let endPage = this.props.pagination.current + this.props.numberPagesShow;

		if (startPage < 1) {
			endPage = endPage + Math.abs(startPage) + 1;
			startPage = 1;
		}

		if (endPage >= this.props.pagination.pages_count) {
			startPage = startPage - Math.abs(endPage - this.props.pagination.pages_count);
			endPage = this.props.pagination.pages_count;
		}

		if (startPage < 1) {
			startPage = 1;
		}

		for (let i = startPage; i <= endPage; pages.push(i++));

		let maxDist = -1;

		for (let i = 0; i <= pages.length; i++) {
			let dist = Math.abs(i - pages.indexOf(this.props.pagination.current));
			pagesPrior.push(dist);

			if (maxDist < dist) {
				maxDist = dist;
			}
		}

		let prior = pages.length;

		while (prior > 0) {
			for (let i = 0; i < pagesPrior.length; i++) {
				if (pagesPrior[i] === maxDist) {
					pagesPrior[i] = prior--;
				}
			}

			maxDist = maxDist - 1;
		}

		return {
			pages: pages,
			prior: pagesPrior
		};
	}

	render() {
		const pages = this.handleUpdatePages();

		let key = 1;
		let i = 0;

		const Paginator = pages['pages'].map((page) =>
			<li key={key++} className={"page-item page-item-" + pages['prior'][i++] + " " + (page === this.props.pagination.current ? 'active' : '')}>
				<PaginationPage page={page} text={page} onClick={this.props.onClickPage} />
			</li>
		);

		const PreviousIcon = (
			<span aria-hidden="true">&laquo;</span>
		);

		const Previous = (
			<li className={"page-item-prev page-item" + (this.props.pagination.prev ? '' : ' disabled')}>
				<PaginationPage page={this.props.pagination.prev} text={PreviousIcon} onClick={this.props.onClickPage} />
			</li>
		);

		const NextIcon = (
			<span aria-hidden="true">&raquo;</span>
		);

		const Next = (
			<li className={"page-item-prev page-item" + (this.props.pagination.next ? '' : ' disabled')}>
				<PaginationPage page={this.props.pagination.next} text={NextIcon} onClick={this.props.onClickPage} />
			</li>
		);

		const FirstIcon = (
			<span aria-hidden="true">&laquo;&laquo;</span>
		);

		const First = (
			<li className={"page-item-prev page-item" + (this.props.pagination.pages_count > 0 && this.props.pagination.current > 1 ? '' : ' disabled')}>
				<PaginationPage page={1} text={FirstIcon} onClick={this.props.onClickPage} />
			</li>
		);

		const LastIcon = (
			<span aria-hidden="true">&raquo;&raquo;</span>
		);

		const Last = (
			<li className={"page-item-prev page-item" + (this.props.pagination.pages_count > 0 && this.props.pagination.current < this.props.pagination.pages_count ? '' : ' disabled')}>
				<PaginationPage page={this.props.pagination.pages_count} text={LastIcon} onClick={this.props.onClickPage} />
			</li>
		);

		return (
			<nav aria-label="Navegação">
				<ul className="pagination pagination-sm justify-content-end">
					{First}
					{Previous}
					{Paginator}
					{Next}
					{Last}
				</ul>
			</nav>
		);
	}
}

export { NavSideBar, NavTopBar, Pagination };