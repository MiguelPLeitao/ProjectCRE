# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: API_test_suite.spec.js >> Autenticação e Perfis >> Registo com Dados Inválidos (Falha) >> rejeita uma senha vazia
- Location: tests\API_test_suite.spec.js:91:9

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
  13  |     let responsePOSTmail_Maria_Silva = await page.request.post('/registro',
  14  |       {
  15  |         data: {
  16  |           "nome": "Maria Silva",
  17  |           "email": "maria.silva@teste.com",
  18  |           "senha": "senha123"
  19  |         }
  20  |       });
  21  | 
  22  |     if (responsePOSTmail_Maria_Silva.status() === 400) {
  23  |       let responsePOSTmail_new_valid_user1 = await page.request.post('/registro',
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
  72  |   test('Registo com Email Duplicado (Falha)', async ({ page }) => {
  73  |     let responsePOSTmail_Admin = await page.request.post('/registro',
  74  |       {
  75  |         data: {
  76  |           "nome": "João Santos",
  77  |           "email": "admin@biblioteca.com",
  78  |           "senha": "senha456"
  79  |         }
  80  |       });
  81  | 
  82  |     expect(responsePOSTmail_Admin.status()).toBe(400);
  83  | 
  84  |     let bodyPOSTmail_Admin = await responsePOSTmail_Admin.json();
  85  | 
  86  |     expect(bodyPOSTmail_Admin.mensagem).toBe('Email já cadastrado');
  87  |   });
  88  | 
  89  | 
  90  |   test.describe('Registo com Dados Inválidos (Falha)', () => {
  91  |     test('rejeita uma senha vazia', async ({ page }) => {
  92  |       // Verifica se o sistema rejeita uma senha vazia.
  93  |       const responsePOSTmail_Invalid1 = await page.request.post('/registro', {
  94  |         data: {
  95  |           nome: faker.person.fullName(),
  96  |           email: faker.internet.email(),
  97  |           senha: ''
  98  |         }
  99  |       });
  100 | 
> 101 |       expect(responsePOSTmail_Invalid1.status()).toBe(400);
      |                                                  ^ Error: expect(received).toBe(expected) // Object.is equality
  102 |       const bodyPOSTmail_Invalid1 = await responsePOSTmail_Invalid1.json();
  103 |       expect(bodyPOSTmail_Invalid1.mensagem).toBe("Nome, email válido e senha são obrigatórios");
  104 |       expect(bodyPOSTmail_Invalid1).not.toHaveProperty('usuario');
  105 |     });
  106 | 
  107 |     test('rejeita um email com formato inválido', async ({ page }) => {
  108 |       // Verifica se o sistema rejeita um email com formato inválido.
  109 |       const responsePOSTmail_Invalid2 = await page.request.post('/registro', {
  110 |         data: {
  111 |           nome: faker.person.fullName(),
  112 |           email: faker.person.fullName(), // Email sem @
  113 |           senha: faker.internet.password()
  114 |         }
  115 |       });
  116 | 
  117 |       expect(responsePOSTmail_Invalid2.status()).toBe(400);
  118 |       const bodyPOSTmail_Invalid2 = await responsePOSTmail_Invalid2.json();
  119 |       expect(bodyPOSTmail_Invalid2.mensagem).toBe("Nome, email válido e senha são obrigatórios");
  120 |       expect(bodyPOSTmail_Invalid2).not.toHaveProperty('usuario');
  121 |     });
  122 | 
  123 |     test('rejeita um nome vazio', async ({ page }) => {
  124 |       // Verifica se o sistema rejeita um nome vazio.
  125 |       const responsePOSTmail_Invalid3 = await page.request.post('/registro', {
  126 |         data: {
  127 |           nome: '',
  128 |           email: faker.internet.email(),
  129 |           senha: 'senha789'
  130 |         }
  131 |       });
  132 | 
  133 |       expect(responsePOSTmail_Invalid3.status()).toBe(400);
  134 |       const bodyPOSTmail_Invalid3 = await responsePOSTmail_Invalid3.json();
  135 |       expect(bodyPOSTmail_Invalid3.mensagem).toBe("Nome, email válido e senha são obrigatórios");
  136 |       expect(bodyPOSTmail_Invalid3).not.toHaveProperty('usuario');
  137 |     });
  138 | 
  139 |     test('rejeita um email vazio', async ({ page }) => {
  140 |       // Verifica se o sistema rejeita um email vazio.
  141 |       const responsePOSTmail_Invalid4 = await page.request.post('/registro', {
  142 |         data: {
  143 |           nome: faker.person.fullName(),
  144 |           email: '',
  145 |           senha: faker.internet.password()
  146 |         }
  147 |       });
  148 | 
  149 |       expect(responsePOSTmail_Invalid4.status()).toBe(400);
  150 |       const bodyPOSTmail_Invalid4 = await responsePOSTmail_Invalid4.json();
  151 |       expect(bodyPOSTmail_Invalid4.mensagem).toBe("Nome, email válido e senha são obrigatórios");
  152 |       expect(bodyPOSTmail_Invalid4).not.toHaveProperty('usuario');
  153 |     });
  154 | 
  155 |     test('rejeita um nome numérico', async ({ page }) => {
  156 |       // Verifica se o sistema rejeita um nome numérico.
  157 |       const responsePOSTmail_Invalid5 = await page.request.post('/registro', {
  158 |         data: {
  159 |           nome: faker.number.int({ min: 1, max: 1000 }),
  160 |           email: faker.internet.email(),
  161 |           senha: faker.internet.password()
  162 |         }
  163 |       });
  164 | 
  165 |       expect(responsePOSTmail_Invalid5.status()).toBe(400);
  166 |       const bodyPOSTmail_Invalid5 = await responsePOSTmail_Invalid5.json();
  167 |       expect(bodyPOSTmail_Invalid5.mensagem).toBe("Nome, email válido e senha são obrigatórios");
  168 |       expect(bodyPOSTmail_Invalid5).not.toHaveProperty('usuario');
  169 |     });
  170 | 
  171 |     test('rejeita um email numérico', async ({ page }) => {
  172 |       // Verifica se o sistema rejeita um email numérico.
  173 |       const responsePOSTmail_Invalid6 = await page.request.post('/registro', {
  174 |         data: {
  175 |           nome: faker.person.fullName(),
  176 |           email: faker.number.int({ min: 1, max: 1000 }),
  177 |           senha: faker.internet.password()
  178 |         }
  179 |       });
  180 | 
  181 |       expect(responsePOSTmail_Invalid6.status()).toBe(400);
  182 |       const bodyPOSTmail_Invalid6 = await responsePOSTmail_Invalid6.json();
  183 |       expect(bodyPOSTmail_Invalid6.mensagem).toBe("Nome, email válido e senha são obrigatórios");
  184 |       expect(bodyPOSTmail_Invalid6).not.toHaveProperty('usuario');
  185 |     });
  186 | 
  187 |     test('rejeita uma senha numérica', async ({ page }) => {
  188 |       // Verifica se o sistema rejeita uma senha numérica.
  189 |       const responsePOSTmail_Invalid7 = await page.request.post('/registro', {
  190 |         data: {
  191 |           nome: faker.person.fullName(),
  192 |           email: faker.internet.email(),
  193 |           senha: faker.number.int({ min: 1, max: 1000 })
  194 |         }
  195 |       });
  196 | 
  197 |       expect(responsePOSTmail_Invalid7.status()).toBe(400);
  198 |       const bodyPOSTmail_Invalid7 = await responsePOSTmail_Invalid7.json();
  199 |       expect(bodyPOSTmail_Invalid7.mensagem).toBe("Nome, email válido e senha são obrigatórios");
  200 |       expect(bodyPOSTmail_Invalid7).not.toHaveProperty('usuario');
  201 |     });
```