# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: FRONTEND_test_suite1_Registro_e_Login.spec.js >> Registo e Login >> Fluxo Completo de Registro (Aluno) (Sucesso)
- Location: tests\FRONTEND_test_suite1_Registro_e_Login.spec.js:8:9

# Error details

```
Error: dialog.accept: Cannot accept dialog which is already handled!
```

```
Error: locator.fill: Test ended.
Call log:
  - waiting for getByRole('textbox', { name: 'Confirmar Senha:' })

```

# Page snapshot

```yaml
- generic [ref=e2]:
  - heading "📚 Criar Conta" [level=1] [ref=e3]
  - generic [ref=e4]:
    - generic [ref=e5]:
      - generic [ref=e6]: "Nome:"
      - textbox "Nome:" [ref=e7]: Dora Cronin
    - generic [ref=e8]:
      - generic [ref=e9]: "Email:"
      - textbox "Email:" [active] [ref=e10]: Dallas21@yahoo.com
    - generic [ref=e11]:
      - generic [ref=e12]: "Senha:"
      - textbox "Senha:" [ref=e13]: senha123
    - generic [ref=e14]:
      - generic [ref=e15]: "Confirmar Senha:"
      - textbox "Confirmar Senha:" [ref=e16]: senha123
    - button "Registrar" [ref=e17] [cursor=pointer]
    - paragraph [ref=e18]:
      - text: Já tem conta?
      - link "Entrar" [ref=e19] [cursor=pointer]:
        - /url: login.html
```

# Test source

```ts
  1  | import { expect } from '@playwright/test';
  2  | import { faker } from '@faker-js/faker';
  3  | 
  4  | const RandomValidUser = {
  5  |     NAME: faker.person.fullName(),
  6  |     EMAIL: faker.internet.email(),
  7  |     PASSWORD: faker.internet.password({ length: faker.number.int({ min: 4, max: 20 }) }),
  8  | }
  9  | 
  10 | class Register_page {
  11 |     constructor(page) {
  12 |         this.page = page;
  13 |         this.TITLE_Header = page.getByRole('heading', { name: '📚 Criar Conta' });
  14 |         this.NAME_Text = page.getByText('Nome:');
  15 |         this.NAME_InputField = page.getByRole('textbox', { name: 'Nome:' });
  16 |         this.EMAIL_Text = page.getByText('Email:');
  17 |         this.EMAIL_InputField = page.getByRole('textbox', { name: 'Email:' });
  18 |         this.PASSWORD_Text = page.getByText('Senha:', { exact: true });
  19 |         this.PASSWORD_InputField = page.getByRole('textbox', { name: 'Senha:', exact: true });
  20 |         this.CONFIRM_PASSWORD_Text = page.getByText('Confirmar Senha:');
  21 |         this.CONFIRM_PASSWORD_InputField = page.getByRole('textbox', { name: 'Confirmar Senha:' });
  22 |         this.REGISTER_Button = page.getByRole('button', { name: 'Registrar' });
  23 |         this.ALREADY_HAVE_ACCOUNT_Text = page.getByText('Já tem conta? Entrar');
  24 |         this.ALREADY_HAVE_ACCOUNT_REDIRECT_LOGIN_Button = page.getByRole('link', { name: 'Entrar' });
  25 | 
  26 |         this.PAGEBODY_allpage = page.locator('body');
  27 |     }
  28 | 
  29 | 
  30 |     async FillName_Email_Password_InputFields(name, email, password) {
  31 |         const finalName = name || RandomValidUser.NAME;
  32 |         const finalEmail = email || RandomValidUser.EMAIL;
  33 |         const finalPassword = password || RandomValidUser.PASSWORD;
  34 | 
  35 |         await this.NAME_InputField.fill(finalName);
  36 |         await this.EMAIL_InputField.fill(finalEmail);
  37 |         await this.PASSWORD_InputField.fill(finalPassword);
> 38 |         await this.CONFIRM_PASSWORD_InputField.fill(finalPassword);
     |                                                ^ Error: locator.fill: Test ended.
  39 |         await console.log("Os dados foram preenchidos com sucesso!");
  40 |         await console.log("O nome é: " + finalName);
  41 |         await console.log("O email é: " + finalEmail);
  42 |         await console.log("A senha é: " + finalPassword);
  43 | 
  44 |         return { finalName, finalEmail, finalPassword };
  45 |     }
  46 | 
  47 | 
  48 |     async FillName_InputField(name) {
  49 |         await this.NAME_InputField.fill(name);
  50 |     }
  51 | 
  52 |     async FillEmail_InputField(email) {
  53 |         await this.EMAIL_InputField.fill(email);
  54 |     }
  55 | 
  56 |     async FillPassword_and_ConfirmPassword_InputFields(password) {
  57 |         await this.PASSWORD_InputField.fill(password);
  58 |         await this.CONFIRM_PASSWORD_InputField.fill(password);
  59 |     }
  60 | 
  61 |     async FillPasssword_InputField(password) {
  62 |         await this.PASSWORD_InputField.fill(password);
  63 |     }
  64 | 
  65 |     async FillConfirmPassword_InputField(password) {
  66 |         await this.CONFIRM_PASSWORD_InputField.fill(password);
  67 |     }
  68 | 
  69 | 
  70 |     async ClickRegister_Button() {
  71 |         await this.REGISTER_Button.click();
  72 |     }
  73 | 
  74 |     async ClickAlreadyHaveAccountRedirectLogin_Button() {
  75 |         await this.ALREADY_HAVE_ACCOUNT_REDIRECT_LOGIN_Button.click();
  76 |     }
  77 | }
  78 | 
  79 | export default Register_page;
```