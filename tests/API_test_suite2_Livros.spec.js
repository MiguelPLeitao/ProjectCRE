// @ts-check
import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

test.describe('Livros', () => {
    test('Listar Todos os Livros (Sucesso)', async ({ page }) => {
        let response1GETbooks = await page.request.get('/livros');

        expect(response1GETbooks.status()).toBe(200);

        let body1GETbooks = await response1GETbooks.json();

        expect(Array.isArray(body1GETbooks)).toBe(true);

        for (const book of body1GETbooks) {
            expect(book).toHaveProperty('id');
            expect(book).toHaveProperty('nome');
            expect(book).toHaveProperty('autor');
            expect(book).toHaveProperty('paginas');
            expect(book).toHaveProperty('descricao');
            expect(book).toHaveProperty('imagemUrl');
            expect(book).toHaveProperty('dataCadastro');
            expect(book).toHaveProperty('estoque');
            expect(book).toHaveProperty('preco');
            expect(Number.isInteger(book.id)).toBe(true);
            expect(Number.isInteger(book.paginas)).toBe(true);
            expect(book.paginas).toBeGreaterThan(0);
            const date = new Date(book.dataCadastro);
            expect(date.toISOString()).toBe(book.dataCadastro);
        }
    })

    test('Listar Livros Disponíveis (Sucesso)', async ({ page }) => {
        let responseGETavailableBooks = await page.request.get('/livros/disponiveis');

        expect(responseGETavailableBooks.status()).toBe(200);

        let bodyGETavailableBooks = await responseGETavailableBooks.json();

        expect(Array.isArray(bodyGETavailableBooks)).toBe(true);

        for (const bookavailable of bodyGETavailableBooks) {
            expect(bookavailable).toHaveProperty('estoque');
            expect(Number.isInteger(bookavailable.estoque)).toBe(true);
            expect(bookavailable.estoque).toBeGreaterThan(0);
            expect(bookavailable).toHaveProperty('disponivel');
            expect(typeof bookavailable.disponivel).toBe('boolean');
            expect(bookavailable.disponivel).toBe(true);
        }
    });

    test('Buscar Livro por ID (Existente)(Sucesso)', async ({ page }) => {
        let response2GETbooks = await page.request.get('/livros');

        expect(response2GETbooks.status()).toBe(200);
        expect(Array.isArray(await response2GETbooks.json())).toBe(true);

        let randombook = faker.helpers.arrayElement(await response2GETbooks.json());

        let response1GETbookById = await page.request.get(`/livros/${randombook.id}`);

        expect(response1GETbookById.status()).toBe(200);

        let body1GETbookById = await response1GETbookById.json();

        expect(body1GETbookById).toHaveProperty('id');
        expect(body1GETbookById.id).toBe(randombook.id);
        expect(body1GETbookById).toHaveProperty('nome');
        expect(body1GETbookById).toHaveProperty('autor');
        expect(body1GETbookById).toHaveProperty('paginas');
        expect(body1GETbookById.nome).not.toBe('');
        expect(body1GETbookById.nome).not.toBe(undefined);
        expect(body1GETbookById.autor).not.toBe('');
        expect(body1GETbookById.autor).not.toBe(undefined);
        expect(body1GETbookById.paginas).not.toBe(undefined);
        expect(Number.isInteger(body1GETbookById.paginas)).toBe(true);
        expect(body1GETbookById.paginas).toBeGreaterThan(0);
    })

    test('Buscar Livro por ID (Inexistente)(Falha)', async ({ page }) => {
        let response2GETbooks = await page.request.get('/livros');

        expect(response2GETbooks.status()).toBe(200);
        expect(Array.isArray(await response2GETbooks.json())).toBe(true);

        let booksarray = await response2GETbooks.json();
        let lastbook = booksarray[booksarray.length - 1];

        let response2GETbookById = await page.request.get(`/livros/${lastbook.id + 1}`);

        expect(response2GETbookById.status()).toBe(404);

        let body2GETbookById = await response2GETbookById.json();
        expect(body2GETbookById.mensagem).toBe('Livro não encontrado');
    });


    test('Adicionar Novo Livro (Sucesso)', async ({ page }) => {
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

        let bodyPOSTnewBook_Random = await responsePOSTnewBook_Random.json();

        expect(bodyPOSTnewBook_Random).toHaveProperty('id');
        expect(Number.isInteger(bodyPOSTnewBook_Random.id)).toBe(true);
        expect(bodyPOSTnewBook_Random.id).toBeGreaterThanOrEqual(0);
        expect(bodyPOSTnewBook_Random).toHaveProperty('dataCadastro');
        const date = new Date(bodyPOSTnewBook_Random.dataCadastro);
        expect(date.toISOString()).toBe(bodyPOSTnewBook_Random.dataCadastro);
        expect(bodyPOSTnewBook_Random.nome).toBe(newBook.nome);
        expect(bodyPOSTnewBook_Random.autor).toBe(newBook.autor);
        expect(bodyPOSTnewBook_Random.paginas).toBe(newBook.paginas);
        expect(bodyPOSTnewBook_Random.descricao).toBe(newBook.descricao);
        expect(bodyPOSTnewBook_Random.imagemUrl).toBe(newBook.imagemUrl);
        expect(bodyPOSTnewBook_Random.estoque).toBe(newBook.estoque);
        expect(bodyPOSTnewBook_Random.preco).toBe(newBook.preco);
        console.log("Livro aleatório criado com sucesso");
    });


    test.describe('Adicionar Livro sem Campos Obrigatórios (Falha)', () => {
        test('Livro Sem nome', async ({ page }) => {
            let response1POSTinvalidBook_NoName = await page.request.post('/livros',
                {
                    data: {
                        "nome": "",
                        "autor": faker.person.fullName(),
                        "paginas": faker.number.int({ min: 10, max: 2000 }),
                    }
                });

            expect(response1POSTinvalidBook_NoName.status()).toBe(400);

            let body1POSTinvalidBook_NoName = await response1POSTinvalidBook_NoName.json();

            expect(body1POSTinvalidBook_NoName.mensagem).toBe("Nome, autor e páginas são obrigatórios");
        });

        test('Livro Sem autor', async ({ page }) => {
            let response2POSTinvalidBook_NoAuthor = await page.request.post('/livros',
                {
                    data: {
                        "nome": faker.book.title(),
                        "autor": "",
                        "paginas": faker.number.int({ min: 10, max: 2000 }),
                    }
                });

            expect(response2POSTinvalidBook_NoAuthor.status()).toBe(400);

            let body2POSTinvalidBook_NoAuthor = await response2POSTinvalidBook_NoAuthor.json();

            expect(body2POSTinvalidBook_NoAuthor.mensagem).toBe("Nome, autor e páginas são obrigatórios");
        });

        test('Livro Sem páginas', async ({ page }) => {
            let response3POSTinvalidBook_NoPages = await page.request.post('/livros',
                {
                    data: {
                        "nome": faker.book.title(),
                        "autor": faker.person.fullName(),
                        "paginas": ""
                    }
                });

            expect(response3POSTinvalidBook_NoPages.status()).toBe(400);

            let body3POSTinvalidBook_NoPages = await response3POSTinvalidBook_NoPages.json();

            expect(body3POSTinvalidBook_NoPages.mensagem).toBe("Nome, autor e páginas são obrigatórios");
        });
    });

    test('Atualizar Livro Existente (Sucesso)', async ({ page }) => {
        await new Promise(resolve => setTimeout(resolve, 3000));

        let response3GETbooks = await page.request.get('/livros');

        expect(response3GETbooks.status()).toBe(200);
        expect(Array.isArray(await response3GETbooks.json())).toBe(true);

        let randombook = faker.helpers.arrayElement(await response3GETbooks.json());

        let responsePUTupdateBook = await page.request.put(`/livros/${randombook.id}`,
            {
                data: {
                    "nome": randombook.nome + " - Editado",
                    "autor": randombook.autor + " - Editado",
                    "paginas": randombook.paginas + 10,
                    "descricao": randombook.descricao + " - Editado",
                    "imagemUrl": "Editado",
                    "estoque": 0,
                    "preco": 0
                }
            });

        expect(responsePUTupdateBook.status()).toBe(200);

        let bodyPUTupdateBook = await responsePUTupdateBook.json();

        expect(bodyPUTupdateBook.id).toBe(randombook.id);
        expect(bodyPUTupdateBook.nome).toBe(randombook.nome + " - Editado");
        expect(bodyPUTupdateBook.autor).toBe(randombook.autor + " - Editado");
        expect(bodyPUTupdateBook.paginas).toBe(randombook.paginas + 10);
        expect(bodyPUTupdateBook.descricao).toBe(randombook.descricao + " - Editado");
        expect(bodyPUTupdateBook.imagemUrl).toBe("Editado");
        expect(bodyPUTupdateBook.estoque).toBe(0);
        expect(bodyPUTupdateBook.preco).toBe(0);
        console.log("Livro aleatório atualizado com sucesso");
    })

    test('Apagar Livro (Sucesso)', async ({ page }) => {
        const newBook2 = {
            "nome": faker.book.title(),
            "autor": faker.person.fullName(),
            "paginas": faker.number.int({ min: 10, max: 2000 })
        };

        let response2POSTnewBook = await page.request.post('/livros',
            {
                data: newBook2
            }
        );

        expect(response2POSTnewBook.status()).toBe(201);
        let body2POSTnewBook = await response2POSTnewBook.json();
        expect(body2POSTnewBook).toHaveProperty('id');
        expect(Number.isInteger(body2POSTnewBook.id)).toBe(true);
        expect(body2POSTnewBook.id).toBeGreaterThanOrEqual(0);

        let responseDELETEnewbook = await page.request.delete(`/livros/${body2POSTnewBook.id}`);
        expect(responseDELETEnewbook.status()).toBe(200);
        let bodyDELETEnewbook = await responseDELETEnewbook.json();
        expect(bodyDELETEnewbook.mensagem).toBe('Livro removido');

        let responseGETdeletednewbook = await page.request.get(`/livros/${body2POSTnewBook.id}`);
        expect(responseGETdeletednewbook.status()).toBe(404);

    })

})