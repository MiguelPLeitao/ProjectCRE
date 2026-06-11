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


test.describe('Compras', () => {
    test('Registar Compra (Aluno) (Sucesso)', async ({ page }) => {
        const login_page = new Login_page(page);
        const dashboard_page = new Dashboard_page(page);
        const buyorders_page = new BuyOrders_page(page);
        const mybuyorders_page = new MyBuyOrders_page(page);

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
            "estoque": faker.number.int({ min: 1, max: 1000 }),
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

        await dashboard_page.ClickCompras_BuyOrders_button();
        await expect(page).toHaveURL('http://localhost:3000/compras.html');

        page.waitForEvent('dialog').then(async dialog => {
            if (dialog.message().includes('Compra registrada com sucesso! Aguarde aprovação.')) {
                console.log("dialog message 'Compra registrada com sucesso! Aguarde aprovação.' aceite")
                await dialog.accept();
            }
            else {
                throw new Error('Dialog message 1 não aparece ou não contém o texto esperado.');
            }
        });

        await page.waitForTimeout(3000);

        const bookTobuy = await buyorders_page.SelectLivro_BookCard_grid(newBook_random.nome);
        await expect(bookTobuy).toBeVisible();


        let buyQuantity
        if (newBook_random.estoque == 1) {
            buyQuantity = 1;
        }
        else {
            buyQuantity = faker.number.int({ min: 1, max: newBook_random.estoque });
        };

        await buyorders_page.SelectQtdCompraLivro_QntBuyOrderBook_selector_button(newBook_random.nome, buyQuantity);

        await expect(page).toHaveURL('http://localhost:3000/compras.html');

        const EndStock = Number((await bookTobuy
            .locator('p')
            .filter({ hasText: 'Estoque' })
            .textContent())
            .split(':')[1]
            .trim());

        //expect(EndStock).toBe(newBook_random.estoque - buyQuantity);

        await buyorders_page.ClickMinhasCompras_MyBuyOrders_button();

        await expect(page).toHaveURL('http://localhost:3000/minhas-compras.html');

        const MyCreatedBuyOrder = await mybuyorders_page.SelectCompra_BuyOrder_grid(`Livro ID: ${newBook_random.id}`);

        await expect(MyCreatedBuyOrder).toBeVisible();

    });



    test('Aprovar Compra (Admin/Funcionário) (Sucesso)', async ({ page }) => {
        const login_page = new Login_page(page);
        const dashboard_page = new Dashboard_page(page);
        const buyorders_page = new BuyOrders_page(page);
        const mybuyorders_page = new MyBuyOrders_page(page);
        const admin_buyorders_page = new Admin_BuyOrders_page(page);

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


        let responsePOSTnewUserEmployee = await page.request.post('/registro',
            {
                data: ValidUser
            });

        let response2POSTnewUserStudent = await page.request.post('/registro',
            {
                data: {
                    "nome": faker.person.fullName(),
                    "email": faker.internet.email(),
                    "senha": faker.internet.password(),
                    "tipo": 1
                }
            });

        let responsePOSTnewBook_Random = await page.request.post('/livros',
            {
                data: newBook
            }
        );


        expect(responsePOSTnewUserEmployee.status()).toBe(201);
        let newUserEmployee = await responsePOSTnewUserEmployee.json();
        expect(newUserEmployee.usuario).toHaveProperty('id');
        expect(newUserEmployee.usuario).toHaveProperty('nome');
        expect(newUserEmployee.usuario.nome).toBe(ValidUser.nome);
        expect(newUserEmployee.usuario).toHaveProperty('email');
        expect(newUserEmployee.usuario.email).toBe(ValidUser.email);
        expect(newUserEmployee.usuario).toHaveProperty('tipo');

        expect(response2POSTnewUserStudent.status()).toBe(201);
        let newUserStudent = await response2POSTnewUserStudent.json();
        expect(newUserStudent.usuario).toHaveProperty('id');
        expect(newUserStudent.usuario).toHaveProperty('nome');
        expect(newUserStudent.usuario).toHaveProperty('email');
        expect(newUserStudent.usuario).toHaveProperty('tipo');

        expect(responsePOSTnewBook_Random.status()).toBe(201);
        let newBook_random = await responsePOSTnewBook_Random.json();
        expect(newBook_random).toHaveProperty('id');
        expect(newBook_random).toHaveProperty('nome');
        expect(newBook_random.nome).toBe(newBook.nome);
        expect(newBook_random).toHaveProperty('autor');
        expect(newBook_random.autor).toBe(newBook.autor);
        expect(newBook_random).toHaveProperty('paginas');
        expect(newBook_random.paginas).toBe(newBook.paginas);


        let responsePOSTbuy = await page.request.post('/compras', {
            data: {
                "usuarioId": newUserStudent.usuario.id,
                "livroId": newBook_random.id,
                "quantidade": faker.number.int({ min: 1, max: newBook_random.estoque })
            }
        });

        expect(responsePOSTbuy.status()).toBe(201);
        let newBuyOrder = await responsePOSTbuy.json();
        expect(newBuyOrder).toHaveProperty('id');
        expect(newBuyOrder).toHaveProperty('usuarioId');
        expect(newBuyOrder).toHaveProperty('livroId');
        expect(newBuyOrder).toHaveProperty('quantidade');
        expect(newBuyOrder).toHaveProperty('total');
        expect(newBuyOrder).toHaveProperty('status');
        expect(newBuyOrder.status).toBe('PENDENTE');
        expect(newBuyOrder).toHaveProperty('criadoEm');


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

        await login_page.FillEmail_Password_InputFields(newUserEmployee.usuario.email, ValidUser.senha);

        await login_page.ClickEnterLogin_Button();

        await expect(page).toHaveURL('http://localhost:3000/dashboard.html');

        await dashboard_page.ClickAdmin_Compras_BuyOrders_button();

        await expect(page).toHaveURL('http://localhost:3000/compras-admin.html');

        let approvalDialogCount = 0;

        page.on('dialog', async dialog => {
            approvalDialogCount++;

            if (
                approvalDialogCount === 1 &&
                dialog.message().includes('Confirmar alteração da compra')
            ) {
                console.log("dialog message 'Confirmar alteração da compra?' aceite");
                await dialog.accept();
            }
            else if (
                approvalDialogCount === 2 &&
                dialog.message().includes('Status atualizado com sucesso!')
            ) {
                console.log("dialog message 'Status atualizado com sucesso!' aceite");
                await dialog.accept();
            }
            else {
                throw new Error(`Dialog inesperado: ${dialog.message()}`);
            }
        });

        await page.waitForTimeout(3000);

        const PendingBuyOrderCard = await admin_buyorders_page.SelectBuyOrder_gridCard(
            `Usuário ID: ${newUserStudent.usuario.id}`,
            `Livro ID: ${newBook_random.id}`,
            `Quantidade: ${newBuyOrder.quantidade}`,
            `Status: ${newBuyOrder.status}`
        );

        await expect(PendingBuyOrderCard).toBeVisible();

        await admin_buyorders_page.AprovarCompra_ApproveBuyOrder(
            `Usuário ID: ${newUserStudent.usuario.id}`,
            `Livro ID: ${newBook_random.id}`,
            `Quantidade: ${newBuyOrder.quantidade}`,
            `Status: ${newBuyOrder.status}`
        );

        const ApprovedBuyOrderCard = await admin_buyorders_page.SelectBuyOrder_gridCard(
            `Usuário ID: ${newUserStudent.usuario.id}`,
            `Livro ID: ${newBook_random.id}`,
            `Quantidade: ${newBuyOrder.quantidade}`,
            `Status: APROVADA`
        );

        await expect(ApprovedBuyOrderCard).toBeVisible();

    });
})