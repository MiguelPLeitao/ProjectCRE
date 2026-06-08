# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: FRONTEND_test_suite1_Registro_e_Login.spec.js >> Registo e Login >> Validação de Senhas Não Correspondentes (Falha)
- Location: tests\FRONTEND_test_suite1_Registro_e_Login.spec.js:94:9

# Error details

```
TypeError: register_page.CONFIRM_PASSWORD_InputField.value is not a function
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
  - heading "📚 Criar Conta" [level=1] [ref=e3]
  - generic [ref=e4]:
    - generic [ref=e5]:
      - generic [ref=e6]: "Nome:"
      - textbox "Nome:" [ref=e7]: Kali Prohaska DDS
    - generic [ref=e8]:
      - generic [ref=e9]: "Email:"
      - textbox "Email:" [ref=e10]: Geraldine_Tremblay@gmail.com
    - generic [ref=e11]:
      - generic [ref=e12]: "Senha:"
      - textbox "Senha:" [ref=e13]: FLnskui
    - generic [ref=e14]:
      - generic [ref=e15]: "Confirmar Senha:"
      - textbox "Confirmar Senha:" [active] [ref=e16]: ZL312I6slwQN
    - button "Registrar" [ref=e17] [cursor=pointer]
    - paragraph [ref=e18]:
      - text: Já tem conta?
      - link "Entrar" [ref=e19] [cursor=pointer]:
        - /url: login.html
```

# Test source

```ts
  2   | import { test, expect } from '@playwright/test';
  3   | import { faker } from '@faker-js/faker';
  4   | import Register_page from '../Page_Objects_Model_POM_FRONTEND/Register_Page';
  5   | import Login_Page from '../Page_Objects_Model_POM_FRONTEND/Login_Page';
  6   | 
  7   | 
  8   | test.describe('Registo e Login', () => {
  9   |     test('Fluxo Completo de Registro (Aluno) (Sucesso)', async ({ page }) => {
  10  |         const register_page = new Register_page(page);
  11  |         const login_page = new Login_Page(page);
  12  | 
  13  |         await page.goto('http://localhost:3000/registro.html');
  14  | 
  15  |         await expect(page).toHaveURL('http://localhost:3000/registro.html');
  16  | 
  17  |         page.waitForEvent('dialog').then(async dialog => {
  18  |             if (dialog.message().includes('Email já cadastrado')) {
  19  |                 console.log("dialog message 'Email já cadastrado' aceite")
  20  |                 await dialog.accept();
  21  |             }
  22  |             else if (dialog.message().includes('Cadastro realizado com sucesso! Faça login.')) {
  23  |                 console.log("dialog message 'Cadastro realizado com sucesso! Faça login.' aceite")
  24  |                 await dialog.accept();
  25  |             }
  26  |             else {
  27  |                 throw new Error('Dialog message 1 não aparece ou não contém o texto esperado.');
  28  |             }
  29  |         });
  30  |         await page.waitForTimeout(3000);
  31  | 
  32  |         await register_page.FillName_Email_Password_InputFields("Carlos Oliveira", "carlos@teste.com", "senha123");
  33  | 
  34  |         await register_page.ClickRegister_Button();
  35  | 
  36  |         await page.waitForLoadState('load', { timeout: 3000 });
  37  | 
  38  |         if (page.url().includes('http://localhost:3000/login.html')) {
  39  |             await expect(page).toHaveURL('http://localhost:3000/login.html');
  40  |         }
  41  | 
  42  |         else {
  43  |             await expect(page).toHaveURL('http://localhost:3000/registro.html');
  44  | 
  45  |             page.waitForEvent('dialog').then(async dialog => {
  46  |                 if (dialog.message().includes('Cadastro realizado com sucesso! Faça login.')) {
  47  |                     console.log("dialog message 'Cadastro realizado com sucesso! Faça login.' aceite")
  48  |                     await dialog.accept();
  49  |                 }
  50  |                 else {
  51  |                     throw new Error('Dialog message 2 não aparece ou não contém o texto esperado.');
  52  |                 }
  53  |             });
  54  | 
  55  |             await page.waitForTimeout(3000);
  56  | 
  57  |             await register_page.FillName_Email_Password_InputFields();
  58  |             await register_page.ClickRegister_Button();
  59  | 
  60  |             await page.waitForLoadState('load', { timeout: 3000 });
  61  |             console.log("O usuário Carlos Oliveira já existia, foi criado um usuário aleatório!")
  62  | 
  63  |             await expect(page).toHaveURL('http://localhost:3000/login.html');
  64  |             await expect(login_page.EMAIL_InputField).toBeVisible();
  65  |             await expect(login_page.PASSWORD_InputField).toBeVisible();
  66  | 
  67  |             /*
  68  |             await page.goBack();
  69  |             await expect(page).toHaveURL('http://localhost:3000/registro.html');
  70  |             await expect(register_page.NAME_InputField).toBeVisible();
  71  |             await expect(register_page.EMAIL_InputField).toBeVisible();
  72  |             await expect(register_page.PASSWORD_InputField).toBeVisible();
  73  |             await expect(register_page.CONFIRM_PASSWORD_InputField).toBeVisible();
  74  |             await expect(register_page.NAME_InputField).toHaveValue("");
  75  |             await expect(register_page.EMAIL_InputField).toHaveValue("");
  76  |             await expect(register_page.PASSWORD_InputField).toHaveValue("");
  77  |             await expect(register_page.CONFIRM_PASSWORD_InputField).toHaveValue("");
  78  |             */
  79  | 
  80  |             await page.goto('http://localhost:3000/registro.html');
  81  |             await expect(page).toHaveURL('http://localhost:3000/registro.html');
  82  |             await expect(register_page.NAME_InputField).toBeVisible();
  83  |             await expect(register_page.EMAIL_InputField).toBeVisible();
  84  |             await expect(register_page.PASSWORD_InputField).toBeVisible();
  85  |             await expect(register_page.CONFIRM_PASSWORD_InputField).toBeVisible();
  86  |             await expect(register_page.NAME_InputField).toHaveValue("");
  87  |             await expect(register_page.EMAIL_InputField).toHaveValue("");
  88  |             await expect(register_page.PASSWORD_InputField).toHaveValue("");
  89  |             await expect(register_page.CONFIRM_PASSWORD_InputField).toHaveValue("");
  90  |         }
  91  |     });
  92  | 
  93  | 
  94  |     test('Validação de Senhas Não Correspondentes (Falha)', async ({ page }) => {
  95  |         const register_page = new Register_page(page);
  96  |         const login_page = new Login_Page(page);
  97  | 
  98  |         await page.goto('http://localhost:3000/registro.html');
  99  | 
  100 |         await expect(page).toHaveURL('http://localhost:3000/registro.html');
  101 | 
> 102 |         page.waitForEvent('dialog').then(async dialog => {
      |              ^ Error: page.waitForEvent: Test ended.
  103 |             if (dialog.message().includes('As senhas não conferem.')) {
  104 |                 console.log("dialog message 'As senhas não conferem.' aceite")
  105 |                 await dialog.accept();
  106 |             }
  107 |             else {
  108 |                 throw new Error('Dialog message 1 não aparece ou não contém o texto esperado.');
  109 |             }
  110 |         });
  111 | 
  112 |         await page.waitForTimeout(3000);
  113 | 
  114 |         await register_page.FillName_InputField(faker.person.fullName());
  115 | 
  116 |         await register_page.FillEmail_InputField(faker.internet.email());
  117 | 
  118 |         await register_page.FillPasssword_InputField(faker.internet.password({ length: faker.number.int({ min: 6, max: 20 }) }));
  119 | 
  120 |         await register_page.FillConfirmPassword_InputField(faker.internet.password({ length: faker.number.int({ min: 6, max: 20 }) }));
  121 |         console.log(register_page.CONFIRM_PASSWORD_InputField.value());
  122 |         await register_page.ClickRegister_Button();
  123 | 
  124 |         await expect(page).toHaveURL('http://localhost:3000/registro.html');
  125 |     })
  126 | })
```