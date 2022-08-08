import React, { Component } from 'react';
import { PageWrapper, ContentWrapper, MainContentWrapper, FooterWrapper, ScrollToTop } from '../sbadmin/Layout';
import { SplitButtonSmall } from '../sbadmin/Button';
import { NavSideBar } from '../sbadmin/Nav';
import { sleep } from '../utils/Utils';
import getMessage from '../../sets/Messages';
import Menu from '../../sets/Menu';
import AuthService from '../../services/Auth';
import { Properties } from '../../config.js';
import Logo from '../../../public/img/logo-dark.png';
import './BaseLayout.css';

const Auth = new AuthService();

class BaseLayoutScreen extends Component
{
    constructor(props)
    {
        super(props);
        
        this.state = {
            userRole: null,
            userName: null,
            loggedIn: false,
            menuData: [],
        };

        this.handleLoadUserRole = this.handleLoadUserRole.bind(this);
    }

    componentDidMount() {
        this.handleLoadUserRole();
    }

    handleLoadUserRole()
	{
		let scope = this;
		sleep(200).then(function() 
		{
            if (Auth.loggedIn())
            {
                const userRole = Auth.getUserRole(); 
                
                scope.setState({
                    userRole: userRole,
                    loggedIn: true,
                    userName: Auth.getUser(),
                    menuData: Menu[userRole],
                });
            }
		});
	}

    render()
    {
        
        const copyright = getMessage("app.layout.labels.copyright", [Properties.year, Properties.company]);

        return (
            <PageWrapper>
                { this.state.loggedIn && <NavSideBar menuData={ this.state.menuData } /> }
                <ContentWrapper>
                    <MainContentWrapper loggedIn={ this.state.loggedIn }>
                        { this.props.children({ onLoadUserRole: this.handleLoadUserRole, loggedIn: this.state.loggedIn }) }
                    </MainContentWrapper>
                    { 
                        this.state.loggedIn && (
                            <FooterWrapper>
                                { copyright }
                                <a target="_blank" href={ Properties.site }>
                                    <img src={ Logo } alt={ Properties.company } id="logo-copyright" />
                                </a>
                            </FooterWrapper>
                        )
                    }
                    <ScrollToTop />
                </ContentWrapper>
            </PageWrapper>
        );
    }
}

/*----------------------------------------------------------------------------------------------------*/	

class BaseLayoutPage extends Component
{
    static defaultProps = {
        loading: false,
        buttons: null,
    }

    render()
    {   
        let i = 0;
        const buttons = this.props.buttons ? this.props.buttons.map(btn => 
            <SplitButtonSmall text={ btn.text } icon={ btn.icon } type={ btn.type } onClick={ btn.onClick } key={ i++ } />    
        ) : '';
        
        return (
            <React.Fragment>
                <div className="d-sm-flex justify-content-between mb-4">
                    <div className="d-sm-flex">
                        <h1 className="h3 mb-0 text-gray-800">{ getMessage(this.props.title) }</h1>
                        {
                            this.props.loading &&
                            <div className="spinner-grow spinner-grow-sm text-secondary m-2" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        }
                    </div>
                    <div className="d-sm-flex">
                        { buttons }
                    </div>
                </div>
                { this.props.children }
            </React.Fragment>
        );
    }
}

export { BaseLayoutScreen, BaseLayoutPage }