import { expect } from '@playwright/test';

class BookDetails_page {
    constructor(page) {
        this.page = page;
        this.TITLE_header = page.getByRole('heading', { name: '📚 Detalhes do Livro' });
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
        this.ImagemLivro_BookImage_image = page.locator('.book-image');
        this.DetalhesLivro_bookDetails_box = page.locator('#livro-detalhes');
        this.InfoLivro_BookInfo_text = this.DetalhesLivro_bookDetails_box.locator('.book-info');
        this.TituloLivro_BookTitle_text = this.InfoLivro_BookInfo_text.locator('h2');
        this.AdicionarFavoritos_AddToFavourites_button = page.getByRole('button', { name: '🤍 Adicionar aos Favoritos' });
        this.RemoverFavoritos_RemoveFromFavourites_button = page.getByRole('button', { name: '❤️ Remover dos Favoritos' });
        this.ApagarLivro_DeleteBook_button = page.getByRole('button', { name: '🗑️ Deletar Livro' });
        this.VoltarPaginaLivros_BacktoBooksPage_button = page.getByRole('button', { name: '← Voltar' });
        this.PAGEBODY_allpage = page.locator('body');
    }


    GetBookInfo_Item(text) {
        return this.InfoLivro_BookInfo_text.locator('.info-item').filter({
            has: this.page.locator('strong', { hasText: text })
        });
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

    async ClickAdicionarFavoritos_AddToFavourites_button() {
        await this.AdicionarFavoritos_AddToFavourites_button.click();
    }

    async ClickRemoverFavoritos_RemoveFromFavourites_button() {
        await this.RemoverFavoritos_RemoveFromFavourites_button.click();
    }

    async ClickApagarLivro_DeleteBook_button() {
        await this.ApagarLivro_DeleteBook_button.click();
    }

    async ClickVoltarPaginaLivros_BacktoBooksPage_button() {
        await this.VoltarPaginaLivros_BacktoBooksPage_button.click();
    }

}


export default BookDetails_page;