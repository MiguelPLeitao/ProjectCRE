# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: API_test_suite5_Arrendamentos.spec.js >> Arrendamentos >> Criar Arrendamento sem Estoque (Falha)
- Location: tests\API_test_suite5_Arrendamentos.spec.js:57:9

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 400
Received: 200
```

# Test source

```ts
  1   | // @ts-check
  2   | import { test, expect } from '@playwright/test';
  3   | import { faker } from '@faker-js/faker';
  4   | 
  5   | test.describe('Arrendamentos', () => {
  6   |     test('Criar Arrendamento Válido (Sucesso)', async ({ page }) => {
  7   |         let responseGETusers = await page.request.get('/usuarios');
  8   |         let responseGETbooks = await page.request.get('/livros');
  9   | 
  10  |         expect(responseGETusers.status()).toBe(200);
  11  |         expect(responseGETbooks.status()).toBe(200);
  12  | 
  13  |         let bodyGETusers = await responseGETusers.json();
  14  |         let bodyGETbooks = await responseGETbooks.json();
  15  | 
  16  |         expect(Array.isArray(bodyGETusers)).toBe(true);
  17  |         expect(bodyGETusers.length).toBeGreaterThan(0);
  18  |         expect(Array.isArray(bodyGETbooks)).toBe(true);
  19  |         expect(bodyGETbooks.length).toBeGreaterThan(0);
  20  | 
  21  |         let randomUser = faker.helpers.arrayElement(bodyGETusers).id;
  22  | 
  23  |         console.log(bodyGETbooks);
  24  |         let randomBook = faker.helpers.arrayElement(bodyGETbooks.filter(book => book.estoque > 0)).id;
  25  | 
  26  |         console.log("User ID usado:" + randomUser);
  27  |         console.log("Book ID usado:" + randomBook);
  28  | 
  29  |         let datainicio = faker.date.between({ from: '2020-01-01', to: '2030-12-31' });
  30  |         let datafim = faker.date.future({ refDate: datainicio });
  31  | 
  32  |         console.log(datainicio);
  33  |         console.log(datafim);
  34  | 
  35  |         let responsePOSTrent = await page.request.post('/arrendamentos', {
  36  |             data: {
  37  |                 "usuarioId": randomUser,
  38  |                 "livroId": randomBook,
  39  |                 "dataInicio": datainicio,
  40  |                 "dataFim": datafim
  41  |             }
  42  |         });
  43  | 
  44  |         expect(responsePOSTrent.status()).toBe(201);
  45  | 
  46  |         let bodyPOSTrent = await responsePOSTrent.json();
  47  |         expect(bodyPOSTrent).toHaveProperty('id');
  48  |         expect(bodyPOSTrent).toHaveProperty('usuarioId');
  49  |         expect(bodyPOSTrent).toHaveProperty('livroId');
  50  |         expect(bodyPOSTrent).toHaveProperty('status');
  51  |         expect(bodyPOSTrent.status).toBe('PENDENTE');
  52  |         expect(bodyPOSTrent).toHaveProperty('criadoEm');
  53  | 
  54  |     });
  55  | 
  56  | 
  57  |     test('Criar Arrendamento sem Estoque (Falha)', async ({ page }) => {
  58  |         const newBook = {
  59  |             "nome": faker.book.title(),
  60  |             "autor": faker.person.fullName(),
  61  |             "paginas": faker.number.int({ min: 10, max: 2000 }),
  62  |             "descricao": faker.lorem.paragraph(2),
  63  |             "imagemUrl": faker.image.url(),
  64  |             "estoque": 0,
  65  |             "preco": parseFloat(faker.commerce.price({ min: 5, max: 200 }))
  66  |         };
  67  | 
  68  |         let responsePOSTnewBook_Random = await page.request.post('/livros',
  69  |             {
  70  |                 data: newBook
  71  |             }
  72  |         );
  73  | 
  74  |         expect(responsePOSTnewBook_Random.status()).toBe(201);
  75  | 
  76  |         let bodyPOSTnewBook_Random = await responsePOSTnewBook_Random.json();
  77  | 
  78  |         expect(bodyPOSTnewBook_Random).toHaveProperty('id');
  79  | 
  80  |         let response2GETusers = await page.request.get('/usuarios');
  81  | 
  82  |         expect(response2GETusers.status()).toBe(200);
  83  | 
  84  |         let bodyGETusers = await response2GETusers.json();
  85  | 
  86  |         let randomUser2 = faker.helpers.arrayElement(bodyGETusers).id;
  87  | 
  88  |         let datainicio2 = faker.date.between({ from: '2020-01-01', to: '2030-12-31' });
  89  |         let datafim2 = faker.date.future({ refDate: datainicio2 });
  90  | 
  91  |         let responsePOSTinvalidrent = await page.request.get('/arrendamentos', {
  92  |             data: {
  93  |                 "usuarioId": randomUser2,
  94  |                 "livroId": bodyPOSTnewBook_Random.id,
  95  |                 "dataInicio": datainicio2,
  96  |                 "dataFim": datafim2
  97  |             }
  98  |         });
  99  | 
> 100 |         expect(responsePOSTinvalidrent.status()).toBe(400);
      |                                                  ^ Error: expect(received).toBe(expected) // Object.is equality
  101 | 
  102 |         let bodyPOSTinvalidrent = await responsePOSTinvalidrent.json();
  103 |         expect(bodyPOSTinvalidrent.mensagem).toBe('Livro sem estoque para arrendamento');
  104 | 
  105 |     });
  106 | })
```