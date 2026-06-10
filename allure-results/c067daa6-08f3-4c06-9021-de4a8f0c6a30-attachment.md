# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: FRONTEND_test_suite4_Livros.spec.js >> Livros >> Cadastro de Livro via UI (Sucesso)
- Location: tests\FRONTEND_test_suite4_Livros.spec.js:45:9

# Error details

```
TypeError: books_page.ClickAddBook_Button is not a function
```

```
Error: page.waitForEvent: Test ended.
=========================== logs ===========================
waiting for event "dialog"
============================================================
```

# Page snapshot

```yaml
- generic [ref=e2]:
  - generic [ref=e3]:
    - heading "📚 Gerenciar Livros" [level=1] [ref=e4]
    - generic [ref=e5]:
      - generic [ref=e6]: Admin MasterADMIN
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
    - link "Aprovações" [ref=e13] [cursor=pointer]:
      - /url: aprovacoes.html
    - link "Compras Admin" [ref=e14] [cursor=pointer]:
      - /url: compras-admin.html
    - link "Usuários (Admin)" [ref=e15] [cursor=pointer]:
      - /url: admin-usuarios.html
  - heading "Adicionar Novo Livro" [level=2] [ref=e16]
  - generic [ref=e18]:
    - generic [ref=e19]:
      - generic [ref=e20]: "Nome do Livro:"
      - textbox "Nome do Livro:" [ref=e21]: Stories of Anton Chekhov
    - generic [ref=e22]:
      - generic [ref=e23]: "Autor:"
      - textbox "Autor:" [ref=e24]: George R. R. Martin
    - generic [ref=e25]:
      - generic [ref=e26]: "Número de Páginas:"
      - spinbutton "Número de Páginas:" [ref=e27]: "1629"
    - generic [ref=e28]:
      - generic [ref=e29]: "Descrição:"
      - textbox "Descrição:" [ref=e30]: Temeritas curriculum texo velit paens supra. Vinitor despecto caste appositus acerbitas defaeco stillicidium statua. Tempus adopto teneo audacia aedificium consuasor impedit.
    - generic [ref=e31]:
      - generic [ref=e32]: "URL da Imagem:"
      - textbox "URL da Imagem:" [ref=e33]:
        - /placeholder: https://...
        - text: https://realistic-marksman.biz
    - generic [ref=e34]:
      - generic [ref=e35]: "Estoque:"
      - spinbutton "Estoque:" [ref=e36]: "81"
    - generic [ref=e37]:
      - generic [ref=e38]: "Preço (€):"
      - spinbutton "Preço (€):" [active] [ref=e39]: "183"
    - button "Adicionar Livro" [ref=e40] [cursor=pointer]
  - heading "Todos os Livros" [level=2] [ref=e41]
  - generic [ref=e42]:
    - generic [ref=e43] [cursor=pointer]:
      - img "Clean Code" [ref=e44]
      - heading "Clean Code" [level=3] [ref=e45]
      - paragraph [ref=e46]:
        - strong [ref=e47]: "Autor:"
        - text: Robert C. Martin
      - paragraph [ref=e48]:
        - strong [ref=e49]: "Páginas:"
        - text: "464"
      - paragraph [ref=e50]:
        - strong [ref=e51]: "Estoque:"
        - text: "4"
      - paragraph [ref=e52]:
        - strong [ref=e53]: "Preço:"
        - text: € 49.90
    - generic [ref=e54] [cursor=pointer]:
      - img "Harry Potter" [ref=e55]
      - heading "Harry Potter" [level=3] [ref=e56]
      - paragraph [ref=e57]:
        - strong [ref=e58]: "Autor:"
        - text: J.K. Rowling
      - paragraph [ref=e59]:
        - strong [ref=e60]: "Páginas:"
        - text: "309"
      - paragraph [ref=e61]:
        - strong [ref=e62]: "Estoque:"
        - text: "3"
      - paragraph [ref=e63]:
        - strong [ref=e64]: "Preço:"
        - text: € 39.90
    - generic [ref=e65] [cursor=pointer]:
      - img "1" [ref=e66]
      - heading "1" [level=3] [ref=e67]
      - paragraph [ref=e68]:
        - strong [ref=e69]: "Autor:"
        - text: "1"
      - paragraph [ref=e70]:
        - strong [ref=e71]: "Páginas:"
        - text: "1"
      - paragraph [ref=e72]:
        - strong [ref=e73]: "Estoque:"
        - text: "1"
      - paragraph [ref=e74]:
        - strong [ref=e75]: "Preço:"
        - text: € 0.00
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | import { faker } from '@faker-js/faker';
  3  | import Register_page from '../Page_Objects_Model_POM_FRONTEND/Register_page';
  4  | import Login_page from '../Page_Objects_Model_POM_FRONTEND/Login_page';
  5  | import Dashboard_page from '../Page_Objects_Model_POM_FRONTEND/Dashboard_page';
  6  | import BuyOrders_page from '../Page_Objects_Model_POM_FRONTEND/BuyOrders_page';
  7  | import Books_page from '../Page_Objects_Model_POM_FRONTEND/Books_page';
  8  | import BookDetails_page from '../Page_Objects_Model_POM_FRONTEND/BookDetails_page';
  9  | import Favourites_page from '../Page_Objects_Model_POM_FRONTEND/Favourites_page';
  10 | import Rents_page from '../Page_Objects_Model_POM_FRONTEND/Rents_page';
  11 | import MyBuyOrders_page from '../Page_Objects_Model_POM_FRONTEND/MyBuyOrders_page';
  12 | import Admin_Approvals_page from '../Page_Objects_Model_POM_FRONTEND/Admin_Approvals_page';
  13 | import Admin_BuyOrders_page from '../Page_Objects_Model_POM_FRONTEND/Admin_BuyOrders_page';
  14 | import Admin_AdminUsers_page from '../Page_Objects_Model_POM_FRONTEND/Admin_AdminUsers_page';
  15 | 
  16 | 
  17 | test.describe('Livros', () => {
  18 |     test.beforeEach(async ({ page }) => {
  19 |         const login_page = new Login_page(page);
  20 | 
  21 |         await page.goto('http://localhost:3000/login.html');
  22 | 
  23 |         await expect(page).toHaveURL('http://localhost:3000/login.html');
  24 | 
  25 |         page.waitForEvent('dialog').then(async dialog => {
  26 |             if (dialog.message().includes('Login realizado com sucesso!')) {
  27 |                 console.log("dialog message 'Login realizado com sucesso!' aceite")
  28 |                 await dialog.accept();
  29 |             }
  30 |             else {
  31 |                 throw new Error('Dialog message 1 não aparece ou não contém o texto esperado.');
  32 |             }
  33 |         });
  34 | 
  35 |         await page.waitForTimeout(3000);
  36 | 
  37 |         await login_page.FillEmail_Password_InputFields("admin@biblioteca.com", "123456");
  38 | 
  39 |         await login_page.ClickEnterLogin_Button();
  40 | 
  41 |         await expect(page).toHaveURL('http://localhost:3000/dashboard.html');
  42 | 
  43 |     });
  44 | 
  45 |     test('Cadastro de Livro via UI (Sucesso)', async ({ page }) => {
  46 |         const dashboard_page = new Dashboard_page(page);
  47 |         const books_page = new Books_page(page);
  48 |         const bookDetails_page = new BookDetails_page(page);
  49 | 
  50 |         await expect(page).toHaveURL('http://localhost:3000/dashboard.html');
  51 | 
  52 |         await dashboard_page.ClickLivros_Books_button();
  53 |         await expect(page).toHaveURL('http://localhost:3000/livros.html');
  54 | 
> 55 |         page.waitForEvent('dialog').then(async dialog => {
     |              ^ Error: page.waitForEvent: Test ended.
  56 |             if (dialog.message().includes('Livro adicionado com sucesso!')) {
  57 |                 console.log("dialog message 'Livro adicionado com sucesso!' aceite")
  58 |                 await dialog.accept();
  59 |             }
  60 |             else {
  61 |                 throw new Error('Dialog message 1 não aparece ou não contém o texto esperado.');
  62 |             }
  63 |         });
  64 | 
  65 |         await page.waitForTimeout(3000);
  66 | 
  67 |         await books_page.Fill_AllNewBook_Fields();
  68 | 
  69 |         await books_page.ClickAddBook_Button();
  70 | 
  71 |         await expect(books_page.NomeLivro_BookName_inputfield).toHaveValue("");
  72 |         await expect(books_page.AutorLivro_BookAuthor_inputfield).toHaveValue("");
  73 |         await expect(books_page.NumeroPaginas_NumberOfPages_spinbutton).toHaveValue("");
  74 |         await expect(books_page.DescricaoLivro_BookDescription_inputfield).toHaveValue("");
  75 |         await expect(books_page.LivroImagemURL_BookImageURL_inputfield).toHaveValue("");
  76 |         await expect(books_page.EstoqueLivro_BookStock_spinbutton).toHaveValue("");
  77 |         await expect(books_page.PrecoLivro_BookPrice_spinbutton).toHaveValue("");
  78 | 
  79 |         await expect(books_page.SelectLivro_BookCard_grid(finalTitle)).toBeVisible();
  80 | 
  81 |     });
  82 | 
  83 | })
```