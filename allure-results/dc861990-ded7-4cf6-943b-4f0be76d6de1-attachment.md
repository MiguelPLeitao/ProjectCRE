# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: API_test_suite6_Compras.spec.js >> Compras >> Criar Compra com Estoque Suficiente (Sucesso)
- Location: tests\API_test_suite6_Compras.spec.js:6:9

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 201
Received: 400
```

# Test source

```ts
  1   | // @ts-check
  2   | import { test, expect } from '@playwright/test';
  3   | import { faker } from '@faker-js/faker';
  4   | 
  5   | test.describe('Compras', () => {
  6   |     test('Criar Compra com Estoque Suficiente (Sucesso)', async ({ page }) => {
  7   |         let PreviousDate = new Date();
  8   |         let responseGETusers = await page.request.get('/usuarios');
  9   |         let responseGETbooks = await page.request.get('/livros');
  10  | 
  11  |         expect(responseGETusers.status()).toBe(200);
  12  |         expect(responseGETbooks.status()).toBe(200);
  13  | 
  14  |         let bodyGETusers = await responseGETusers.json();
  15  |         let bodyGETbooks = await responseGETbooks.json();
  16  | 
  17  |         expect(Array.isArray(bodyGETusers)).toBe(true);
  18  |         expect(bodyGETusers.length).toBeGreaterThan(0);
  19  |         expect(Array.isArray(bodyGETbooks)).toBe(true);
  20  |         expect(bodyGETbooks.length).toBeGreaterThan(0);
  21  | 
  22  |         console.log(bodyGETbooks);
  23  |         let randomUser = faker.helpers.arrayElement(bodyGETusers).id;
  24  | 
  25  |         let randomBook = faker.helpers.arrayElement(bodyGETbooks.filter(book => book.estoque > 0)).id;
  26  | 
  27  |         let responseGETbookID = await page.request.get(`/livros/${randomBook}`);
  28  | 
  29  |         expect(responseGETbookID.status()).toBe(200);
  30  | 
  31  |         let bodyGETbookID = await responseGETbookID.json();
  32  | 
  33  |         expect(bodyGETbookID).toHaveProperty("estoque");
  34  |         expect(bodyGETbookID.estoque).toBeGreaterThan(0);
  35  |         expect(bodyGETbookID).toHaveProperty("preco");
  36  |         expect(bodyGETbookID.preco).toBeGreaterThan(0);
  37  | 
  38  |         let buyQuantity = faker.number.int({ min: 1, max: bodyGETbookID.estoque });
  39  | 
  40  |         console.log("User ID usado:" + randomUser);
  41  |         console.log("Book ID usado:" + randomBook);
  42  |         console.log("Book Stock:" + bodyGETbookID.estoque);
  43  |         console.log("Book Price:" + bodyGETbookID.preco);
  44  |         console.log("Buy order Quantity:" + buyQuantity);
  45  | 
  46  | 
  47  |         let responsePOSTbuy = await page.request.post('/compras', {
  48  |             data: {
  49  |                 "usuarioId": randomUser,
  50  |                 "livroId": randomBook,
  51  |                 "quantidade": buyQuantity
  52  |             }
  53  |         });
  54  | 
> 55  |         expect(responsePOSTbuy.status()).toBe(201);
      |                                          ^ Error: expect(received).toBe(expected) // Object.is equality
  56  | 
  57  |         let bodyPOSTbuy = await responsePOSTbuy.json();
  58  | 
  59  |         expect(bodyPOSTbuy).toHaveProperty("id");
  60  |         expect(bodyPOSTbuy).toHaveProperty("usuarioId");
  61  |         expect(bodyPOSTbuy.usuarioId).toBe(randomUser);
  62  |         expect(bodyPOSTbuy).toHaveProperty("livroId");
  63  |         expect(bodyPOSTbuy.livroId).toBe(randomBook);
  64  |         expect(bodyPOSTbuy).toHaveProperty("quantidade");
  65  |         expect(bodyPOSTbuy.quantidade).toBe(buyQuantity);
  66  |         expect(bodyPOSTbuy).toHaveProperty("total");
  67  |         expect(bodyPOSTbuy.total).toBe(buyQuantity * bodyGETbookID.preco);
  68  |         expect(bodyPOSTbuy).toHaveProperty("status");
  69  |         expect(bodyPOSTbuy.status).toBe("PENDENTE");
  70  |         expect(bodyPOSTbuy).toHaveProperty("criadoEm");
  71  |         let PostDate = new Date(bodyPOSTbuy.criadoEm);
  72  |         expect(PreviousDate.getTime()).toBeLessThanOrEqual(PostDate.getTime());
  73  |     });
  74  | 
  75  |     test('Criar Compra com Estoque Insuficiente (Falha)', async ({ page }) => {
  76  |         let response2GETusers = await page.request.get('/usuarios');
  77  |         let response2GETbooks = await page.request.get('/livros');
  78  | 
  79  |         expect(response2GETusers.status()).toBe(200);
  80  |         expect(response2GETbooks.status()).toBe(200);
  81  | 
  82  |         let body2GETusers = await response2GETusers.json();
  83  |         let body2GETbooks = await response2GETbooks.json();
  84  | 
  85  |         expect(Array.isArray(body2GETusers)).toBe(true);
  86  |         expect(body2GETusers.length).toBeGreaterThan(0);
  87  |         expect(Array.isArray(body2GETbooks)).toBe(true);
  88  |         expect(body2GETbooks.length).toBeGreaterThan(0);
  89  | 
  90  |         console.log(body2GETbooks);
  91  |         let randomUser2 = faker.helpers.arrayElement(body2GETusers).id;
  92  | 
  93  |         let randomBook2 = faker.helpers.arrayElement(body2GETbooks.filter(book => book.estoque > 0)).id;
  94  | 
  95  |         let response2GETbookID = await page.request.get(`/livros/${randomBook2}`);
  96  | 
  97  |         expect(response2GETbookID.status()).toBe(200);
  98  | 
  99  |         let body2GETbookID = await response2GETbookID.json();
  100 | 
  101 |         expect(body2GETbookID).toHaveProperty("estoque");
  102 |         expect(body2GETbookID.estoque).toBeGreaterThan(0);
  103 |         expect(body2GETbookID).toHaveProperty("preco");
  104 |         expect(body2GETbookID.preco).toBeGreaterThan(0);
  105 | 
  106 |         let buyQuantity2 = faker.number.int({ min: body2GETbookID.estoque + 1, max: body2GETbookID.estoque + 100 });
  107 | 
  108 |         console.log("User ID usado:" + randomUser2);
  109 |         console.log("Book ID usado:" + randomBook2);
  110 |         console.log("Book Stock:" + body2GETbookID.estoque);
  111 |         console.log("Book Price:" + body2GETbookID.preco);
  112 |         console.log("Buy order Quantity:" + buyQuantity2);
  113 | 
  114 |         let response2POSTbuy = await page.request.post('/compras', {
  115 |             data: {
  116 |                 "usuarioId": randomUser2,
  117 |                 "livroId": randomBook2,
  118 |                 "quantidade": buyQuantity2
  119 |             }
  120 |         });
  121 | 
  122 |         expect(response2POSTbuy.status()).toBe(400);
  123 | 
  124 |         let body2POSTbuy = await response2POSTbuy.json();
  125 | 
  126 |         expect(body2POSTbuy).toHaveProperty("mensagem");
  127 |         expect(body2POSTbuy.mensagem).toBe("Estoque insuficiente");
  128 |     });
  129 | 
  130 | 
  131 |     test('Aprovar Compra (Sucesso)', async ({ page }) => {
  132 |         let PreviousDate3 = new Date();
  133 |         let response3GETusers = await page.request.get('/usuarios');
  134 |         let response3GETbooks = await page.request.get('/livros');
  135 | 
  136 |         expect(response3GETusers.status()).toBe(200);
  137 |         expect(response3GETbooks.status()).toBe(200);
  138 | 
  139 |         let body3GETusers = await response3GETusers.json();
  140 |         let body3GETbooks = await response3GETbooks.json();
  141 | 
  142 |         expect(Array.isArray(body3GETusers)).toBe(true);
  143 |         expect(body3GETusers.length).toBeGreaterThan(0);
  144 |         expect(Array.isArray(body3GETbooks)).toBe(true);
  145 |         expect(body3GETbooks.length).toBeGreaterThan(0);
  146 | 
  147 |         console.log(body3GETbooks);
  148 |         let randomUser3 = faker.helpers.arrayElement(body3GETusers).id;
  149 | 
  150 |         let randomBook3 = faker.helpers.arrayElement(body3GETbooks.filter(book => book.estoque > 0)).id;
  151 | 
  152 |         let response3GETbookID = await page.request.get(`/livros/${randomBook3}`);
  153 | 
  154 |         expect(response3GETbookID.status()).toBe(200);
  155 | 
```