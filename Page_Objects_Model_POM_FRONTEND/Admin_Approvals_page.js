import { expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

class Admin_Approvals_page {
    constructor(page) {
        this.page = page;
        this.TITLE_header = page.getByRole('heading', { name: '✅ Aprovação de Arrendamentos' });
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
        this.MidPageTitle_header = page.getByRole('heading', { name: 'Arrendamentos Pendentes' });
        this.Mensagem1_Message1_text = page.locator('#lista-pendentes').getByText('Nenhum arrendamento');
        this.EndPageTitle_header = page.getByRole('heading', { name: 'Todos os Arrendamentos' });
        this.Mensagem1_Message1_text = page.locator('#lista-todos').getByText('Nenhum arrendamento');

        this.PendingRentCards = page.locator('[id="lista-pendentes"] .book-card');
        this.AllRentCards = page.locator('[id="lista-todos"] .book-card');

        this.PAGEBODY_allpage = page.locator('body');
    }

    async SelectPending_Rent_gridCard(userID = 'random', bookID) {
        const pendingcards = this.PendingRentCards;
        const count = await pendingcards.count();

        if (userID === 'random') {
            const randomIndex = faker.number.int({ min: 0, max: count - 1 });
            return pendingcards.nth(randomIndex);
        }

        if (typeof userID === 'number') {
            return cards.nth(userID);
        }

        return pendingcards.filter({ hasText: userID })
        .filter({ hasText: bookID })
        .filter({ hasText: 'PENDENTE' })
        .first();
    }

    async AprovarArrendamento_ApproveRent(userID = 'random', bookID) {
        const pendingCard = await this.SelectPending_Rent_gridCard(userID, bookID);

        await pendingCard.getByRole('button', { name: 'Aprovar' }).click();
    }

    async RejeitarArrendamento_RejectRent(userID = 'random', bookID) {
        const pendingCard = await this.SelectPending_Rent_gridCard(userID, bookID);

        await pendingCard.getByRole('button', { name: 'Rejeitar' }).click();

    }

    async Select_Rent_gridCard(userID = 'random', bookID, status) {
        const rentcards = this.AllRentCards;
        const count = await rentcards.count();

        if (userID === 'random') {
            const randomIndex = faker.number.int({ min: 0, max: count - 1 });
            return rentcards.nth(randomIndex);
        }

        if (typeof userID === 'number') {
            return rentcards.nth(userID);
        }

        return rentcards.filter({ hasText: userID })
        .filter({ hasText: bookID })
        .filter({ hasText: status })
        .first();
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

export default Admin_Approvals_page;