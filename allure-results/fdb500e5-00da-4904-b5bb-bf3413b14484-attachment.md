# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: API_test_suite7_Admin_Usuarios.spec.js >> Admin Usuários >> Atualizar Usuário (Sucesso)
- Location: tests\API_test_suite7_Admin_Usuarios.spec.js:26:9

# Error details

```
Error: Tipo de usuário inválido ou não pode ser alterado
```

# Test source

```ts
  1  | // @ts-check
  2  | import { test, expect } from '@playwright/test';
  3  | import { faker } from '@faker-js/faker';
  4  | 
  5  | test.describe('Admin Usuários', () => {
  6  |     test('Listar Usuários (Sucesso)', async ({ page }) => {
  7  |         let responseGETall_users = await page.request.get('/usuarios');
  8  | 
  9  |         expect(responseGETall_users.status()).toBe(200);
  10 | 
  11 |         let bodyGETall_users = await responseGETall_users.json();
  12 | 
  13 |         expect(Array.isArray(bodyGETall_users)).toBe(true);
  14 |         expect(bodyGETall_users.length).toBeGreaterThan(0);
  15 | 
  16 |         for (const user of bodyGETall_users) {
  17 |             expect(user).toHaveProperty('id');
  18 |             expect(user).toHaveProperty('nome');
  19 |             expect(user).toHaveProperty('email');
  20 |             expect(user).toHaveProperty('tipo');
  21 |             expect(user).not.toHaveProperty('senha');
  22 |         }
  23 |     });
  24 | 
  25 | 
  26 |     test('Atualizar Usuário (Sucesso)', async ({ page }) => {
  27 |         let response2GETall_users = await page.request.get('/usuarios');
  28 | 
  29 |         expect(response2GETall_users.status()).toBe(200);
  30 | 
  31 |         let body2GETall_users = await response2GETall_users.json();
  32 | 
  33 |         expect(Array.isArray(body2GETall_users)).toBe(true);
  34 |         expect(body2GETall_users.length).toBeGreaterThan(0);
  35 | 
  36 |         let randomUser = faker.helpers.arrayElement(body2GETall_users.filter(user => user.tipo > 1)).id;
  37 | 
  38 |         let User2arrayPosition;
  39 |         for (const user2 of body2GETall_users) {
  40 |             if (user2.id === randomUser) {
  41 |                 expect(user2).toHaveProperty('id');
  42 |                 expect(user2).toHaveProperty('nome');
  43 |                 expect(user2).toHaveProperty('email');
  44 |                 expect(user2).toHaveProperty('tipo');
  45 |                 expect(user2).not.toHaveProperty('senha');
  46 |                 User2arrayPosition = body2GETall_users.indexOf(user2);
  47 |                 break;
  48 |             }
  49 |         }
  50 | 
  51 |         let newType;
  52 |         if (User2arrayPosition.tipo === 2) {
  53 |             newType = 3;
  54 |         }
  55 |         else if (User2arrayPosition.tipo === 3) {
  56 |             newType = 2;
  57 |         }
  58 |         else {
  59 |             console.log("Tipo de usuário: " + User2arrayPosition.tipo);
> 60 |             throw new Error("Tipo de usuário inválido ou não pode ser alterado");
     |                   ^ Error: Tipo de usuário inválido ou não pode ser alterado
  61 |         }
  62 | 
  63 |         let response2PUTuser = await page.request.put(`/usuarios/${randomUser}`,
  64 |             {
  65 |                 data: {
  66 |                     nome: User2arrayPosition.nome + " - Atualizado",
  67 |                     email: "atualizado" + User2arrayPosition.email,
  68 |                     tipo: newType
  69 |                 }
  70 |             }
  71 |         );
  72 | 
  73 |         expect(response2PUTuser.status()).toBe(200);
  74 | 
  75 |         let body2PUTuser = await response2PUTuser.json();
  76 | 
  77 |         expect(body2PUTuser).toHaveProperty('id');
  78 |         expect(body2PUTuser.id).toBe(randomUser);
  79 |         expect(body2PUTuser).toHaveProperty('nome');
  80 |         expect(body2PUTuser.nome).toBe(User2arrayPosition.nome + " - Atualizado");
  81 |         expect(body2PUTuser).toHaveProperty('email');
  82 |         expect(body2PUTuser.email).toBe("atualizado" + User2arrayPosition.email);
  83 |         expect(body2PUTuser).toHaveProperty('tipo');
  84 |         expect(body2PUTuser.tipo).toBe(newType);
  85 |         expect(body2PUTuser).not.toHaveProperty('senha');
  86 |     });
  87 | })
```