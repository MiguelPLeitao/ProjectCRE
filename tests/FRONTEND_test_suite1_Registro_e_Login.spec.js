// @ts-check
import { test, expect } from '@playwright/test';
import Register_page from '../Page_Objects_Model_POM_FRONTEND/Register_Page';
import Login_Page from '../Page_Objects_Model_POM_FRONTEND/Login_Page';


test.describe('Registo e Login', () => {
    test('Fluxo Completo de Registro (Aluno) (Sucesso)', async ({ page }) => {
        const register_page = new Register_page(page);
        const login_page = new Login_Page(page);

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
})