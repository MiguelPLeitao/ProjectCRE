# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: API_test_suite4_Favoritos.spec.js >> Favoritos >> Adicionar Livro aos Favoritos (Sucesso)
- Location: tests\API_test_suite4_Favoritos.spec.js:6:9

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 201
Received: 400
```

# Test source

```ts
  1  | // @ts-check
  2  | import { test, expect } from '@playwright/test';
  3  | import { faker } from '@faker-js/faker';
  4  | 
  5  | test.describe('Favoritos', () => {
  6  |     test('Adicionar Livro aos Favoritos (Sucesso)', async ({ page }) => {
  7  | let responseGETusers = await page.request.get('/usuarios');
  8  | let responseGETbooks = await page.request.get('/livros');
  9  | 
  10 | let bodyGETusers = await responseGETusers.json();
  11 | let bodyGETbooks = await responseGETbooks.json();
  12 | 
  13 |         expect(responseGETusers.status()).toBe(200);
  14 |         expect(bodyGETusers.length).toBeGreaterThan(0);
  15 |         expect(Array.isArray(bodyGETusers)).toBe(true);
  16 | 
  17 |         expect(responseGETbooks.status()).toBe(200);
  18 |         expect(bodyGETbooks.length).toBeGreaterThan(0);
  19 |         expect(Array.isArray(bodyGETbooks)).toBe(true);
  20 | 
  21 |        let randomUser = bodyGETusers[faker.number.int({ min: 0, max: bodyGETusers.length - 1 })].id;
  22 |        let randomBook = bodyGETbooks[faker.number.int({ min: 0, max: bodyGETbooks.length - 1 })].id;
  23 | 
  24 | console.log("User ID usado:" + randomUser);
  25 | console.log("Book ID usado:" + randomBook);
  26 | 
  27 |         let responsePOSTfavoritebook = await page.request.post('/favoritos', {
  28 |             data: {
  29 |                 "usuarioId": randomUser,
  30 |                 "livroId": randomBook
  31 |             }
  32 |         })
  33 | 
> 34 |         expect(responsePOSTfavoritebook.status()).toBe(201);
     |                                                   ^ Error: expect(received).toBe(expected) // Object.is equality
  35 | 
  36 |         let bodyPOSTfavoritebooks = await responsePOSTfavoritebook.json();
  37 |         expect(bodyPOSTfavoritebooks.mensagem).toBe('Livro adicionado aos favoritos');
  38 |     });
  39 | });
  40 | 
```