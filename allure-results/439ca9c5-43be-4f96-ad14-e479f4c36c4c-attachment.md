# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: API_test_suite6_Compras.spec.js >> Compras >> Criar Compra com Estoque Suficiente (Sucesso)
- Location: tests\API_test_suite6_Compras.spec.js:6:9

# Error details

```
TypeError: bodyPOSTbuy.criadoEm.getTime is not a function
```

# Test source

```ts
  1  | // @ts-check
  2  | import { test, expect } from '@playwright/test';
  3  | import { faker } from '@faker-js/faker';
  4  | 
  5  | test.describe('Compras', () => {
  6  |     test('Criar Compra com Estoque Suficiente (Sucesso)', async ({ page }) => {
  7  |         let responseGETusers = await page.request.get('/usuarios');
  8  |         let responseGETbooks = await page.request.get('/livros');
  9  | 
  10 |         expect(responseGETusers.status()).toBe(200);
  11 |         expect(responseGETbooks.status()).toBe(200);
  12 | 
  13 |         let bodyGETusers = await responseGETusers.json();
  14 |         let bodyGETbooks = await responseGETbooks.json();
  15 | 
  16 |         expect(Array.isArray(bodyGETusers)).toBe(true);
  17 |         expect(bodyGETusers.length).toBeGreaterThan(0);
  18 |         expect(Array.isArray(bodyGETbooks)).toBe(true);
  19 |         expect(bodyGETbooks.length).toBeGreaterThan(0);
  20 | 
  21 |         console.log(bodyGETbooks);
  22 |         let randomUser = faker.helpers.arrayElement(bodyGETusers).id;
  23 | 
  24 |         let randomBook = faker.helpers.arrayElement(bodyGETbooks.filter(book => book.estoque > 0)).id;
  25 | 
  26 |         let responseGETbookID = await page.request.get(`/livros/${randomBook}`);
  27 | 
  28 |         expect(responseGETbookID.status()).toBe(200);
  29 | 
  30 |         let bodyGETbookID = await responseGETbookID.json();
  31 | 
  32 |         expect(bodyGETbookID).toHaveProperty("estoque");
  33 |         expect(bodyGETbookID.estoque).toBeGreaterThan(0);
  34 |         expect(bodyGETbookID).toHaveProperty("preco");
  35 |         expect(bodyGETbookID.preco).toBeGreaterThan(0);
  36 | 
  37 |         let buyQuantity = faker.number.int({ min: 1, max: bodyGETbookID.estoque });
  38 | 
  39 |         console.log("User ID usado:" + randomUser);
  40 |         console.log("Book ID usado:" + randomBook);
  41 |         console.log("Book Stock:" + bodyGETbookID.estoque);
  42 |         console.log("Book Price:" + bodyGETbookID.preco);
  43 |         console.log("Buy order Quantity:" + buyQuantity);
  44 | 
  45 |         let PreviousDate = new Date();
  46 | 
  47 |         let responsePOSTbuy = await page.request.post('/compras', {
  48 |             data: {
  49 |                 "usuarioId": randomUser,
  50 |                 "livroId": randomBook,
  51 |                 "quantidade": buyQuantity
  52 |             }
  53 |         });
  54 | 
  55 |         expect(responsePOSTbuy.status()).toBe(201);
  56 | 
  57 |         let bodyPOSTbuy = await responsePOSTbuy.json();
  58 | 
  59 |         expect(bodyPOSTbuy).toHaveProperty("id");
  60 |         expect(bodyPOSTbuy).toHaveProperty("usuarioId");
  61 |         expect(bodyPOSTbuy.usuarioId).toBe(randomUser);
  62 |         expect(bodyPOSTbuy).toHaveProperty("livroId");
  63 |         expect(bodyPOSTbuy.livroId).toBe(randomBook);
  64 |         expect(bodyPOSTbuy).toHaveProperty("quantidade");
  65 |         expect(bodyPOSTbuy.quantidade).toBe(buyQuantity);
  66 |         expect(bodyPOSTbuy).toHaveProperty("total");
  67 |         expect(bodyPOSTbuy.total).toBe(buyQuantity * bodyGETbookID.preco);
  68 |         expect(bodyPOSTbuy).toHaveProperty("status");
  69 |         expect(bodyPOSTbuy.status).toBe("PENDENTE");
  70 |         expect(bodyPOSTbuy).toHaveProperty("criadoEm");
> 71 |         expect(PreviousDate.getTime()).toBeLessThan(bodyPOSTbuy.criadoEm.getTime());
     |                                                                          ^ TypeError: bodyPOSTbuy.criadoEm.getTime is not a function
  72 | 
  73 | 
  74 |     });
  75 | })
```