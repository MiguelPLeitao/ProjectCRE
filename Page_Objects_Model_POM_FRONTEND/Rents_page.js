import { expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

class Rents_page {
    constructor(page) {
        this.page = page;
        this.TITLE_header = page.getByRole('heading', { name: '📅 Meus Arrendamentos' });
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
        this.MidPageTitle_header = page.getByRole('heading', { name: 'Solicitar Novo Arrendamento' });
        this.SelecionarLivro_SelectBook_dropdown = page.locator('[id="livroSelect"]');
        this.SelecionarDataInicio_StartDate_datepicker = page.locator('[id="dataInicio"]');
        this.SelecionarDataFim_EndDate_datepicker = page.locator('[id="dataFim"]');
        this.SolicitarArrendamento_RequestRent_button = page.getByRole('button', { name: 'Solicitar Arrendamento' });
        this.EndPageTitle_header = page.getByRole('heading', { name: 'Meus Arrendamentos', exact: true });
        this.Messagem_Message_text = page.getByText('Nenhum arrendamento');

        this.RentCards = page.locator('[id="lista-arrendamentos"] .book-card');

        this.PAGEBODY_allpage = page.locator('body');
    }

    async Select_Book_dropdown(BookName = 'random') {
        if (BookName === 'random') {
            const optionsLength = await this.SelecionarLivro_SelectBook_dropdown.evaluate(
                select => select.options.length
            );
            const randomIndex = faker.number.int({ min: 0, max: optionsLength - 1 });
            const randomValue = await this.SelecionarLivro_SelectBook_dropdown.evaluate(
                (select, index) => select.options[index].value,
                randomIndex
            );
            await this.SelecionarLivro_SelectBook_dropdown.selectOption(randomValue);
        } else {
            await this.SelecionarLivro_SelectBook_dropdown.selectOption({ label: BookName });
        }
    }

    async Select_StartDate_datepicker(dateString = null) {
        let date;

        if (dateString === null) {
            // Generate a random date
            date = faker.date.future({ days: 180 });
        } else {
            // Convert string "15/07/2026" to Date object
            const [day, month, year] = dateString.split('/');
            date = new Date(`${year}-${month}-${day}`);
        }

        // Format to dd/mm/yyyy
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        const formatted = `${year}-${month}-${day}`;

        // Fill the input with the formatted date
        await this.SelecionarDataInicio_StartDate_datepicker.fill(formatted);

        // Save the date so we can use it in Select_EndDate_datepicker
        this.startDate = date;
    }

    async Select_EndDate_datepicker(dateString = null) {
        let date;

        if (dateString === null) {
            // Generate a random date that's after the start date
            const nextDay = new Date(this.startDate);
            nextDay.setDate(nextDay.getDate() + 1);
            date = faker.date.future({ days: 180, refDate: nextDay });
        } else {
            // Convert string "25/08/2026" to Date object
            const [day, month, year] = dateString.split('/');
            date = new Date(`${year}-${month}-${day}`);
        }

        // Format to dd/mm/yyyy
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        const formatted = `${year}-${month}-${day}`;

        // Fill the input with the formatted date
        await this.SelecionarDataFim_EndDate_datepicker.fill(formatted);
    }


    async ClickSolicitarArrendamento_RequestRent_button() {
        await this.SolicitarArrendamento_RequestRent_button.click();
    }


    async SelectArrendamento_RentCard_grid(rent = 'random') {
        const cards = this.RentCards;
        const count = await cards.count();

        if (rent === 'random') {
            const randomIndex = faker.number.int({ min: 0, max: count - 1 });
            return cards.nth(randomIndex);
        }

        if (typeof rent === 'number') {
            return cards.nth(rent);
        }

        return cards.filter({ hasText: rent }).first();
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

export default Rents_page;