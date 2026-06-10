import { expect } from '@playwright/test';

class Dashboard_page {
    constructor(page) {
        this.page = page;
        this.TITLE_header = page.getByRole('heading', { name: '📚 Minha Biblioteca' });
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
        this.Mensagem_Message_text = page.locator('[id="msg-tipo"]');
        this.MidPageTitle_header = page.getByRole('heading', { name: 'Estatísticas' });
        this.TotalLivrosDisponiveis_TotalBooksAvailable_number = page.locator('.stat-card').filter({ hasText: 'Livros Disponíveis' }).locator('.number');
        this.TotalLivros_TotalBooks_number = page.locator('.stat-card').filter({ hasText: 'Total de Livros' }).locator('.number');
        this.TotalAlunosCadastrados_TotalStudentsRegistered_number = page.locator('.stat-card').filter({ hasText: 'Alunos' }).locator('.number');
        this.TotalArrendamentosPendentes_TotalPendingRents_number = page.locator('.stat-card').filter({ hasText: 'Arrendamentos Pendentes' }).locator('.number');
        this.TotalFuncionarios_TotalEmployees_number = page.locator('.stat-card').filter({ hasText: 'Funcionários' }).locator('.number');
        this.TotalUsuarios_TotalUsers_number = page.locator('.stat-card').filter({ hasText: 'Total de Usuários' }).locator('.number');
        this.TotalAdministradores_TotalAdmins_number = page.locator('.stat-card').filter({ hasText: 'Administradores' }).locator('.number');
        this.EndPageTitle_header = page.locator('h2').filter({ hasText: 'Livros Disponíveis' });
        
        this.bookCards = page.locator('[id="livros-recentes"] .book-card');
        
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

        if (typeof book === 'object' && book.title && book.author) {
            return cards.filter({ hasText: book.title }).filter({ hasText: book.author }).first();
        }

        return cards.filter({ hasText: book }).first();
    }

    async ClickLivroGrelha_BookfromGrid_button(book = 'random') {
        await this.SelectLivro_BookCard_grid(book).click();
    }

}

export default Dashboard_page;
