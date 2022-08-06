import React, { Component } from 'react';
import { CardWithHeader } from '../sbadmin/Card';
import { BaseLayoutPage } from '../template/BaseLayout';
import { PageRow } from '../sbadmin/Layout';
import { 
    TextField, CurrencyField, CheckboxField,
    TextareaField, SelectField, SaveButton, CancelButton 
} from '../sbadmin/Form';

class Form extends Component
{       
    static defaultProps = {
        title: "app.layout.labels.form.title",
        data: [],
        errors: {},
        loading: false,
    }
    
    goBack() {
        this.props.history.goBack();
    }

    render()
    {
        let i = 0;

        const generateField = (fld, key) =>
        {
            const textFieldtype = ["cpf", "cnpj", "plate", "phone", "cellphone", "date", "datetime", "text", "password"];
            let element = "";
            
            if (textFieldtype.indexOf(fld.represent) >= 0) {
                element = (<TextField { ...fld }  onChange={ this.props.onChange } error={ this.props.errors[fld.name] } key={ key } />);
            } else if (fld.represent === "money") {
                element = (<CurrencyField {...fld} onChange={ this.props.onChange } error={ this.props.errors[fld.name] } key={ key } />);
            } else if (fld.represent === "textarea") {
                element = (<TextareaField {...fld} onChange={ this.props.onChange } error={ this.props.errors[fld.name] } key={ key } />);
            } else if (fld.represent === "select") {
                element = (<SelectField {...fld} onChange={ this.props.onChange } error={ this.props.errors[fld.name] } key={ key } />);
            } else if (fld.represent === "checkbox") {
                element = (<CheckboxField {...fld} onChange={ this.props.onChange } error={ this.props.errors[fld.name] } key={ key } />);
            }

            return element;
        }

        const groups = this.props.data.map(grp => {
            let item = "";

            if (grp.type === "group")
            {
                const fields = grp.fields.map(row => (
                    <PageRow key={i++}>{ row.map(fld => (generateField(fld, i++))) }</PageRow>
                ));

                item = (
                    <PageRow key={ i++ }>
                        <CardWithHeader title={ grp.label } size={ grp.size } >    
                            {fields}
                        </CardWithHeader>
                    </PageRow>
                );
            } else if (grp.type === "buttons")
            {
                item = (
                    <div className="btn-form" key={i++}>
                        <SaveButton onClick={ this.props.onSubmit }/>
                        <CancelButton onClick={ this.goBack } />
                    </div>
                );
            }

            return item;
        });

        return (
            <BaseLayoutPage title={ this.props.title } loading={ this.props.loading }> 
                { groups }
            </BaseLayoutPage>
        );
    }
}

export { Form };