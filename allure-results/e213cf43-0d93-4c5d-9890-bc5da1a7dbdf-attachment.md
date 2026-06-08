# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: FRONTEND_test_suite2_Protecao_Rotas_e_Navegacao.spec.js >> Protecao de Rotas e Navegacao >> Protecao Rotas sem Login (Falha)
- Location: tests\FRONTEND_test_suite2_Protecao_Rotas_e_Navegacao.spec.js:10:9

# Error details

```
ReferenceError: localStorage is not defined
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
  1  | // @ts-check
  2  | import { test, expect } from '@playwright/test';
  3  | import { faker } from '@faker-js/faker';
  4  | import Register_page from '../Page_Objects_Model_POM_FRONTEND/Register_page';
  5  | import Login_page from '../Page_Objects_Model_POM_FRONTEND/Login_page';
  6  | import Dashboard_page from '../Page_Objects_Model_POM_FRONTEND/Dashboard_page';
  7  | 
  8  | 
  9  | test.describe('Protecao de Rotas e Navegacao', () => {
  10 |     test('Protecao Rotas sem Login (Falha)', async ({ page }) => {
  11 |         const register_page = new Register_page(page);
  12 |         const login_page = new Login_page(page);
  13 |         const dashboard_page = new Dashboard_page(page);
  14 | 
  15 |         await page.goto('http://localhost:3000/login.html');
  16 | 
  17 |         await page.evaluate(() => localStorage.clear());
  18 | 
> 19 |         expect(localStorage).toEqual({});
     |                ^ ReferenceError: localStorage is not defined
  20 | 
  21 |         await page.goto('http://localhost:3000/dashboard.html');
  22 | 
  23 |         expect(page).toHaveURL('http://localhost:3000/login.html');
  24 | 
  25 |         await expect(login_page.EMAIL_InputField).toBeVisible();
  26 |         await expect(login_page.PASSWORD_InputField).toBeVisible();
  27 | 
  28 |     });
  29 | 
  30 | })
```