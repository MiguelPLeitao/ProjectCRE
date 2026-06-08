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
Expected: "Dr. Peggy WillAluno"
Received: "Dr. Peggy WillALUNO"
Timeout:  5000ms

Call log:
  - Expect "toHaveText" with timeout 5000ms
  - waiting for locator('[id="nomeUsuario"]')
    14 × locator resolved to <span id="nomeUsuario" class="user-name">…</span>
       - unexpected value "Dr. Peggy WillALUNO"

```

```yaml
- text: Dr. Peggy WillALUNO
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
  53  |         expect(newUser.usuario).toHaveProperty('tipo');
  54  | 
  55  |         if (newUser.usuario.tipo === 1) {
  56  |             newUser.usuario.tipo = "Aluno";
  57  |         }
  58  |         else if (newUser.usuario.tipo === 2) {
  59  |             newUser.usuario.tipo = "Funcionario";
  60  |         }
  61  |         else if (newUser.usuario.tipo === 3) {
  62  |             newUser.usuario.tipo = "Administrador";
  63  |         }
  64  |         else {
  65  |             throw new Error('Tipo de usuário desconhecido');
  66  |         }
  67  | 
  68  |         expect(newUser.usuario).not.toHaveProperty('senha');
  69  |         expect(newUser.mensagem).toBe("Usuário criado com sucesso");
  70  | 
  71  | 
  72  |         await page.goto('http://localhost:3000/login.html');
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
  92  |         await expect(dashboard_page.UserName_text).toBeVisible();
  93  | 
> 94  |         await expect(dashboard_page.UserName_text).toHaveText(newUser.usuario.nome + newUser.usuario.tipo);
      |                                                    ^ Error: expect(locator).toHaveText(expected) failed
  95  | 
  96  |         await expect(dashboard_page.Dashboard_button).toBeVisible();
  97  |         await expect(dashboard_page.Dashboard_button.isClickable()).toBeTruthy();
  98  |         await expect(dashboard_page.Livros_Books_button).toBeVisible();
  99  |         await expect(dashboard_page.Favoritos_Favorites_button).toBeVisible();
  100 |         await expect(dashboard_page.MeusArrendamentos_Rents_button).toBeVisible();
  101 |         await expect(dashboard_page.Compras_BuyOrders_button).toBeVisible();
  102 |         await expect(dashboard_page.MinhasCompras_MyBuyOrders_button).toBeVisible();
  103 | 
  104 |         await dashboard_page.ClickLivros_Books_button();
  105 |         await expect(page).toHaveURL('http://localhost:3000/livros.html');
  106 | 
  107 |         await page.goBack();
  108 |         await expect(page).toHaveURL('http://localhost:3000/dashboard.html');
  109 | 
  110 |         await dashboard_page.ClickFavoritos_Favorites_button();
  111 |         await expect(page).toHaveURL('http://localhost:3000/favoritos.html');
  112 | 
  113 |         await page.goBack();
  114 |         await expect(page).toHaveURL('http://localhost:3000/dashboard.html');
  115 | 
  116 |         await dashboard_page.ClickMeusArrendamentos_Rents_button();
  117 |         await expect(page).toHaveURL('http://localhost:3000/arrendamentos.html');
  118 | 
  119 |         await page.goBack();
  120 |         await expect(page).toHaveURL('http://localhost:3000/dashboard.html');
  121 | 
  122 |         await dashboard_page.ClickCompras_BuyOrders_button();
  123 |         await expect(page).toHaveURL('http://localhost:3000/compras.html');
  124 | 
  125 |         await page.goBack();
  126 |         await expect(page).toHaveURL('http://localhost:3000/dashboard.html');
  127 | 
  128 |         await dashboard_page.ClickMinhasCompras_MyBuyOrders_button();
  129 |         await expect(page).toHaveURL('http://localhost:3000/minhas-compras.html');
  130 | 
  131 | 
  132 |     })
  133 | 
  134 | 
  135 | })
```