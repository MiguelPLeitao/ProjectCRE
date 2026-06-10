// @ts-check
import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import Register_page from '../Page_Objects_Model_POM_FRONTEND/Register_page';
import Login_page from '../Page_Objects_Model_POM_FRONTEND/Login_page';
import Dashboard_page from '../Page_Objects_Model_POM_FRONTEND/Dashboard_page';


test.describe('Protecao de Rotas e Navegacao', () => {
    test('Protecao Rotas sem Login (Falha)', async ({ page }) => {
        const register_page = new Register_page(page);
        const login_page = new Login_page(page);
        const dashboard_page = new Dashboard_page(page);

        await page.goto('http://localhost:3000/login.html');

        await page.evaluate(() => localStorage.clear());

        await page.goto('http://localhost:3000/dashboard.html');

        expect(page).toHaveURL('http://localhost:3000/login.html');

        await expect(login_page.EMAIL_InputField).toBeVisible();
        await expect(login_page.PASSWORD_InputField).toBeVisible();

    });



    test('Menu Dinâmico – Aluno (Sucesso)', async ({ page }) => {
        const register_page = new Register_page(page);
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

        if (newUser.usuario.tipo === 1) {
            newUser.usuario.tipo = "ALUNO";
        }
        else if (newUser.usuario.tipo === 2) {
            newUser.usuario.tipo = "FUNCIONARIO";
        }
        else if (newUser.usuario.tipo === 3) {
            newUser.usuario.tipo = "ADMIN";
        }
        else {
            throw new Error('Tipo de usuário desconhecido');
        }

        expect(newUser.usuario).not.toHaveProperty('senha');
        expect(newUser.mensagem).toBe("Usuário criado com sucesso");


        await page.goto('http://localhost:3000/login.html');

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

        await expect(dashboard_page.UserName_text).toBeVisible();

        await expect(dashboard_page.UserName_text).toHaveText(newUser.usuario.nome + newUser.usuario.tipo);

        await expect(dashboard_page.Dashboard_button).toBeVisible();
        await expect(dashboard_page.Dashboard_button).toBeEnabled();
        await expect(dashboard_page.Livros_Books_button).toBeVisible();
        await expect(dashboard_page.Favoritos_Favorites_button).toBeVisible();
        await expect(dashboard_page.MeusArrendamentos_Rents_button).toBeVisible();
        await expect(dashboard_page.Compras_BuyOrders_button).toBeVisible();
        await expect(dashboard_page.MinhasCompras_MyBuyOrders_button).toBeVisible();

        await dashboard_page.ClickLivros_Books_button();
        await expect(page).toHaveURL('http://localhost:3000/livros.html');

        await page.goBack();
        await expect(page).toHaveURL('http://localhost:3000/dashboard.html');

        await dashboard_page.ClickFavoritos_Favorites_button();
        await expect(page).toHaveURL('http://localhost:3000/favoritos.html');

        await page.goBack();
        await expect(page).toHaveURL('http://localhost:3000/dashboard.html');

        await dashboard_page.ClickMeusArrendamentos_Rents_button();
        await expect(page).toHaveURL('http://localhost:3000/arrendamentos.html');

        await page.goBack();
        await expect(page).toHaveURL('http://localhost:3000/dashboard.html');

        await dashboard_page.ClickCompras_BuyOrders_button();
        await expect(page).toHaveURL('http://localhost:3000/compras.html');

        await page.goBack();
        await expect(page).toHaveURL('http://localhost:3000/dashboard.html');

        await page.goto('http://localhost:3000/detalhes.html?id=1');
        await expect(page).toHaveURL('http://localhost:3000/detalhes.html?id=1');




    })


})