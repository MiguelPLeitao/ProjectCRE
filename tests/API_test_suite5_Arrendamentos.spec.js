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

let datainicio = faker.date.between({from:'2020-01-01', to: '2030-12-31'});
let datafim = faker.date.future({refDate: datainicio});

console.log(datainicio);
console.log(datafim);
/*
       let responsePOSTrent = await page.request.post('/arrendamentos', {
            data: {
                "usuarioId": randomUser,
                "livroId": randomBook,
                "dataInicio": datainicio,
                "dataFim": datafim
            }
        });
        */
    });
})