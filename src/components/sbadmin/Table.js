import React, { Component } from 'react';
import getMessage from '../../sets/Messages';
import { CircleButtonSmall } from '../sbadmin/Button'
import './Layout.css';

function findField (item, field){
    let campo = item[field]
    
    if (typeof field === 'string' && field.includes(".")) {
        let campos = field.split(".")
        campo = item[campos[0]][campos[1]]
    }

    return campo
}

class TableRegisters extends Component
{
    static defaultProps = {
        fields: [],
        data: []
    }




    render()
    {
        let i = 0;
        
        const labels = this.props.fields.length > 0 && this.props.data.length > 0 ? this.props.fields.map(item => (
            <th key={ i++ } tabIndex="0" aria-controls="dataTable" rowSpan="1" colSpan="1" width={ item.width }>{ getMessage(item.label) }</th>
        )) : undefined;
        
        const actLabel = this.props.actions && this.props.data.length > 0 ? <th className="actions-title">{ getMessage("app.layout.labels.table.actions") }</th> : undefined;
        i = 0;
        
        const fields = this.props.data.map(item => {
            let actBtns;

            if (this.props.actions && this.props.data.length > 0) 
            {
                actBtns = this.props.actions.map(act => (
                    <CircleButtonSmall icon={ act.icon } type={ act.type } onClick={ () => act.onClick(item['id']) } text={ act.text } key={ i++ } />
                ));

                actBtns = <td className="actions-data d-inline-flex mr-auto mb-auto justify-content-center">{ actBtns }</td>
            }
            
            return (
                <tr role="row" key={ i++ }>
                    {
                        this.props.fields.map( fld => (
                            <td className="align-middle" key={ i++ } width={ fld.width }>{ findField(item, fld.name) }</td>
                        ))
                    }
                    { actBtns }
                </tr>
            );
        });

        return (
            <div className="col-sm-12">
                <table id="dataTable" className="table table-bordered dataTable table-striped table-sm" role="grid" aria-describedby="dataTable_info" cellSpacing="0">
                    <thead><tr role="row">{ labels }{ actLabel }</tr></thead>
                    <tfoot><tr role="row">{ labels }{ actLabel }</tr></tfoot>
                    <tbody>{ fields }</tbody>
                </table>
            </div>
        );
    }
}

export { TableRegisters };