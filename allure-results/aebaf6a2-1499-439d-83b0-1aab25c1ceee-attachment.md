# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: FRONTEND_test_suite3_Dashboard.spec.js >> Dashboard >> Dashboard - Visão Admin (Sucesso)
- Location: tests\FRONTEND_test_suite3_Dashboard.spec.js:19:9

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('.stat-card').filter({ hasText: 'Alunos Cadastrados' }).locator('.number')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('.stat-card').filter({ hasText: 'Alunos Cadastrados' }).locator('.number')

```

```yaml
- heading "📚 Minha Biblioteca" [level=1]
- text: Admin MasterADMIN
- button "Sair"
- link "Dashboard":
  - /url: dashboard.html
- link "Livros":
  - /url: livros.html
- link "Favoritos":
  - /url: favoritos.html
- link "Meus Arrendamentos":
  - /url: arrendamentos.html
- link "Aprovações":
  - /url: aprovacoes.html
- link "Compras Admin":
  - /url: compras-admin.html
- link "Usuários (Admin)":
  - /url: admin-usuarios.html
- heading "Olá, Admin Master! Você está logado como ADMINISTRADOR." [level=3]
- heading "Estatísticas" [level=2]
- heading "Total de Livros" [level=3]
- text: "2"
- heading "Total de Usuários" [level=3]
- text: "7"
- heading "Livros Disponíveis" [level=3]
- text: "2"
- heading "Alunos" [level=3]
- text: "4"
- heading "Funcionários" [level=3]
- text: "1"
- heading "Administradores" [level=3]
- text: "2"
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
  17 | 
  18 | test.describe('Dashboard', () => {
  19 |     test('Dashboard - Visão Admin (Sucesso)', async ({ page }) => {
  20 |         const login_page = new Login_page(page);
  21 |         const dashboard_page = new Dashboard_page(page);
  22 | 
  23 |         await page.goto('http://localhost:3000/login.html');
  24 | 
  25 |         await expect(page).toHaveURL('http://localhost:3000/login.html');
  26 | 
  27 |         page.waitForEvent('dialog').then(async dialog => {
  28 |             if (dialog.message().includes('Login realizado com sucesso!')) {
  29 |                 console.log("dialog message 'Login realizado com sucesso!' aceite")
  30 |                 await dialog.accept();
  31 |             }
  32 |             else {
  33 |                 throw new Error('Dialog message 1 não aparece ou não contém o texto esperado.');
  34 |             }
  35 |         });
  36 | 
  37 |         await page.waitForTimeout(3000);
  38 | 
  39 |         await login_page.FillEmail_Password_InputFields("admin@biblioteca.com", "123456");
  40 | 
  41 |         await login_page.ClickEnterLogin_Button();
  42 | 
  43 |         await expect(page).toHaveURL('http://localhost:3000/dashboard.html');
  44 | 
  45 |         await expect(dashboard_page.TotalLivros_TotalBooks_number).toBeVisible();
  46 |         await expect(dashboard_page.TotalUsuarios_TotalUsers_number).toBeVisible();
  47 |         await expect(dashboard_page.TotalLivrosDisponiveis_TotalBooksAvailable_number).toBeVisible();
> 48 |         await expect(dashboard_page.TotalAlunosCadastrados_TotalStudentsRegistered_number).toBeVisible();
     |                                                                                            ^ Error: expect(locator).toBeVisible() failed
  49 |         await expect(dashboard_page.TotalFuncionarios_TotalEmployees_number).toBeVisible();
  50 |         await expect(dashboard_page.TotalAdministradores_TotalAdmins_number).toBeVisible();
  51 | 
  52 |         await expect(dashboard_page.TotalLivros_TotalBooks_number).toBeGreaterThan(0);
  53 | 
  54 |         if (await dashboard_page.TotalLivrosDisponiveis_TotalBooksAvailable_number > 0) {
  55 |             await expect(dashboard_page.TotalLivrosDisponiveis_TotalBooksAvailable_number).toBeGreaterThan(0);
  56 |         }
  57 |         else if (await dashboard_page.TotalLivrosDisponiveis_TotalBooksAvailable_number == 0) {
  58 |             await expect(dashboard_page.TotalLivrosDisponiveis_TotalBooksAvailable_number).toBe(0);
  59 |         }
  60 |         else {
  61 |             throw new Error('Não aparece corretamente o número total de livros.');
  62 |         }
  63 | 
  64 |         await expect(dashboard_page.Livro1_Book1_button).toBeVisible();
  65 |         await expect(dashboard_page.Livro2_Book2_button).toBeVisible();
  66 |         await expect(dashboard_page.Livro3_Book3_button).toBeVisible();
  67 |         await expect(dashboard_page.Livro4_Book4_button).toBeVisible();
  68 |         await expect(dashboard_page.Livro5_Book5_button).toBeVisible();
  69 |         const livro6 = page.locator("//div[@id='livros-recentes']//div[contains(@class,'book-card')]").nth(5);
  70 |         await expect(livro6).not.toBeVisible();
  71 | 
  72 |     });
  73 | 
  74 | })
```