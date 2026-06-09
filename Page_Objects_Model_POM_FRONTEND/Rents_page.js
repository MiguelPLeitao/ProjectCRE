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
        this.Aluguer1_Rent1_button = page.locator("//div[@id='lista-arrendamentos']//div[contains(@class,'book-card')]").nth(0);
        this.Alguer2_Rent2_button = page.locator("//div[@id='lista-arrendamentos']//div[contains(@class,'book-card')]").nth(1);
        this.Alguer3_Rent3_button = page.locator("//div[@id='lista-arrendamentos']//div[contains(@class,'book-card')]").nth(2);
        this.Alguer4_Rent4_button = page.locator("//div[@id='lista-arrendamentos']//div[contains(@class,'book-card')]").nth(3);
        this.Alguer5_Rent5_button = page.locator("//div[@id='lista-arrendamentos']//div[contains(@class,'book-card')]").nth(4);
        this.Alguer6_Rent6_button = page.locator("//div[@id='lista-arrendamentos']//div[contains(@class,'book-card')]").nth(5);
        this.Alguer7_Rent7_button = page.locator("//div[@id='lista-arrendamentos']//div[contains(@class,'book-card')]").nth(6);
        this.Alguer8_Rent8_button = page.locator("//div[@id='lista-arrendamentos']//div[contains(@class,'book-card')]").nth(7);
        this.Alguer9_Rent9_button = page.locator("//div[@id='lista-arrendamentos']//div[contains(@class,'book-card')]").nth(8);
        this.Alguer10_Rent10_button = page.locator("//div[@id='lista-arrendamentos']//div[contains(@class,'book-card')]").nth(9);
        this.Alguer11_Rent11_button = page.locator("//div[@id='lista-arrendamentos']//div[contains(@class,'book-card')]").nth(10);
        this.Alguer12_Rent12_button = page.locator("//div[@id='lista-arrendamentos']//div[contains(@class,'book-card')]").nth(11);
        this.Alguer13_Rent13_button = page.locator("//div[@id='lista-arrendamentos']//div[contains(@class,'book-card')]").nth(12);
        this.Alguer14_Rent14_button = page.locator("//div[@id='lista-arrendamentos']//div[contains(@class,'book-card')]").nth(13);
        this.Alguer15_Rent15_button = page.locator("//div[@id='lista-arrendamentos']//div[contains(@class,'book-card')]").nth(14);
        this.Alguer16_Rent16_button = page.locator("//div[@id='lista-arrendamentos']//div[contains(@class,'book-card')]").nth(15);
        this.Alguer17_Rent17_button = page.locator("//div[@id='lista-arrendamentos']//div[contains(@class,'book-card')]").nth(16);
        this.Alguer18_Rent18_button = page.locator("//div[@id='lista-arrendamentos']//div[contains(@class,'book-card')]").nth(17);
        this.Alguer19_Rent19_button = page.locator("//div[@id='lista-arrendamentos']//div[contains(@class,'book-card')]").nth(18);
        this.Alguer20_Rent20_button = page.locator("//div[@id='lista-arrendamentos']//div[contains(@class,'book-card')]").nth(19);
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
            await this.SelecionarLivro_SelectBook_dropdown.selectOption({ hasText: BookName });
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
        const formatted = `${day}/${month}/${year}`;

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
        const formatted = `${day}/${month}/${year}`;

        // Fill the input with the formatted date
        await this.SelecionarDataFim_EndDate_datepicker.fill(formatted);
    }


    async ClickRequestRent_button() {
        await this.SolicitarArrendamento_RequestRent_button.click();
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

    async ClickAluguer1_Rent1_button() {
        await this.Alguer1_Rent1_button.click();
    }

    async ClickAluguer2_Rent2_button() {
        await this.Alguer2_Rent2_button.click();
    }

    async ClickAluguer3_Rent3_button() {
        await this.Alguer3_Rent3_button.click();
    }

    async ClickAluguer4_Rent4_button() {
        await this.Alguer4_Rent4_button.click();
    }

    async ClickAluguer5_Rent5_button() {
        await this.Alguer5_Rent5_button.click();
    }

    async ClickAluguer6_Rent6_button() {
        await this.Alguer6_Rent6_button.click();
    }

    async ClickAluguer7_Rent7_button() {
        await this.Alguer7_Rent7_button.click();
    }

    async ClickAluguer8_Rent8_button() {
        await this.Alguer8_Rent8_button.click();
    }

    async ClickAluguer9_Rent9_button() {
        await this.Alguer9_Rent9_button.click();
    }

    async ClickAluguer10_Rent10_button() {
        await this.Alguer10_Rent10_button.click();
    }

    async ClickAluguer11_Rent11_button() {
        await this.Alguer11_Rent11_button.click();
    }

    async ClickAluguer12_Rent12_button() {
        await this.Alguer12_Rent12_button.click();
    }

    async ClickAluguer13_Rent13_button() {
        await this.Alguer13_Rent13_button.click();
    }

    async ClickAluguer14_Rent14_button() {
        await this.Alguer14_Rent14_button.click();
    }

    async ClickAluguer15_Rent15_button() {
        await this.Alguer15_Rent15_button.click();
    }

    async ClickAluguer16_Rent16_button() {
        await this.Alguer16_Rent16_button.click();
    }

    async ClickAluguer17_Rent17_button() {
        await this.Alguer17_Rent17_button.click();
    }

    async ClickAluguer18_Rent18_button() {
        await this.Alguer18_Rent18_button.click();
    }

    async ClickAluguer19_Rent19_button() {
        await this.Alguer19_Rent19_button.click();
    }

    async ClickAluguer20_Rent20_button() {
        await this.Alguer20_Rent20_button.click();
    }


}

export default Rents_page;