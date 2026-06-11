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


test.describe('Arrendamentos', () => {
    test('Validar Fluxo de Solicitação (Sucesso)', async ({ page }) => {
        const login_page = new Login_page(page);
        const dashboard_page = new Dashboard_page(page);
        const rents_page = new Rents_page(page);

        const ValidUser = {
            "nome": faker.person.fullName(),
            "email": faker.internet.email(),
            "senha": faker.internet.password(),
            "tipo": 1
        }

        const newBook = {
            "nome": faker.book.title(),
            "autor": faker.person.fullName(),
            "paginas": faker.number.int({ min: 10, max: 2000 }),
            "descricao": faker.lorem.paragraph(2),
            "imagemUrl": faker.image.url(),
            "estoque": faker.number.int({ min: 0, max: 1000 }),
            "preco": parseFloat(faker.commerce.price({ min: 5, max: 200 }))
        };

        let responsePOSTnewUser = await page.request.post('/registro',
            {
                data: ValidUser
            });

        let responsePOSTnewBook_Random = await page.request.post('/livros',
            {
                data: newBook
            }
        );

        expect(responsePOSTnewUser.status()).toBe(201);
        let newUser = await responsePOSTnewUser.json();
        expect(newUser.usuario).toHaveProperty('id');
        expect(newUser.usuario).toHaveProperty('nome');
        expect(newUser.usuario.nome).toBe(ValidUser.nome);
        expect(newUser.usuario).toHaveProperty('email');
        expect(newUser.usuario.email).toBe(ValidUser.email);
        expect(newUser.usuario).toHaveProperty('tipo');

        expect(responsePOSTnewBook_Random.status()).toBe(201);
        let newBook_random = await responsePOSTnewBook_Random.json();
        expect(newBook_random).toHaveProperty('id');
        expect(newBook_random).toHaveProperty('nome');
        expect(newBook_random.nome).toBe(newBook.nome);
        expect(newBook_random).toHaveProperty('autor');
        expect(newBook_random.autor).toBe(newBook.autor);
        expect(newBook_random).toHaveProperty('paginas');
        expect(newBook_random.paginas).toBe(newBook.paginas);

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

        await dashboard_page.ClickMeusArrendamentos_Rents_button();
        await expect(page).toHaveURL('http://localhost:3000/arrendamentos.html');

        page.waitForEvent('dialog').then(async dialog => {
            if (dialog.message().includes('Arrendamento solicitado com sucesso!')) {
                console.log("dialog message 'Arrendamento solicitado com sucesso!' aceite")
                await dialog.accept();
            }
            else {
                throw new Error('Dialog message 1 não aparece ou não contém o texto esperado.');
            }
        });

        await page.waitForTimeout(3000);

        const newRandomBook_name_author = `${newBook_random.nome} (${newBook_random.autor})`;
        await rents_page.Select_Book_dropdown(newRandomBook_name_author);
        await rents_page.Select_StartDate_datepicker(null);
        await rents_page.Select_EndDate_datepicker(null);
        await rents_page.ClickSolicitarArrendamento_RequestRent_button();

        await expect(page).toHaveURL('http://localhost:3000/arrendamentos.html');

        const CreatedRentCard = await rents_page.SelectArrendamento_RentCard_grid(`Livro ID: ${newBook_random.id}`);
        await expect(CreatedRentCard).toBeVisible();

    });



    test('Aprovar Arrendamento (Sucesso)', async ({ page }) => {
        const login_page = new Login_page(page);
        const dashboard_page = new Dashboard_page(page);
        const rents_page = new Rents_page(page);
        const admin_approvals_page = new Admin_Approvals_page(page);

        const ValidUser = {
            "nome": faker.person.fullName(),
            "email": faker.internet.email(),
            "senha": faker.internet.password(),
            "tipo": 2
        }

        const newBook = {
            "nome": faker.book.title(),
            "autor": faker.person.fullName(),
            "paginas": faker.number.int({ min: 10, max: 2000 }),
            "descricao": faker.lorem.paragraph(2),
            "imagemUrl": faker.image.url(),
            "estoque": faker.number.int({ min: 0, max: 1000 }),
            "preco": parseFloat(faker.commerce.price({ min: 5, max: 200 }))
        };


        let responsePOSTnewUser = await page.request.post('/registro',
            {
                data: ValidUser
            });

        let responsePOSTnewBook_Random = await page.request.post('/livros',
            {
                data: newBook
            }
        );


        expect(responsePOSTnewUser.status()).toBe(201);
        let newUser = await responsePOSTnewUser.json();
        expect(newUser.usuario).toHaveProperty('id');
        expect(newUser.usuario).toHaveProperty('nome');
        expect(newUser.usuario.nome).toBe(ValidUser.nome);
        expect(newUser.usuario).toHaveProperty('email');
        expect(newUser.usuario.email).toBe(ValidUser.email);
        expect(newUser.usuario).toHaveProperty('tipo');

        expect(responsePOSTnewBook_Random.status()).toBe(201);
        let newBook_random = await responsePOSTnewBook_Random.json();
        expect(newBook_random).toHaveProperty('id');
        expect(newBook_random).toHaveProperty('nome');
        expect(newBook_random.nome).toBe(newBook.nome);
        expect(newBook_random).toHaveProperty('autor');
        expect(newBook_random.autor).toBe(newBook.autor);
        expect(newBook_random).toHaveProperty('paginas');
        expect(newBook_random.paginas).toBe(newBook.paginas);


        const datainicio = faker.date.between({ from: '2020-01-01', to: '2030-12-31' });
        const datafim = faker.date.future({ refDate: datainicio });
        const newRent = {
            "usuarioId": newUser.usuario.id,
            "livroId": newBook_random.id,
            "dataInicio": datainicio,
            "dataFim": datafim
        };

        let responsePOSTnewRent = await page.request.post('/arrendamentos',
            {
                data: newRent
            }
        );

        expect(responsePOSTnewRent.status()).toBe(201);
        let bodyPOSTnewRent = await responsePOSTnewRent.json();
        expect(bodyPOSTnewRent).toHaveProperty('id');
        expect(bodyPOSTnewRent).toHaveProperty('usuarioId');
        expect(bodyPOSTnewRent).toHaveProperty('livroId');
        expect(bodyPOSTnewRent).toHaveProperty('status');
        expect(bodyPOSTnewRent.status).toBe('PENDENTE');
        expect(bodyPOSTnewRent).toHaveProperty('criadoEm');


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

        await dashboard_page.ClickAdmin_Aprovacoes_Approvals_button();

        await expect(page).toHaveURL('http://localhost:3000/aprovacoes.html');

        let approvalDialogCount = 0;

        page.on('dialog', async dialog => {
            approvalDialogCount++;

            if (
                approvalDialogCount === 1 &&
                dialog.message().includes('Confirmar aprovação do arrendamento')
            ) {
                console.log("dialog message 'Confirmar aprovação do arrendamento?' aceite");
                await dialog.accept();
            }
            else if (
                approvalDialogCount === 2 &&
                dialog.message().includes('Arrendamento aprovado com sucesso!')
            ) {
                console.log("dialog message 'Arrendamento aprovado com sucesso!' aceite");
                await dialog.accept();
            }
            else {
                throw new Error(`Dialog inesperado: ${dialog.message()}`);
            }
        });

        await page.waitForTimeout(3000);
        const PendingRentCard = await admin_approvals_page.SelectPending_Rent_gridCard(`Usuário ID: ${newUser.usuario.id}`, `Livro ID: ${newBook_random.id}`);
        await expect(PendingRentCard).toBeVisible();

        await admin_approvals_page.AprovarArrendamento_ApproveRent(`Usuário ID: ${newUser.usuario.id}`, `Livro ID: ${newBook_random.id}`);

        await expect(PendingRentCard).not.toBeVisible();

        const ApprovedRentCard = await admin_approvals_page.Select_Rent_gridCard(`Usuário ID: ${newUser.usuario.id}`, `Livro ID: ${newBook_random.id}`, 'APROVADO');
        await expect(ApprovedRentCard).toBeVisible();

    });
})