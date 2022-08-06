import { Component } from 'react';
import getMessage from '../../sets/Messages';
import { formatString, sleep } from '../utils/Utils';
import RestService from '../../services/Rest';
import swal from 'sweetalert';


const Rest = new RestService();

class Page extends Component
{
    constructor(props)
    {
        super(props);
        console.log(props)
        if (!this.props.loggedIn) {
            this.props.onLoadUserRole();
        }

        this.goBack = this.goBack.bind(this);
        this.handleOnClickAdd = this.handleOnClickAdd.bind(this);
        this.handleOnClickEdt = this.handleOnClickEdt.bind(this);
        this.handleOnClickView = this.handleOnClickView.bind(this);
        this.handleOnClickDel = this.handleOnClickDel.bind(this);
    }

    goBack() {
        this.props.history.goBack();
    }

    handleOnClickAdd(e)
    {
        console.log("oia!")
        swal("Oops!", "Something went wrong!", "error");
        /*const addUrl = "/" + this.props.url.split("/")[0] + "/add";
        this.props.history.push(addUrl);*/
    }

    handleOnClickEdt(e)
    {
        const edtUrl = this.props.url_user_edit;
        this.props.history.push({
            pathname: edtUrl,
            state: {item_id: e}
        });
    }

    handleOnClickView(e)
    {
        const viewUrl = this.props.url_user_view;
        this.props.history.push({
            pathname: viewUrl,
            state: {item_id: e}
        });
    }

    handleOnClickDel(e)
    {
        const delUrl = this.props.url_user_delete;
        /*AlertifyConfirm(
            formatString(getMessage('app.layout.labels.delete.message'), [e]),
            () => 
            {
                Rest.delete(delUrl, {}).then(res => {
                    console.log(res, "mensagem")
                    if (res.data.error) {
                        AlertifyError([{message: res.data.message}]);
                    } else {
                        AlertifySuccess([{message: res.data.message}]);
                    }
                }).catch(err => {
                    console.error(err);
                });
            }, null
        );*/
    }

}


export default Page;