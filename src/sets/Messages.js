const Msgs = {
    "app.layout.labels.copyright": "Copyright © {0} {1} - desenvolvido por Raynan Serafim",
    "app.layout.labels.show-all": "Mostrar tudo",
    "app.layout.labels.signout": "Sair",
    "app.layout.labels.buttons.ok": "Ok",
    "app.layout.labels.buttons.add": "Adicionar",
    "app.layout.labels.buttons.edit": "Editar",
    "app.layout.labels.buttons.view": "Detalhar",
    "app.layout.labels.buttons.delete": "Excluir",
    "app.layout.labels.buttons.save": "Salvar",
    "app.layout.labels.buttons.cancel": "Cancelar",
    "app.layout.labels.buttons.accept": "Aceitar",
    "app.layout.labels.buttons.deny": "Negar",
    "app.layout.labels.buttons.confirm": "Confirmar",
    "app.layout.labels.buttons.close": "Fechar",
    "app.layout.labels.buttons.maximize": "Maximizar",
    "app.layout.labels.buttons.restore": "Restaurar",
    "app.layout.labels.buttons.decline": "Declinar",
    "app.layout.labels.form.title": "Cadastro",
    "app.layout.labels.table.actions": "Ações",
    "app.layout.labels.table.title": "Lista de Registros",
    "app.layout.labels.table.count": "Página {0} de {1} | {2} registros",
    "app.layout.labels.table.show": "Mostrar ",
    "app.layout.labels.table.entries": " entradas",
    "app.layout.labels.table.emptytitle": "Sem informações cadastradas",
    "app.layout.labels.table.emptytext": "Utilize o botão adicionar para criar novos cadastros.",
    "app.layout.labels.delete.message": "Confirma realmente a exclusão do registro Cód. {0}?",

    "app.layout.topbar.notifications": "Notificações",
    "app.layout.topbar.messages": "Mensagens",

    "app.pages.login.title": "Bem vindo",
    "app.pages.login.google": "Login com Google",
    "app.pages.login.facebook": "Login com Facebook",
    "app.pages.login.enter": "Entrar",
    "app.pages.login.forgot": "Esqueceu a senha?",
    "app.pages.login.signin": "Criar uma nova conta",
    "app.pages.login.remember": "Lembrar-me",
    "app.pages.login.login": "Digite seu login",
    "app.pages.login.password": "Digite sua senha",
    "app.pages.login.success": "Acesso realizado com sucesso",

    "app.pages.404.error": "Página não encontrada",
    "app.pages.404.fail": "Acho que você encontrou uma falha na matrix",
    "app.pages.404.back": "Voltar para o dashboard",

    "app.pages.home.side": "Pagina inicial",
    "app.page.home.title": "Seja bem-vindo!",
    "app.pages.home.cardlabel": "Campo",
    "app.pages.home.cardvalue": "Valor",
    "app.pages.home.label": "campo",
    "app.pages.form.group1": "Dados Pessoais",
    "app.pages.form.group2": "Endereço",

    "app.pages.users.title": "Usuários",
    "app.pages.users.group": "Informações do Usuário",
    "app.pages.users.id": "Cód. ",
    "app.pages.users.name": "Nome",
    "app.pages.users.cpf": "CPF",
    "app.pages.users.pis": "PIS",
    "app.pages.users.username": "Login",
    "app.pages.users.password": "Senha",
    "app.pages.users.role_id": "Grupo de Usuário",
    "app.pages.users.email": "Email",
    "app.pages.users.role_name": "Grupo de Usuário",
    
    "page.user.add.title": "Criar cadastro",
    "page.useredit.add.title": "Atualizar cadastro",
    "page.useredit.fields.email": "Email",
    "page.useredit.fields.nome": "Nome",
    "page.useredit.fields.senha": "Senha",
    "page.useredit.fields.senha_antiga": "Senha antiga",
    "page.useredit.fields.senha_nova1": "Nova senha",
    "page.useredit.fields.senha_nova2": "Repita a nova senha",
    "page.useredit.fields.cpf": "CPF",
    "page.useredit.fields.pis": "PIS",
    "page.useredit.fields.rua": "Rua",
    "page.useredit.fields.numero": "Numero",
    "page.useredit.fields.cep": "CEP",
    "page.useredit.fields.bairro": "Bairro",
    "page.useredit.fields.complemento": "Complemento",
    "page.useredit.fields.municipio": "Municipio",
    "page.useredit.fields.municipio_estado": "Municipio - Estado",
    "page.useredit.fields.estado": "Estado",
    "page.useredit.fields.pais": "Pais",
    "page.useredit.fields.role": "Nivel de acesso",
    "page.user.password.edit.title": "Atualizar Senha",


    "app.pages.address.state": "Estado",
    "app.pages.address.country": "País",
    "app.pages.address.county": "Município",

    "app.pages.users.edit": "Meu cadastro",
    "app.pages.home.subtitle": "Navegar",

}

const getMessage = (path, parameters=[]) => {
    let msgs = Msgs[path];

    for(let i = 0; i < parameters.length; i++) {
        msgs = msgs.replace("{" + i + "}", parameters[i]);
    }
    
    return msgs;
}

export default getMessage;