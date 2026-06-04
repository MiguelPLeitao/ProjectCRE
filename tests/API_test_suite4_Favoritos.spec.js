// @ts-check
import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

const createNewRandomUser = async (page) => {
    let responsePOSTnewRandomUser = await page.request.post('/registro', {
        data: {
            "nome": faker.person.firstName(),
            "email": faker.internet.email(),
            "senha": faker.internet.password(),
        }
    });
    expect(responsePOSTnewRandomUser.status()).toBe(201);
    let bodyPOSTnewRandomUser = await responsePOSTnewRandomUser.json();
    expect(bodyPOSTnewRandomUser).toHaveProperty('usuario');
    return bodyPOSTnewRandomUser;
}


test.describe('Favoritos', () => {
    test('Adicionar Livro aos Favoritos (Sucesso)', async ({ page }) => {
        let responseGETbooks = await page.request.get('/livros');

        let bodyGETbooks = await responseGETbooks.json();

        expect(responseGETbooks.status()).toBe(200);
        expect(bodyGETbooks.length).toBeGreaterThan(0);
        expect(Array.isArray(bodyGETbooks)).toBe(true);


        let randomBook = bodyGETbooks[faker.number.int({ min: 0, max: bodyGETbooks.length - 1 })].id;
        let newRandomUser = await createNewRandomUser(page);


        console.log("Book ID usado:" + randomBook);
        console.log("User ID usado:" + newRandomUser.usuario.id);

        let responsePOSTfavoritebook = await page.request.post('/favoritos', {
            data: {
                "usuarioId": newRandomUser.usuario.id,
                "livroId": randomBook
            }
        });

        expect(responsePOSTfavoritebook.status()).toBe(201);

        let bodyPOSTfavoritebooks = await responsePOSTfavoritebook.json();
        expect(bodyPOSTfavoritebooks.mensagem).toBe('Livro adicionado aos favoritos');
    });

    test('Adicionar Livro Já Favoritado (Falha)', async ({ page }) => {
        let response2GETbooks = await page.request.get('/livros');

        let body2GETbooks = await response2GETbooks.json();

        expect(response2GETbooks.status()).toBe(200);
        expect(body2GETbooks.length).toBeGreaterThan(0);
        expect(Array.isArray(body2GETbooks)).toBe(true);


        let randomBook2 = body2GETbooks[faker.number.int({ min: 0, max: body2GETbooks.length - 1 })].id;
        let newRandomUser2 = await createNewRandomUser(page);


        console.log("Book ID usado:" + randomBook2);
        console.log("User ID usado:" + newRandomUser2.usuario.id);

        let response2POSTfavoritebook = await page.request.post('/favoritos', {
            data: {
                "usuarioId": newRandomUser2.usuario.id,
                "livroId": randomBook2
            }
        });

        expect(response2POSTfavoritebook.status()).toBe(201);

        let bodyPOSTfavoritebooks = await response2POSTfavoritebook.json();
        expect(bodyPOSTfavoritebooks.mensagem).toBe('Livro adicionado aos favoritos');


        let responsePOSTinvalidfavoritebook = await page.request.post('/favoritos', {
            data: {
                "usuarioId": newRandomUser2.usuario.id,
                "livroId": randomBook2
            }
        });

        expect(responsePOSTinvalidfavoritebook.status()).toBe(400);

        let bodyPOSTinvalidfavoritebooks = await responsePOSTinvalidfavoritebook.json();
        expect(bodyPOSTinvalidfavoritebooks.mensagem).toBe('Já está nos favoritos');
    });

    test('Listar Favoritos de Usuário (Sucesso)', async ({ page }) => {
        let response3GETbooks = await page.request.get('/livros');

        let body3GETbooks = await response3GETbooks.json();

        expect(response3GETbooks.status()).toBe(200);
        expect(body3GETbooks.length).toBeGreaterThan(0);
        expect(Array.isArray(body3GETbooks)).toBe(true);


        let randomBook2 = body3GETbooks[faker.number.int({ min: 0, max: body3GETbooks.length - 1 })].id;
        let newRandomUser2 = await createNewRandomUser(page);


        console.log("Book ID usado:" + randomBook2);
        console.log("User ID usado:" + newRandomUser2.usuario.id);

        let response3GETfavoritebooks = await page.request.get('/favoritos/' + newRandomUser2.usuario.id);

        expect(response3GETfavoritebooks.status()).toBe(200);

        let body3GETfavoritebooks = await response3GETfavoritebooks.json();
        expect(body3GETfavoritebooks.length).toBe(0);
        expect(Array.isArray(body3GETfavoritebooks)).toBe(true);


        let response3POSTfavoritebook = await page.request.post('/favoritos', {
            data: {
                "usuarioId": newRandomUser2.usuario.id,
                "livroId": randomBook2
            }
        });

        expect(response3POSTfavoritebook.status()).toBe(201);

        let bodyPOSTfavoritebooks = await response3POSTfavoritebook.json();
        expect(bodyPOSTfavoritebooks.mensagem).toBe('Livro adicionado aos favoritos');


        let response3GETfavoritebooks2 = await page.request.get('/favoritos/' + newRandomUser2.usuario.id);

        expect(response3GETfavoritebooks2.status()).toBe(200);

        let body3GETfavoritebooks2 = await response3GETfavoritebooks2.json();
        expect(body3GETfavoritebooks2.length).toBe(1);
        expect(Array.isArray(body3GETfavoritebooks2)).toBe(true);
    });

    test('Remover Livro dos Favoritos (Sucesso)', async ({ page }) => {
        let response4GETbooks = await page.request.get('/livros');

        let body4GETbooks = await response4GETbooks.json();

        expect(response4GETbooks.status()).toBe(200);
        expect(body4GETbooks.length).toBeGreaterThan(0);
        expect(Array.isArray(body4GETbooks)).toBe(true);


        let randomBook3 = body4GETbooks[faker.number.int({ min: 0, max: body4GETbooks.length - 1 })].id;
        let newRandomUser3 = await createNewRandomUser(page);


        console.log("Book ID usado:" + randomBook3);
        console.log("User ID usado:" + newRandomUser3.usuario.id);

        let response4POSTfavoritebook = await page.request.post('/favoritos', {
            data: {
                "usuarioId": newRandomUser3.usuario.id,
                "livroId": randomBook3
            }
        });

        expect(response4POSTfavoritebook.status()).toBe(201);

        let bodyPOSTfavoritebooks = await response4POSTfavoritebook.json();
        expect(bodyPOSTfavoritebooks.mensagem).toBe('Livro adicionado aos favoritos');


        let responseDELETEfavoritebook = await page.request.delete('/favoritos', {
            data: {
                "usuarioId": newRandomUser3.usuario.id,
                "livroId": randomBook3
            }
        });

        expect(responseDELETEfavoritebook.status()).toBe(200);

        let bodyDELETEfavoritebooks = await responseDELETEfavoritebook.json();
        expect(bodyDELETEfavoritebooks.mensagem).toBe('Livro removido dos favoritos');


        let response2DELETEfavoritebook = await page.request.delete('/favoritos', {
            data: {
                "usuarioId": newRandomUser3.usuario.id,
                "livroId": randomBook3
            }
        });

        expect(response2DELETEfavoritebook.status()).toBe(404);
    });
});