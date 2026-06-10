# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: FRONTEND_test_suite1_Registro_e_Login.spec.js >> Registo e Login >> Fluxo Completo de Registro (Aluno) (Sucesso)
- Location: tests\FRONTEND_test_suite1_Registro_e_Login.spec.js:10:9

# Error details

```
Error: Dialog message 2 não aparece ou não contém o texto esperado.
```

```
Error: page.waitForTimeout: Test ended.
```

# Page snapshot

```yaml
- generic [ref=e2]:
  - heading "📚 Criar Conta" [level=1] [ref=e3]
  - generic [ref=e4]:
    - generic [ref=e5]:
      - generic [ref=e6]: "Nome:"
      - textbox "Nome:" [ref=e7]: Carlos Oliveira
    - generic [ref=e8]:
      - generic [ref=e9]: "Email:"
      - textbox "Email:" [ref=e10]: carlos@teste.com
    - generic [ref=e11]:
      - generic [ref=e12]: "Senha:"
      - textbox "Senha:" [ref=e13]: senha123
    - generic [ref=e14]:
      - generic [ref=e15]: "Confirmar Senha:"
      - textbox "Confirmar Senha:" [ref=e16]: senha123
    - button "Registrar" [active] [ref=e17] [cursor=pointer]
    - paragraph [ref=e18]:
      - text: Já tem conta?
      - link "Entrar" [ref=e19] [cursor=pointer]:
        - /url: login.html
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
  38  |         await page.waitForLoadState('load', { timeout: 3000 });
  39  | 
  40  |         if (page.url().includes('http://localhost:3000/login.html')) {
  41  |             await expect(page).toHaveURL('http://localhost:3000/login.html');
  42  |         }
  43  | 
  44  |         else {
  45  |             await expect(page).toHaveURL('http://localhost:3000/registro.html');
  46  | 
  47  |             page.waitForEvent('dialog').then(async dialog => {
  48  |                 if (dialog.message().includes('Cadastro realizado com sucesso! Faça login.')) {
  49  |                     console.log("dialog message 'Cadastro realizado com sucesso! Faça login.' aceite")
  50  |                     await dialog.accept();
  51  |                 }
  52  |                 else {
  53  |                     throw new Error('Dialog message 2 não aparece ou não contém o texto esperado.');
  54  |                 }
  55  |             });
  56  | 
> 57  |             await page.waitForTimeout(3000);
      |                        ^ Error: page.waitForTimeout: Test ended.
  58  | 
  59  |             await register_page.FillName_Email_Password_InputFields();
  60  |             await register_page.ClickRegister_Button();
  61  | 
  62  |             await page.waitForLoadState('load', { timeout: 3000 });
  63  |             console.log("O usuário Carlos Oliveira já existia, foi criado um usuário aleatório!")
  64  | 
  65  |             await expect(page).toHaveURL('http://localhost:3000/login.html');
  66  |             await expect(login_page.EMAIL_InputField).toBeVisible();
  67  |             await expect(login_page.PASSWORD_InputField).toBeVisible();
  68  | 
  69  |             /*
  70  |             await page.goBack();
  71  |             await expect(page).toHaveURL('http://localhost:3000/registro.html');
  72  |             await expect(register_page.NAME_InputField).toBeVisible();
  73  |             await expect(register_page.EMAIL_InputField).toBeVisible();
  74  |             await expect(register_page.PASSWORD_InputField).toBeVisible();
  75  |             await expect(register_page.CONFIRM_PASSWORD_InputField).toBeVisible();
  76  |             await expect(register_page.NAME_InputField).toHaveValue("");
  77  |             await expect(register_page.EMAIL_InputField).toHaveValue("");
  78  |             await expect(register_page.PASSWORD_InputField).toHaveValue("");
  79  |             await expect(register_page.CONFIRM_PASSWORD_InputField).toHaveValue("");
  80  |             */
  81  | 
  82  |             await page.goto('http://localhost:3000/registro.html');
  83  |             await expect(page).toHaveURL('http://localhost:3000/registro.html');
  84  |             await expect(register_page.NAME_InputField).toBeVisible();
  85  |             await expect(register_page.EMAIL_InputField).toBeVisible();
  86  |             await expect(register_page.PASSWORD_InputField).toBeVisible();
  87  |             await expect(register_page.CONFIRM_PASSWORD_InputField).toBeVisible();
  88  |             await expect(register_page.NAME_InputField).toHaveValue("");
  89  |             await expect(register_page.EMAIL_InputField).toHaveValue("");
  90  |             await expect(register_page.PASSWORD_InputField).toHaveValue("");
  91  |             await expect(register_page.CONFIRM_PASSWORD_InputField).toHaveValue("");
  92  |         }
  93  |     });
  94  | 
  95  | 
  96  |     test('Validação de Senhas Não Correspondentes (Falha)', async ({ page }) => {
  97  |         const register_page = new Register_page(page);
  98  |         const login_page = new Login_page(page);
  99  | 
  100 |         await page.goto('http://localhost:3000/registro.html');
  101 | 
  102 |         await expect(page).toHaveURL('http://localhost:3000/registro.html');
  103 | 
  104 |         page.waitForEvent('dialog').then(async dialog => {
  105 |             if (dialog.message().includes('As senhas não conferem.')) {
  106 |                 console.log("dialog message 'As senhas não conferem.' aceite")
  107 |                 await dialog.accept();
  108 |             }
  109 |             else {
  110 |                 throw new Error('Dialog message 1 não aparece ou não contém o texto esperado.');
  111 |             }
  112 |         });
  113 | 
  114 |         await page.waitForTimeout(3000);
  115 | 
  116 |         await register_page.FillName_InputField(faker.person.fullName());
  117 | 
  118 |         await register_page.FillEmail_InputField(faker.internet.email());
  119 | 
  120 |         let InvalidPassword = faker.internet.password({ length: faker.number.int({ min: 6, max: 20 }) });
  121 |         let InvalidConfirmPassword = faker.internet.password({ length: faker.number.int({ min: 6, max: 20 }) });
  122 | 
  123 |         console.log("Senha Invalida: " + InvalidPassword);
  124 |         console.log("Confirmar Senha Invalida: " + InvalidConfirmPassword);
  125 | 
  126 |         expect(InvalidPassword).not.toEqual(InvalidConfirmPassword);
  127 | 
  128 |         await register_page.FillPasssword_InputField(InvalidPassword);
  129 | 
  130 |         await register_page.FillConfirmPassword_InputField(InvalidConfirmPassword);
  131 | 
  132 |         await register_page.ClickRegister_Button();
  133 | 
  134 |         await expect(page).toHaveURL('http://localhost:3000/registro.html');
  135 |     });
  136 | 
  137 | 
  138 |     test('Login com Sucesso (Admin) (Sucesso)', async ({ page }) => {
  139 |         const login_page = new Login_page(page);
  140 |         const dashboard_page = new Dashboard_page(page);
  141 | 
  142 |         await page.goto('http://localhost:3000/login.html');
  143 | 
  144 |         await expect(page).toHaveURL('http://localhost:3000/login.html');
  145 | 
  146 |         page.waitForEvent('dialog').then(async dialog => {
  147 |             if (dialog.message().includes('Login realizado com sucesso!')) {
  148 |                 console.log("dialog message 'Login realizado com sucesso!' aceite")
  149 |                 await dialog.accept();
  150 |             }
  151 |             else {
  152 |                 throw new Error('Dialog message 1 não aparece ou não contém o texto esperado.');
  153 |             }
  154 |         });
  155 | 
  156 |         await page.waitForTimeout(3000);
  157 | 
```