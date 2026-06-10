import { expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

const RandomValidBook = {
    TITLE: faker.book.title(),
    AUTHOR: faker.book.author(),
    NUMBER_OF_PAGES: faker.number.int({ min: 1, max: 2000 }).toString(),
    DESCRIPTION: faker.lorem.paragraph(),
    URL_IMAGE: faker.internet.url(),
    STOCK: faker.number.int({ min: 1, max: 100 }).toString(),
    PRICE: faker.number.int({ min: 1, max: 200 }).toString()
}

class Books_page {
    constructor(page) {
        this.page = page;
        this.TITLE_header = page.getByRole('heading', { name: '📚 Gerenciar Livros' });
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
        this.MidPageTitle_header = page.getByRole('heading', { name: 'Adicionar Novo Livro' });
        this.NomeLivro_BookName_inputfield = page.getByRole('textbox', { name: 'Nome do Livro:' });
        this.NomeAutor_AuthorName_inputfield = page.getByRole('textbox', { name: 'Autor:' });
        this.NumeroPaginas_NumberOfPages_spinbutton = page.getByRole('spinbutton', { name: 'Número de Páginas:' });
        this.DescricaoLivro_BookDescription_inputfield = page.getByRole('textbox', { name: 'Descrição:' });
        this.LivroImagemURL_BookImageURL_inputfield = page.getByRole('textbox', { name: 'URL da Imagem:' });
        this.EstoqueLivro_BookStock_spinbutton = page.getByRole('spinbutton', { name: 'Estoque:' });
        this.PrecoLivro_BookPrice_spinbutton = page.getByRole('spinbutton', { name: 'Preço (€):' });
        this.AdicionarLivro_AddBook_button = page.getByRole('button', { name: 'Adicionar Livro' });
        this.EndPageTitle_header = page.getByRole('heading', { name: 'Todos os Livros' });
        this.Messagem_Message_text = page.getByText('Nenhum livro cadastrado.');

        this.bookCards = page.locator('[id="lista-livros"] .book-card');

        this.PAGEBODY_allpage = page.locator('body');
    }


    async ClickSair_LogOut_button() {
        await this.Sair_LogOut_button.click();
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
        this.Admin_Aprovacoes_Approvals_button.click();
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

    async SelectLivro_BookCard_grid(book = 'random') {
        const cards = this.bookCards;
        const count = await cards.count();

        if (book === 'random') {
            const randomIndex = faker.number.int({ min: 0, max: count - 1 });
            return cards.nth(randomIndex);
        }

        if (typeof book === 'number') {
            return cards.nth(book);
        }

        if (typeof book === 'object' && book.title && book.author) {
            return cards.filter({ hasText: book.title }).filter({ hasText: book.author }).first();
        }

        return cards.filter({ hasText: book }).first();
    }


    async ClickLivroGrelha_BookfromGrid_button(book = 'random') {
        await this.SelectLivro_BookCard_grid(book).click();
    }


    async Fill_AllNewBook_Fields(title, author, numberOfPages, description, imageURL, stock, price) {
        const finalTitle = title || RandomValidBook.TITLE;
        const finalAuthor = author || RandomValidBook.AUTHOR;
        const finalNumberOfPages = numberOfPages || RandomValidBook.NUMBER_OF_PAGES;
        const finalDescription = description || RandomValidBook.DESCRIPTION;
        const finalImageURL = imageURL || RandomValidBook.URL_IMAGE;
        const finalStock = stock || RandomValidBook.STOCK;
        const finalPrice = price || RandomValidBook.PRICE;

        await this.NomeLivro_BookName_inputfield.fill(finalTitle);
        await this.NomeAutor_AuthorName_inputfield.fill(finalAuthor);
        await this.NumeroPaginas_NumberOfPages_spinbutton.fill(finalNumberOfPages);
        await this.DescricaoLivro_BookDescription_inputfield.fill(finalDescription);
        await this.LivroImagemURL_BookImageURL_inputfield.fill(finalImageURL);
        await this.EstoqueLivro_BookStock_spinbutton.fill(finalStock);
        await this.PrecoLivro_BookPrice_spinbutton.fill(finalPrice);

        await console.log("Os dados foram preenchidos com sucesso!");
        await console.log("O titulo é: " + finalTitle + " e o autor é: " + finalAuthor);
        await console.log("O estoque é: " + finalStock);

        return { finalTitle, finalAuthor, finalNumberOfPages, finalDescription, finalImageURL, finalStock, finalPrice };
    }

    async Fill_BookName_inputfield(title) {
        await this.NomeLivro_BookName_inputfield.fill(title);
    }

    async Fill_BookAuthor_inputfield(author) {
        await this.NomeAutor_AuthorName_inputfield.fill(author);
    }

    async Fill_NumberOfPages_spinbutton(numberOfPages) {
        await this.NumeroPaginas_NumberOfPages_spinbutton.fill(numberOfPages);
    }

    async ClickAdicionarLivro_AddBook_button() {
        await this.AdicionarLivro_AddBook_button.click();
    }
}

export default Books_page;