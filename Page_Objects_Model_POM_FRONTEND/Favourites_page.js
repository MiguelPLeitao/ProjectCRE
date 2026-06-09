import { expect } from '@playwright/test';

class Favourites_page {
    constructor(page) {
        this.page = page;
        this.TITLE_header = page.getByRole('heading', { name: '❤️ Meus Favoritos' });
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
        this.Mensagem_Message_text = page.getByText('Você ainda não tem livros');
        this.Livro1_Book1_button = page.locator("//div[@id='livros-favoritos']//div[contains(@class,'book-card')]").nth(0);
        this.Livro2_Book2_button = page.locator("//div[@id='livros-favoritos']//div[contains(@class,'book-card')]").nth(1);
        this.Livro3_Book3_button = page.locator("//div[@id='livros-favoritos']//div[contains(@class,'book-card')]").nth(2);
        this.Livro4_Book4_button = page.locator("//div[@id='livros-favoritos']//div[contains(@class,'book-card')]").nth(3);
        this.Livro5_Book5_button = page.locator("//div[@id='livros-favoritos']//div[contains(@class,'book-card')]").nth(4);
        this.Livro6_Book6_button = page.locator("//div[@id='livros-favoritos']//div[contains(@class,'book-card')]").nth(5);
        this.Livro7_Book7_button = page.locator("//div[@id='livros-favoritos']//div[contains(@class,'book-card')]").nth(6);
        this.Livro8_Book8_button = page.locator("//div[@id='livros-favoritos']//div[contains(@class,'book-card')]").nth(7);
        this.Livro9_Book9_button = page.locator("//div[@id='livros-favoritos']//div[contains(@class,'book-card')]").nth(8);
        this.Livro10_Book10_button = page.locator("//div[@id='livros-favoritos']//div[contains(@class,'book-card')]").nth(9);
        this.Livro11_Book11_button = page.locator("//div[@id='livros-favoritos']//div[contains(@class,'book-card')]").nth(10);
        this.Livro12_Book12_button = page.locator("//div[@id='livros-favoritos']//div[contains(@class,'book-card')]").nth(11);
        this.Livro13_Book13_button = page.locator("//div[@id='livros-favoritos']//div[contains(@class,'book-card')]").nth(12);
        this.Livro14_Book14_button = page.locator("//div[@id='livros-favoritos']//div[contains(@class,'book-card')]").nth(13);
        this.Livro15_Book15_button = page.locator("//div[@id='livros-favoritos']//div[contains(@class,'book-card')]").nth(14);
        this.Livro16_Book16_button = page.locator("//div[@id='livros-favoritos']//div[contains(@class,'book-card')]").nth(15);
        this.Livro17_Book17_button = page.locator("//div[@id='livros-favoritos']//div[contains(@class,'book-card')]").nth(16);
        this.Livro18_Book18_button = page.locator("//div[@id='livros-favoritos']//div[contains(@class,'book-card')]").nth(17);
        this.Livro19_Book19_button = page.locator("//div[@id='livros-favoritos']//div[contains(@class,'book-card')]").nth(18);
        this.Livro20_Book20_button = page.locator("//div[@id='livros-favoritos']//div[contains(@class,'book-card')]").nth(19);
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

    async ClickFavoritos_Favorites_button() {
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

    ClickLivro1_Book1_button() {
        this.Livro1_Book1_button.click();
    }

    ClickLivro2_Book2_button() {
        this.Livro2_Book2_button.click();
    }

    ClickLivro3_Book3_button() {
        this.Livro3_Book3_button.click();
    }

    ClickLivro4_Book4_button() {
        this.Livro4_Book4_button.click();
    }

    ClickLivro5_Book5_button() {
        this.Livro5_Book5_button.click();
    }

    ClickLivro6_Book6_button() {
        this.Livro6_Book6_button.click();
    }

    ClickLivro7_Book7_button() {
        this.Livro7_Book7_button.click();
    }

    ClickLivro8_Book8_button() {
        this.Livro8_Book8_button.click();
    }

    ClickLivro9_Book9_button() {
        this.Livro9_Book9_button.click();
    }

    ClickLivro10_Book10_button() {
        this.Livro10_Book10_button.click();
    }

    ClickLivro11_Book11_button() {
        this.Livro11_Book11_button.click();
    }

    ClickLivro12_Book12_button() {
        this.Livro12_Book12_button.click();
    }

    ClickLivro13_Book13_button() {
        this.Livro13_Book13_button.click();
    }

    ClickLivro14_Book14_button() {
        this.Livro14_Book14_button.click();
    }

    ClickLivro15_Book15_button() {
        this.Livro15_Book15_button.click();
    }

    ClickLivro16_Book16_button() {
        this.Livro16_Book16_button.click();
    }

    ClickLivro17_Book17_button() {
        this.Livro17_Book17_button.click();
    }

    ClickLivro18_Book18_button() {
        this.Livro18_Book18_button.click();
    }

    ClickLivro19_Book19_button() {
        this.Livro19_Book19_button.click();
    }

    ClickLivro20_Book20_button() {
        this.Livro20_Book20_button.click();
    }

}

export default Favourites_page;