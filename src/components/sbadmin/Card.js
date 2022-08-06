import React, {Component} from 'react';
import Icons from '../../sets/Icons';
import getMessage from '../../sets/Messages';
import { CardDropDown } from '../template/Dropdown';

class CardBordered extends Component
{
    static defaultProps = {
        type: "primary",
        icon: "document",
    }

    render()
    {
        return (
            <div className="col-xl-3 col-md-6 mb-4">
                <div className={ "card border-left-" + this.props.type + " shadow h-100 py-2" }>
                    <div className="card-body">
                        <div className="row no-gutters align-items-center">
                            <div className="col mr-2">
                                <div className={"text-xs font-weight-bold text-"+ this.props.type +" text-uppercase mb-1"}>{ getMessage(this.props.label) }</div>
                                <div className="h5 mb-0 font-weight-bold text-gray-800">{ getMessage(this.props.value) }</div>
                            </div>
                            <div className="col-auto">
                                <i className={ Icons[this.props.icon] + " fa-2x text-gray-300" }></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

/*----------------------------------------------------------------------------------------------------*/

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

export { CardBordered, CardWithHeader };