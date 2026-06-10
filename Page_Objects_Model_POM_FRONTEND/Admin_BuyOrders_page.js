import { expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

class Admin_BuyOrders_page {
    constructor(page) {
        this.page = page;
        this.TITLE_header = page.getByRole('heading', { name: '📦 Compras - Administração' });
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
        this.MidPageTitle_header = page.getByRole('heading', { name: 'Compras Registradas' });
        this.Mensagem_Message_text = page.getByText('Nenhuma compra registrada.');


        this.BuyOrderCards = page.locator('[id="lista-compras-admin"] .book-card');

        this.PAGEBODY_allpage = page.locator('body');
    }

    async SelectBuyOrder_gridCard(buyOrder = 'random') {
        const buyordercards = this.BuyOrderCards;
        const count = await buyordercards.count();

        if (buyOrder === 'random') {
            const randomIndex = faker.number.int({ min: 0, max: count - 1 });
            return buyordercards.nth(randomIndex);
        }

        if (typeof buyOrder === 'number') {
            return buyordercards.nth(buyOrder);
        }

        return buyordercards.filter({ hasText: buyOrder }).first();
    }

    async AprovarCompra_ApproveBuyOrder(buyOrder = 'random') {
        const buyOrderCard = await this.SelectBuyOrder_gridCard(buyOrder);

        await buyOrderCard.getByRole('button', { name: 'Aprovar' }).click();
    }

    async RejeitarCompra_RejectBuyOrder(buyOrder = 'random') {
        const buyOrderCard = await this.SelectBuyOrder_gridCard(buyOrder);

        await buyOrderCard.getByRole('button', { name: 'Cancelar' }).click();

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
        this.Admin_Aprovacoes_Approvals_button.click();
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

export default Admin_BuyOrders_page;