# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\API_test_suite.spec.js >> Autenticação e Perfis >> Registo com Dados Inválidos (Falha) >> rejeita uma senha numérica
- Location: tests\API_test_suite.spec.js:181:9

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: "string"
Received: "undefined"
```

# Test source

```ts
  93  |       const responsePOSTmail_Invalid1 = await page.request.post('http://localhost:3000/registro', {
  94  |         data: {
  95  |           nome: faker.person.fullName(),
  96  |           email: faker.internet.email(),
  97  |           senha: ''
  98  |         }
  99  |       });
  100 | 
  101 |       //expect(responsePOSTmail_Invalid1.status()).toBe(400);
  102 |       const bodyPOSTmail_Invalid1 = await responsePOSTmail_Invalid1.json();
  103 |       expect(bodyPOSTmail_Invalid1.senha).not.toBe(undefined);
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
  116 |       //expect(responsePOSTmail_Invalid2.status()).toBe(400);
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
  131 |       //expect(responsePOSTmail_Invalid3.status()).toBe(400);
  132 |       const bodyPOSTmail_Invalid3 = await responsePOSTmail_Invalid3.json();
  133 |       expect(bodyPOSTmail_Invalid3.nome).not.toBe(undefined);
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
  146 |       //expect(responsePOSTmail_Invalid4.status()).toBe(400);
  147 |       const bodyPOSTmail_Invalid4 = await responsePOSTmail_Invalid4.json();
  148 |       expect(bodyPOSTmail_Invalid4.email).not.toBe(undefined);
  149 |     });
  150 | 
  151 |     test('rejeita um nome numérico', async ({ page }) => {
  152 |       // Verifica se o sistema rejeita um nome numérico.
  153 |       const responsePOSTmail_Invalid5 = await page.request.post('http://localhost:3000/registro', {
  154 |         data: {
  155 |           nome: faker.number.int({ min: 1, max: 1000 }),
  156 |           email: faker.internet.email(),
  157 |           senha: faker.internet.password()
  158 |         }
  159 |       });
  160 | 
  161 |       //expect(responsePOSTmail_Invalid5.status()).toBe(400);
  162 |       const bodyPOSTmail_Invalid5 = await responsePOSTmail_Invalid5.json();
  163 |       expect(typeof bodyPOSTmail_Invalid5.nome).toBe('string');
  164 |     });
  165 | 
  166 |     test('rejeita um email numérico', async ({ page }) => {
  167 |       // Verifica se o sistema rejeita um email numérico.
  168 |       const responsePOSTmail_Invalid6 = await page.request.post('http://localhost:3000/registro', {
  169 |         data: {
  170 |           nome: faker.person.fullName(),
  171 |           email: faker.number.int({ min: 1, max: 1000 }),
  172 |           senha: faker.internet.password()
  173 |         }
  174 |       });
  175 | 
  176 |       //expect(responsePOSTmail_Invalid6.status()).toBe(400);
  177 |       const bodyPOSTmail_Invalid6 = await responsePOSTmail_Invalid6.json();
  178 |       expect(typeof bodyPOSTmail_Invalid6.email).toBe('string');
  179 |     });
  180 | 
  181 |     test('rejeita uma senha numérica', async ({ page }) => {
  182 |       // Verifica se o sistema rejeita uma senha numérica.
  183 |       const responsePOSTmail_Invalid7 = await page.request.post('http://localhost:3000/registro', {
  184 |         data: {
  185 |           nome: faker.person.fullName(),
  186 |           email: faker.internet.email(),
  187 |           senha: faker.number.int({ min: 1, max: 1000 })
  188 |         }
  189 |       });
  190 | 
  191 |       //expect(responsePOSTmail_Invalid7.status()).toBe(400);
  192 |       const bodyPOSTmail_Invalid7 = await responsePOSTmail_Invalid7.json();
> 193 |       expect(typeof bodyPOSTmail_Invalid7.senha).toBe('string');
      |                                                  ^ Error: expect(received).toBe(expected) // Object.is equality
  194 |     });
  195 |   });
  196 | });
```