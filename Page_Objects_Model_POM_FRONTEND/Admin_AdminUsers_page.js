import { expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

class Admin_AdminUsers_page {
    constructor(page) {
        this.page = page;
        this.TITLE_header = page.getByRole('heading', { name: '👨‍💻 Administração de Usuá' });
        this.UserName_text = page.locator('[id="nomeUsuario"]');
        this.UserBadge_text = page.locator('[class="tipo-badge"]');
        this.Sair_LogOut_button = page.getByRole('button', { name: 'Sair' });
        this.Dashboard_button = page.getByRole('link', { name: 'Dashboard' });
        this.Livros_Books_button = page.getByRole('link', { name: 'Livros' });
        this.Favoritos_Favourites_button = page.getByRole('link', { name: 'Favoritos' });
        this.MeusArrendamentos_Rents_button = page.getByRole('link', { name: 'Meus Arrendamentos' });
        this.Admin_Aprovacoes_Approvals_button = page.getByRole('link', { name: 'Aprovações' });
        this.Admin_Compras_BuyOrders_button = page.getByRole('link', { name: 'Compras Admin' });
        this.Admin_Usuarios_AdminUsers_button = page.getByRole('link', { name: 'Usuários (Admin)' });
        this.Compras_BuyOrders_button = page.getByRole('link', { name: 'Compras', exact: true });
        this.MinhasCompras_MyBuyOrders_button = page.getByRole('link', { name: 'Minhas Compras' });
        this.MidPageTitle_header = page.getByRole('heading', { name: 'Criar Funcionário / Admin' });
        this.EndPageTitle_header = page.getByRole('heading', { name: 'Usuários Cadastrados' });
        this.Mensagem_Message_text = page.getByText('Somente administradores podem');

        this.NomeUsuario_UserName_inputfield = page.getByRole('textbox', { name: 'Nome:' });
        this.EmailUsuario_UserEmail_inputfield = page.getByRole('textbox', { name: 'Email:' });
        this.SenhaUsuario_UserPassword_inputfield = page.getByRole('textbox', { name: 'Senha:' });
        this.TipoUsuario_UserType_dropdown = page.getByLabel('Tipo:');
        this.CriarUsuario_AddUser_button = page.getByRole('button', { name: 'Criar Usuário' });

        this.UsersTable = page.locator('#lista-usuarios');
        this.UserRows = this.UsersTable.locator('tr');

        this.PAGEBODY_allpage = page.locator('body');
    }

    async Fill_NovoUsuario_NewUser_inputfields(name, email, senha, userType) {
        await this.NomeUsuario_UserName_inputfield.fill(name);
        await this.EmailUsuario_UserEmail_inputfield.fill(email);
        await this.SenhaUsuario_UserPassword_inputfield.fill(senha);
        await this.TipoUsuario_UserType_dropdown.selectOption({ label: userType });
    }

    async Click_CriarNovoUsuario_AddNewUser_button() {
        await this.CriarUsuario_AddUser_button.click();
    }

    //Select User Row by ID, Name or Email
    async Table_GetUserRow(SearchUserBy_ID_Name_Email) {
        return this.UserRows.filter({
            has: this.page.locator(
                `td:nth-child(1):text("${SearchUserBy_ID_Name_Email}"), ` +
                `input[data-campo="nome"][value="${SearchUserBy_ID_Name_Email}"], ` +
                `input[data-campo="email"][value="${SearchUserBy_ID_Name_Email}"]`
            )
        });
    }


    async Table_GetUserId(userRow) {
        return Number((await userRow.locator('td').first().textContent()).trim()
        );
    }

    //Validate or Edit UserName
    async Table_GetUserName(userRow) {
        return await userRow.locator('input[data-campo="nome"]').inputValue();
    }
    async Table_EditUserName(userRow, newName) {
        await userRow.locator('input[data-campo="nome"]').fill(newName);
    }

    //Validade or Edit UserEmail
    async Table_GetUserEmail(userRow) {
        return await userRow.locator('input[data-campo="email"]').inputValue();
    }
    async Table_EditUserEmail(userRow, newEmail) {
        await userRow.locator('input[data-campo="email"]').fill(newEmail);
    }

    //Validate or Edit UserType
    async Table_GetUserType(userRow, userType) {
        return Number(await userRow.locator('select[data-campo="tipo"]').inputValue());
    }
    async Table_ChangeUserType(userRow, userType) {
        await userRow.locator('select[data-campo="tipo"]').selectOption({ label: userType });
    }

    //Click Save or Delete User
    async Table_ClickSaveChanges(userRow) {
        await userRow.getByRole('button', { name: 'Salvar' }).click();
    }

    async Table_ClickDeleteUser(userRow) {
        await userRow.getByRole('button', { name: 'Excluir' }).click();
    }




    async ClickSair_LogOut_button() {
        await this.Sair_LogOut_button.click();
    }

    async ClickDashboard_button() {
        await this.Dashboard_button.click();
    }

    async ClickLivros_Books_button() {
        await this.Livros_Books_button.click();
    }

    async ClickFavoritos_Favourites_button() {
        await this.Favoritos_Favourites_button.click();
    }

    async ClickMeusArrendamentos_Rents_button() {
        await this.MeusArrendamentos_Rents_button.click();
    }

    async ClickAdmin_Aprovacoes_Approvals_button() {
        await this.Admin_Aprovacoes_Approvals_button.click();
    }

    async ClickAdmin_Compras_BuyOrders_button() {
        await this.Admin_Compras_BuyOrders_button.click();
    }

    async ClickAdmin_Usuarios_AdminUsers_button() {
        await this.Admin_Usuarios_AdminUsers_button.click();
    }

    async ClickCompras_BuyOrders_button() {
        await this.Compras_BuyOrders_button.click();
    }

    async ClickMinhasCompras_MyBuyOrders_button() {
        await this.MinhasCompras_MyBuyOrders_button.click();
    }

}


export default Admin_AdminUsers_page;