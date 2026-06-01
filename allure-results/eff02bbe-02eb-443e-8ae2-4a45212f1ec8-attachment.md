# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\API_test_suite.spec.js >> Autenticação e Perfis >> Registo com Dados Inválidos (Falha) >> rejeita um email vazio
- Location: tests\API_test_suite.spec.js:136:9

# Error details

```
Error: expect(received).not.toBe(expected) // Object.is equality

Expected: not undefined
```

# Test source

```ts
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
  73  |     let responsePOSTmail_Admin = await page.request.post('http://localhost:3000/registro',
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
  93  |       const responsePOSTmail_Invalid1 = await page.request.post('http://localhost:3000/registro', {
  94  |         data: {
  95  |           nome: faker.person.fullName(),
  96  |           email: faker.internet.email(),
  97  |           senha: ''
  98  |         }
  99  |       });
  100 | 
  101 |       expect(responsePOSTmail_Invalid1.status()).toBe(400);
  102 |       const bodyPOSTmail_Invalid1 = await responsePOSTmail_Invalid1.json();
  103 |       expect(bodyPOSTmail_Invalid1.senha).not.toBe('');
  104 |     });
  105 | 
  106 |     test('rejeita um email com formato inválido', async ({ page }) => {
  107 |       // Verifica se o sistema rejeita um email com formato inválido.
  108 |       const responsePOSTmail_Invalid2 = await page.request.post('http://localhost:3000/registro', {
  109 |         data: {
  110 |           nome: faker.person.fullName(),
  111 |           email: faker.person.fullName(), // Email sem @
  112 |           senha: faker.internet.password()
  113 |         }
  114 |       });
  115 | 
  116 |       expect(responsePOSTmail_Invalid2.status()).toBe(400);
  117 |       const bodyPOSTmail_Invalid2 = await responsePOSTmail_Invalid2.json();
  118 |       expect(bodyPOSTmail_Invalid2.email).toContain("@");
  119 |     });
  120 | 
  121 |     test('rejeita um nome vazio', async ({ page }) => {
  122 |       // Verifica se o sistema rejeita um nome vazio.
  123 |       const responsePOSTmail_Invalid3 = await page.request.post('http://localhost:3000/registro', {
  124 |         data: {
  125 |           nome: '',
  126 |           email: faker.internet.email(),
  127 |           senha: 'senha789'
  128 |         }
  129 |       });
  130 | 
  131 |       expect(responsePOSTmail_Invalid3.status()).toBe(400);
  132 |       const bodyPOSTmail_Invalid3 = await responsePOSTmail_Invalid3.json();
  133 |       expect(bodyPOSTmail_Invalid3.nome).not.toBe('');
  134 |     });
  135 | 
  136 |     test('rejeita um email vazio', async ({ page }) => {
  137 |       // Verifica se o sistema rejeita um email vazio.
  138 |       const responsePOSTmail_Invalid4 = await page.request.post('http://localhost:3000/registro', {
  139 |         data: {
  140 |           nome: faker.person.fullName(),
  141 |           email: '',
  142 |           senha: faker.internet.password()
  143 |         }
  144 |       });
  145 | 
  146 |       expect(responsePOSTmail_Invalid4.status()).toBe(400);
  147 |       const bodyPOSTmail_Invalid4 = await responsePOSTmail_Invalid4.json();
> 148 |       expect(bodyPOSTmail_Invalid4.email).not.toBe(undefined);
      |                                               ^ Error: expect(received).not.toBe(expected) // Object.is equality
  149 |       console.log(bodyPOSTmail_Invalid4.email);
  150 |     });
  151 | 
  152 |     test('rejeita um nome numérico', async ({ page }) => {
  153 |       // Verifica se o sistema rejeita um nome numérico.
  154 |       const responsePOSTmail_Invalid5 = await page.request.post('http://localhost:3000/registro', {
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
  169 |       const responsePOSTmail_Invalid6 = await page.request.post('http://localhost:3000/registro', {
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
  184 |       const responsePOSTmail_Invalid7 = await page.request.post('http://localhost:3000/registro', {
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
  196 |   });
  197 | });
```