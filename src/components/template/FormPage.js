import React from 'react';
import Page from './BasePage';
import { Form } from './FormLayout';
import { AlertifyError } from '../../services/AlertifyService';
import RestService from '../../services/Rest';

const Rest = new RestService();

class FormPage extends Page
{
    constructor(props) {
        super(props);

        this.state = {
            data: {},
            errors: {},
            loading: false,
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) 
    {
        let data = {}
        let errors = {}

        if (this.state.data) {
            data = this.state.data;
        }

        if (this.state.errors) {
            errors = this.state.errors;
        }

        errors[e.target.name] = {message: ""};
        data[e.target.name] = e.target.value;
        this.setState({data: data, errors: errors});

        console.log(this.state.data)
    }

    handleSubmit(e)
    {
        const method = this.props.request.method.toLowerCase();
        const url = this.props.request.url;
        const params = this.state.data;
        
        this.setState({
            loading: true,
        });

        Rest[method](url, params).then(res => 
        {
            if (res.data.error)
            {
                AlertifyError(res.data.errors.form)
                this.setState({
                    errors: res.data.errors.fields,
                });
            }
            
            this.setState({
                loading: false,
            });
        });
    }

    render()
    {
        return (
            <Form 
                title={ this.props.title } 
                data={ this.props.data } 
                onChange={ this.handleChange } 
                onSubmit={ this.handleSubmit }
                errors={ this.state.errors }
                loading={ this.state.loading }
                onCancel={ this.goBack }
            />
        );
    }

}

export default FormPage