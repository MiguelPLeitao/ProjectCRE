# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: API_test_suite.spec.js >> Autenticação e Perfis >> Registo com Dados Inválidos (Falha) >> rejeita uma senha vazia
- Location: tests\API_test_suite.spec.js:91:9

# Error details

```
Error: expect(received).not.toBe(expected) // Object.is equality

Expected: not undefined
```

# Test source

```ts
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
  101 |       //expect(responsePOSTmail_Invalid1.status()).toBe(400);
  102 |       const bodyPOSTmail_Invalid1 = await responsePOSTmail_Invalid1.json();
  103 |       console.log(bodyPOSTmail_Invalid1);
> 104 |       expect(bodyPOSTmail_Invalid1.senha).not.toBe(undefined);
      |                                               ^ Error: expect(received).not.toBe(expected) // Object.is equality
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
  119 |       expect(bodyPOSTmail_Invalid2.email).toContain("@");
  120 |     });
  121 | 
  122 |     test('rejeita um nome vazio', async ({ page }) => {
  123 |       // Verifica se o sistema rejeita um nome vazio.
  124 |       const responsePOSTmail_Invalid3 = await page.request.post('/registro', {
  125 |         data: {
  126 |           nome: '',
  127 |           email: faker.internet.email(),
  128 |           senha: 'senha789'
  129 |         }
  130 |       });
  131 | 
  132 |       expect(responsePOSTmail_Invalid3.status()).toBe(400);
  133 |       const bodyPOSTmail_Invalid3 = await responsePOSTmail_Invalid3.json();
  134 |       expect(bodyPOSTmail_Invalid3.nome).not.toBe(undefined);
  135 |     });
  136 | 
  137 |     test('rejeita um email vazio', async ({ page }) => {
  138 |       // Verifica se o sistema rejeita um email vazio.
  139 |       const responsePOSTmail_Invalid4 = await page.request.post('/registro', {
  140 |         data: {
  141 |           nome: faker.person.fullName(),
  142 |           email: '',
  143 |           senha: faker.internet.password()
  144 |         }
  145 |       });
  146 | 
  147 |       expect(responsePOSTmail_Invalid4.status()).toBe(400);
  148 |       const bodyPOSTmail_Invalid4 = await responsePOSTmail_Invalid4.json();
  149 |       expect(bodyPOSTmail_Invalid4.email).not.toBe(undefined);
  150 |     });
  151 | 
  152 |     test('rejeita um nome numérico', async ({ page }) => {
  153 |       // Verifica se o sistema rejeita um nome numérico.
  154 |       const responsePOSTmail_Invalid5 = await page.request.post('/registro', {
  155 |         data: {
  156 |           nome: faker.number.int({ min: 1, max: 1000 }),
  157 |           email: faker.internet.email(),
  158 |           senha: faker.internet.password()
  159 |         }
  160 |       });
  161 | 
  162 |       expect(responsePOSTmail_Invalid5.status()).toBe(400);
  163 |       const bodyPOSTmail_Invalid5 = await responsePOSTmail_Invalid5.json();
  164 |       expect(typeof bodyPOSTmail_Invalid5.nome).toBe('string');
  165 |     });
  166 | 
  167 |     test('rejeita um email numérico', async ({ page }) => {
  168 |       // Verifica se o sistema rejeita um email numérico.
  169 |       const responsePOSTmail_Invalid6 = await page.request.post('/registro', {
  170 |         data: {
  171 |           nome: faker.person.fullName(),
  172 |           email: faker.number.int({ min: 1, max: 1000 }),
  173 |           senha: faker.internet.password()
  174 |         }
  175 |       });
  176 | 
  177 |       expect(responsePOSTmail_Invalid6.status()).toBe(400);
  178 |       const bodyPOSTmail_Invalid6 = await responsePOSTmail_Invalid6.json();
  179 |       expect(typeof bodyPOSTmail_Invalid6.email).toBe('string');
  180 |     });
  181 | 
  182 |     test('rejeita uma senha numérica', async ({ page }) => {
  183 |       // Verifica se o sistema rejeita uma senha numérica.
  184 |       const responsePOSTmail_Invalid7 = await page.request.post('/registro', {
  185 |         data: {
  186 |           nome: faker.person.fullName(),
  187 |           email: faker.internet.email(),
  188 |           senha: faker.number.int({ min: 1, max: 1000 })
  189 |         }
  190 |       });
  191 | 
  192 |       expect(responsePOSTmail_Invalid7.status()).toBe(400);
  193 |       const bodyPOSTmail_Invalid7 = await responsePOSTmail_Invalid7.json();
  194 |       expect(typeof bodyPOSTmail_Invalid7.senha).toBe('string');
  195 |     });
  196 | 
  197 |     test('rejeita valores nulos', async ({ page }) => {
  198 |       // Verifica se o sistema rejeita valores nulos.
  199 |       const responsePOSTmail_Invalid8 = await page.request.post('/registro', {
  200 |         data: {
  201 |           nome: null,
  202 |           email: null,
  203 |           senha: null
  204 |         }
```