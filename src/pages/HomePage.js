import React from 'react';
import Page from '../components/template/BasePage';
import { BaseLayoutPage } from '../components/template/BaseLayout';
import { CardBordered, CardWithHeader } from '../components/sbadmin/Card';
import { CircleButton, CircleButtonSmall, CircleButtonLarge } from '../components/sbadmin/Button';
import { SplitButton, SplitButtonLarge, SplitButtonSmall, BrandButton } from '../components/sbadmin/Button';
import { PageRow } from '../components/sbadmin/Layout';
import { TextField, CurrencyField, CheckboxField, TextareaField, SaveButton, CancelButton } from '../components/sbadmin/Form';


class HomePage extends Page
{
    
    render()
    {
        return (
        <div>
            <img
                src="https://cataas.com/cat"
            />
        </div>
        );
    }
}




export { HomePage }