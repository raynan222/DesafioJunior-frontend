import React, { Component } from 'react';
import { NavTopBar } from '../../components/sbadmin/Nav';
import Icons from '../../sets/Icons';3
import getMessage from '../../sets/Messages';

class PageWrapper extends Component 
{
    render()
    {
        return (
            <React.Fragment>
                <div id="wrapper">
                    { this.props.children }
                </div>
            </React.Fragment>
        );
    }
}

/* ------------------------------------------------------------------------ */

class ContentWrapper extends Component 
{
    render()
    {
        return (
            <div id="content-wrapper" className="d-flex flex-column">
                { this.props.children }
            </div>
        );
    }
}

/* ------------------------------------------------------------------------ */

class MainContentWrapper extends Component 
{
    render()
    {
        const classContainer = this.props.loggedIn ? "container-fluid" : "container-fluid container-login";
        return (
            <div id="content">
                { this.props.loggedIn && <NavTopBar /> }
                <div className={ classContainer }>
                    { this.props.children }
                </div>
            </div>
        );
    }
}

/* ------------------------------------------------------------------------ */

class FooterWrapper extends Component 
{
    render()
    {
        return (
            <footer className="sticky-footer bg-white">
                <div className="container my-auto">
                    <div className="copyright text-center my-auto">
                        { this.props.children }
                    </div>
                </div>
            </footer>
        );
    }
}

/* ------------------------------------------------------------------------ */

class PageRow extends Component
{
    render() 
    {
        return (
            <div className="row">
                { this.props.children }
            </div>
        );
    }
}

/* ------------------------------------------------------------------------ */

class FormRow extends Component
{
    render()
    {
        return (<div className="form-row">{ this.props.children }</div>);
    }
}

/* ------------------------------------------------------------------------ */

class ScrollToTop extends Component 
{
    render() 
    {
		return (
			<a className="scroll-to-top rounded" href="#page-top">
				<i className={ Icons['toparrow'] } />
			</a>
		)
	}
}

/* ------------------------------------------------------------------------ */

class FormPage extends Component
{
    render()
    {
        return (
            <div className="card m-3 b-1">
                <div className="card-header">
                    <i /> { getMessage(this.props.title) }
                </div>
                <div className="card-body">
                    { this.props.details }
                    { this.props.children }
                </div>
            </div>
        );
    }
}

export { PageWrapper, ContentWrapper, MainContentWrapper, FooterWrapper, PageRow, FormPage, FormRow, ScrollToTop };