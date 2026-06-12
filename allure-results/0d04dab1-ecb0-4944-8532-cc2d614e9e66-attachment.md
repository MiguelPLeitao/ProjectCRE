# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: FRONTEND_test_suite8_Admin_Usuarios.spec.js >> Admin_Usuarios >> Acessar Tela de Usuários (Admin) (Sucesso)
- Location: tests\FRONTEND_test_suite8_Admin_Usuarios.spec.js:18:9

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('textbox', { name: 'Nome:' })
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByRole('textbox', { name: 'Nome:' })

```

```yaml
- heading "👨‍💻 Administração de Usuários" [level=1]
- text: Oliver FraneckiALUNO
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
- paragraph: Somente administradores podem acessar esta página.
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
  17  | test.describe('Admin_Usuarios', () => {
  18  |     test('Acessar Tela de Usuários (Admin) (Sucesso)', async ({ page }) => {
  19  |         const login_page = new Login_page(page);
  20  |         const dashboard_page = new Dashboard_page(page);
  21  |         const adminusers_page = new Admin_AdminUsers_page(page);
  22  | 
  23  |         const ValidUserStudent = {
  24  |             "nome": faker.person.fullName(),
  25  |             "email": faker.internet.email(),
  26  |             "senha": faker.internet.password(),
  27  |             "tipo": 1
  28  |         }
  29  | 
  30  |         const ValidUserEmployee = {
  31  |             "nome": faker.person.fullName(),
  32  |             "email": faker.internet.email(),
  33  |             "senha": faker.internet.password(),
  34  |             "tipo": 2
  35  |         }
  36  | 
  37  |         let responsePOSTnewUserEmployee = await page.request.post('/registro',
  38  |             {
  39  |                 data: ValidUserEmployee
  40  |             });
  41  | 
  42  |         let response2POSTnewUserStudent = await page.request.post('/registro',
  43  |             {
  44  |                 data: ValidUserStudent
  45  |             });
  46  | 
  47  |         expect(responsePOSTnewUserEmployee.status()).toBe(201);
  48  |         let newUserEmployee = await responsePOSTnewUserEmployee.json();
  49  |         expect(newUserEmployee.usuario).toHaveProperty('id');
  50  |         expect(newUserEmployee.usuario).toHaveProperty('nome');
  51  |         expect(newUserEmployee.usuario.nome).toBe(ValidUserEmployee.nome);
  52  |         expect(newUserEmployee.usuario).toHaveProperty('email');
  53  |         expect(newUserEmployee.usuario.email).toBe(ValidUserEmployee.email);
  54  |         expect(newUserEmployee.usuario).toHaveProperty('tipo');
  55  | 
  56  |         expect(response2POSTnewUserStudent.status()).toBe(201);
  57  |         let newUserStudent = await response2POSTnewUserStudent.json();
  58  |         expect(newUserStudent.usuario).toHaveProperty('id');
  59  |         expect(newUserStudent.usuario).toHaveProperty('nome');
  60  |         expect(newUserStudent.usuario.nome).toBe(ValidUserStudent.nome);
  61  |         expect(newUserStudent.usuario).toHaveProperty('email');
  62  |         expect(newUserStudent.usuario.email).toBe(ValidUserStudent.email);
  63  |         expect(newUserStudent.usuario).toHaveProperty('tipo');
  64  | 
  65  |         await page.goto('http://localhost:3000/admin-usuarios.html');
  66  |         await expect(page).toHaveURL('http://localhost:3000/login.html');
  67  | 
  68  |         page.waitForEvent('dialog').then(async dialog => {
  69  |             if (dialog.message().includes('Login realizado com sucesso!')) {
  70  |                 console.log("dialog message 'Login realizado com sucesso!' aceite")
  71  |                 await dialog.accept();
  72  |             }
  73  |             else {
  74  |                 throw new Error('Dialog message 1 não aparece ou não contém o texto esperado.');
  75  |             }
  76  |         });
  77  | 
  78  |         await page.waitForTimeout(3000);
  79  | 
  80  |         await login_page.FillEmail_Password_InputFields(newUserStudent.usuario.email, ValidUserStudent.senha);
  81  |         await login_page.ClickEnterLogin_Button();
  82  |         await expect(page).toHaveURL('http://localhost:3000/dashboard.html');
  83  |         await expect(dashboard_page.Admin_Usuarios_AdminUsers_button).not.toBeVisible();
  84  |         await page.goto('http://localhost:3000/admin-usuarios.html');
  85  |         await expect(page).toHaveURL('http://localhost:3000/admin-usuarios.html');
> 86  |         await expect(adminusers_page.NomeUsuario_UserName_inputfield).toBeVisible();
      |                                                                       ^ Error: expect(locator).toBeVisible() failed
  87  |         await expect(adminusers_page.EmailUsuario_UserEmail_inputfield).not.toBeVisible();
  88  |         await expect(adminusers_page.SenhaUsuario_UserPassword_inputfield).not.toBeVisible();
  89  |         await expect(adminusers_page.TipoUsuario_UserType_dropdown).not.toBeVisible();
  90  |         await expect(adminusers_page.CriarUsuario_AddUser_button).not.toBeVisible();
  91  |         await expect(adminusers_page.UsersTable).not.toBeVisible();
  92  |         await adminusers_page.ClickSair_LogOut_button();
  93  |         await expect(page).toHaveURL('http://localhost:3000/login.html');
  94  |         usuarioStudent = await page.evaluate(() => localStorage.getItem('usuario'));
  95  |         expect(usuarioStudent).toBeFalsy();
  96  | 
  97  | 
  98  |         page.waitForEvent('dialog').then(async dialog => {
  99  |             if (dialog.message().includes('Login realizado com sucesso!')) {
  100 |                 console.log("dialog message 'Login realizado com sucesso!' aceite")
  101 |                 await dialog.accept();
  102 |             }
  103 |             else {
  104 |                 throw new Error('Dialog message 1 não aparece ou não contém o texto esperado.');
  105 |             }
  106 |         });
  107 | 
  108 |         await page.waitForTimeout(3000);
  109 | 
  110 |         await login_page.FillEmail_Password_InputFields("admin@biblioteca.com", "123456");
  111 | 
  112 |         await login_page.ClickEnterLogin_Button();
  113 | 
  114 |         await expect(page).toHaveURL('http://localhost:3000/dashboard.html');
  115 | 
  116 |         await dashboard_page.ClickAdmin_Usuarios_AdminUsers_button();
  117 | 
  118 |         await expect(page).toHaveURL('http://localhost:3000/admin-usuarios.html');
  119 | 
  120 |         await expect(adminusers_page.NomeUsuario_UserName_inputfield).toBeVisible();
  121 |         await expect(adminusers_page.EmailUsuario_UserEmail_inputfield).toBeVisible();
  122 |         await expect(adminusers_page.SenhaUsuario_UserPassword_inputfield).toBeVisible();
  123 |         await expect(adminusers_page.TipoUsuario_UserType_dropdown).toBeVisible();
  124 |         await expect(adminusers_page.CriarUsuario_AddUser_button).toBeVisible();
  125 |         await expect(adminusers_page.UsersTable).toBeVisible();
  126 | 
  127 | 
  128 | 
  129 |     });
  130 | 
  131 | })
```