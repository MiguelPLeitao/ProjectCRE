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


test.describe('Livros', () => {
    test.beforeEach(async ({ page }) => {
        const login_page = new Login_page(page);

        const newBook = {
            "nome": faker.book.title(),
            "autor": faker.person.fullName(),
            "paginas": faker.number.int({ min: 10, max: 2000 }),
            "descricao": faker.lorem.paragraph(2),
            "imagemUrl": faker.image.url(),
            "estoque": faker.number.int({ min: 0, max: 1000 }),
            "preco": parseFloat(faker.commerce.price({ min: 5, max: 200 }))
        };

        let responsePOSTnewBook_Random = await page.request.post('/livros',
            {
                data: newBook
            }
        );

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

        await login_page.FillEmail_Password_InputFields("admin@biblioteca.com", "123456");

        await login_page.ClickEnterLogin_Button();

        await expect(page).toHaveURL('http://localhost:3000/dashboard.html');

    });

    test('Cadastro de Livro via UI (Sucesso)', async ({ page }) => {
        const dashboard_page = new Dashboard_page(page);
        const books_page = new Books_page(page);
        const bookdetails_page = new BookDetails_page(page);

        await expect(page).toHaveURL('http://localhost:3000/dashboard.html');

        await dashboard_page.ClickLivros_Books_button();
        await expect(page).toHaveURL('http://localhost:3000/livros.html');

        const { finalTitle } = await books_page.Fill_AllNewBook_Fields();

        page.waitForEvent('dialog').then(async dialog => {
            if (dialog.message().includes('Livro adicionado com sucesso!')) {
                console.log("dialog message 'Livro adicionado com sucesso!' aceite")
                await dialog.accept();
            }
            else {
                throw new Error('Dialog message 1 não aparece ou não contém o texto esperado.');
            }
        });

        await books_page.ClickAdicionarLivro_AddBook_button();

        await expect(books_page.NomeLivro_BookName_inputfield).toHaveValue("");
        await expect(books_page.NomeAutor_AuthorName_inputfield).toHaveValue("");
        await expect(books_page.NumeroPaginas_NumberOfPages_spinbutton).toHaveValue("");
        await expect(books_page.DescricaoLivro_BookDescription_inputfield).toHaveValue("");
        await expect(books_page.LivroImagemURL_BookImageURL_inputfield).toHaveValue("");
        await expect(books_page.EstoqueLivro_BookStock_spinbutton).toHaveValue("1");
        await expect(books_page.PrecoLivro_BookPrice_spinbutton).toHaveValue("0");

        const createdBookCard = await books_page.SelectLivro_BookCard_grid(finalTitle);
        await expect(createdBookCard).toBeVisible();
    });


    test('Validação de Campos Obrigatórios no Livro (Falha)', async ({ page }) => {
        const dashboard_page = new Dashboard_page(page);
        const books_page = new Books_page(page);
        const bookdetails_page = new BookDetails_page(page);

        await expect(page).toHaveURL('http://localhost:3000/dashboard.html');

        await dashboard_page.ClickLivros_Books_button();
        await expect(page).toHaveURL('http://localhost:3000/livros.html');


        await books_page.ClickAdicionarLivro_AddBook_button();

        expect(await books_page.NomeLivro_BookName_inputfield.evaluate(el => el.validity.valueMissing)).toBe(true);

        expect(await books_page.NomeAutor_AuthorName_inputfield.evaluate(el => el.validity.valueMissing)).toBe(true);

        const validity1pagenumber = expect(await books_page.NumeroPaginas_NumberOfPages_spinbutton.evaluate(el => el.validity.valueMissing)).toBe(true);

        if (validity1pagenumber === false) {
            expect(await books_page.NumeroPaginas_NumberOfPages_spinbutton.evaluate(el => el.validity.RangeOverflow)).toBe(false);
        }

        await books_page.Fill_BookAuthor_inputfield('MiguelPL');
        await books_page.Fill_BookName_inputfield('PrimeiroLivro');
        await books_page.Fill_NumberOfPages_spinbutton('-1');

        await books_page.ClickAdicionarLivro_AddBook_button();

        expect(await books_page.NomeLivro_BookName_inputfield.evaluate(el => el.validity.valueMissing)).toBe(false);

        expect(await books_page.NomeAutor_AuthorName_inputfield.evaluate(el => el.validity.valueMissing)).toBe(false);

        const validity2pagenumber = expect(await books_page.NumeroPaginas_NumberOfPages_spinbutton.evaluate(el => el.validity.valueMissing)).toBe(false);

        if (validity2pagenumber === false) {
            expect(await books_page.NumeroPaginas_NumberOfPages_spinbutton.evaluate(el => el.validity.RangeOverflow)).toBe(false);
        }


        const createdBookCard = await books_page.SelectLivro_BookCard_grid('PrimeiroLivro');
        await expect(createdBookCard).not.toBeVisible();
    });


    test('Visualizar Detalhes de Livro (Sucesso)', async ({ page }) => {
        const dashboard_page = new Dashboard_page(page);
        const books_page = new Books_page(page);
        const bookdetails_page = new BookDetails_page(page);

        await expect(page).toHaveURL('http://localhost:3000/dashboard.html');

        await dashboard_page.ClickLivros_Books_button();
        await expect(page).toHaveURL('http://localhost:3000/livros.html');

        let responseGETbooks = await page.request.get('/livros');
        expect(responseGETbooks.status()).toBe(200);
        expect(Array.isArray(await responseGETbooks.json())).toBe(true);
        let randombook = faker.helpers.arrayElement(await responseGETbooks.json());

        const randomBookCard = await books_page.SelectLivro_BookCard_grid({
            title: randombook.nome,
            author: randombook.autor
        });
        await randomBookCard.click();

        await expect(page).toHaveURL(`http://localhost:3000/detalhes.html?id=${randombook.id}`);


        await expect(bookdetails_page.ImagemLivro_BookImage_image).toBeVisible();
        await expect(bookdetails_page.TituloLivro_BookTitle_text).toBeVisible();
        const autor = bookdetails_page.GetBookInfo_Item('Autor:');
        const paginas = bookdetails_page.GetBookInfo_Item('Páginas:');
        const descricao = bookdetails_page.GetBookInfo_Item('Descrição:');
        const data = bookdetails_page.GetBookInfo_Item('Data de Cadastro:');

        await expect(autor).toBeVisible();
        await expect(paginas).toBeVisible();
        await expect(descricao).toBeVisible();
        await expect(data).toBeVisible();

        if (await bookdetails_page.AdicionarFavoritos_AddToFavourites_button.isVisible()) {
            await expect(bookdetails_page.RemoverFavoritos_RemoveFromFavourites_button).not.toBeVisible();
        } else if (await bookdetails_page.RemoverFavoritos_RemoveFromFavourites_button.isVisible()) {
            await expect(bookdetails_page.AdicionarFavoritos_AddToFavourites_button).not.toBeVisible();
        } else {
            throw new Error('Nenhuma das opções de favoritos foi encontrada');
        }

        await expect(bookdetails_page.VoltarPaginaLivros_BacktoBooksPage_button).toBeVisible();

    });

})