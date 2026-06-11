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


test.describe('LogOut', () => {
    test('LogOut do Sistema (Sucesso)', async ({ page }) => {
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

        await dashboard_page.ClickSair_LogOut_button();

        await expect(page).toHaveURL('http://localhost:3000/login.html');

        usuario = await page.evaluate(() => localStorage.getItem('usuario'));
        expect(usuario).toBeFalsy();

        await page.goto('http://localhost:3000/dashboard.html');

        await expect(page).toHaveURL('http://localhost:3000/login.html');

    });

})