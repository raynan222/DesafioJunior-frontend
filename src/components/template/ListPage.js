import React from 'react';
import Page from '../template/BasePage';
import List from '../template/ListLayout';

class ListPage extends Page
{
    constructor(props)
    {
        super(props)
        
        this.state = {
            actions: [
                {
                    text: 'app.layout.labels.buttons.edit',
                    type: 'primary',
                    icon: "edit",
                    onClick: this.handleOnClickEdt,
                },
                {
                    text: 'app.layout.labels.buttons.view',
                    type: 'warning',
                    icon: 'view',
                    onClick: this.handleOnClickView,
                },
                {
                    text: 'app.layout.labels.buttons.delete',
                    type: 'danger',
                    icon: 'delete',
                    onClick: this.handleOnClickDel,
                }
            ]
        }
    }
    
    render() {  
        return (<List title={ this.props.title } buttons={ this.state.buttons } actions={ this.state.actions } url={ this.props.url } fields={ this.props.fields } />);
    }
}

export default ListPage;