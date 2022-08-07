import React, { Component } from 'react';
import getMessage from '../../sets/Messages';
import { formatString } from '../utils/Utils';
import { CardWithHeader } from '../sbadmin/Card';
import { PageRow } from '../sbadmin/Layout';
import { BaseLayoutPage } from '../template/BaseLayout';
import { TableRegisters } from '../sbadmin/Table';
import './BaseLayout.css';
import RestService from '../../services/Rest';
import { Pagination } from '../sbadmin/Nav';

const Rest = new RestService();

class List extends Component
{    
    _isMounted = false;

    constructor(props)
    {
        super(props);

        this.state = {
            data: [],
            actions: undefined,
            loading: false,
            entries: 10,
            pagination: {
                current: 1,
                itens_count: null,
                itens_per_page: null,
                next: null,
                pages_count: null,
                prev: null
            }
        }

        this.loadList = this.loadList.bind(this);
        this.handleChangeEntries = this.handleChangeEntries.bind(this);
        this.handleOnClickPage = this.handleOnClickPage.bind(this);
    }

    static defaultProps = {
        range: [10, 25, 50, 100],
        size: 12,
    }

    componentDidMount() {
        this.loadList();
    }

    loadList(entries=undefined)
    {
        if (entries === undefined) {
            entries = this.state.entries;
        }

        this._isMounted = true;
        const self = this;
        
        if (this._isMounted) {
            self.setState({loading: true});
        }
        
        const params = {
            page: this.state.pagination.current,
            rows_per_page: entries,
        }

        Rest.get(this.props.url, params).then(res => 
        {
            if (!res.data.error && self._isMounted) {
                self.setState({data: res.data.itens, pagination: res.data.pagination});    
            }

            if (self._isMounted) {
                self.setState({loading: false});
            }
        }).catch(err => {
            console.error(err);

            if(self._isMounted) {
                self.setState({loading: false});
            }
        })
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    handleChangeEntries(e) 
    {
        this.setState({entries: e.target.value});
        this.loadList(e.target.value);
    }

    handleOnClickPage(e)
    {
        let pagination = this.state.pagination;
        pagination.current = e;

        this.setState({pagination: pagination});
        this.loadList();
    }

    render()
    {
        let i = 0;
        const entries = this.props.range.map(num => <option value={ num } key={ i++ }>{ num }</option>);

        return (
            <BaseLayoutPage title={ this.props.title } loading={ this.state.loading } buttons={ this.props.buttons } > 
                <PageRow>
                    <CardWithHeader title={ "app.layout.labels.table.title" }  size={ this.props.size } >
                        { this.state.data && this.state.data.length > 0 &&
                            <PageRow>
                                <div className="col-sm-12 col-md-6">
                                    <div className="dataTables_length" id="dataTable_length">
                                        { getMessage("app.layout.labels.table.show") }
                                        <label>
                                            <select name="dataTable_length" aria-controls="dataTable" className="custom-select custom-select-sm form-control form-control-sm" onChange={ this.handleChangeEntries }>
                                                { entries }
                                            </select>
                                        </label> 
                                        { getMessage("app.layout.labels.table.entries") }
                                    </div>
                                </div>
                            </PageRow>
                        }
                        {   this.state.data.length > 0 &&
                            <PageRow>
                                <TableRegisters actions={ this.props.actions } reload={ this.loadList } data={ this.state.data } fields={ this.props.fields } />
                            </PageRow>
                        }
                        {
                            (this.state.data.length === 0 && !this.state.loading) &&
                            <div className="d-flex flex-column resource-empty">
                                <div className="error mx-auto error-empty" data-text={ getMessage('app.layout.labels.table.emptytitle') }>{ getMessage('app.layout.labels.table.emptytitle') }</div>
                                <p className="text-gray-500 mb-0">{ getMessage("app.layout.labels.table.emptytext") }</p>
                            </div>
                        }
                        {
                            this.state.pagination.itens_count && 
                            (
                                <div className="d-flex justify-content-between">
                                    <p className="align-middle">{ formatString(getMessage('app.layout.labels.table.count'), [
                                        this.state.pagination.current,
                                        this.state.pagination.pages_count,
                                        this.state.pagination.itens_count
                                    ]) }</p>
                                    <Pagination pagination={ this.state.pagination } onClickPage={ this.handleOnClickPage } />
                                </div>
                            )
                        }
                    </CardWithHeader>
                </PageRow>
            </BaseLayoutPage>
        );
    }
}

export default List;