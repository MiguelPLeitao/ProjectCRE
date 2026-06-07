# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: API_test_suite1_Autenticacao_e_Perfis.spec.js >> Autenticação e Perfis >> Registo com Dados Inválidos (Falha) >> rejeita valores nulos
- Location: tests\API_test_suite1_Autenticacao_e_Perfis.spec.js:203:9

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: "Nome, email válido e senha são obrigatórios"
Received: "Email já cadastrado"
```

# Test source

```ts
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
  202 | 
  203 |     test('rejeita valores nulos', async ({ page }) => {
  204 |       // Verifica se o sistema rejeita valores nulos.
  205 |       const responsePOSTmail_Invalid8 = await page.request.post('/registro', {
  206 |         data: {
  207 |           nome: null,
  208 |           email: null,
  209 |           senha: null
  210 |         }
  211 |       });
  212 | 
  213 |       expect(responsePOSTmail_Invalid8.status()).toBe(400);
  214 |       const bodyPOSTmail_Invalid8 = await responsePOSTmail_Invalid8.json();
> 215 |       expect(bodyPOSTmail_Invalid8.mensagem).toBe("Nome, email válido e senha são obrigatórios");
      |                                              ^ Error: expect(received).toBe(expected) // Object.is equality
  216 |       expect(bodyPOSTmail_Invalid8).not.toHaveProperty('usuario');
  217 |     });
  218 |   });
  219 | 
  220 |   test('Login com Credenciais Válidas (Admin)(Sucesso)', async ({ page }) => {
  221 |     let startTime = Date.now();
  222 | 
  223 |     let responsePOSTlogin_Admin = await page.request.post('/login',
  224 |       {
  225 |         data: {
  226 |           "email": "admin@biblioteca.com",
  227 |           "senha": "123456"
  228 |         }
  229 |       });
  230 | 
  231 |     let responsetime = Date.now() - startTime;
  232 |     expect(responsePOSTlogin_Admin.status()).toBe(200);
  233 |     expect(responsetime).toBeLessThan(2000);
  234 | 
  235 |     let bodyPOSTlogin_Admin = await responsePOSTlogin_Admin.json();
  236 | 
  237 |     expect(bodyPOSTlogin_Admin.mensagem).toBe('Login realizado com sucesso');
  238 |     expect(bodyPOSTlogin_Admin).toHaveProperty('usuario');
  239 |     expect(bodyPOSTlogin_Admin.usuario).not.toHaveProperty('senha');
  240 |     expect(bodyPOSTlogin_Admin.usuario).toHaveProperty('tipo');
  241 |     expect(bodyPOSTlogin_Admin.usuario.tipo).toBe(3);
  242 |   });
  243 | 
  244 |   test.describe('Validar rejeição de credenciais incorretas (Falha)', () => {
  245 |     test('Login com senha incorreta', async ({ page }) => {
  246 |       let response1POSTinvalidlogin_Admin = await page.request.post('/login',
  247 |         {
  248 |           data: {
  249 |             "email": "admin@biblioteca.com",
  250 |             "senha": "senhaerrada"
  251 |           }
  252 |         });
  253 | 
  254 |       expect(response1POSTinvalidlogin_Admin.status()).toBe(401);
  255 | 
  256 |       let body1POSTinvalidlogin_Admin = await response1POSTinvalidlogin_Admin.json();
  257 | 
  258 |       expect(body1POSTinvalidlogin_Admin.mensagem).toBe('Email ou senha incorretos');
  259 |     });
  260 | 
  261 |     test('Login com email incorreto', async ({ page }) => {
  262 |       let response2POSTinvalidlogin_Admin = await page.request.post('/login',
  263 |         {
  264 |           data: {
  265 |             "email": "adminmailincorreto@biblioteca.com",
  266 |             "senha": "123456"
  267 |           }
  268 |         });
  269 | 
  270 |       expect(response2POSTinvalidlogin_Admin.status()).toBe(401);
  271 | 
  272 |       let body2POSTinvalidlogin_Admin = await response2POSTinvalidlogin_Admin.json();
  273 | 
  274 |       expect(body2POSTinvalidlogin_Admin.mensagem).toBe('Email ou senha incorretos');
  275 |     });
  276 | 
  277 |     test('Login com email e senha vazios', async ({ page }) => {
  278 |       let response3POSTinvalidlogin_Admin = await page.request.post('/login',
  279 |         {
  280 |           data: {
  281 |             "email": "",
  282 |             "senha": ""
  283 |           }
  284 |         });
  285 | 
  286 |       expect(response3POSTinvalidlogin_Admin.status()).toBe(401);
  287 | 
  288 |       let body3POSTinvalidlogin_Admin = await response3POSTinvalidlogin_Admin.json();
  289 | 
  290 |       expect(body3POSTinvalidlogin_Admin.mensagem).toBe('Email ou senha incorretos');
  291 |     });
  292 |   });
  293 | });
```