# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: FRONTEND_test_suite7_Compras.spec.js >> Compras >> Registar Compra (Aluno) (Sucesso)
- Location: tests\FRONTEND_test_suite7_Compras.spec.js:18:9

# Error details

```
Error: expect(page).toHaveURL(expected) failed

Expected: "http://localhost:3000/compras.html"
Received: "http://localhost:3000/dashboard.html"
Timeout:  5000ms

Call log:
  - Expect "toHaveURL" with timeout 5000ms
    14 × unexpected value "http://localhost:3000/dashboard.html"

```

```yaml
- heading "📚 Minha Biblioteca" [level=1]
- text: Daphney RobelALUNO
- button "Sair"
- link "Dashboard":
  - /url: dashboard.html
- link "Livros":
  - /url: livros.html
- link "Favoritos":
  - /url: favoritos.html
- link "Meus Arrendamentos":
  - /url: arrendamentos.html
- link "Compras":
  - /url: compras.html
- link "Minhas Compras":
  - /url: minhas-compras.html
- heading "Olá, Daphney Robel! Você está logado como ALUNO." [level=3]
- heading "Estatísticas" [level=2]
- heading "Livros Disponíveis" [level=3]
- text: "25"
- heading "Total de Livros" [level=3]
- text: "25"
- heading "Alunos Cadastrados" [level=3]
- text: "20"
- heading "Livros Disponíveis" [level=2]
- img "Clean Code"
- heading "Clean Code" [level=3]
- paragraph:
  - strong: "Autor:"
  - text: Robert C. Martin
- paragraph:
  - strong: "Estoque:"
  - text: "4"
- paragraph:
  - strong: € 49.90
- img "Harry Potter"
- heading "Harry Potter" [level=3]
- paragraph:
  - strong: "Autor:"
  - text: J.K. Rowling
- paragraph:
  - strong: "Estoque:"
  - text: "3"
- paragraph:
  - strong: € 39.90
- img "The Scarlet Letter"
- heading "The Scarlet Letter" [level=3]
- paragraph:
  - strong: "Autor:"
  - text: Miss Allison Bode DVM
- paragraph:
  - strong: "Estoque:"
  - text: "597"
- paragraph:
  - strong: € 98.99
- img "Blood Meridian"
- heading "Blood Meridian" [level=3]
- paragraph:
  - strong: "Autor:"
  - text: Ms. Lolita Kautzer
- paragraph:
  - strong: "Estoque:"
  - text: "275"
- paragraph:
  - strong: € 60.25
- img "Nostromo"
- heading "Nostromo" [level=3]
- paragraph:
  - strong: "Autor:"
  - text: Katlynn Wiegand
- paragraph:
  - strong: "Estoque:"
  - text: "925"
- paragraph:
  - strong: € 51.99
```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test';
  2   | import { faker } from '@faker-js/faker';
  3   | import Register_page from '../Page_Objects_Model_POM_FRONTEND/Register_page';
  4   | import Login_page from '../Page_Objects_Model_POM_FRONTEND/Login_page';
  5   | import Dashboard_page from '../Page_Objects_Model_POM_FRONTEND/Dashboard_page';
  6   | import BuyOrders_page from '../Page_Objects_Model_POM_FRONTEND/BuyOrders_page';
  7   | import Books_page from '../Page_Objects_Model_POM_FRONTEND/Books_page';
  8   | import BookDetails_page from '../Page_Objects_Model_POM_FRONTEND/BookDetails_page';
  9   | import Favourites_page from '../Page_Objects_Model_POM_FRONTEND/Favourites_page';
  10  | import Rents_page from '../Page_Objects_Model_POM_FRONTEND/Rents_page';
  11  | import MyBuyOrders_page from '../Page_Objects_Model_POM_FRONTEND/MyBuyOrders_page';
  12  | import Admin_Approvals_page from '../Page_Objects_Model_POM_FRONTEND/Admin_Approvals_page';
  13  | import Admin_BuyOrders_page from '../Page_Objects_Model_POM_FRONTEND/Admin_BuyOrders_page';
  14  | import Admin_AdminUsers_page from '../Page_Objects_Model_POM_FRONTEND/Admin_AdminUsers_page';
  15  | 
  16  | 
  17  | test.describe('Compras', () => {
  18  |     test('Registar Compra (Aluno) (Sucesso)', async ({ page }) => {
  19  |         const login_page = new Login_page(page);
  20  |         const dashboard_page = new Dashboard_page(page);
  21  |         const buyorders_page = new BuyOrders_page(page);
  22  | 
  23  |         const ValidUser = {
  24  |             "nome": faker.person.fullName(),
  25  |             "email": faker.internet.email(),
  26  |             "senha": faker.internet.password(),
  27  |             "tipo": 1
  28  |         }
  29  | 
  30  |         const newBook = {
  31  |             "nome": faker.book.title(),
  32  |             "autor": faker.person.fullName(),
  33  |             "paginas": faker.number.int({ min: 10, max: 2000 }),
  34  |             "descricao": faker.lorem.paragraph(2),
  35  |             "imagemUrl": faker.image.url(),
  36  |             "estoque": faker.number.int({ min: 1, max: 1000 }),
  37  |             "preco": parseFloat(faker.commerce.price({ min: 5, max: 200 }))
  38  |         };
  39  | 
  40  |         let responsePOSTnewUser = await page.request.post('/registro',
  41  |             {
  42  |                 data: ValidUser
  43  |             });
  44  | 
  45  |         let responsePOSTnewBook_Random = await page.request.post('/livros',
  46  |             {
  47  |                 data: newBook
  48  |             }
  49  |         );
  50  | 
  51  |         expect(responsePOSTnewUser.status()).toBe(201);
  52  |         let newUser = await responsePOSTnewUser.json();
  53  |         expect(newUser.usuario).toHaveProperty('id');
  54  |         expect(newUser.usuario).toHaveProperty('nome');
  55  |         expect(newUser.usuario.nome).toBe(ValidUser.nome);
  56  |         expect(newUser.usuario).toHaveProperty('email');
  57  |         expect(newUser.usuario.email).toBe(ValidUser.email);
  58  |         expect(newUser.usuario).toHaveProperty('tipo');
  59  | 
  60  |         expect(responsePOSTnewBook_Random.status()).toBe(201);
  61  |         let newBook_random = await responsePOSTnewBook_Random.json();
  62  |         expect(newBook_random).toHaveProperty('id');
  63  |         expect(newBook_random).toHaveProperty('nome');
  64  |         expect(newBook_random.nome).toBe(newBook.nome);
  65  |         expect(newBook_random).toHaveProperty('autor');
  66  |         expect(newBook_random.autor).toBe(newBook.autor);
  67  |         expect(newBook_random).toHaveProperty('paginas');
  68  |         expect(newBook_random.paginas).toBe(newBook.paginas);
  69  | 
  70  |         await page.goto('http://localhost:3000/login.html');
  71  | 
  72  |         await expect(page).toHaveURL('http://localhost:3000/login.html');
  73  | 
  74  |         page.waitForEvent('dialog').then(async dialog => {
  75  |             if (dialog.message().includes('Login realizado com sucesso!')) {
  76  |                 console.log("dialog message 'Login realizado com sucesso!' aceite")
  77  |                 await dialog.accept();
  78  |             }
  79  |             else {
  80  |                 throw new Error('Dialog message 1 não aparece ou não contém o texto esperado.');
  81  |             }
  82  |         });
  83  | 
  84  |         await page.waitForTimeout(3000);
  85  | 
  86  |         await login_page.FillEmail_Password_InputFields(newUser.usuario.email, ValidUser.senha);
  87  | 
  88  |         await login_page.ClickEnterLogin_Button();
  89  | 
  90  |         await expect(page).toHaveURL('http://localhost:3000/dashboard.html');
  91  | 
  92  |         await dashboard_page.ClickCompras_BuyOrders_button;
> 93  |         await expect(page).toHaveURL('http://localhost:3000/compras.html');
      |                            ^ Error: expect(page).toHaveURL(expected) failed
  94  | 
  95  |         page.waitForEvent('dialog').then(async dialog => {
  96  |             if (dialog.message().includes('Compra registrada com sucesso! Aguarde aprovação.')) {
  97  |                 console.log("dialog message 'Compra registrada com sucesso! Aguarde aprovação.' aceite")
  98  |                 await dialog.accept();
  99  |             }
  100 |             else {
  101 |                 throw new Error('Dialog message 1 não aparece ou não contém o texto esperado.');
  102 |             }
  103 |         });
  104 | 
  105 |         await page.waitForTimeout(3000);
  106 | 
  107 |         const bookTobuy = await buyorders_page.SelectLivro_BookCard_grid(newRandomBook.nome);
  108 |         await expect(bookTobuy).toBeVisible();
  109 | 
  110 | 
  111 |         let buyQuantity
  112 |         if (newRandomBook.estoque == 1) {
  113 |             buyQuantity = 1;
  114 |         }
  115 |         else {
  116 |             buyQuantity = faker.number.int({ min: 1, max: newRandomBook.estoque });
  117 |         };
  118 | 
  119 |         await buyorders_page.SelectQtdCompraLivro_QntBuyOrderBook_selector_button(newRandomBook.nome, buyQuantity);
  120 | 
  121 |         await expect(page).toHaveURL('http://localhost:3000/compras.html');
  122 | 
  123 |     });
  124 | 
  125 | 
  126 | 
  127 |     test('Aprovar Arrendamento (Sucesso)', async ({ page }) => {
  128 |         const login_page = new Login_page(page);
  129 |         const dashboard_page = new Dashboard_page(page);
  130 |         const rents_page = new Rents_page(page);
  131 |         const admin_approvals_page = new Admin_Approvals_page(page);
  132 | 
  133 |         const ValidUser = {
  134 |             "nome": faker.person.fullName(),
  135 |             "email": faker.internet.email(),
  136 |             "senha": faker.internet.password(),
  137 |             "tipo": 2
  138 |         }
  139 | 
  140 |         const newBook = {
  141 |             "nome": faker.book.title(),
  142 |             "autor": faker.person.fullName(),
  143 |             "paginas": faker.number.int({ min: 10, max: 2000 }),
  144 |             "descricao": faker.lorem.paragraph(2),
  145 |             "imagemUrl": faker.image.url(),
  146 |             "estoque": faker.number.int({ min: 0, max: 1000 }),
  147 |             "preco": parseFloat(faker.commerce.price({ min: 5, max: 200 }))
  148 |         };
  149 | 
  150 | 
  151 |         let responsePOSTnewUser = await page.request.post('/registro',
  152 |             {
  153 |                 data: ValidUser
  154 |             });
  155 | 
  156 |         let responsePOSTnewBook_Random = await page.request.post('/livros',
  157 |             {
  158 |                 data: newBook
  159 |             }
  160 |         );
  161 | 
  162 | 
  163 |         expect(responsePOSTnewUser.status()).toBe(201);
  164 |         let newUser = await responsePOSTnewUser.json();
  165 |         expect(newUser.usuario).toHaveProperty('id');
  166 |         expect(newUser.usuario).toHaveProperty('nome');
  167 |         expect(newUser.usuario.nome).toBe(ValidUser.nome);
  168 |         expect(newUser.usuario).toHaveProperty('email');
  169 |         expect(newUser.usuario.email).toBe(ValidUser.email);
  170 |         expect(newUser.usuario).toHaveProperty('tipo');
  171 | 
  172 |         expect(responsePOSTnewBook_Random.status()).toBe(201);
  173 |         let newBook_random = await responsePOSTnewBook_Random.json();
  174 |         expect(newBook_random).toHaveProperty('id');
  175 |         expect(newBook_random).toHaveProperty('nome');
  176 |         expect(newBook_random.nome).toBe(newBook.nome);
  177 |         expect(newBook_random).toHaveProperty('autor');
  178 |         expect(newBook_random.autor).toBe(newBook.autor);
  179 |         expect(newBook_random).toHaveProperty('paginas');
  180 |         expect(newBook_random.paginas).toBe(newBook.paginas);
  181 | 
  182 | 
  183 |         const datainicio = faker.date.between({ from: '2020-01-01', to: '2030-12-31' });
  184 |         const datafim = faker.date.future({ refDate: datainicio });
  185 |         const newRent = {
  186 |             "usuarioId": newUser.usuario.id,
  187 |             "livroId": newBook_random.id,
  188 |             "dataInicio": datainicio,
  189 |             "dataFim": datafim
  190 |         };
  191 | 
  192 |         let responsePOSTnewRent = await page.request.post('/arrendamentos',
  193 |             {
```