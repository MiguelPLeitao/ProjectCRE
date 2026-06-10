# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: API_test_suite7_Admin_Usuarios.spec.js >> Admin Usuários >> Tentar Excluir Admin Principal (Falha)
- Location: tests\API_test_suite7_Admin_Usuarios.spec.js:119:9

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 403
Received: 200
```

# Test source

```ts
  33  |         expect(Array.isArray(body2GETall_users)).toBe(true);
  34  |         expect(body2GETall_users.length).toBeGreaterThan(0);
  35  | 
  36  |         let randomUser = faker.helpers.arrayElement(body2GETall_users.filter(user => user.tipo < 3)).id;
  37  | 
  38  |         let User2arrayPosition;
  39  |         for (const user2 of body2GETall_users) {
  40  |             if (user2.id === randomUser) {
  41  |                 expect(user2).toHaveProperty('id');
  42  |                 expect(user2).toHaveProperty('nome');
  43  |                 expect(user2).toHaveProperty('email');
  44  |                 expect(user2).toHaveProperty('tipo');
  45  |                 expect(user2).not.toHaveProperty('senha');
  46  |                 User2arrayPosition = body2GETall_users.indexOf(user2);
  47  |                 break;
  48  |             }
  49  |         }
  50  |         console.log(User2arrayPosition);
  51  |         console.log(body2GETall_users[User2arrayPosition].tipo);
  52  |         console.log(body2GETall_users[User2arrayPosition].nome);
  53  |         console.log(body2GETall_users[User2arrayPosition].email);
  54  | 
  55  |         let newType;
  56  |         if (body2GETall_users[User2arrayPosition].tipo === 2) {
  57  |             newType = 1;
  58  |         }
  59  |         else if (body2GETall_users[User2arrayPosition].tipo === 1) {
  60  |             newType = 2;
  61  |         }
  62  |         else {
  63  |             console.log("Tipo de usuário: " + body2GETall_users[User2arrayPosition].tipo);
  64  |             throw new Error("Tipo de usuário inválido ou não pode ser alterado");
  65  |         }
  66  | 
  67  |         let response2PUTuser = await page.request.put(`/usuarios/${randomUser}`,
  68  |             {
  69  |                 data: {
  70  |                     nome: body2GETall_users[User2arrayPosition].nome + " - Atualizado",
  71  |                     email: "atualizado" + body2GETall_users[User2arrayPosition].email,
  72  |                     tipo: newType
  73  |                 }
  74  |             }
  75  |         );
  76  | 
  77  |         expect(response2PUTuser.status()).toBe(200);
  78  | 
  79  |         let body2PUTuser = await response2PUTuser.json();
  80  | 
  81  |         expect(body2PUTuser).toHaveProperty('id');
  82  |         expect(body2PUTuser.id).toBe(randomUser);
  83  |         expect(body2PUTuser).toHaveProperty('nome');
  84  |         expect(body2PUTuser.nome).toBe(body2GETall_users[User2arrayPosition].nome + " - Atualizado");
  85  |         expect(body2PUTuser).toHaveProperty('email');
  86  |         expect(body2PUTuser.email).toBe("atualizado" + body2GETall_users[User2arrayPosition].email);
  87  |         expect(body2PUTuser).toHaveProperty('tipo');
  88  |         expect(body2PUTuser.tipo).toBe(newType);
  89  |         expect(body2PUTuser).not.toHaveProperty('senha');
  90  |     });
  91  | 
  92  | 
  93  |     test('Excluir Usuário (Não-Admin Principal) (Sucesso)', async ({ page }) => {
  94  |         let response2GETall_users = await page.request.get('/usuarios');
  95  | 
  96  |         expect(response2GETall_users.status()).toBe(200);
  97  | 
  98  |         let body2GETall_users = await response2GETall_users.json();
  99  | 
  100 |         expect(Array.isArray(body2GETall_users)).toBe(true);
  101 |         expect(body2GETall_users.length).toBeGreaterThan(0);
  102 | 
  103 |         let randomUser2 = faker.helpers.arrayElement(body2GETall_users.filter(user => user.tipo < 3)).id;
  104 | 
  105 |         let response2DELETEuser = await page.request.delete(`/usuarios/${randomUser2}`);
  106 | 
  107 |         expect(response2DELETEuser.status()).toBe(200);
  108 | 
  109 |         let body2DELETEuser = await response2DELETEuser.json();
  110 | 
  111 |         expect(body2DELETEuser.mensagem).toBe('Usuário deletado com sucesso');
  112 | 
  113 |         let response2DELETEuserAgain = await page.request.delete(`/usuarios/${randomUser2}`);
  114 | 
  115 |         expect(response2DELETEuserAgain.status()).toBe(404);
  116 |     });
  117 | 
  118 | 
  119 |     test('Tentar Excluir Admin Principal (Falha)', async ({ page }) => {
  120 |         let response3GETall_users = await page.request.get('/usuarios');
  121 | 
  122 |         expect(response3GETall_users.status()).toBe(200);
  123 | 
  124 |         let body3GETall_users = await response3GETall_users.json();
  125 | 
  126 |         expect(Array.isArray(body3GETall_users)).toBe(true);
  127 |         expect(body3GETall_users.length).toBeGreaterThan(0);
  128 | 
  129 |         let randomUser3 = faker.helpers.arrayElement(body3GETall_users.filter(user => user.tipo === 3)).id;
  130 | 
  131 |         let response3DELETEuser = await page.request.delete(`/usuarios/${randomUser3}`);
  132 | 
> 133 |         expect(response3DELETEuser.status()).toBe(403);
      |                                              ^ Error: expect(received).toBe(expected) // Object.is equality
  134 | 
  135 |         let body3DELETEuser = await response3DELETEuser.json();
  136 | 
  137 |         expect(body3DELETEuser.mensagem).toBe('Admin principal não pode ser deletado');
  138 | 
  139 |     });
  140 | })
```