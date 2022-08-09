import React, {Component} from 'react';
import Icons from '../../sets/Icons';
import getMessage from '../../sets/Messages';
import { CardDropDown } from '../template/Dropdown';

class CardWithHeader extends Component
{
    render()
    {
        return (       
            <div className={ "col-xl-"+ this.props.size +" col-lg-5" }>
                <div className="card shadow mb-4">
                    {   (this.props.title || this.props.dropdown) &&
                        <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                            <h6 className="m-0 font-weight-bold text-primary">{ getMessage( this.props.title ) }</h6>
                            { this.props.dropdown && <CardDropDown title={ this.props.dropdown.title } data={ this.props.dropdown.data } /> }
                        </div>
                    }   
                    <div className="card-body">
                        { this.props.children }
                    </div>
                </div>
            </div>

        );
    }
}

export { CardWithHeader };