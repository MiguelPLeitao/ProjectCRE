# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: FRONTEND_test_suite1_Registro_e_Login.spec.js >> Registo e Login >> Fluxo Completo de Registro (Aluno) (Sucesso)
- Location: tests\FRONTEND_test_suite1_Registro_e_Login.spec.js:10:9

# Error details

```
Error: expect(page).toHaveURL(expected) failed

Expected: "http://localhost:3000/registro.html"
Received: "http://localhost:3000/login.html"
Timeout:  5000ms

Call log:
  - Expect "toHaveURL" with timeout 5000ms
    - waiting for navigation to finish...
    - navigated to "http://localhost:3000/login.html"
    14 × unexpected value "http://localhost:3000/login.html"

```

```yaml
- heading "📚 Login" [level=1]
- text: "Email:"
- textbox "Email:"
- text: "Senha:"
- textbox "Senha:"
- button "Entrar"
- text: Não tem uma conta?
- link "Registre-se":
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
  19  |         // Trigger registration and await the resulting dialog deterministically
  20  |         const firstDialogPromise = page.waitForEvent('dialog');
  21  |         await register_page.FillName_Email_Password_InputFields("Carlos Oliveira", "carlos@teste.com", "senha123");
  22  |         await register_page.ClickRegister_Button();
  23  |         const firstDialog = await firstDialogPromise;
  24  |         const firstMsg = firstDialog.message();
  25  |         if (firstMsg.includes('Email já cadastrado')) {
  26  |             console.log("dialog message 'Email já cadastrado' aceite")
  27  |             await firstDialog.accept();
  28  |         }
  29  |         else if (firstMsg.includes('Cadastro realizado com sucesso! Faça login.')) {
  30  |             console.log("dialog message 'Cadastro realizado com sucesso! Faça login.' aceite")
  31  |             await firstDialog.accept();
  32  |         }
  33  |         else {
  34  |             throw new Error('Dialog message 1 não aparece ou não contém o texto esperado.');
  35  |         }
  36  | 
  37  |         // Ensure any navigation triggered by the dialog acceptance completes
  38  |         await page.waitForLoadState('networkidle');
  39  | 
  40  | 
  41  |         if (page.url().includes('http://localhost:3000/login.html')) {
  42  |             await expect(page).toHaveURL('http://localhost:3000/login.html');
  43  |         }
  44  | 
  45  |         else {
> 46  |             await expect(page).toHaveURL('http://localhost:3000/registro.html');
      |                                ^ Error: expect(page).toHaveURL(expected) failed
  47  | 
  48  |             // Try creating a random user and await the dialog from this second attempt
  49  |             const secondDialogPromise = page.waitForEvent('dialog');
  50  |             await register_page.FillName_Email_Password_InputFields();
  51  |             await register_page.ClickRegister_Button();
  52  |             const secondDialog = await secondDialogPromise;
  53  |             const secondMsg = secondDialog.message();
  54  |             if (secondMsg.includes('Cadastro realizado com sucesso! Faça login.')) {
  55  |                 console.log("dialog message 'Cadastro realizado com sucesso! Faça login.' aceite")
  56  |                 await secondDialog.accept();
  57  |             } else {
  58  |                 throw new Error('Dialog message 2 não aparece ou não contém o texto esperado.');
  59  |             }
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
```