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
        this.Favoritos_Favorites_button = page.getByRole('link', { name: 'Favoritos' });
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
}