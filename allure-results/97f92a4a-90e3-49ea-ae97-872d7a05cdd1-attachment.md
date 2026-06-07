# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: API_test_suite2_Livros.spec.js >> Livros >> Buscar Livro por ID (Inexistente)(Falha)
- Location: tests\API_test_suite2_Livros.spec.js:80:9

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 404
Received: 200
```

# Test source

```ts
  1   | // @ts-check
  2   | import { test, expect } from '@playwright/test';
  3   | import { faker } from '@faker-js/faker';
  4   | 
  5   | test.describe('Livros', () => {
  6   |     test('Listar Todos os Livros (Sucesso)', async ({ page }) => {
  7   |         let response1GETbooks = await page.request.get('/livros');
  8   | 
  9   |         expect(response1GETbooks.status()).toBe(200);
  10  | 
  11  |         let body1GETbooks = await response1GETbooks.json();
  12  | 
  13  |         expect(Array.isArray(body1GETbooks)).toBe(true);
  14  | 
  15  |         for (const book of body1GETbooks) {
  16  |             expect(book).toHaveProperty('id');
  17  |             expect(book).toHaveProperty('nome');
  18  |             expect(book).toHaveProperty('autor');
  19  |             expect(book).toHaveProperty('paginas');
  20  |             expect(book).toHaveProperty('descricao');
  21  |             expect(book).toHaveProperty('imagemUrl');
  22  |             expect(book).toHaveProperty('dataCadastro');
  23  |             expect(book).toHaveProperty('estoque');
  24  |             expect(book).toHaveProperty('preco');
  25  |             expect(Number.isInteger(book.id)).toBe(true);
  26  |             expect(Number.isInteger(book.paginas)).toBe(true);
  27  |             expect(book.paginas).toBeGreaterThan(0);
  28  |             const date = new Date(book.dataCadastro);
  29  |             expect(date.toISOString()).toBe(book.dataCadastro);
  30  |         }
  31  |     })
  32  | 
  33  |     test('Listar Livros Disponíveis (Sucesso)', async ({ page }) => {
  34  |         let responseGETavailableBooks = await page.request.get('/livros/disponiveis');
  35  | 
  36  |         expect(responseGETavailableBooks.status()).toBe(200);
  37  | 
  38  |         let bodyGETavailableBooks = await responseGETavailableBooks.json();
  39  | 
  40  |         expect(Array.isArray(bodyGETavailableBooks)).toBe(true);
  41  | 
  42  |         for (const bookavailable of bodyGETavailableBooks) {
  43  |             expect(bookavailable).toHaveProperty('estoque');
  44  |             expect(Number.isInteger(bookavailable.estoque)).toBe(true);
  45  |             expect(bookavailable.estoque).toBeGreaterThan(0);
  46  |             expect(bookavailable).toHaveProperty('disponivel');
  47  |             expect(typeof bookavailable.disponivel).toBe('boolean');
  48  |             expect(bookavailable.disponivel).toBe(true);
  49  |         }
  50  |     });
  51  | 
  52  |     test('Buscar Livro por ID (Existente)(Sucesso)', async ({ page }) => {
  53  |         let response2GETbooks = await page.request.get('/livros');
  54  | 
  55  |         expect(response2GETbooks.status()).toBe(200);
  56  |         expect(Array.isArray(await response2GETbooks.json())).toBe(true);
  57  | 
  58  |         let randombook = faker.helpers.arrayElement(await response2GETbooks.json());
  59  | 
  60  |         let response1GETbookById = await page.request.get(`/livros/${randombook.id}`);
  61  | 
  62  |         expect(response1GETbookById.status()).toBe(200);
  63  | 
  64  |         let body1GETbookById = await response1GETbookById.json();
  65  | 
  66  |         expect(body1GETbookById).toHaveProperty('id');
  67  |         expect(body1GETbookById.id).toBe(randombook.id);
  68  |         expect(body1GETbookById).toHaveProperty('nome');
  69  |         expect(body1GETbookById).toHaveProperty('autor');
  70  |         expect(body1GETbookById).toHaveProperty('paginas');
  71  |         expect(body1GETbookById.nome).not.toBe('');
  72  |         expect(body1GETbookById.nome).not.toBe(undefined);
  73  |         expect(body1GETbookById.autor).not.toBe('');
  74  |         expect(body1GETbookById.autor).not.toBe(undefined);
  75  |         expect(body1GETbookById.paginas).not.toBe(undefined);
  76  |         expect(Number.isInteger(body1GETbookById.paginas)).toBe(true);
  77  |         expect(body1GETbookById.paginas).toBeGreaterThan(0);
  78  |     })
  79  | 
  80  |     test('Buscar Livro por ID (Inexistente)(Falha)', async ({ page }) => {
  81  |         let response2GETbooks = await page.request.get('/livros');
  82  | 
  83  |         expect(response2GETbooks.status()).toBe(200);
  84  |         expect(Array.isArray(await response2GETbooks.json())).toBe(true);
  85  | 
  86  |         let booksarray = await response2GETbooks.json();
  87  |         let lastbook = booksarray[booksarray.length - 1];
  88  | 
  89  |         let response2GETbookById = await page.request.get(`/livros/${lastbook.id + 1}`);
  90  | 
> 91  |         expect(response2GETbookById.status()).toBe(404);
      |                                               ^ Error: expect(received).toBe(expected) // Object.is equality
  92  | 
  93  |         let body2GETbookById = await response2GETbookById.json();
  94  |         expect(body2GETbookById.mensagem).toBe('Livro não encontrado');
  95  |     });
  96  | 
  97  | 
  98  |     test('Adicionar Novo Livro (Sucesso)', async ({ page }) => {
  99  |         const newBook = {
  100 |             "nome": faker.book.title(),
  101 |             "autor": faker.person.fullName(),
  102 |             "paginas": faker.number.int({ min: 10, max: 2000 }),
  103 |             "descricao": faker.lorem.paragraph(2),
  104 |             "imagemUrl": faker.image.url(),
  105 |             "estoque": faker.number.int({ min: 0, max: 1000 }),
  106 |             "preco": parseFloat(faker.commerce.price({ min: 5, max: 200 }))
  107 |         };
  108 | 
  109 |         let responsePOSTnewBook_Random = await page.request.post('/livros',
  110 |             {
  111 |                 data: newBook
  112 |             }
  113 |         );
  114 | 
  115 |         expect(responsePOSTnewBook_Random.status()).toBe(201);
  116 | 
  117 |         let bodyPOSTnewBook_Random = await responsePOSTnewBook_Random.json();
  118 | 
  119 |         expect(bodyPOSTnewBook_Random).toHaveProperty('id');
  120 |         expect(Number.isInteger(bodyPOSTnewBook_Random.id)).toBe(true);
  121 |         expect(bodyPOSTnewBook_Random.id).toBeGreaterThanOrEqual(0);
  122 |         expect(bodyPOSTnewBook_Random).toHaveProperty('dataCadastro');
  123 |         const date = new Date(bodyPOSTnewBook_Random.dataCadastro);
  124 |         expect(date.toISOString()).toBe(bodyPOSTnewBook_Random.dataCadastro);
  125 |         expect(bodyPOSTnewBook_Random.nome).toBe(newBook.nome);
  126 |         expect(bodyPOSTnewBook_Random.autor).toBe(newBook.autor);
  127 |         expect(bodyPOSTnewBook_Random.paginas).toBe(newBook.paginas);
  128 |         expect(bodyPOSTnewBook_Random.descricao).toBe(newBook.descricao);
  129 |         expect(bodyPOSTnewBook_Random.imagemUrl).toBe(newBook.imagemUrl);
  130 |         expect(bodyPOSTnewBook_Random.estoque).toBe(newBook.estoque);
  131 |         expect(bodyPOSTnewBook_Random.preco).toBe(newBook.preco);
  132 |         console.log("Livro aleatório criado com sucesso");
  133 |     });
  134 | 
  135 | 
  136 |     test.describe('Adicionar Livro sem Campos Obrigatórios (Falha)', () => {
  137 |         test('Livro Sem nome', async ({ page }) => {
  138 |             let response1POSTinvalidBook_NoName = await page.request.post('/livros',
  139 |                 {
  140 |                     data: {
  141 |                         "nome": "",
  142 |                         "autor": faker.person.fullName(),
  143 |                         "paginas": faker.number.int({ min: 10, max: 2000 }),
  144 |                     }
  145 |                 });
  146 | 
  147 |             expect(response1POSTinvalidBook_NoName.status()).toBe(400);
  148 | 
  149 |             let body1POSTinvalidBook_NoName = await response1POSTinvalidBook_NoName.json();
  150 | 
  151 |             expect(body1POSTinvalidBook_NoName.mensagem).toBe("Nome, autor e páginas são obrigatórios");
  152 |         });
  153 | 
  154 |         test('Livro Sem autor', async ({ page }) => {
  155 |             let response2POSTinvalidBook_NoAuthor = await page.request.post('/livros',
  156 |                 {
  157 |                     data: {
  158 |                         "nome": faker.book.title(),
  159 |                         "autor": "",
  160 |                         "paginas": faker.number.int({ min: 10, max: 2000 }),
  161 |                     }
  162 |                 });
  163 | 
  164 |             expect(response2POSTinvalidBook_NoAuthor.status()).toBe(400);
  165 | 
  166 |             let body2POSTinvalidBook_NoAuthor = await response2POSTinvalidBook_NoAuthor.json();
  167 | 
  168 |             expect(body2POSTinvalidBook_NoAuthor.mensagem).toBe("Nome, autor e páginas são obrigatórios");
  169 |         });
  170 | 
  171 |         test('Livro Sem páginas', async ({ page }) => {
  172 |             let response3POSTinvalidBook_NoPages = await page.request.post('/livros',
  173 |                 {
  174 |                     data: {
  175 |                         "nome": faker.book.title(),
  176 |                         "autor": faker.person.fullName(),
  177 |                         "paginas": ""
  178 |                     }
  179 |                 });
  180 | 
  181 |             expect(response3POSTinvalidBook_NoPages.status()).toBe(400);
  182 | 
  183 |             let body3POSTinvalidBook_NoPages = await response3POSTinvalidBook_NoPages.json();
  184 | 
  185 |             expect(body3POSTinvalidBook_NoPages.mensagem).toBe("Nome, autor e páginas são obrigatórios");
  186 |         });
  187 |     });
  188 | 
  189 |     test('Atualizar Livro Existente (Sucesso)', async ({ page }) => {
  190 |         let response3GETbooks = await page.request.get('/livros');
  191 | 
```