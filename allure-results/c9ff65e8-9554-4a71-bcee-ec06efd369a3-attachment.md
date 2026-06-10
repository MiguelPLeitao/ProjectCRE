# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: FRONTEND_test_suite1_Registro_e_Login.spec.js >> Registo e Login >> Fluxo Completo de Registro (Aluno) (Sucesso)
- Location: tests\FRONTEND_test_suite1_Registro_e_Login.spec.js:10:9

# Error details

```
Error: dialog.accept: Cannot accept dialog which is already handled!
```

```
Error: page.waitForTimeout: Test ended.
```

# Page snapshot

```yaml
- generic [ref=e2]:
  - heading "📚 Login" [level=1] [ref=e3]
  - generic [ref=e4]:
    - generic [ref=e5]:
      - generic [ref=e6]: "Email:"
      - textbox "Email:" [ref=e7]
    - generic [ref=e8]:
      - generic [ref=e9]: "Senha:"
      - textbox "Senha:" [ref=e10]
    - button "Entrar" [ref=e11] [cursor=pointer]
  - generic [ref=e12]:
    - text: Não tem uma conta?
    - link "Registre-se" [ref=e13] [cursor=pointer]:
      - /url: registro.html
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
  9   | test.describe('Registo e Login', () => {
  10  |     test('Fluxo Completo de Registro (Aluno) (Sucesso)', async ({ page }) => {
  11  |         const register_page = new Register_page(page);
  12  |         const login_page = new Login_page(page);
  13  |         const dashboard_page = new Dashboard_page(page);
  14  | 
  15  |         await page.goto('http://localhost:3000/registro.html');
  16  | 
  17  |         await expect(page).toHaveURL('http://localhost:3000/registro.html');
  18  | 
  19  |         page.waitForEvent('dialog').then(async dialog => {
  20  |             if (dialog.message().includes('Email já cadastrado')) {
  21  |                 console.log("dialog message 'Email já cadastrado' aceite")
  22  |                 await dialog.accept();
  23  |             }
  24  |             else if (dialog.message().includes('Cadastro realizado com sucesso! Faça login.')) {
  25  |                 console.log("dialog message 'Cadastro realizado com sucesso! Faça login.' aceite")
  26  |                 await dialog.accept();
  27  |             }
  28  |             else {
  29  |                 throw new Error('Dialog message 1 não aparece ou não contém o texto esperado.');
  30  |             }
  31  |         });
  32  |         await page.waitForTimeout(3000);
  33  | 
  34  |         await register_page.FillName_Email_Password_InputFields("Carlos Oliveira", "carlos@teste.com", "senha123");
  35  | 
  36  |         await register_page.ClickRegister_Button();
  37  | 
  38  | 
  39  |         if (page.url().includes('http://localhost:3000/login.html')) {
  40  |             await expect(page).toHaveURL('http://localhost:3000/login.html');
  41  |         }
  42  | 
  43  |         else {
  44  |             await expect(page).toHaveURL('http://localhost:3000/registro.html');
  45  | 
  46  |             page.waitForEvent('dialog').then(async dialog => {
  47  |                 if (dialog.message().includes('Cadastro realizado com sucesso! Faça login.')) {
  48  |                     console.log("dialog message 'Cadastro realizado com sucesso! Faça login.' aceite")
  49  |                     await dialog.accept();
  50  |                 }
  51  |                 else {
  52  |                     throw new Error('Dialog message 2 não aparece ou não contém o texto esperado.');
  53  |                 }
  54  |             });
  55  | 
> 56  |             await page.waitForTimeout(3000);
      |                        ^ Error: page.waitForTimeout: Test ended.
  57  | 
  58  |             await register_page.FillName_Email_Password_InputFields();
  59  |             await register_page.ClickRegister_Button();
  60  | 
  61  |             console.log("O usuário Carlos Oliveira já existia, foi criado um usuário aleatório!")
  62  | 
  63  |             await expect(page).toHaveURL('http://localhost:3000/login.html');
  64  |             await expect(login_page.EMAIL_InputField).toBeVisible();
  65  |             await expect(login_page.PASSWORD_InputField).toBeVisible();
  66  | 
  67  |             await page.goto('http://localhost:3000/registro.html');
  68  |             await expect(page).toHaveURL('http://localhost:3000/registro.html');
  69  |             await expect(register_page.NAME_InputField).toBeVisible();
  70  |             await expect(register_page.EMAIL_InputField).toBeVisible();
  71  |             await expect(register_page.PASSWORD_InputField).toBeVisible();
  72  |             await expect(register_page.CONFIRM_PASSWORD_InputField).toBeVisible();
  73  |             await expect(register_page.NAME_InputField).toHaveValue("");
  74  |             await expect(register_page.EMAIL_InputField).toHaveValue("");
  75  |             await expect(register_page.PASSWORD_InputField).toHaveValue("");
  76  |             await expect(register_page.CONFIRM_PASSWORD_InputField).toHaveValue("");
  77  |         }
  78  |     });
  79  | 
  80  | 
  81  |     test('Validação de Senhas Não Correspondentes (Falha)', async ({ page }) => {
  82  |         const register_page = new Register_page(page);
  83  |         const login_page = new Login_page(page);
  84  | 
  85  |         await page.goto('http://localhost:3000/registro.html');
  86  | 
  87  |         await expect(page).toHaveURL('http://localhost:3000/registro.html');
  88  | 
  89  |         page.waitForEvent('dialog').then(async dialog => {
  90  |             if (dialog.message().includes('As senhas não conferem.')) {
  91  |                 console.log("dialog message 'As senhas não conferem.' aceite")
  92  |                 await dialog.accept();
  93  |             }
  94  |             else {
  95  |                 throw new Error('Dialog message 1 não aparece ou não contém o texto esperado.');
  96  |             }
  97  |         });
  98  | 
  99  |         await page.waitForTimeout(3000);
  100 | 
  101 |         await register_page.FillName_InputField(faker.person.fullName());
  102 | 
  103 |         await register_page.FillEmail_InputField(faker.internet.email());
  104 | 
  105 |         let InvalidPassword = faker.internet.password({ length: faker.number.int({ min: 6, max: 20 }) });
  106 |         let InvalidConfirmPassword = faker.internet.password({ length: faker.number.int({ min: 6, max: 20 }) });
  107 | 
  108 |         console.log("Senha Invalida: " + InvalidPassword);
  109 |         console.log("Confirmar Senha Invalida: " + InvalidConfirmPassword);
  110 | 
  111 |         expect(InvalidPassword).not.toEqual(InvalidConfirmPassword);
  112 | 
  113 |         await register_page.FillPasssword_InputField(InvalidPassword);
  114 | 
  115 |         await register_page.FillConfirmPassword_InputField(InvalidConfirmPassword);
  116 | 
  117 |         await register_page.ClickRegister_Button();
  118 | 
  119 |         await expect(page).toHaveURL('http://localhost:3000/registro.html');
  120 |     });
  121 | 
  122 | 
  123 |     test('Login com Sucesso (Admin) (Sucesso)', async ({ page }) => {
  124 |         const login_page = new Login_page(page);
  125 |         const dashboard_page = new Dashboard_page(page);
  126 | 
  127 |         await page.goto('http://localhost:3000/login.html');
  128 | 
  129 |         await expect(page).toHaveURL('http://localhost:3000/login.html');
  130 | 
  131 |         page.waitForEvent('dialog').then(async dialog => {
  132 |             if (dialog.message().includes('Login realizado com sucesso!')) {
  133 |                 console.log("dialog message 'Login realizado com sucesso!' aceite")
  134 |                 await dialog.accept();
  135 |             }
  136 |             else {
  137 |                 throw new Error('Dialog message 1 não aparece ou não contém o texto esperado.');
  138 |             }
  139 |         });
  140 | 
  141 |         await page.waitForTimeout(3000);
  142 | 
  143 |         await login_page.FillEmail_Password_InputFields("admin@biblioteca.com", "123456");
  144 | 
  145 |         await login_page.ClickEnterLogin_Button();
  146 | 
  147 |         await expect(page).toHaveURL('http://localhost:3000/dashboard.html');
  148 | 
  149 |         await expect(dashboard_page.UserName_text).toBeVisible();
  150 | 
  151 |         await expect(dashboard_page.UserName_text).toHaveText('Admin MasterADMIN');
  152 | 
  153 |         let usuario = await page.evaluate(() => localStorage.getItem('usuario'));
  154 |         expect(usuario).toBeTruthy();
  155 |         expect(JSON.parse(usuario)).toHaveProperty('tipo');
  156 |         expect(JSON.parse(usuario).tipo).toBe(3);
```