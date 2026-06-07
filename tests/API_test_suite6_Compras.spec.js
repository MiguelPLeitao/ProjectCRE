// @ts-check
import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

test.describe('Compras', () => {
    test('Criar Compra com Estoque Suficiente (Sucesso)', async ({ page }) => {
        let PreviousDate = new Date();
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

        console.log(bodyGETbooks);
        let randomUser = faker.helpers.arrayElement(bodyGETusers).id;

        let randomBook = faker.helpers.arrayElement(bodyGETbooks.filter(book => book.estoque > 0)).id;

        let responseGETbookID = await page.request.get(`/livros/${randomBook}`);

        expect(responseGETbookID.status()).toBe(200);

        let bodyGETbookID = await responseGETbookID.json();

        expect(bodyGETbookID).toHaveProperty("estoque");
        expect(bodyGETbookID.estoque).toBeGreaterThan(0);
        expect(bodyGETbookID).toHaveProperty("preco");
        expect(bodyGETbookID.preco).toBeGreaterThan(0);

        let buyQuantity = faker.number.int({ min: 1, max: bodyGETbookID.estoque });

        console.log("User ID usado:" + randomUser);
        console.log("Book ID usado:" + randomBook);
        console.log("Book Stock:" + bodyGETbookID.estoque);
        console.log("Book Price:" + bodyGETbookID.preco);
        console.log("Buy order Quantity:" + buyQuantity);


        let responsePOSTbuy = await page.request.post('/compras', {
            data: {
                "usuarioId": randomUser,
                "livroId": randomBook,
                "quantidade": buyQuantity
            }
        });

        expect(responsePOSTbuy.status()).toBe(201);

        let bodyPOSTbuy = await responsePOSTbuy.json();

        expect(bodyPOSTbuy).toHaveProperty("id");
        expect(bodyPOSTbuy).toHaveProperty("usuarioId");
        expect(bodyPOSTbuy.usuarioId).toBe(randomUser);
        expect(bodyPOSTbuy).toHaveProperty("livroId");
        expect(bodyPOSTbuy.livroId).toBe(randomBook);
        expect(bodyPOSTbuy).toHaveProperty("quantidade");
        expect(bodyPOSTbuy.quantidade).toBe(buyQuantity);
        expect(bodyPOSTbuy).toHaveProperty("total");
        expect(bodyPOSTbuy.total).toBe(buyQuantity * bodyGETbookID.preco);
        expect(bodyPOSTbuy).toHaveProperty("status");
        expect(bodyPOSTbuy.status).toBe("PENDENTE");
        expect(bodyPOSTbuy).toHaveProperty("criadoEm");
        let PostDate = new Date(bodyPOSTbuy.criadoEm);
        expect(PreviousDate.getTime()).toBeLessThanOrEqual(PostDate.getTime());
    });

    test('Criar Compra com Estoque Insuficiente (Falha)', async ({ page }) => {
        let response2GETusers = await page.request.get('/usuarios');
        let response2GETbooks = await page.request.get('/livros');

        expect(response2GETusers.status()).toBe(200);
        expect(response2GETbooks.status()).toBe(200);

        let body2GETusers = await response2GETusers.json();
        let body2GETbooks = await response2GETbooks.json();

        expect(Array.isArray(body2GETusers)).toBe(true);
        expect(body2GETusers.length).toBeGreaterThan(0);
        expect(Array.isArray(body2GETbooks)).toBe(true);
        expect(body2GETbooks.length).toBeGreaterThan(0);

        console.log(body2GETbooks);
        let randomUser2 = faker.helpers.arrayElement(body2GETusers).id;

        let randomBook2 = faker.helpers.arrayElement(body2GETbooks.filter(book => book.estoque > 0)).id;

        let response2GETbookID = await page.request.get(`/livros/${randomBook2}`);

        expect(response2GETbookID.status()).toBe(200);

        let body2GETbookID = await response2GETbookID.json();

        expect(body2GETbookID).toHaveProperty("estoque");
        expect(body2GETbookID.estoque).toBeGreaterThan(0);
        expect(body2GETbookID).toHaveProperty("preco");
        expect(body2GETbookID.preco).toBeGreaterThan(0);

        let buyQuantity2 = faker.number.int({ min: body2GETbookID.estoque + 1, max: body2GETbookID.estoque + 100 });

        console.log("User ID usado:" + randomUser2);
        console.log("Book ID usado:" + randomBook2);
        console.log("Book Stock:" + body2GETbookID.estoque);
        console.log("Book Price:" + body2GETbookID.preco);
        console.log("Buy order Quantity:" + buyQuantity2);

        let response2POSTbuy = await page.request.post('/compras', {
            data: {
                "usuarioId": randomUser2,
                "livroId": randomBook2,
                "quantidade": buyQuantity2
            }
        });

        expect(response2POSTbuy.status()).toBe(400);

        let body2POSTbuy = await response2POSTbuy.json();

        expect(body2POSTbuy).toHaveProperty("mensagem");
        expect(body2POSTbuy.mensagem).toBe("Estoque insuficiente");
    });


    test('Aprovar Compra (Sucesso)', async ({ page }) => {
        let PreviousDate3 = new Date();
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

        console.log(body3GETbooks);
        let randomUser3 = faker.helpers.arrayElement(body3GETusers).id;

        let randomBook3 = faker.helpers.arrayElement(body3GETbooks.filter(book => book.estoque > 0)).id;

        let response3GETbookID = await page.request.get(`/livros/${randomBook3}`);

        expect(response3GETbookID.status()).toBe(200);

        let body3GETbookID = await response3GETbookID.json();

        expect(body3GETbookID).toHaveProperty("estoque");
        expect(body3GETbookID.estoque).toBeGreaterThan(0);
        expect(body3GETbookID).toHaveProperty("preco");
        expect(body3GETbookID.preco).toBeGreaterThan(0);

        let buyQuantity3 = faker.number.int({ min: 1, max: body3GETbookID.estoque });

        console.log("User ID usado:" + randomUser3);
        console.log("Book ID usado:" + randomBook3);
        console.log("Book Stock:" + body3GETbookID.estoque);
        console.log("Book Price:" + body3GETbookID.preco);
        console.log("Buy order Quantity:" + buyQuantity3);


        let response3POSTbuy = await page.request.post('/compras', {
            data: {
                "usuarioId": randomUser3,
                "livroId": randomBook3,
                "quantidade": buyQuantity3
            }
        });

        expect(response3POSTbuy.status()).toBe(201);

        let body3POSTbuy = await response3POSTbuy.json();

        expect(body3POSTbuy).toHaveProperty("id");
        expect(body3POSTbuy).toHaveProperty("usuarioId");
        expect(body3POSTbuy.usuarioId).toBe(randomUser3);
        expect(body3POSTbuy).toHaveProperty("livroId");
        expect(body3POSTbuy.livroId).toBe(randomBook3);
        expect(body3POSTbuy).toHaveProperty("quantidade");
        expect(body3POSTbuy.quantidade).toBe(buyQuantity3);
        expect(body3POSTbuy).toHaveProperty("total");
        expect(body3POSTbuy.total).toBe(buyQuantity3 * body3GETbookID.preco);
        expect(body3POSTbuy).toHaveProperty("status");
        expect(body3POSTbuy.status).toBe("PENDENTE");
        expect(body3POSTbuy).toHaveProperty("criadoEm");
        let PostDate3 = new Date(body3POSTbuy.criadoEm);
        expect(PreviousDate3.getTime()).toBeLessThanOrEqual(PostDate3.getTime());

        console.log("Order ID: " + body3POSTbuy.id);

        let response3PUTbuy = await page.request.put(`/compras/${body3POSTbuy.id}/status`, {
            data: {
                "status": "APROVADA"
            }
        });

        expect(response3PUTbuy.status()).toBe(200);

        let body3PUTbuy = await response3PUTbuy.json();

        expect(body3PUTbuy).toHaveProperty("status");
        expect(body3PUTbuy.status).toBe("APROVADA");

        let response3GETbookID2 = await page.request.get(`/livros/${randomBook3}`);

        expect(response3GETbookID2.status()).toBe(200);

        let body3GETbookID2 = await response3GETbookID2.json();

        expect(body3GETbookID2).toHaveProperty("estoque");

        console.log("Book Stock after buy:" + body3GETbookID2.estoque);
        expect(body3GETbookID2.estoque).toBe(body3GETbookID.estoque - buyQuantity3);
    });


    test('Cancelar Compra (Sucesso)', async ({ page }) => {
        let PreviousDate4 = new Date();
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

        console.log(body4GETbooks);
        let randomUser4 = faker.helpers.arrayElement(body4GETusers).id;

        let randomBook4 = faker.helpers.arrayElement(body4GETbooks.filter(book => book.estoque > 0)).id;

        let response4GETbookID = await page.request.get(`/livros/${randomBook4}`);

        expect(response4GETbookID.status()).toBe(200);

        let body4GETbookID = await response4GETbookID.json();

        expect(body4GETbookID).toHaveProperty("estoque");
        expect(body4GETbookID.estoque).toBeGreaterThan(0);
        expect(body4GETbookID).toHaveProperty("preco");
        expect(body4GETbookID.preco).toBeGreaterThan(0);

        let buyQuantity4 = faker.number.int({ min: 1, max: body4GETbookID.estoque });

        console.log("User ID usado:" + randomUser4);
        console.log("Book ID usado:" + randomBook4);
        console.log("Book Stock:" + body4GETbookID.estoque);
        console.log("Book Price:" + body4GETbookID.preco);
        console.log("Buy order Quantity:" + buyQuantity4);


        let response4POSTbuy = await page.request.post('/compras', {
            data: {
                "usuarioId": randomUser4,
                "livroId": randomBook4,
                "quantidade": buyQuantity4
            }
        });

        expect(response4POSTbuy.status()).toBe(201);

        let body4POSTbuy = await response4POSTbuy.json();

        expect(body4POSTbuy).toHaveProperty("id");
        expect(body4POSTbuy).toHaveProperty("usuarioId");
        expect(body4POSTbuy.usuarioId).toBe(randomUser4);
        expect(body4POSTbuy).toHaveProperty("livroId");
        expect(body4POSTbuy.livroId).toBe(randomBook4);
        expect(body4POSTbuy).toHaveProperty("quantidade");
        expect(body4POSTbuy.quantidade).toBe(buyQuantity4);
        expect(body4POSTbuy).toHaveProperty("total");
        expect(body4POSTbuy.total).toBe(buyQuantity4 * body4GETbookID.preco);
        expect(body4POSTbuy).toHaveProperty("status");
        expect(body4POSTbuy.status).toBe("PENDENTE");
        expect(body4POSTbuy).toHaveProperty("criadoEm");
        let PostDate4 = new Date(body4POSTbuy.criadoEm);
        expect(PreviousDate4.getTime()).toBeLessThanOrEqual(PostDate4.getTime());

        console.log("Order ID: " + body4POSTbuy.id);

        let response4PUTbuy = await page.request.put(`/compras/${body4POSTbuy.id}/status`, {
            data: {
                "status": "CANCELADA"
            }
        });

        expect(response4PUTbuy.status()).toBe(200);

        let body4PUTbuy = await response4PUTbuy.json();

        expect(body4PUTbuy).toHaveProperty("status");
        expect(body4PUTbuy.status).toBe("CANCELADA");

        let response4GETbookID2 = await page.request.get(`/livros/${randomBook4}`);

        expect(response4GETbookID2.status()).toBe(200);

        let body4GETbookID2 = await response4GETbookID2.json();

        expect(body4GETbookID2).toHaveProperty("estoque");

        console.log("Book Stock after cancel:" + body4GETbookID2.estoque);
        expect(body4GETbookID2.estoque).toBe(body4GETbookID.estoque);
    });


    test('Listar Compras Usuário (Sucesso)', async ({ page }) => {
        let PreviousDate5 = new Date();
        let response5GETusers = await page.request.get('/usuarios');
        let response5GETbooks = await page.request.get('/livros');

        expect(response5GETusers.status()).toBe(200);
        expect(response5GETbooks.status()).toBe(200);

        let body5GETusers = await response5GETusers.json();
        let body5GETbooks = await response5GETbooks.json();

        expect(Array.isArray(body5GETusers)).toBe(true);
        expect(body5GETusers.length).toBeGreaterThan(0);
        expect(Array.isArray(body5GETbooks)).toBe(true);
        expect(body5GETbooks.length).toBeGreaterThan(0);

        console.log(body5GETbooks);
        let randomUser5 = faker.helpers.arrayElement(body5GETusers).id;

        let randomBook5 = faker.helpers.arrayElement(body5GETbooks.filter(book => book.estoque > 0)).id;

        let response5GETbookID = await page.request.get(`/livros/${randomBook5}`);

        expect(response5GETbookID.status()).toBe(200);

        let body5GETbookID = await response5GETbookID.json();

        expect(body5GETbookID).toHaveProperty("estoque");
        expect(body5GETbookID.estoque).toBeGreaterThan(0);
        expect(body5GETbookID).toHaveProperty("preco");
        expect(body5GETbookID.preco).toBeGreaterThan(0);

        let buyQuantity5 = faker.number.int({ min: 1, max: body5GETbookID.estoque });

        console.log("User ID usado:" + randomUser5);
        console.log("Book ID usado:" + randomBook5);
        console.log("Book Stock:" + body5GETbookID.estoque);
        console.log("Book Price:" + body5GETbookID.preco);
        console.log("Buy order Quantity:" + buyQuantity5);


        let response5POSTbuy = await page.request.post('/compras', {
            data: {
                "usuarioId": randomUser5,
                "livroId": randomBook5,
                "quantidade": buyQuantity5
            }
        });

        expect(response5POSTbuy.status()).toBe(201);

        let body5POSTbuy = await response5POSTbuy.json();

        expect(body5POSTbuy).toHaveProperty("id");
        expect(body5POSTbuy).toHaveProperty("usuarioId");
        expect(body5POSTbuy.usuarioId).toBe(randomUser5);
        expect(body5POSTbuy).toHaveProperty("livroId");
        expect(body5POSTbuy.livroId).toBe(randomBook5);
        expect(body5POSTbuy).toHaveProperty("quantidade");
        expect(body5POSTbuy.quantidade).toBe(buyQuantity5);
        expect(body5POSTbuy).toHaveProperty("total");
        expect(body5POSTbuy.total).toBe(buyQuantity5 * body5GETbookID.preco);
        expect(body5POSTbuy).toHaveProperty("status");
        expect(body5POSTbuy.status).toBe("PENDENTE");
        expect(body5POSTbuy).toHaveProperty("criadoEm");
        let PostDate5 = new Date(body5POSTbuy.criadoEm);
        expect(PreviousDate5.getTime()).toBeLessThanOrEqual(PostDate5.getTime());

        let response5GETuserBuyOrders = await page.request.get(`/compras/me?usuarioId=${randomUser5}`);

        expect(response5GETuserBuyOrders.status()).toBe(200);

        let body5GETuserBuyOrders = await response5GETuserBuyOrders.json();

        expect(Array.isArray(body5GETuserBuyOrders)).toBe(true);
        expect(body5GETuserBuyOrders.length).toBeGreaterThan(0);
        console.log(body5GETuserBuyOrders);

        for (const BuyOrder of body5GETuserBuyOrders) {
            expect(BuyOrder).toHaveProperty("id");
            expect(BuyOrder).toHaveProperty("usuarioId");
            expect(BuyOrder.usuarioId).toBe(randomUser5);
            expect(BuyOrder).toHaveProperty("livroId");
            expect(BuyOrder).toHaveProperty("quantidade");
            expect(BuyOrder).toHaveProperty("total");
            expect(BuyOrder).toHaveProperty("status");
            expect(BuyOrder).toHaveProperty("criadoEm");
        }
    });


    test('Listar Todas as Compras (Sucesso)', async ({ page }) => {
        let response6GETallBuyOrders = await page.request.get('/compras');

        expect(response6GETallBuyOrders.status()).toBe(200);

        let body6GETallBuyOrders = await response6GETallBuyOrders.json();

        expect(Array.isArray(body6GETallBuyOrders)).toBe(true);
        expect(body6GETallBuyOrders.length).toBeGreaterThanOrEqual(0);

        let ordersPerUser = {};

        for (const BuyOrder of body6GETallBuyOrders) {
            expect(BuyOrder).toHaveProperty("id");
            expect(BuyOrder).toHaveProperty("usuarioId");
            expect(BuyOrder).toHaveProperty("livroId");
            expect(BuyOrder).toHaveProperty("quantidade");
            expect(BuyOrder).toHaveProperty("total");
            expect(BuyOrder).toHaveProperty("status");
            expect(BuyOrder).toHaveProperty("criadoEm");

            let userId = BuyOrder.usuarioId;
            if (body6GETallBuyOrders.length === 0) {
                console.log("Não há usuários com compras registadas");
            }
            else if (ordersPerUser[userId]) {
                ordersPerUser[userId]++;
            } else {
                ordersPerUser[userId] = 1;
            }
        }

        for (const userId in ordersPerUser) {
            console.log(`usuário ${userId}: tem ${ordersPerUser[userId]} ordens de compra`);
        }

        let total_Buy_Orders = body6GETallBuyOrders.length;
        console.log("Total de ordens de compra: " + total_Buy_Orders);
    });
})