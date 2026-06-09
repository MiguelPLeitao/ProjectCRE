import { expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

class BuyOrders_page {
    constructor(page) {
        this.page = page;
        this.TITLE_header = page.getByRole('heading', { name: '🛒 Compras' });
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
        this.MidPageTitle_header = page.getByRole('heading', { name: 'Livros Disponíveis para Compra' });
        this.Messagem_Message_text = page.getByText('Nenhum livro disponível para compra.');

        this.bookCards = page.locator('[id="lista-livros-compra"] .book-card');
        this.PAGEBODY_allpage = page.locator('body');
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


    async SelectLivro_BookCard_grid(book = 'random') {
        const cards = this.bookCards;
        const count = await cards.count();

        if (book === 'random') {
            const randomIndex = faker.number.int({ min: 0, max: count - 1 });
            return cards.nth(randomIndex);
        }

        if (typeof book === 'number') {
            return cards.nth(book);
        }

        return cards.filter({ hasText: book }).first();
    }

    async SelectQtdCompraLivro_QntBuyOrderBook_selector_button(book = 'random', quantity = '1') {
        const card = await this.SelectLivro_BookCard_grid(book);

        await card.locator('select').selectOption(String(quantity));
        await card.getByRole('button', { name: 'Comprar' }).click();
    }
}

export default BuyOrders_page;
