import { Component } from 'react';
import getMessage from '../../sets/Messages';
import { formatString, sleep } from '../utils/Utils';
import RestService from '../../services/Rest';
import {alertas, confirmacao, error_axios} from '../../services/Alerts';


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
        //swal("Oops!", "Something went wrong!", "success");
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
        confirmacao("Cuidado", "Voce ira deletar o cadastro, deseja continuar?", "warning").then(res => {
            if (res){
                Rest.delete(delUrl+e).then(res => {
                    if (res.data.error) {
                        alertas(res.data, res.data.message);
                    } else {
                        console.log(res.data)
                        confirmacao("Sucesso!", res.data.message, "success").then(res=>{
                            window.location.reload();
                        });
                    }
                }).catch(function (error){
                    error_axios(error)
                });
            };
        });
    }

}


export default Page;