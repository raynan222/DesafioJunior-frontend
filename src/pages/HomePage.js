import React from 'react';
import Page from '../components/template/BasePage';
import { FormPage } from '../components/sbadmin/Layout';
import AuthService from '../services/Auth';
import { sleep } from '../components/utils/Utils';


const Auth = new AuthService();

class HomePage extends Page
{
    constructor(props)
    {
        super(props);
        
        this.state = {
            userName: null,
            loggedIn: false,
        };

        this.handleLoadUserName = this.handleLoadUserName.bind(this);
    }

    handleLoadUserName()
	{
		let scope = this;
		sleep(200).then(function() 
		{
            if (Auth.loggedIn())
            {
                const userName = Auth.getUserName(); 
                
                scope.setState({
                    userName: userName,
                    loggedIn: true,
                });
            }
		});
	}

    componentDidMount() {
        this.handleLoadUserName();
    }

    render()
    {
        if (this.state.loggedIn) {
            return (<FormPage title="app.page.home.title">
                <h3>Lorem Ipsum</h3>
                    <p align="justify">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin leo magna, fringilla eu congue id, imperdiet eu orci. Suspendisse 
                    sapien nibh, vestibulum elementum convallis eget, iaculis non ipsum. Pellentesque vehicula interdum tempor. Suspendisse sollicitudin 
                    purus non iaculis aliquam. Nullam id velit molestie, bibendum libero sit amet, maximus massa. Vestibulum ante ipsum primis in faucibus 
                    orci luctus et ultrices posuere cubilia curae; In justo sem, imperdiet eu tellus et, bibendum sagittis leo. Aenean vehicula maximus aliquet. 
                    Nunc malesuada lectus imperdiet urna volutpat malesuada. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos 
                    himenaeos. Vestibulum ut tortor in elit cursus dapibus. Donec sit amet nisl nec sem laoreet euismod ac egestas eros. Duis non ultricies mauris, 
                    eu facilisis turpis. Pellentesque tortor orci, sagittis eget interdum tristique, fringilla id dui. Aenean non pellentesque mauris.
                    <hr></hr>
                    Aenean porta congue convallis. Nulla eleifend in elit quis interdum. Quisque accumsan ligula vitae rhoncus suscipit. Integer congue turpis non 
                    placerat posuere. Praesent eget elit non dolor congue commodo vitae vitae metus. Nullam dignissim, ipsum ut fermentum sollicitudin, nulla mauris 
                    dapibus sem, eu venenatis mi ligula ut lectus. Mauris fermentum vulputate risus, eu volutpat metus. Nunc posuere laoreet lacus nec vestibulum. 
                    Mauris ullamcorper venenatis turpis quis mattis. Quisque purus tortor, sodales vel augue vitae, congue lacinia leo. Vivamus semper ullamcorper
                    dui vel hendrerit. In tincidunt efficitur porta. Integer sodales nibh in ultricies eleifend. Curabitur suscipit, leo id fringilla pulvinar,
                    sapien quam feugiat leo, sit amet sodales dolor lorem ut mauris. Praesent blandit turpis id tincidunt pharetra. Donec dapibus lectus sit amet
                    fringilla maximus.
                    <hr></hr>
                    Aliquam eu lectus ligula. Sed sed leo non tellus venenatis maximus non vel erat. Nunc molestie elit vel porttitor dictum. Donec non porta nibh.
                    Mauris egestas, tellus nec malesuada ullamcorper, sapien metus aliquet urna, et suscipit est velit quis nulla. Sed nisl nunc, pharetra eu iaculis
                    in, viverra sed tortor. Praesent iaculis elit at arcu mattis convallis. Duis sapien tortor, euismod a condimentum eleifend, pulvinar ac sem. Morbi
                    condimentum enim eget euismod euismod. Praesent non quam ante. Nunc quis imperdiet nunc, vitae suscipit orci. Morbi pulvinar risus at vehicula malesuada.
                    <hr></hr>
                    In lobortis dolor libero, non lacinia quam imperdiet laoreet. Ut lacinia consequat commodo. Etiam tincidunt quis sapien ac mollis. Praesent vitae
                    lorem pretium, tincidunt magna in, maximus tellus. Sed mauris justo, sagittis quis commodo eget, hendrerit at eros. Morbi mauris lectus, fermentum
                    sagittis feugiat non, porta a tellus. In pretium volutpat ex ut vehicula. Proin molestie sed orci vel congue.
                    <hr></hr>
                    Maecenas a velit suscipit, ullamcorper ligula sed, pellentesque nulla. Morbi pellentesque est turpis, in rutrum nunc venenatis sit amet. Nulla 
                    tincidunt orci id lorem malesuada accumsan. Aenean sit amet porta mi. Praesent ante sem, vulputate id velit at, accumsan dictum risus. In a lorem 
                    vitae magna pellentesque bibendum et nec felis. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Fusce at 
                    ligula facilisis, scelerisque tellus sed, porttitor velit. Vivamus nisi ipsum, convallis nec ullamcorper nec, consequat ut dui. Interdum et malesuada
                    fames ac ante ipsum primis in faucibus. Curabitur in nunc vel leo mollis semper ut vitae mi. Nullam fermentum dui malesuada finibus sollicitudin.
                    Duis in neque justo. Etiam sodales risus sed mauris posuere cursus. Vivamus aliquet aliquam neque vitae imperdiet.
                </p>

            </FormPage>)
        }else{
            return (<a></a>)
        }
    }
}




export { HomePage }