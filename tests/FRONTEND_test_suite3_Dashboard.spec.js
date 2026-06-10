import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import Register_page from '../Page_Objects_Model_POM_FRONTEND/Register_page';
import Login_page from '../Page_Objects_Model_POM_FRONTEND/Login_page';
import Dashboard_page from '../Page_Objects_Model_POM_FRONTEND/Dashboard_page';
import BuyOrders_page from '../Page_Objects_Model_POM_FRONTEND/BuyOrders_page';
import Books_page from '../Page_Objects_Model_POM_FRONTEND/Books_page';
import BookDetails_page from '../Page_Objects_Model_POM_FRONTEND/BookDetails_page';
import Favourites_page from '../Page_Objects_Model_POM_FRONTEND/Favourites_page';
import Rents_page from '../Page_Objects_Model_POM_FRONTEND/Rents_page';
import MyBuyOrders_page from '../Page_Objects_Model_POM_FRONTEND/MyBuyOrders_page';
import Admin_Approvals_page from '../Page_Objects_Model_POM_FRONTEND/Admin_Approvals_page';
import Admin_BuyOrders_page from '../Page_Objects_Model_POM_FRONTEND/Admin_BuyOrders_page';
import Admin_AdminUsers_page from '../Page_Objects_Model_POM_FRONTEND/Admin_AdminUsers_page';



test.describe('Dashboard', () => {
    test('Dashboard - Visão Admin (Sucesso)', async ({ page }) => {
        const login_page = new Login_page(page);
        const dashboard_page = new Dashboard_page(page);

        await page.goto('http://localhost:3000/login.html');

        await expect(page).toHaveURL('http://localhost:3000/login.html');

        page.waitForEvent('dialog').then(async dialog => {
            if (dialog.message().includes('Login realizado com sucesso!')) {
                console.log("dialog message 'Login realizado com sucesso!' aceite")
                await dialog.accept();
            }
            else {
                throw new Error('Dialog message 1 não aparece ou não contém o texto esperado.');
            }
        });

        await page.waitForTimeout(3000);

        await login_page.FillEmail_Password_InputFields("admin@biblioteca.com", "123456");

        await login_page.ClickEnterLogin_Button();

        await expect(page).toHaveURL('http://localhost:3000/dashboard.html');

        await expect(dashboard_page.TotalLivros_TotalBooks_number).toBeVisible();
        await expect(dashboard_page.TotalUsuarios_TotalUsers_number).toBeVisible();
        await expect(dashboard_page.TotalLivrosDisponiveis_TotalBooksAvailable_number).toBeVisible();
        await expect(dashboard_page.TotalAlunosCadastrados_TotalStudentsRegistered_number).toBeVisible();
        await expect(dashboard_page.TotalFuncionarios_TotalEmployees_number).toBeVisible();
        await expect(dashboard_page.TotalAdministradores_TotalAdmins_number).toBeVisible();


        let livrostotal = await dashboard_page.TotalLivros_TotalBooks_number.textContent();
        let numerolivrostotal = Number(livrostotal);

        let livrosdisponiveis = await dashboard_page.TotalLivrosDisponiveis_TotalBooksAvailable_number.textContent();
        let numerolivrosdisponiveis = Number(livrosdisponiveis);

        if (numerolivrostotal > 0) {
            await expect(numerolivrosdisponiveis).toBeGreaterThan(0);
        }
        else if (numerolivrostotal == 0) {
            await expect(numerolivrosdisponiveis).toBe(0);
        }
        else {
            throw new Error('Não aparece corretamente o número total de livros.');
        }

        const livro6 = page.locator("//div[@id='livros-recentes']//div[contains(@class,'book-card')]").nth(5);
        await expect(livro6).not.toBeVisible();
    });


    test('Dashboard - Visão Aluno (Sucesso)', async ({ page }) => {
        const login_page = new Login_page(page);
        const dashboard_page = new Dashboard_page(page);

        const ValidUser = {
            "nome": faker.person.fullName(),
            "email": faker.internet.email(),
            "senha": faker.internet.password()
        }

        let responsePOSTnewUser = await page.request.post('/registro',
            {
                data: ValidUser
            });

        expect(responsePOSTnewUser.status()).toBe(201);
        let newUser = await responsePOSTnewUser.json();
        expect(newUser.usuario).toHaveProperty('id');
        expect(newUser.usuario).toHaveProperty('nome');
        expect(newUser.usuario.nome).toBe(ValidUser.nome);
        expect(newUser.usuario).toHaveProperty('email');
        expect(newUser.usuario.email).toBe(ValidUser.email);
        expect(newUser.usuario).toHaveProperty('tipo');

        await page.goto('http://localhost:3000/login.html');

        await expect(page).toHaveURL('http://localhost:3000/login.html');

        page.waitForEvent('dialog').then(async dialog => {
            if (dialog.message().includes('Login realizado com sucesso!')) {
                console.log("dialog message 'Login realizado com sucesso!' aceite")
                await dialog.accept();
            }
            else {
                throw new Error('Dialog message 1 não aparece ou não contém o texto esperado.');
            }
        });

        await page.waitForTimeout(3000);

        await login_page.FillEmail_Password_InputFields(newUser.usuario.email, ValidUser.senha);

        await login_page.ClickEnterLogin_Button();

        await expect(page).toHaveURL('http://localhost:3000/dashboard.html');

        await expect(dashboard_page.TotalLivrosDisponiveis_TotalBooksAvailable_number).toBeVisible();
        await expect(dashboard_page.TotalLivros_TotalBooks_number).toBeVisible();
        await expect(dashboard_page.TotalAlunosCadastrados_TotalStudentsRegistered_number).toBeVisible();
        await expect(dashboard_page.TotalFuncionarios_TotalEmployees_number).not.toBeVisible();
        await expect(dashboard_page.TotalAdministradores_TotalAdmins_number).not.toBeVisible();
        await expect(dashboard_page.TotalArrendamentosPendentes_TotalPendingRents_number).not.toBeVisible();

        const bookCardCount = await dashboard_page.bookCards.count();
        console.log(`Grid contains ${bookCardCount} book cards`);

        expect(bookCardCount).toBeLessThanOrEqual(5);

        for (let i = 0; i < bookCardCount; i++) {
            const card = dashboard_page.bookCards.nth(i);
            await expect(card).toBeVisible();
        }

        // Validate no 6th card exists
        const sixthCard = dashboard_page.bookCards.nth(5);
        await expect(sixthCard).not.toBeVisible();

        // If no books, optionally validate empty state message
        if (bookCardCount === 0) {
            console.log('Não existem livros. A grelha de livros está vazia e nenhum livro visível.');
        } else {
            console.log(`Estão ${bookCardCount} livros visíveis na grelha.`);
        }
    });

})