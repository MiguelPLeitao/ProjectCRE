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

        this.NomeUsuario_UserName_inputfield = page.getByRole('textbox', { name: 'Nome:' });
        this.EmailUsuario_UserEmail_inputfield = page.getByRole('textbox', { name: 'Email:' });
        this.SenhaUsuario_UserPassword_inputfield = page.getByRole('textbox', { name: 'Senha:' });
        this.CriarUsuario_AddUser_button = page.getByRole('button', { name: 'Criar Usuário' });

        this.UsersTable = page.locator('#lista-usuarios');
        this.UserRows = this.UsersTable.locator('tr');

        this.PAGEBODY_allpage = page.locator('body');
    }

    GetUserRow_ById(userId) {
        return this.UsersTable.locator('tr').filter({
            has: this.page.locator(`td:nth-child(1)`, { hasText: String(userId) })
        });
    }


    //example of use: await usersPage.EditUserName_inputfield(2, 'Miguel');
    async EditUserName_inputfield(userId, newName) {
        await this.GetUserRow_ById(userId).locator('td:nth-child(2) input').fill(newName);
    }


    //example of use: await usersPage.EditUserEmail_inputfield(2, 'miguel@test.com');
    async EditUserEmail_inputfield(userId, newEmail) {
        await this.GetUserRow_ById(userId).locator('td:nth-child(3) input').fill(newEmail);
    }


    //example of use: await usersPage.EditUserType_dropdown(2, 'Admin');
    async EditUserType_dropdown(userId, newUserType) {
        await this.GetUserRow_ById(userId).locator('td:nth-child(4) select').selectOption({ label: newUserType });
    }


    //example of use: await usersPage.ClickSave_button(2);
    async ClickSave_button(userId) {
        await this.GetUserRow_ById(userId).getByRole('button', { name: 'Salvar' }).click();
    }

    async ClickDelete_button(userId) {
        await this.GetUserRow_ById(userId).getByRole('button', { name: 'Excluir' }).click();
    }

    //to validate the Name field
    GetUserName_inputfield(userId) {
        return this.GetUserRow_ById(userId)
            .locator('td:nth-child(2) input');
    }

    //to validate the Email field
    GetUserEmail_inputfield(userId) {
        return this.GetUserRow_ById(userId)
            .locator('td:nth-child(3) input');
    }

    //to validate the Type field
    GetUserType_dropdown(userId) {
        return this.GetUserRow_ById(userId)
            .locator('td:nth-child(4) select');
    }


}


export default Admin_AdminUsers_page;