# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: FRONTEND_test_suite2_Protecao_Rotas_e_Navegacao.spec.js >> Protecao de Rotas e Navegacao >> Menu Dinâmico – Aluno (Sucesso)
- Location: tests\FRONTEND_test_suite2_Protecao_Rotas_e_Navegacao.spec.js:30:9

# Error details

```
Error: expect(locator).toHaveText(expected) failed

Locator:  locator('[id="nomeUsuario"]')
Expected: "Catherine Dicki"
Received: "Catherine DickiALUNO"
Timeout:  5000ms

Call log:
  - Expect "toHaveText" with timeout 5000ms
  - waiting for locator('[id="nomeUsuario"]')
    14 × locator resolved to <span id="nomeUsuario" class="user-name">…</span>
       - unexpected value "Catherine DickiALUNO"

```

```yaml
- text: Catherine DickiALUNO
```

# Test source

```ts
  1   | // @ts-check
  2   | import { test, expect } from '@playwright/test';
  3   | import { faker } from '@faker-js/faker';
  4   | import Register_page from '../Page_Objects_Model_POM_FRONTEND/Register_page';
  5   | import Login_page from '../Page_Objects_Model_POM_FRONTEND/Login_page';
  6   | import Dashboard_page from '../Page_Objects_Model_POM_FRONTEND/Dashboard_page';
  7   | 
  8   | 
  9   | test.describe('Protecao de Rotas e Navegacao', () => {
  10  |     test('Protecao Rotas sem Login (Falha)', async ({ page }) => {
  11  |         const register_page = new Register_page(page);
  12  |         const login_page = new Login_page(page);
  13  |         const dashboard_page = new Dashboard_page(page);
  14  | 
  15  |         await page.goto('http://localhost:3000/login.html');
  16  | 
  17  |         await page.evaluate(() => localStorage.clear());
  18  | 
  19  |         await page.goto('http://localhost:3000/dashboard.html');
  20  | 
  21  |         expect(page).toHaveURL('http://localhost:3000/login.html');
  22  | 
  23  |         await expect(login_page.EMAIL_InputField).toBeVisible();
  24  |         await expect(login_page.PASSWORD_InputField).toBeVisible();
  25  | 
  26  |     });
  27  | 
  28  | 
  29  | 
  30  |     test('Menu Dinâmico – Aluno (Sucesso)', async ({ page }) => {
  31  |         const register_page = new Register_page(page);
  32  |         const login_page = new Login_page(page);
  33  |         const dashboard_page = new Dashboard_page(page);
  34  | 
  35  |         const ValidUser = {
  36  |             "nome": faker.person.fullName(),
  37  |             "email": faker.internet.email(),
  38  |             "senha": faker.internet.password()
  39  |         }
  40  | 
  41  |         let responsePOSTnewUser = await page.request.post('/registro',
  42  |             {
  43  |                 data: ValidUser
  44  |             });
  45  | 
  46  |         expect(responsePOSTnewUser.status()).toBe(201);
  47  |         let newUser = await responsePOSTnewUser.json();
  48  |         expect(newUser.usuario).toHaveProperty('id');
  49  |         expect(newUser.usuario).toHaveProperty('nome');
  50  |         expect(newUser.usuario.nome).toBe(ValidUser.nome);
  51  |         expect(newUser.usuario).toHaveProperty('email');
  52  |         expect(newUser.usuario.email).toBe(ValidUser.email);
  53  | 
  54  | 
  55  |         await page.goto('http://localhost:3000/login.html');
  56  | 
  57  |         page.waitForEvent('dialog').then(async dialog => {
  58  |             if (dialog.message().includes('Login realizado com sucesso!')) {
  59  |                 console.log("dialog message 'Login realizado com sucesso!' aceite")
  60  |                 await dialog.accept();
  61  |             }
  62  |             else {
  63  |                 throw new Error('Dialog message 1 não aparece ou não contém o texto esperado.');
  64  |             }
  65  |         });
  66  | 
  67  |         await page.waitForTimeout(3000);
  68  | 
  69  |         await login_page.FillEmail_Password_InputFields(newUser.usuario.email, ValidUser.senha);
  70  | 
  71  |         await login_page.ClickEnterLogin_Button();
  72  | 
  73  |         await expect(page).toHaveURL('http://localhost:3000/dashboard.html');
  74  | 
  75  |         await expect(dashboard_page.UserName_text).toBeVisible();
  76  | 
> 77  |         await expect(dashboard_page.UserName_text).toHaveText(newUser.usuario.nome);
      |                                                    ^ Error: expect(locator).toHaveText(expected) failed
  78  | 
  79  |         await expect(dashboard_page.Dashboard_button).toBeVisible();
  80  |         await expect(dashboard_page.Dashboard_button.isClickable()).toBeTruthy();
  81  |         await expect(dashboard_page.Livros_Books_button).toBeVisible();
  82  |         await expect(dashboard_page.Favoritos_Favorites_button).toBeVisible();
  83  |         await expect(dashboard_page.MeusArrendamentos_Rents_button).toBeVisible();
  84  |         await expect(dashboard_page.Compras_BuyOrders_button).toBeVisible();
  85  |         await expect(dashboard_page.MinhasCompras_MyBuyOrders_button).toBeVisible();
  86  | 
  87  |         await dashboard_page.ClickLivros_Books_button();
  88  |         await expect(page).toHaveURL('http://localhost:3000/livros.html');
  89  | 
  90  |         await page.goBack();
  91  |         await expect(page).toHaveURL('http://localhost:3000/dashboard.html');
  92  | 
  93  |         await dashboard_page.ClickFavoritos_Favorites_button();
  94  |         await expect(page).toHaveURL('http://localhost:3000/favoritos.html');
  95  | 
  96  |         await page.goBack();
  97  |         await expect(page).toHaveURL('http://localhost:3000/dashboard.html');
  98  | 
  99  |         await dashboard_page.ClickMeusArrendamentos_Rents_button();
  100 |         await expect(page).toHaveURL('http://localhost:3000/arrendamentos.html');
  101 | 
  102 |         await page.goBack();
  103 |         await expect(page).toHaveURL('http://localhost:3000/dashboard.html');
  104 | 
  105 |         await dashboard_page.ClickCompras_BuyOrders_button();
  106 |         await expect(page).toHaveURL('http://localhost:3000/compras.html');
  107 | 
  108 |         await page.goBack();
  109 |         await expect(page).toHaveURL('http://localhost:3000/dashboard.html');
  110 | 
  111 |         await dashboard_page.ClickMinhasCompras_MyBuyOrders_button();
  112 |         await expect(page).toHaveURL('http://localhost:3000/minhas-compras.html');
  113 | 
  114 | 
  115 |     })
  116 | 
  117 | 
  118 | })
```