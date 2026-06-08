# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: FRONTEND_test_suite1_Registro_e_Login.spec.js >> Registo e Login >> Fluxo Completo de Registro (Aluno) (Sucesso)
- Location: tests\FRONTEND_test_suite1_Registro_e_Login.spec.js:8:9

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: undefined
Received: {"_apiName": "Locator", "_frame": {"_guid": "frame@f416763c33a116f1cef4cb5d3b0f2857", "_type": "Frame"}, "_selector": "internal:role=textbox[name=\"Nome:\"i]", Symbol(nodejs.util.inspect.custom): [Function anonymous]}
```

# Page snapshot

```yaml
- generic [ref=e2]:
  - heading "📚 Criar Conta" [level=1] [ref=e3]
  - generic [ref=e4]:
    - generic [ref=e5]:
      - generic [ref=e6]: "Nome:"
      - textbox "Nome:" [ref=e7]: Monica Rath
    - generic [ref=e8]:
      - generic [ref=e9]: "Email:"
      - textbox "Email:" [ref=e10]: Reilly25@hotmail.com
    - generic [ref=e11]:
      - generic [ref=e12]: "Senha:"
      - textbox "Senha:" [ref=e13]
    - generic [ref=e14]:
      - generic [ref=e15]: "Confirmar Senha:"
      - textbox "Confirmar Senha:" [ref=e16]
    - button "Registrar" [ref=e17] [cursor=pointer]
    - paragraph [ref=e18]:
      - text: Já tem conta?
      - link "Entrar" [ref=e19] [cursor=pointer]:
        - /url: login.html
```

# Test source

```ts
  1  | // @ts-check
  2  | import { test, expect } from '@playwright/test';
  3  | import Register_page from '../Page_Objects_Model_POM_FRONTEND/Register_Page';
  4  | import Login_Page from '../Page_Objects_Model_POM_FRONTEND/Login_Page';
  5  | 
  6  | 
  7  | test.describe('Registo e Login', () => {
  8  |     test('Fluxo Completo de Registro (Aluno) (Sucesso)', async ({ page }) => {
  9  |         const register_page = new Register_page(page);
  10 |         const login_page = new Login_Page(page);
  11 | 
  12 |         await page.goto('http://localhost:3000/registro.html');
  13 | 
  14 |         await expect(page).toHaveURL('http://localhost:3000/registro.html');
  15 | 
  16 |         page.waitForEvent('dialog').then(async dialog => {
  17 |             if (dialog.message().includes('Email já cadastrado')) {
  18 |                 console.log("dialog message 'Email já cadastrado' aceite")
  19 |                 await dialog.accept();
  20 |             }
  21 |             else if (dialog.message().includes('Cadastro realizado com sucesso! Faça login.')) {
  22 |                 console.log("dialog message 'Cadastro realizado com sucesso! Faça login.' aceite")
  23 |                 await dialog.accept();
  24 |             }
  25 |             else {
  26 |                 throw new Error('Dialog message 1 não aparece ou não contém o texto esperado.');
  27 |             }
  28 |         });
  29 |         await page.waitForTimeout(3000);
  30 | 
  31 |         await register_page.FillName_Email_Password_InputFields("Carlos Oliveira", "carlos@teste.com", "senha123");
  32 | 
  33 |         await register_page.ClickRegister_Button();
  34 | 
  35 |         await page.waitForLoadState('load', { timeout: 3000 });
  36 | 
  37 |         if (page.url().includes('http://localhost:3000/login.html')) {
  38 |             await expect(page).toHaveURL('http://localhost:3000/login.html');
  39 |         }
  40 | 
  41 |         else {
  42 |             await expect(page).toHaveURL('http://localhost:3000/registro.html');
  43 | 
  44 |             page.waitForEvent('dialog').then(async dialog => {
  45 |                 if (dialog.message().includes('Cadastro realizado com sucesso! Faça login.')) {
  46 |                     console.log("dialog message 'Cadastro realizado com sucesso! Faça login.' aceite")
  47 |                     await dialog.accept();
  48 |                 }
  49 |                 else {
  50 |                     throw new Error('Dialog message 2 não aparece ou não contém o texto esperado.');
  51 |                 }
  52 |             });
  53 | 
  54 |             await page.waitForTimeout(3000);
  55 | 
  56 |             await register_page.FillName_Email_Password_InputFields();
  57 |             await register_page.ClickRegister_Button();
  58 | 
  59 |             await page.waitForLoadState('load', { timeout: 3000 });
  60 |             console.log("O usuário Carlos Oliveira já existia, foi criado um usuário aleatório!")
  61 | 
  62 |             await expect(page).toHaveURL('http://localhost:3000/login.html');
  63 |             await expect(login_page.EMAIL_InputField).toBeVisible();
  64 |             await expect(login_page.PASSWORD_InputField).toBeVisible();
  65 | 
  66 |             await page.goBack();
  67 |             await expect(page).toHaveURL('http://localhost:3000/registro.html');
  68 |             await expect(register_page.NAME_InputField).toBeVisible();
  69 |             await expect(register_page.EMAIL_InputField).toBeVisible();
  70 |             await expect(register_page.PASSWORD_InputField).toBeVisible();
  71 |             await expect(register_page.CONFIRM_PASSWORD_InputField).toBeVisible();
> 72 |             await expect(register_page.NAME_InputField).toBe(undefined);
     |                                                         ^ Error: expect(received).toBe(expected) // Object.is equality
  73 |             await expect(register_page.EMAIL_InputField).toBe(undefined);
  74 |             await expect(register_page.PASSWORD_InputField).toBe(undefined);
  75 |             await expect(register_page.CONFIRM_PASSWORD_InputField).toBe(undefined);
  76 |         }
  77 |     });
  78 | })
```