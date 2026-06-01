# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\API_test_suite.spec.js >> Autenticação e Perfis >> Registo com Dados Inválidos (Falha)
- Location: tests\API_test_suite.spec.js:90:7

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 400
Received: 201
```

# Test source

```ts
  1   | // @ts-check
  2   | import { test, expect } from '@playwright/test';
  3   | import { faker } from '@faker-js/faker';
  4   | 
  5   | test.describe('Autenticação e Perfis', () => {
  6   |   test('Registo de Novo Usuário Aluno (Sucesso)', async ({ page }) => {
  7   |     const ValidUser = {
  8   |       "nome": faker.person.fullName(),
  9   |       "email": faker.internet.email(),
  10  |       "senha": faker.internet.password()
  11  |     }
  12  | 
  13  |     let responsePOSTmail_Maria_Silva = await page.request.post('http://localhost:3000/registro',
  14  |       {
  15  |         data: {
  16  |           "nome": "Maria Silva",
  17  |           "email": "maria.silva@teste.com",
  18  |           "senha": "senha123"
  19  |         }
  20  |       });
  21  | 
  22  |     if (responsePOSTmail_Maria_Silva.status() === 400) {
  23  |       let responsePOSTmail_new_valid_user1 = await page.request.post('http://localhost:3000/registro',
  24  |         {
  25  |           data: ValidUser
  26  |         }
  27  |       );
  28  |       expect(responsePOSTmail_new_valid_user1.status()).toBe(201);
  29  | 
  30  |       let bodyPOSTmail_new_valid_user1 = await responsePOSTmail_new_valid_user1.json();
  31  | 
  32  |       expect(bodyPOSTmail_new_valid_user1.usuario).toHaveProperty('id');
  33  |       expect(bodyPOSTmail_new_valid_user1.usuario).toHaveProperty('nome');
  34  |       expect(bodyPOSTmail_new_valid_user1.usuario).toHaveProperty('email');
  35  |       expect(bodyPOSTmail_new_valid_user1.usuario).toHaveProperty('tipo');
  36  |       expect(bodyPOSTmail_new_valid_user1.usuario).not.toHaveProperty('senha');
  37  | 
  38  |       expect(Number.isInteger(bodyPOSTmail_new_valid_user1.usuario.id)).toBe(true);
  39  |       expect(bodyPOSTmail_new_valid_user1.usuario.id).toBeGreaterThanOrEqual(0);
  40  |       expect(typeof bodyPOSTmail_new_valid_user1.usuario.nome).toBe("string");
  41  |       expect(typeof bodyPOSTmail_new_valid_user1.usuario.email).toBe("string");
  42  |       expect(bodyPOSTmail_new_valid_user1.usuario.nome).toBe(ValidUser.nome);
  43  |       expect(bodyPOSTmail_new_valid_user1.usuario.email).toBe(ValidUser.email);
  44  |       expect(bodyPOSTmail_new_valid_user1.mensagem).toBe("Usuário criado com sucesso");
  45  |       expect(bodyPOSTmail_new_valid_user1.usuario.tipo).toBe(1);
  46  |       console.log("Usuário aleatório criado com sucesso porque Maria Silva já existia");
  47  | 
  48  |     } else {
  49  |       expect(responsePOSTmail_Maria_Silva.status() === 201);
  50  | 
  51  |       let bodyPOSTmail_Maria_Silva = await responsePOSTmail_Maria_Silva.json();
  52  | 
  53  |       expect(bodyPOSTmail_Maria_Silva.usuario).toHaveProperty('id');
  54  |       expect(bodyPOSTmail_Maria_Silva.usuario).toHaveProperty('nome');
  55  |       expect(bodyPOSTmail_Maria_Silva.usuario).toHaveProperty('email');
  56  |       expect(bodyPOSTmail_Maria_Silva.usuario).toHaveProperty('tipo');
  57  |       expect(bodyPOSTmail_Maria_Silva.usuario).not.toHaveProperty('senha');
  58  | 
  59  |       expect(Number.isInteger(bodyPOSTmail_Maria_Silva.usuario.id)).toBe(true);
  60  |       expect(bodyPOSTmail_Maria_Silva.usuario.id).toBeGreaterThanOrEqual(0);
  61  |       expect(typeof bodyPOSTmail_Maria_Silva.usuario.nome).toBe("string");
  62  |       expect(typeof bodyPOSTmail_Maria_Silva.usuario.email).toBe("string");
  63  |       expect(bodyPOSTmail_Maria_Silva.usuario.nome).toBe("Maria Silva");
  64  |       expect(bodyPOSTmail_Maria_Silva.usuario.email).toBe("maria.silva@teste.com");
  65  |       expect(bodyPOSTmail_Maria_Silva.mensagem).toBe("Usuário criado com sucesso");
  66  |       expect(bodyPOSTmail_Maria_Silva.usuario.tipo).toBe(1);
  67  |       console.log("Usuário Maria Silva criado com sucesso");
  68  |     };
  69  |   });
  70  | 
  71  | 
  72  | 
  73  |   test('Registo com Email Duplicado (Falha)', async ({ page }) => {
  74  |     let responsePOSTmail_Admin = await page.request.post('http://localhost:3000/registro',
  75  |       {
  76  |         data: {
  77  |           "nome": "João Santos",
  78  |           "email": "admin@biblioteca.com",
  79  |           "senha": "senha456"
  80  |         }
  81  |       });
  82  | 
  83  |     expect(responsePOSTmail_Admin.status()).toBe(400);
  84  | 
  85  |     let bodyPOSTmail_Admin = await responsePOSTmail_Admin.json();
  86  | 
  87  |     expect(bodyPOSTmail_Admin.mensagem).toBe('Email já cadastrado');
  88  |   });
  89  | 
  90  |   test('Registo com Dados Inválidos (Falha)', async ({ page }) => {
  91  |     // O teste abaixo é para verificar se o sistema rejeita uma senha vazia, o que é um caso de dados inválidos.
  92  |     let responsePOSTmail_Invalid1 = await page.request.post('http://localhost:3000/registro',
  93  |       {
  94  |         data: {
  95  |           "nome": faker.person.fullName(),
  96  |           "email": faker.internet.email(),
  97  |           "senha": ""
  98  |         }
  99  |       });
  100 | 
> 101 |     expect(responsePOSTmail_Invalid1.status()).toBe(400);
      |                                                ^ Error: expect(received).toBe(expected) // Object.is equality
  102 | 
  103 |     // O teste abaixo é para verificar se o sistema rejeita um email com formato inválido, o que é um caso de dados inválidos.
  104 |     let responsePOSTmail_Invalid2 = await page.request.post('http://localhost:3000/registro',
  105 |       {
  106 |         data: {
  107 |           "nome": faker.person.fullName(),
  108 |           "email": faker.person.fullName(), // Email com formato inválido, sem @
  109 |           "senha": faker.internet.password()
  110 |         }
  111 |       });
  112 | 
  113 |     expect(responsePOSTmail_Invalid2.status()).toBe(400);
  114 | 
  115 |     // O teste abaixo é para verificar se o sistema rejeita um nome vazio, o que é um caso de dados inválidos.
  116 |     let responsePOSTmail_Invalid3 = await page.request.post('http://localhost:3000/registro',
  117 |       {
  118 |         data: {
  119 |           "nome": "",
  120 |           "email": faker.internet.email(),
  121 |           "senha": "senha789"
  122 |         }
  123 |       });
  124 | 
  125 |     expect(responsePOSTmail_Invalid3.status()).toBe(400);
  126 | 
  127 |     // O teste abaixo é para verificar se o sistema rejeita um email vazio, o que é um caso de dados inválidos.
  128 |     let responsePOSTmail_Invalid4 = await page.request.post('http://localhost:3000/registro',
  129 |       {
  130 |         data: {
  131 |           "nome": faker.person.fullName(),
  132 |           "email": "", // Email vazio
  133 |           "senha": faker.internet.password()
  134 |         }
  135 |       });
  136 | 
  137 |     expect(responsePOSTmail_Invalid4.status()).toBe(400);
  138 |     let bodyPOSTmail_Invalid4 = await responsePOSTmail_Invalid4.json();
  139 |     expect(bodyPOSTmail_Invalid4.email).not.toBe('');
  140 | 
  141 |     // O teste abaixo é para verificar se o sistema rejeita um nome numérico, o que é um caso de dados inválidos.
  142 |     let responsePOSTmail_Invalid5 = await page.request.post('http://localhost:3000/registro',
  143 |       {
  144 |         data: {
  145 |           "nome": faker.number.int({ min: 1, max: 1000 }), // Nome numérico inválido
  146 |           "email": faker.internet.email(),
  147 |           "senha": faker.internet.password()
  148 |         }
  149 |       });
  150 | 
  151 |     expect(responsePOSTmail_Invalid5.status()).toBe(400);
  152 |     let bodyPOSTmail_Invalid5 = await responsePOSTmail_Invalid5.json();
  153 |     expect(typeof bodyPOSTmail_Invalid5.nome).toBe("string");
  154 | 
  155 |     // O teste abaixo é para verificar se o sistema rejeita um email numérico, o que é um caso de dados inválidos.
  156 |     let responsePOSTmail_Invalid6 = await page.request.post('http://localhost:3000/registro',
  157 |       {
  158 |         data: {
  159 |           "nome": faker.person.fullName(),
  160 |           "email": faker.number.int({ min: 1, max: 1000 }), // Email numérico inválido
  161 |           "senha": faker.internet.password()
  162 |         }
  163 |       });
  164 | 
  165 |     expect(responsePOSTmail_Invalid6.status()).toBe(400);
  166 |     let bodyPOSTmail_Invalid6 = await responsePOSTmail_Invalid6.json();
  167 |     expect(typeof bodyPOSTmail_Invalid6.email).toBe("string");
  168 | 
  169 |     // O teste abaixo é para verificar se o sistema rejeita uma senha numérica, o que é um caso de dados inválidos.
  170 |     let responsePOSTmail_Invalid7 = await page.request.post('http://localhost:3000/registro',
  171 |       {
  172 |         data: {
  173 |           "nome": faker.person.fullName(),
  174 |           "email": faker.internet.email(),
  175 |           "senha": faker.number.int({ min: 1, max: 1000 }) // Senha numérica inválida
  176 |         }
  177 |       });
  178 | 
  179 |     expect(responsePOSTmail_Invalid7.status()).toBe(400);
  180 |     let bodyPOSTmail_Invalid7 = await responsePOSTmail_Invalid7.json();
  181 |     expect(typeof bodyPOSTmail_Invalid7.senha).toBe("string");
  182 | 
  183 |   });
  184 | });
  185 | 
  186 | 
  187 | /*
  188 | test('get started link', async ({ page }) => {
  189 |   await page.goto('https://playwright.dev/');
  190 | 
  191 |   // Click the get started link.
  192 |   await page.getByRole('link', { name: 'Get started' }).click();
  193 | 
  194 |   // Expects page to have a heading with the name of Installation.
  195 |   await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
  196 | });
  197 | */
```