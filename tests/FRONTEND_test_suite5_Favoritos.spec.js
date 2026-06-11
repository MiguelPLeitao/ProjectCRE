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



test.describe('Favoritos', async () => {
    test('Adicionar Livro aos Favoritos pela UI (Sucesso)', async ({ page }) => {
        const login_page = new Login_page(page);
        const dashboard_page = new Dashboard_page(page);
        const bookdetails_page = new BookDetails_page(page);
        const favourites_page = new Favourites_page(page);

        const ValidUser = {
            "nome": faker.person.fullName(),
            "email": faker.internet.email(),
            "senha": faker.internet.password()
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

        await page.goto(`http://localhost:3000/detalhes.html?id=${newBook_random.id}`);

        await expect(page).toHaveURL(`http://localhost:3000/detalhes.html?id=${newBook_random.id}`);

        page.waitForEvent('dialog').then(async dialog => {
            if (dialog.message().includes('Adicionado aos favoritos!')) {
                console.log("dialog message 'Adicionado aos favoritos!' aceite")
                await dialog.accept();
            }
            else {
                throw new Error('Dialog message 1 não aparece ou não contém o texto esperado.');
            }
        });

        await page.waitForTimeout(3000);

        await bookdetails_page.ClickAdicionarFavoritos_AddToFavourites_button();

        await expect(bookdetails_page.RemoverFavoritos_RemoveFromFavourites_button).toBeVisible();
        await expect(bookdetails_page.AdicionarFavoritos_AddToFavourites_button).not.toBeVisible();

        await bookdetails_page.ClickFavoritos_Favourites_button();

        await expect(page).toHaveURL('http://localhost:3000/favoritos.html');

        const favouriteBookCard = await favourites_page.SelectLivroFavorito_FavouriteBookCard_grid(newBook_random.nome, newBook_random.autor);

        await expect(favouriteBookCard).toBeVisible();


    });


    test('Remover Livro dos Favoritos (Sucesso)', async ({ page }) => {
        const login_page = new Login_page(page);
        const dashboard_page = new Dashboard_page(page);
        const bookdetails_page = new BookDetails_page(page);
        const favourites_page = new Favourites_page(page);

        const ValidUser = {
            "nome": faker.person.fullName(),
            "email": faker.internet.email(),
            "senha": faker.internet.password()
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

        await page.goto(`http://localhost:3000/detalhes.html?id=${newBook_random.id}`);

        await expect(page).toHaveURL(`http://localhost:3000/detalhes.html?id=${newBook_random.id}`);

        page.waitForEvent('dialog').then(async dialog => {
            if (dialog.message().includes('Adicionado aos favoritos!')) {
                console.log("dialog message 'Adicionado aos favoritos!' aceite")
                await dialog.accept();
            }
            else {
                throw new Error('Dialog message 2 não aparece ou não contém o texto esperado.');
            }
        });

        await page.waitForTimeout(3000);

        await bookdetails_page.ClickAdicionarFavoritos_AddToFavourites_button();

        await expect(bookdetails_page.RemoverFavoritos_RemoveFromFavourites_button).toBeVisible();
        await expect(bookdetails_page.AdicionarFavoritos_AddToFavourites_button).not.toBeVisible();

        await bookdetails_page.ClickFavoritos_Favourites_button();

        await expect(page).toHaveURL('http://localhost:3000/favoritos.html');

        const favouriteBookCard = await favourites_page.SelectLivroFavorito_FavouriteBookCard_grid(newBook_random.nome, newBook_random.autor);

        await expect(favouriteBookCard).toBeVisible();

        await favouriteBookCard.click();

        await expect(page).toHaveURL(`http://localhost:3000/detalhes.html?id=${newBook_random.id}`);

        page.waitForEvent('dialog').then(async dialog => {
            if (dialog.message().includes('Removido dos favoritos!')) {
                console.log("dialog message 'Removido dos favoritos!' aceite")
                await dialog.accept();
            }
            else {
                throw new Error('Dialog message 3 não aparece ou não contém o texto esperado.');
            }
        });

        await page.waitForTimeout(3000);

        await bookdetails_page.ClickRemoverFavoritos_RemoveFromFavourites_button();

        await expect(bookdetails_page.RemoverFavoritos_RemoveFromFavourites_button).not.toBeVisible();
        await expect(bookdetails_page.AdicionarFavoritos_AddToFavourites_button).toBeVisible();

        await bookdetails_page.ClickFavoritos_Favourites_button();

        await expect(page).toHaveURL('http://localhost:3000/favoritos.html');

        await expect(favouriteBookCard).not.toBeVisible();

    });


    test('Listar Livros Favoritos', async ({ page }) => {
        const login_page = new Login_page(page);
        const dashboard_page = new Dashboard_page(page);
        const bookdetails_page = new BookDetails_page(page);
        const favourites_page = new Favourites_page(page);

        const ValidUser = {
            "nome": faker.person.fullName(),
            "email": faker.internet.email(),
            "senha": faker.internet.password()
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

        await dashboard_page.ClickFavoritos_Favourites_button();

        await expect(page).toHaveURL('http://localhost:3000/favoritos.html');
        const StartFavouriteBookCards = await favourites_page.FavouriteBookCards.count();
        expect(StartFavouriteBookCards).toBe(0);
        await expect(favourites_page.Mensagem_Message_text).toBeVisible();

        await page.goto(`http://localhost:3000/detalhes.html?id=${newBook_random.id}`);

        await expect(page).toHaveURL(`http://localhost:3000/detalhes.html?id=${newBook_random.id}`);

        page.waitForEvent('dialog').then(async dialog => {
            if (dialog.message().includes('Adicionado aos favoritos!')) {
                console.log("dialog message 'Adicionado aos favoritos!' aceite")
                await dialog.accept();
            }
            else {
                throw new Error('Dialog message 2 não aparece ou não contém o texto esperado.');
            }
        });

        await page.waitForTimeout(3000);

        await bookdetails_page.ClickAdicionarFavoritos_AddToFavourites_button();

        await expect(bookdetails_page.RemoverFavoritos_RemoveFromFavourites_button).toBeVisible();
        await expect(bookdetails_page.AdicionarFavoritos_AddToFavourites_button).not.toBeVisible();

        await bookdetails_page.ClickFavoritos_Favourites_button();

        await expect(page).toHaveURL('http://localhost:3000/favoritos.html');

        const EndFavouriteBookCards = await favourites_page.FavouriteBookCards.count();
        expect(EndFavouriteBookCards).toBeGreaterThan(0);

        const favouriteBookCard = await favourites_page.SelectLivroFavorito_FavouriteBookCard_grid(newBook_random.nome, newBook_random.autor);

        await expect(favouriteBookCard).toBeVisible();

        await favouriteBookCard.click();

        await expect(page).toHaveURL(`http://localhost:3000/detalhes.html?id=${newBook_random.id}`);

        page.waitForEvent('dialog').then(async dialog => {
            if (dialog.message().includes('Removido dos favoritos!')) {
                console.log("dialog message 'Removido dos favoritos!' aceite")
                await dialog.accept();
            }
            else {
                throw new Error('Dialog message 3 não aparece ou não contém o texto esperado.');
            }
        });

        await page.waitForTimeout(3000);

        await bookdetails_page.ClickRemoverFavoritos_RemoveFromFavourites_button();

        await expect(bookdetails_page.RemoverFavoritos_RemoveFromFavourites_button).not.toBeVisible();
        await expect(bookdetails_page.AdicionarFavoritos_AddToFavourites_button).toBeVisible();

        await bookdetails_page.ClickFavoritos_Favourites_button();

        await expect(page).toHaveURL('http://localhost:3000/favoritos.html');

        await expect(favouriteBookCard).not.toBeVisible();

    });

})