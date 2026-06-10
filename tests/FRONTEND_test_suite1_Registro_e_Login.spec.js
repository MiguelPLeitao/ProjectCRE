// @ts-check
import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import Register_page from '../Page_Objects_Model_POM_FRONTEND/Register_page';
import Login_page from '../Page_Objects_Model_POM_FRONTEND/Login_page';
import Dashboard_page from '../Page_Objects_Model_POM_FRONTEND/Dashboard_page';


test.describe('Registo e Login', () => {
    test('Fluxo Completo de Registro (Aluno) (Sucesso)', async ({ page }) => {
        const register_page = new Register_page(page);
        const login_page = new Login_page(page);
        const dashboard_page = new Dashboard_page(page);

        await page.goto('http://localhost:3000/registro.html');

        await expect(page).toHaveURL('http://localhost:3000/registro.html');

        page.waitForEvent('dialog').then(async dialog => {
            if (dialog.message().includes('Email já cadastrado')) {
                console.log("dialog message 'Email já cadastrado' aceite")
                await dialog.accept();
            }
            else if (dialog.message().includes('Cadastro realizado com sucesso! Faça login.')) {
                console.log("dialog message 'Cadastro realizado com sucesso! Faça login.' aceite")
                await dialog.accept();
            }
            else {
                throw new Error('Dialog message 1 não aparece ou não contém o texto esperado.');
            }
        });
        await page.waitForTimeout(3000);

        await register_page.FillName_Email_Password_InputFields("Carlos Oliveira", "carlos@teste.com", "senha123");

        await register_page.ClickRegister_Button();

        await page.waitForLoadState('load', { timeout: 3000 });

        if (page.url().includes('http://localhost:3000/login.html')) {
            await expect(page).toHaveURL('http://localhost:3000/login.html');
        }

        else {
            await expect(page).toHaveURL('http://localhost:3000/registro.html');

            page.waitForEvent('dialog').then(async dialog => {
                if (dialog.message().includes('Cadastro realizado com sucesso! Faça login.')) {
                    console.log("dialog message 'Cadastro realizado com sucesso! Faça login.' aceite")
                    await dialog.accept();
                }
                else {
                    throw new Error('Dialog message 2 não aparece ou não contém o texto esperado.');
                }
            });

            await page.waitForTimeout(3000);

            await register_page.FillName_Email_Password_InputFields();
            await register_page.ClickRegister_Button();

            await page.waitForLoadState('load', { timeout: 3000 });
            console.log("O usuário Carlos Oliveira já existia, foi criado um usuário aleatório!")

            await expect(page).toHaveURL('http://localhost:3000/login.html');
            await expect(login_page.EMAIL_InputField).toBeVisible();
            await expect(login_page.PASSWORD_InputField).toBeVisible();

            /*
            await page.goBack();
            await expect(page).toHaveURL('http://localhost:3000/registro.html');
            await expect(register_page.NAME_InputField).toBeVisible();
            await expect(register_page.EMAIL_InputField).toBeVisible();
            await expect(register_page.PASSWORD_InputField).toBeVisible();
            await expect(register_page.CONFIRM_PASSWORD_InputField).toBeVisible();
            await expect(register_page.NAME_InputField).toHaveValue("");
            await expect(register_page.EMAIL_InputField).toHaveValue("");
            await expect(register_page.PASSWORD_InputField).toHaveValue("");
            await expect(register_page.CONFIRM_PASSWORD_InputField).toHaveValue("");
            */

            await page.goto('http://localhost:3000/registro.html');
            await expect(page).toHaveURL('http://localhost:3000/registro.html');
            await expect(register_page.NAME_InputField).toBeVisible();
            await expect(register_page.EMAIL_InputField).toBeVisible();
            await expect(register_page.PASSWORD_InputField).toBeVisible();
            await expect(register_page.CONFIRM_PASSWORD_InputField).toBeVisible();
            await expect(register_page.NAME_InputField).toHaveValue("");
            await expect(register_page.EMAIL_InputField).toHaveValue("");
            await expect(register_page.PASSWORD_InputField).toHaveValue("");
            await expect(register_page.CONFIRM_PASSWORD_InputField).toHaveValue("");
        }
    });


    test('Validação de Senhas Não Correspondentes (Falha)', async ({ page }) => {
        const register_page = new Register_page(page);
        const login_page = new Login_page(page);

        await page.goto('http://localhost:3000/registro.html');

        await expect(page).toHaveURL('http://localhost:3000/registro.html');

        page.waitForEvent('dialog').then(async dialog => {
            if (dialog.message().includes('As senhas não conferem.')) {
                console.log("dialog message 'As senhas não conferem.' aceite")
                await dialog.accept();
            }
            else {
                throw new Error('Dialog message 1 não aparece ou não contém o texto esperado.');
            }
        });

        await page.waitForTimeout(3000);

        await register_page.FillName_InputField(faker.person.fullName());

        await register_page.FillEmail_InputField(faker.internet.email());

        let InvalidPassword = faker.internet.password({ length: faker.number.int({ min: 6, max: 20 }) });
        let InvalidConfirmPassword = faker.internet.password({ length: faker.number.int({ min: 6, max: 20 }) });

        console.log("Senha Invalida: " + InvalidPassword);
        console.log("Confirmar Senha Invalida: " + InvalidConfirmPassword);

        expect(InvalidPassword).not.toEqual(InvalidConfirmPassword);

        await register_page.FillPasssword_InputField(InvalidPassword);

        await register_page.FillConfirmPassword_InputField(InvalidConfirmPassword);

        await register_page.ClickRegister_Button();

        await expect(page).toHaveURL('http://localhost:3000/registro.html');
    });


    test('Login com Sucesso (Admin) (Sucesso)', async ({ page }) => {
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

        await expect(dashboard_page.UserName_text).toBeVisible();

        await expect(dashboard_page.UserName_text).toHaveText('Admin MasterADMIN');

        let usuario = await page.evaluate(() => localStorage.getItem('usuario'));
        expect(usuario).toBeTruthy();
        expect(JSON.parse(usuario)).toHaveProperty('tipo');
        expect(JSON.parse(usuario).tipo).toBe(3);
    });



    test('Login com Credenciais Inválidas (Falha)', async ({ page }) => {
        const login_page = new Login_page(page);

        await page.goto('http://localhost:3000/login.html');

        await expect(page).toHaveURL('http://localhost:3000/login.html');

        page.waitForEvent('dialog').then(async dialog => {
            if (dialog.message().includes('Email ou senha incorretos')) {
                console.log("dialog message 'Email ou senha incorretos' aceite")
                await dialog.accept();
            }
            else {
                throw new Error('Dialog message 1 não aparece ou não contém o texto esperado.');
            }
        });

        await page.waitForTimeout(3000);

        await login_page.FillEmail_Password_InputFields("admin@biblioteca.com", "1111111");

        await login_page.ClickEnterLogin_Button();

        await expect(page).toHaveURL('http://localhost:3000/login.html');
    });

})