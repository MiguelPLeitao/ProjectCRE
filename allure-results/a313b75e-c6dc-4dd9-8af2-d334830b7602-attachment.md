# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: API_test_suite.spec.js >> Autenticação e Perfis >> Registo com Dados Inválidos (Falha) >> rejeita valores nulos
- Location: tests\API_test_suite.spec.js:196:9

# Error details

```
Error: expect(received).not.toBe(expected) // Object.is equality

Expected: not undefined
```

# Test source

```ts
  108 |       const responsePOSTmail_Invalid2 = await page.request.post('/registro', {
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
  123 |       const responsePOSTmail_Invalid3 = await page.request.post('/registro', {
  124 |         data: {
  125 |           nome: '',
  126 |           email: faker.internet.email(),
  127 |           senha: 'senha789'
  128 |         }
  129 |       });
  130 | 
  131 |       expect(responsePOSTmail_Invalid3.status()).toBe(400);
  132 |       const bodyPOSTmail_Invalid3 = await responsePOSTmail_Invalid3.json();
  133 |       expect(bodyPOSTmail_Invalid3.nome).not.toBe(undefined);
  134 |     });
  135 | 
  136 |     test('rejeita um email vazio', async ({ page }) => {
  137 |       // Verifica se o sistema rejeita um email vazio.
  138 |       const responsePOSTmail_Invalid4 = await page.request.post('/registro', {
  139 |         data: {
  140 |           nome: faker.person.fullName(),
  141 |           email: '',
  142 |           senha: faker.internet.password()
  143 |         }
  144 |       });
  145 | 
  146 |       expect(responsePOSTmail_Invalid4.status()).toBe(400);
  147 |       const bodyPOSTmail_Invalid4 = await responsePOSTmail_Invalid4.json();
  148 |       expect(bodyPOSTmail_Invalid4.email).not.toBe(undefined);
  149 |     });
  150 | 
  151 |     test('rejeita um nome numérico', async ({ page }) => {
  152 |       // Verifica se o sistema rejeita um nome numérico.
  153 |       const responsePOSTmail_Invalid5 = await page.request.post('/registro', {
  154 |         data: {
  155 |           nome: faker.number.int({ min: 1, max: 1000 }),
  156 |           email: faker.internet.email(),
  157 |           senha: faker.internet.password()
  158 |         }
  159 |       });
  160 | 
  161 |       expect(responsePOSTmail_Invalid5.status()).toBe(400);
  162 |       const bodyPOSTmail_Invalid5 = await responsePOSTmail_Invalid5.json();
  163 |       expect(typeof bodyPOSTmail_Invalid5.nome).toBe('string');
  164 |     });
  165 | 
  166 |     test('rejeita um email numérico', async ({ page }) => {
  167 |       // Verifica se o sistema rejeita um email numérico.
  168 |       const responsePOSTmail_Invalid6 = await page.request.post('/registro', {
  169 |         data: {
  170 |           nome: faker.person.fullName(),
  171 |           email: faker.number.int({ min: 1, max: 1000 }),
  172 |           senha: faker.internet.password()
  173 |         }
  174 |       });
  175 | 
  176 |       expect(responsePOSTmail_Invalid6.status()).toBe(400);
  177 |       const bodyPOSTmail_Invalid6 = await responsePOSTmail_Invalid6.json();
  178 |       expect(typeof bodyPOSTmail_Invalid6.email).toBe('string');
  179 |     });
  180 | 
  181 |     test('rejeita uma senha numérica', async ({ page }) => {
  182 |       // Verifica se o sistema rejeita uma senha numérica.
  183 |       const responsePOSTmail_Invalid7 = await page.request.post('/registro', {
  184 |         data: {
  185 |           nome: faker.person.fullName(),
  186 |           email: faker.internet.email(),
  187 |           senha: faker.number.int({ min: 1, max: 1000 })
  188 |         }
  189 |       });
  190 | 
  191 |       expect(responsePOSTmail_Invalid7.status()).toBe(400);
  192 |       const bodyPOSTmail_Invalid7 = await responsePOSTmail_Invalid7.json();
  193 |       expect(typeof bodyPOSTmail_Invalid7.senha).toBe('string');
  194 |     });
  195 | 
  196 |     test('rejeita valores nulos', async ({ page }) => {
  197 |       // Verifica se o sistema rejeita valores nulos.
  198 |       const responsePOSTmail_Invalid8 = await page.request.post('/registro', {
  199 |         data: {
  200 |           nome: null,
  201 |           email: null,
  202 |           senha: null
  203 |         }
  204 |       });
  205 | 
  206 |       expect(responsePOSTmail_Invalid8.status()).toBe(400);
  207 |       const bodyPOSTmail_Invalid8 = await responsePOSTmail_Invalid8.json();
> 208 |       expect(bodyPOSTmail_Invalid8.nome).not.toBe(undefined);
      |                                              ^ Error: expect(received).not.toBe(expected) // Object.is equality
  209 |       expect(bodyPOSTmail_Invalid8.email).not.toBe(undefined);
  210 |       expect(bodyPOSTmail_Invalid8.senha).not.toBe(undefined);
  211 |     });
  212 | 
  213 |   });
  214 | 
  215 |  test('Login com Credenciais Válidas (Admin)', async ({ page }) => {
  216 |   let startTime = Date.now();
  217 |   
  218 |   let responsePOSTlogin_Admin = await page.request.post('/login',
  219 |       {
  220 |         data: {
  221 |           "email": "admin@biblioteca.com",
  222 |           "senha": "123456"
  223 |         }
  224 |       });
  225 | 
  226 |     let responsetime = Date.now()- startTime;
  227 |     expect(responsePOSTlogin_Admin.status()).toBe(200);
  228 |     expect(responsetime).toBeLessThan(2000);
  229 | 
  230 |     let bodyPOSTlogin_Admin = await responsePOSTlogin_Admin.json();
  231 | 
  232 |     expect(bodyPOSTlogin_Admin.mensagem).toBe('Login realizado com sucesso');
  233 |     expect(bodyPOSTlogin_Admin).toHaveProperty('usuario');
  234 |     expect(bodyPOSTlogin_Admin.usuario).not.toHaveProperty('senha');
  235 |     expect(bodyPOSTlogin_Admin.usuario).toHaveProperty('tipo');
  236 |     expect(bodyPOSTlogin_Admin.usuario.tipo).toBe(3); 
  237 |   });
  238 | 
  239 | test.describe('Validar rejeição de credenciais incorretas (Falha)', () => {
  240 |   test('Login com senha incorreta', async ({ page }) => {
  241 |   let responsePOSTinvalidlogin_Admin = await page.request.post('/login',
  242 |       {
  243 |         data: {
  244 |           "email": "admin@biblioteca.com",
  245 |           "senha": "senhaerrada"
  246 |         }
  247 |       });
  248 | 
  249 |     expect(responsePOSTinvalidlogin_Admin.status()).toBe(401);
  250 | 
  251 |     let bodyPOSTinvalidlogin_Admin = await responsePOSTinvalidlogin_Admin.json();
  252 | 
  253 |     expect(bodyPOSTinvalidlogin_Admin.mensagem).toBe('Email ou senha incorretos'); 
  254 |   });
  255 | 
  256 |   test('Login com email incorreto', async ({ page }) => {
  257 |   let responsePOSTinvalidlogin_Admin = await page.request.post('/login',
  258 |       {
  259 |         data: {
  260 |           "email": "adminmailincorreto@biblioteca.com",
  261 |           "senha": "123456"
  262 |         }
  263 |       });
  264 | 
  265 |     expect(responsePOSTinvalidlogin_Admin.status()).toBe(401);
  266 | 
  267 |     let bodyPOSTinvalidlogin_Admin = await responsePOSTinvalidlogin_Admin.json();
  268 | 
  269 |     expect(bodyPOSTinvalidlogin_Admin.mensagem).toBe('Email ou senha incorretos'); 
  270 |   });
  271 | 
  272 |   test('Login com email e senha vazios', async ({ page }) => {
  273 |   let responsePOSTinvalidlogin_Admin = await page.request.post('/login',
  274 |       {
  275 |         data: {
  276 |           "email": "",
  277 |           "senha": ""
  278 |         }
  279 |       });
  280 | 
  281 |     expect(responsePOSTinvalidlogin_Admin.status()).toBe(401);
  282 | 
  283 |     let bodyPOSTinvalidlogin_Admin = await responsePOSTinvalidlogin_Admin.json();
  284 | 
  285 |     expect(bodyPOSTinvalidlogin_Admin.mensagem).toBe('Email ou senha incorretos'); 
  286 |   });
  287 | 
  288 |   
  289 | });
  290 | 
  291 | })
```