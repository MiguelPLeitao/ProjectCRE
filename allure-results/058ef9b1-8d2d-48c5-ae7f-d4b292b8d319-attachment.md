# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: FRONTEND_test_suite5_Favoritos.spec.js >> Favoritos >> Adicionar Livro aos Favoritos pela UI (Sucesso)
- Location: tests\FRONTEND_test_suite5_Favoritos.spec.js:19:9

# Error details

```
Error: page.waitForEvent: Test ended.
=========================== logs ===========================
waiting for event "dialog"
============================================================
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
  17  | 
  18  | test.describe('Favoritos', async () => {
  19  |     test('Adicionar Livro aos Favoritos pela UI (Sucesso)', async ({ page }) => {
  20  |         const login_page = new Login_page(page);
  21  |         const dashboard_page = new Dashboard_page(page);
  22  |         const bookdetails_page = new BookDetails_page(page);
  23  |         const favourites_page = new Favourites_page(page);
  24  | 
  25  |         const ValidUser = {
  26  |             "nome": faker.person.fullName(),
  27  |             "email": faker.internet.email(),
  28  |             "senha": faker.internet.password()
  29  |         }
  30  | 
  31  |         const newBook = {
  32  |             "nome": faker.book.title(),
  33  |             "autor": faker.person.fullName(),
  34  |             "paginas": faker.number.int({ min: 10, max: 2000 }),
  35  |             "descricao": faker.lorem.paragraph(2),
  36  |             "imagemUrl": faker.image.url(),
  37  |             "estoque": faker.number.int({ min: 0, max: 1000 }),
  38  |             "preco": parseFloat(faker.commerce.price({ min: 5, max: 200 }))
  39  |         };
  40  | 
  41  |         let responsePOSTnewUser = await page.request.post('/registro',
  42  |             {
  43  |                 data: ValidUser
  44  |             });
  45  | 
  46  |         let responsePOSTnewBook_Random = await page.request.post('/livros',
  47  |             {
  48  |                 data: newBook
  49  |             }
  50  |         );
  51  | 
  52  |         expect(responsePOSTnewUser.status()).toBe(201);
  53  |         let newUser = await responsePOSTnewUser.json();
  54  |         expect(newUser.usuario).toHaveProperty('id');
  55  |         expect(newUser.usuario).toHaveProperty('nome');
  56  |         expect(newUser.usuario.nome).toBe(ValidUser.nome);
  57  |         expect(newUser.usuario).toHaveProperty('email');
  58  |         expect(newUser.usuario.email).toBe(ValidUser.email);
  59  |         expect(newUser.usuario).toHaveProperty('tipo');
  60  | 
  61  |         expect(responsePOSTnewBook_Random.status()).toBe(201);
  62  |         let newBook_random = await responsePOSTnewBook_Random.json();
  63  |         expect(newBook_random).toHaveProperty('id');
  64  |         expect(newBook_random).toHaveProperty('nome');
  65  |         expect(newBook_random.nome).toBe(newBook.nome);
  66  |         expect(newBook_random).toHaveProperty('autor');
  67  |         expect(newBook_random.autor).toBe(newBook.autor);
  68  |         expect(newBook_random).toHaveProperty('paginas');
  69  |         expect(newBook_random.paginas).toBe(newBook.paginas);
  70  | 
  71  |         await page.goto('http://localhost:3000/login.html');
  72  | 
  73  |         await expect(page).toHaveURL('http://localhost:3000/login.html');
  74  | 
  75  |         page.waitForEvent('dialog').then(async dialog => {
  76  |             if (dialog.message().includes('Login realizado com sucesso!')) {
  77  |                 console.log("dialog message 'Login realizado com sucesso!' aceite")
  78  |                 await dialog.accept();
  79  |             }
  80  |             else {
  81  |                 throw new Error('Dialog message 1 não aparece ou não contém o texto esperado.');
  82  |             }
  83  |         });
  84  | 
  85  |         await page.waitForTimeout(3000);
  86  | 
  87  |         await login_page.FillEmail_Password_InputFields(newUser.usuario.email, ValidUser.senha);
  88  | 
  89  |         await login_page.ClickEnterLogin_Button();
  90  | 
  91  |         await expect(page).toHaveURL('http://localhost:3000/dashboard.html');
  92  | 
  93  |         await page.goto(`http://localhost:3000/detalhes.html?id=${newBook_random.id}`);
  94  | 
  95  |         await expect(page).toHaveURL(`http://localhost:3000/detalhes.html?id=${newBook_random.id}`);
  96  | 
  97  |         await bookdetails_page.ClickAdicionarFavoritos_AddToFavourites_button();
  98  | 
> 99  |         page.waitForEvent('dialog').then(async dialog => {
      |              ^ Error: page.waitForEvent: Test ended.
  100 |             if (dialog.message().includes('Adicionado aos favoritos!')) {
  101 |                 console.log("dialog message 'Adicionado aos favoritos!' aceite")
  102 |                 await dialog.accept();
  103 |             }
  104 |             else {
  105 |                 throw new Error('Dialog message 1 não aparece ou não contém o texto esperado.');
  106 |             }
  107 |         });
  108 | 
  109 |         await page.waitForTimeout(3000);
  110 | 
  111 |         await expect(bookdetails_page.RemoverFavoritos_RemoveFromFavourites_button).toBeVisible();
  112 |         await expect(bookdetails_page.AdicionarFavoritos_AddToFavourites_button).not.toBeVisible();
  113 | 
  114 |         await bookdetails_page.ClickFavoritos_Favourites_button();
  115 | 
  116 |         await expect(page).toHaveURL('http://localhost:3000/favoritos.html');
  117 | 
  118 |         const favouriteBookCard = await favourites_page.SelectLivroFavorito_FavouriteBookCard_grid(newBook_random.nome, newBook_random.autor);
  119 | 
  120 |         await expect(favouriteBookCard).toBeVisible();
  121 | 
  122 | 
  123 |     });
  124 | 
  125 | 
  126 |     test('Remover Livro dos Favoritos (Sucesso)', async ({ page }) => {
  127 |         const login_page = new Login_page(page);
  128 |         const dashboard_page = new Dashboard_page(page);
  129 |         const bookdetails_page = new BookDetails_page(page);
  130 |         const favourites_page = new Favourites_page(page);
  131 | 
  132 |         const ValidUser = {
  133 |             "nome": faker.person.fullName(),
  134 |             "email": faker.internet.email(),
  135 |             "senha": faker.internet.password()
  136 |         }
  137 | 
  138 |         const newBook = {
  139 |             "nome": faker.book.title(),
  140 |             "autor": faker.person.fullName(),
  141 |             "paginas": faker.number.int({ min: 10, max: 2000 }),
  142 |             "descricao": faker.lorem.paragraph(2),
  143 |             "imagemUrl": faker.image.url(),
  144 |             "estoque": faker.number.int({ min: 0, max: 1000 }),
  145 |             "preco": parseFloat(faker.commerce.price({ min: 5, max: 200 }))
  146 |         };
  147 | 
  148 |         let responsePOSTnewUser = await page.request.post('/registro',
  149 |             {
  150 |                 data: ValidUser
  151 |             });
  152 | 
  153 |         let responsePOSTnewBook_Random = await page.request.post('/livros',
  154 |             {
  155 |                 data: newBook
  156 |             }
  157 |         );
  158 | 
  159 |         expect(responsePOSTnewUser.status()).toBe(201);
  160 |         let newUser = await responsePOSTnewUser.json();
  161 |         expect(newUser.usuario).toHaveProperty('id');
  162 |         expect(newUser.usuario).toHaveProperty('nome');
  163 |         expect(newUser.usuario.nome).toBe(ValidUser.nome);
  164 |         expect(newUser.usuario).toHaveProperty('email');
  165 |         expect(newUser.usuario.email).toBe(ValidUser.email);
  166 |         expect(newUser.usuario).toHaveProperty('tipo');
  167 | 
  168 |         expect(responsePOSTnewBook_Random.status()).toBe(201);
  169 |         let newBook_random = await responsePOSTnewBook_Random.json();
  170 |         expect(newBook_random).toHaveProperty('id');
  171 |         expect(newBook_random).toHaveProperty('nome');
  172 |         expect(newBook_random.nome).toBe(newBook.nome);
  173 |         expect(newBook_random).toHaveProperty('autor');
  174 |         expect(newBook_random.autor).toBe(newBook.autor);
  175 |         expect(newBook_random).toHaveProperty('paginas');
  176 |         expect(newBook_random.paginas).toBe(newBook.paginas);
  177 | 
  178 |         await page.goto('http://localhost:3000/login.html');
  179 | 
  180 |         await expect(page).toHaveURL('http://localhost:3000/login.html');
  181 | 
  182 |         page.waitForEvent('dialog').then(async dialog => {
  183 |             if (dialog.message().includes('Login realizado com sucesso!')) {
  184 |                 console.log("dialog message 'Login realizado com sucesso!' aceite")
  185 |                 await dialog.accept();
  186 |             }
  187 |             else {
  188 |                 throw new Error('Dialog message 1 não aparece ou não contém o texto esperado.');
  189 |             }
  190 |         });
  191 | 
  192 |         await page.waitForTimeout(3000);
  193 | 
  194 |         await login_page.FillEmail_Password_InputFields(newUser.usuario.email, ValidUser.senha);
  195 | 
  196 |         await login_page.ClickEnterLogin_Button();
  197 | 
  198 |         await expect(page).toHaveURL('http://localhost:3000/dashboard.html');
  199 | 
```