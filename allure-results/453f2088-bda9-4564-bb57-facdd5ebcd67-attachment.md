# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: FRONTEND_test_suite5_Favoritos.spec.js >> Favoritos >> Adicionar Livro aos Favoritos pela UI (Sucesso)
- Location: tests\FRONTEND_test_suite5_Favoritos.spec.js:19:9

# Error details

```
TypeError: bookdetails_page.ClickAddToFavourites_Button is not a function
```

# Page snapshot

```yaml
- generic [ref=e2]:
  - generic [ref=e3]:
    - heading "📚 Detalhes do Livro" [level=1] [ref=e4]
    - generic [ref=e5]:
      - generic [ref=e6]: Alexzander KuphalALUNO
      - button "Sair" [ref=e7] [cursor=pointer]
  - generic [ref=e8]:
    - link "Dashboard" [ref=e9] [cursor=pointer]:
      - /url: dashboard.html
    - link "Livros" [ref=e10] [cursor=pointer]:
      - /url: livros.html
    - link "Favoritos" [ref=e11] [cursor=pointer]:
      - /url: favoritos.html
    - link "Meus Arrendamentos" [ref=e12] [cursor=pointer]:
      - /url: arrendamentos.html
    - link "Compras" [ref=e13] [cursor=pointer]:
      - /url: compras.html
    - link "Minhas Compras" [ref=e14] [cursor=pointer]:
      - /url: minhas-compras.html
  - generic [ref=e16]:
    - generic [ref=e17]:
      - img "The Call of the Wild"
    - generic [ref=e18]:
      - heading "The Call of the Wild" [level=2] [ref=e19]
      - generic [ref=e20]:
        - strong [ref=e21]: "Autor:"
        - text: Emily Stehr
      - generic [ref=e22]:
        - strong [ref=e23]: "Páginas:"
        - text: "251"
      - generic [ref=e24]:
        - strong [ref=e25]: "Descrição:"
        - text: Utpote vaco consuasor acerbitas adeo comis adeptio admiratio. Concedo suscipio vestrum antepono ver ager.
      - generic [ref=e26]:
        - strong [ref=e27]: "Data de Cadastro:"
        - text: 10/06/2026
      - generic [ref=e28]:
        - button "🤍 Adicionar aos Favoritos" [ref=e29] [cursor=pointer]
        - button "🗑️ Deletar Livro" [ref=e30] [cursor=pointer]
        - button "← Voltar" [ref=e31] [cursor=pointer]
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
  71  | await page.goto('http://localhost:3000/login.html');
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
> 97  |         await bookdetails_page.ClickAddToFavourites_Button();
      |                                ^ TypeError: bookdetails_page.ClickAddToFavourites_Button is not a function
  98  | 
  99  |         page.waitForEvent('dialog').then(async dialog => {
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
  126 | 
  127 | 
  128 | })
```