// @ts-check
import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

test.describe('Arrendamentos', () => {
    test('Criar Arrendamento Válido (Sucesso)', async ({ page }) => {
        let responseGETusers = await page.request.get('/usuarios');
        let responseGETbooks = await page.request.get('/livros');

        expect(responseGETusers.status()).toBe(200);
        expect(responseGETbooks.status()).toBe(200);

        let bodyGETusers = await responseGETusers.json();
        let bodyGETbooks = await responseGETbooks.json();

        expect(Array.isArray(bodyGETusers)).toBe(true);
        expect(bodyGETusers.length).toBeGreaterThan(0);
        expect(Array.isArray(bodyGETbooks)).toBe(true);
        expect(bodyGETbooks.length).toBeGreaterThan(0);

        let randomUser = faker.helpers.arrayElement(bodyGETusers).id;

        console.log(bodyGETbooks);
        let randomBook = faker.helpers.arrayElement(bodyGETbooks.filter(book => book.estoque > 0)).id;

        console.log("User ID usado:" + randomUser);
        console.log("Book ID usado:" + randomBook);

        let datainicio = faker.date.between({ from: '2020-01-01', to: '2030-12-31' });
        let datafim = faker.date.future({ refDate: datainicio });

        console.log(datainicio);
        console.log(datafim);

        let responsePOSTrent = await page.request.post('/arrendamentos', {
            data: {
                "usuarioId": randomUser,
                "livroId": randomBook,
                "dataInicio": datainicio,
                "dataFim": datafim
            }
        });

        expect(responsePOSTrent.status()).toBe(201);

        let bodyPOSTrent = await responsePOSTrent.json();
        expect(bodyPOSTrent).toHaveProperty('id');
        expect(bodyPOSTrent).toHaveProperty('usuarioId');
        expect(bodyPOSTrent).toHaveProperty('livroId');
        expect(bodyPOSTrent).toHaveProperty('status');
        expect(bodyPOSTrent.status).toBe('PENDENTE');
        expect(bodyPOSTrent).toHaveProperty('criadoEm');

    });


    test('Criar Arrendamento sem Estoque (Falha)', async ({ page }) => {
        const newBook = {
            "nome": faker.book.title(),
            "autor": faker.person.fullName(),
            "paginas": faker.number.int({ min: 10, max: 2000 }),
            "descricao": faker.lorem.paragraph(2),
            "imagemUrl": faker.image.url(),
            "estoque": 0,
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

        let response2GETusers = await page.request.get('/usuarios');

        expect(response2GETusers.status()).toBe(200);

        let bodyGETusers = await response2GETusers.json();

        let randomUser2 = faker.helpers.arrayElement(bodyGETusers).id;

        let datainicio2 = faker.date.between({ from: '2020-01-01', to: '2030-12-31' });
        let datafim2 = faker.date.future({ refDate: datainicio2 });

        let responsePOSTinvalidrent = await page.request.post('/arrendamentos', {
            data: {
                "usuarioId": randomUser2,
                "livroId": bodyPOSTnewBook_Random.id,
                "dataInicio": datainicio2,
                "dataFim": datafim2
            }
        });

        expect(responsePOSTinvalidrent.status()).toBe(400);

        let bodyPOSTinvalidrent = await responsePOSTinvalidrent.json();
        expect(bodyPOSTinvalidrent.mensagem).toBe('Livro sem estoque para arrendamento');
    });


    test('Atualizar Status de Arrendamento para APROVADO (Sucesso)', async ({ page }) => {
        let response3GETusers = await page.request.get('/usuarios');
        let response3GETbooks = await page.request.get('/livros');

        expect(response3GETusers.status()).toBe(200);
        expect(response3GETbooks.status()).toBe(200);

        let body3GETusers = await response3GETusers.json();
        let body3GETbooks = await response3GETbooks.json();

        expect(Array.isArray(body3GETusers)).toBe(true);
        expect(body3GETusers.length).toBeGreaterThan(0);
        expect(Array.isArray(body3GETbooks)).toBe(true);
        expect(body3GETbooks.length).toBeGreaterThan(0);

        let randomUser3 = faker.helpers.arrayElement(body3GETusers).id;

        let randomBook3 = faker.helpers.arrayElement(body3GETbooks.filter(book => book.estoque > 0)).id;

        console.log("User ID usado:" + randomUser3);
        console.log("Book ID usado:" + randomBook3);

        let datainicio3 = faker.date.between({ from: '2020-01-01', to: '2030-12-31' });
        let datafim3 = faker.date.future({ refDate: datainicio3 });

        console.log(datainicio3);
        console.log(datafim3);

        let response3GETbook = await page.request.get('/livros/' + randomBook3);

        expect(response3GETbook.status()).toBe(200);

        let body3GETbook = await response3GETbook.json();

        expect(body3GETbook.estoque).toBeGreaterThan(0);
        let randomBook3_stock = body3GETbook.estoque;

        let responsePOSTrent = await page.request.post('/arrendamentos', {
            data: {
                "usuarioId": randomUser3,
                "livroId": randomBook3,
                "dataInicio": datainicio3,
                "dataFim": datafim3
            }
        });

        expect(responsePOSTrent.status()).toBe(201);

        let bodyPOSTrent = await responsePOSTrent.json();
        expect(bodyPOSTrent).toHaveProperty('id');
        expect(bodyPOSTrent).toHaveProperty('usuarioId');
        expect(bodyPOSTrent).toHaveProperty('livroId');
        expect(bodyPOSTrent).toHaveProperty('status');
        expect(bodyPOSTrent.status).toBe('PENDENTE');
        expect(bodyPOSTrent).toHaveProperty('criadoEm');
        console.log(bodyPOSTrent.id);

        let responsePUTrent = await page.request.put(`/arrendamentos/${bodyPOSTrent.id}/status`, {
            data: {
                "status": "APROVADO"
            }
        });

        expect(responsePUTrent.status()).toBe(200);

        let response3GETrent = await page.request.get(`/arrendamentos/`);

        expect(response3GETrent.status()).toBe(200);

        let body3GETrent = await response3GETrent.json();
        let found = false;
        console.log(body3GETrent);
        for (const rent of body3GETrent) {
            if (rent.id === bodyPOSTrent.id) {
                found = true;
                expect(rent).toHaveProperty('status');
                expect(rent.status).toBe('APROVADO')
                break;
            }
        }

        if (found === false) {
            throw new Error('ID Arrendamento não encontrado');
        }

        let response4GETbook = await page.request.get(`/livros/${randomBook3}`);

        expect(response4GETbook.status()).toBe(200);

        let body4GETbook = await response4GETbook.json();

        expect(body4GETbook).toHaveProperty('estoque');
        expect(body4GETbook.estoque).toBe(randomBook3_stock - 1);
        expect(body4GETbook.estoque).toBeGreaterThanOrEqual(0);
    });


    test('Atualizar Status com Valor Inválido (Falha)', async ({ page }) => {
        let response4GETusers = await page.request.get('/usuarios');
        let response4GETbooks = await page.request.get('/livros');

        expect(response4GETusers.status()).toBe(200);
        expect(response4GETbooks.status()).toBe(200);

        let body4GETusers = await response4GETusers.json();
        let body4GETbooks = await response4GETbooks.json();

        expect(Array.isArray(body4GETusers)).toBe(true);
        expect(body4GETusers.length).toBeGreaterThan(0);
        expect(Array.isArray(body4GETbooks)).toBe(true);
        expect(body4GETbooks.length).toBeGreaterThan(0);

        let randomUser4 = faker.helpers.arrayElement(body4GETusers).id;

        let randomBook4 = faker.helpers.arrayElement(body4GETbooks.filter(book => book.estoque > 0)).id;

        console.log("User ID usado:" + randomUser4);
        console.log("Book ID usado:" + randomBook4);

        let datainicio4 = faker.date.between({ from: '2020-01-01', to: '2030-12-31' });
        let datafim4 = faker.date.future({ refDate: datainicio4 });

        console.log(datainicio4);
        console.log(datafim4);

        let response4GETbook = await page.request.get('/livros/' + randomBook4);

        expect(response4GETbook.status()).toBe(200);

        let body4GETbook = await response4GETbook.json();

        expect(body4GETbook.estoque).toBeGreaterThan(0);

        let response4POSTrent = await page.request.post('/arrendamentos', {
            data: {
                "usuarioId": randomUser4,
                "livroId": randomBook4,
                "dataInicio": datainicio4,
                "dataFim": datafim4
            }
        });

        expect(response4POSTrent.status()).toBe(201);

        let body4POSTrent = await response4POSTrent.json();
        expect(body4POSTrent).toHaveProperty('id');
        expect(body4POSTrent).toHaveProperty('usuarioId');
        expect(body4POSTrent).toHaveProperty('livroId');
        expect(body4POSTrent).toHaveProperty('status');
        expect(body4POSTrent.status).toBe('PENDENTE');
        expect(body4POSTrent).toHaveProperty('criadoEm');

        let response2PUTrent = await page.request.put(`/arrendamentos/${body4POSTrent.id}/status`, {
            data: {
                "status": "EM_ANALISE"
            }
        });

        expect(response2PUTrent.status()).toBe(400);

        let body2PUTrent = await response2PUTrent.json();
        expect(body2PUTrent.mensagem).toBe('Status inválido');
    });


    test('Listar Arrendamentos do Usuário (Sucesso)', async ({ page }) => {
        let response6GETusers = await page.request.get('/usuarios');
        let response6GETbooks = await page.request.get('/livros');

        expect(response6GETusers.status()).toBe(200);
        expect(response6GETbooks.status()).toBe(200);

        let body6GETusers = await response6GETusers.json();
        let body6GETbooks = await response6GETbooks.json();

        expect(Array.isArray(body6GETusers)).toBe(true);
        expect(body6GETusers.length).toBeGreaterThan(0);
        expect(Array.isArray(body6GETbooks)).toBe(true);
        expect(body6GETbooks.length).toBeGreaterThan(0);

        let randomUser6 = faker.helpers.arrayElement(body6GETusers).id;

        let randomBook6 = faker.helpers.arrayElement(body6GETbooks.filter(book => book.estoque > 0)).id;

        console.log("User ID usado:" + randomUser6);
        console.log("Book ID usado:" + randomBook6);

        let datainicio6 = faker.date.between({ from: '2020-01-01', to: '2030-12-31' });
        let datafim6 = faker.date.future({ refDate: datainicio6 });

        console.log(datainicio6);
        console.log(datafim6);

        let responsePOSTrent = await page.request.post('/arrendamentos', {
            data: {
                "usuarioId": randomUser6,
                "livroId": randomBook6,
                "dataInicio": datainicio6,
                "dataFim": datafim6
            }
        });

        expect(responsePOSTrent.status()).toBe(201);

        let bodyPOSTrent = await responsePOSTrent.json();
        expect(bodyPOSTrent).toHaveProperty('id');
        expect(bodyPOSTrent).toHaveProperty('usuarioId');
        expect(bodyPOSTrent).toHaveProperty('livroId');
        expect(bodyPOSTrent).toHaveProperty('status');
        expect(bodyPOSTrent.status).toBe('PENDENTE');
        expect(bodyPOSTrent).toHaveProperty('criadoEm');

        let responseGETrentsUser = await page.request.get(`/arrendamentos/me?usuarioId=${randomUser6}`);

        expect(responseGETrentsUser.status()).toBe(200);

        let bodyGETrentsUser = await responseGETrentsUser.json();

        expect(Array.isArray(bodyGETrentsUser)).toBe(true);
        expect(bodyGETrentsUser.length).toBeGreaterThan(0);

        for (const UserRent of bodyGETrentsUser) {
            expect(UserRent).toHaveProperty('usuarioId');
            expect(UserRent.usuarioId).toBe(randomUser6);
        }

    });
})