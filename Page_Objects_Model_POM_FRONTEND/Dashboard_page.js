import { expect } from '@playwright/test';

class Dashboard_page {
    constructor(page) {
        this.page = page;
        this.TITLE_Header = page.getByRole('heading', { name: '📚 Minha Biblioteca' });
        this.UserName = page.locator('id="nomeUsuario"');
        this.PAGEBODY_allpage = page.locator('body');

    }
}

export default Dashboard_page;
