# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: FRONTEND_test_suite1_Registro_e_Login.spec.js >> Registo e Login >> Login com Sucesso (Admin) (Sucesso)
- Location: tests\FRONTEND_test_suite1_Registro_e_Login.spec.js:138:9

# Error details

```
Error: expect(locator).toHaveText(expected) failed

Locator:  locator('[id="nomeUsuario"]')
Expected: "Admin"
Received: "Admin MasterADMIN"
Timeout:  5000ms

Call log:
  - Expect "toHaveText" with timeout 5000ms
  - waiting for locator('[id="nomeUsuario"]')
    14 × locator resolved to <span id="nomeUsuario" class="user-name">…</span>
       - unexpected value "Admin MasterADMIN"

```

```yaml
- text: Admin MasterADMIN
```

# Test source

```ts
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
  98  |         const login_page = new Login_Page(page);
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
  158 |         await login_page.FillEmail_Password_InputFields("admin@biblioteca.com", "123456");
  159 | 
  160 |         await login_page.ClickEnterLogin_Button();
  161 | 
  162 |         await expect(page).toHaveURL('http://localhost:3000/dashboard.html');
  163 | 
  164 |         await expect(dashboard_page.UserName).toBeVisible();
  165 | 
> 166 |         await expect(dashboard_page.UserName).toHaveText('Admin');
      |                                               ^ Error: expect(locator).toHaveText(expected) failed
  167 | 
  168 |     });
  169 | })
```