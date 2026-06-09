import { expect } from '@playwright/test';

const RandomValidBook = {
    TITLE: faker.book.title(),
    AUTHOR: faker.book.author(),
    NUMBER_OF_PAGES: faker.number.int({ min: 1, max: 2000 }),
    DESCRIPTION: faker.lorem.paragraph(),
    URL_IMAGE: faker.internet.url(),
    STOCK: faker.number.int({ min: 1, max: 100 }),
    PRICE: faker.number.int({ min: 1, max: 200 })
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
        this.Favoritos_Favorites_button = page.getByRole('link', { name: 'Favoritos' });
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
        this.Livro1_Book1_button = page.locator("//div[@id='lista-livros']//div[contains(@class,'book-card')]").nth(0);
        this.Livro2_Book2_button = page.locator("//div[@id='lista-livros']//div[contains(@class,'book-card')]").nth(1);
        this.Livro3_Book3_button = page.locator("//div[@id='lista-livros']//div[contains(@class,'book-card')]").nth(2);
        this.Livro4_Book4_button = page.locator("//div[@id='lista-livros']//div[contains(@class,'book-card')]").nth(3);
        this.Livro5_Book5_button = page.locator("//div[@id='lista-livros']//div[contains(@class,'book-card')]").nth(4);
        this.Livro6_Book6_button = page.locator("//div[@id='lista-livros']//div[contains(@class,'book-card')]").nth(5);
        this.Livro7_Book7_button = page.locator("//div[@id='lista-livros']//div[contains(@class,'book-card')]").nth(6);
        this.Livro8_Book8_button = page.locator("//div[@id='lista-livros']//div[contains(@class,'book-card')]").nth(7);
        this.Livro9_Book9_button = page.locator("//div[@id='lista-livros']//div[contains(@class,'book-card')]").nth(8);
        this.Livro10_Book10_button = page.locator("//div[@id='lista-livros']//div[contains(@class,'book-card')]").nth(9);
        this.Livro11_Book11_button = page.locator("//div[@id='lista-livros']//div[contains(@class,'book-card')]").nth(10);
        this.Livro12_Book12_button = page.locator("//div[@id='lista-livros']//div[contains(@class,'book-card')]").nth(11);
        this.Livro13_Book13_button = page.locator("//div[@id='lista-livros']//div[contains(@class,'book-card')]").nth(12);
        this.Livro14_Book14_button = page.locator("//div[@id='lista-livros']//div[contains(@class,'book-card')]").nth(13);
        this.Livro15_Book15_button = page.locator("//div[@id='lista-livros']//div[contains(@class,'book-card')]").nth(14);
        this.Livro16_Book16_button = page.locator("//div[@id='lista-livros']//div[contains(@class,'book-card')]").nth(15);
        this.Livro17_Book17_button = page.locator("//div[@id='lista-livros']//div[contains(@class,'book-card')]").nth(16);
        this.Livro18_Book18_button = page.locator("//div[@id='lista-livros']//div[contains(@class,'book-card')]").nth(17);
        this.Livro19_Book19_button = page.locator("//div[@id='lista-livros']//div[contains(@class,'book-card')]").nth(18);
        this.Livro20_Book20_button = page.locator("//div[@id='lista-livros']//div[contains(@class,'book-card')]").nth(19);
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

    async ClickFavoritos_Favorites_button() {
        await this.Favoritos_Favorites_button.click();
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

    async ClickLivro1_Book1_button() {
        await this.Livro1_Book1_button.click();
    }

    async ClickLivro2_Book2_button() {
        await this.Livro2_Book2_button.click();
    }

    async ClickLivro3_Book3_button() {
        await this.Livro3_Book3_button.click();
    }

    async ClickLivro4_Book4_button() {
        await this.Livro4_Book4_button.click();
    }

    async ClickLivro5_Book5_button() {
        await this.Livro5_Book5_button.click();
    }

    async ClickLivro6_Book6_button() {
        await this.Livro6_Book6_button.click();
    }

    async ClickLivro7_Book7_button() {
        await this.Livro7_Book7_button.click();
    }

    async ClickLivro8_Book8_button() {
        await this.Livro8_Book8_button.click();
    }

    async ClickLivro9_Book9_button() {
        await this.Livro9_Book9_button.click();
    }

    async ClickLivro10_Book10_button() {
        await this.Livro10_Book10_button.click();
    }

    async ClickLivro11_Book11_button() {
        await this.Livro11_Book11_button.click();
    }

    async ClickLivro12_Book12_button() {
        await this.Livro12_Book12_button.click();
    }

    async ClickLivro13_Book13_button() {
        await this.Livro13_Book13_button.click();
    }

    async ClickLivro14_Book14_button() {
        await this.Livro14_Book14_button.click();
    }

    async ClickLivro15_Book15_button() {
        await this.Livro15_Book15_button.click();
    }

    async ClickLivro16_Book16_button() {
        await this.Livro16_Book16_button.click();
    }

    async ClickLivro17_Book17_button() {
        await this.Livro17_Book17_button.click();
    }

    async ClickLivro18_Book18_button() {
        await this.Livro18_Book18_button.click();
    }

    async ClickLivro19_Book19_button() {
        await this.Livro19_Book19_button.click();
    }

    async ClickLivro20_Book20_button() {
        await this.Livro20_Book20_button.click();
    }

    async Fill_AllNewBook_Fields(title, author, numberOfPages, description, imageURL, stock, price) {
        const finalTitle = title || RandomValdBook.TITLE;
        const finalAuthor = author || RandomValidBook.AUTHOR;
        const finalNumberOfPages = numberOfPages || RandomValidBook.NUMBER_OF_PAGES;
        const finalDescription = description || RandomValidBook.DESCRIPTION;
        const finalImageURL = imageURL || RandomValidBook.URL_IMAGE;
        const finalStock = stock || RandomValidBook.STOCK;
        const finalPrice = price || RandomValidBook.PRICE;

        await this.NomeLivro_BookName_inputfield.fill(finalTitle);
        await this.Autor_BookAuthor_inputfield.fill(finalAuthor);
        await this.NumeroPaginas_NumberOfPages_spinbutton.fill(finalNumberOfPages);
        await this.Descricao_BookDescription_inputfield.fill(finalDescription);
        await this.URLImagem_BookImageURL_inputfield.fill(finalImageURL);
        await this.Estoque_Stock_spinbutton.fill(finalStock);
        await this.Preco_BookPrice_spinbutton.fill(finalPrice);

        await console.log("Os dados foram preenchidos com sucesso!");
        await console.log("O titulo é: " + finalTitle + " e o autor é: " + finalAuthor);
        await console.log("O estoque é: " + finalStock);

        return { finalTitle, finalAuthor, finalNumberOfPages, finalDescription, finalImageURL, finalStock, finalPrice };
    }

    async Fill_BookName_inputfield(title) {
        await this.NomeLivro_BookName_inputfield.fill(title);
    }

    async Fill_BookAuthor_inputfield(author) {
        await this.Autor_BookAuthor_inputfield.fill(author);
    }

    async Fill_NumberOfPages_spinbutton(numberOfPages) {
        await this.NumeroPaginas_NumberOfPages_spinbutton.fill(numberOfPages);
    }

    async ClickAdicionarLivro_AddBook_button() {
        await this.AdicionarLivro_AddBook_button.click();
    }
}

export default Books_page;