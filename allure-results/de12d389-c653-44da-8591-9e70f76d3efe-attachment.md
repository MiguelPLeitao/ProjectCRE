# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: FRONTEND_test_suite8_Admin_Usuarios.spec.js >> Admin_Usuarios >> Editar Usuário na Tabela (Sucesso)
- Location: tests\FRONTEND_test_suite8_Admin_Usuarios.spec.js:214:9

# Error details

```
Error: page.waitForEvent: Test ended.
=========================== logs ===========================
waiting for event "dialog"
============================================================
```

# Test source

```ts
  189 |         page.waitForEvent('dialog').then(async dialog => {
  190 |             if (dialog.message().includes('Usuário criado com sucesso!')) {
  191 |                 console.log("dialog message 'Usuário criado com sucesso!' aceite")
  192 |                 await dialog.accept();
  193 |             }
  194 |             else {
  195 |                 throw new Error('Dialog message 2 não aparece ou não contém o texto esperado.');
  196 |             }
  197 |         });
  198 | 
  199 |         await page.waitForTimeout(3000);
  200 | 
  201 |         const employee_name = faker.person.fullName();
  202 |         const employee_email = faker.internet.email();
  203 |         const employee_password = faker.internet.password();
  204 | 
  205 |         await adminusers_page.Fill_NovoUsuario_NewUser_inputfields(employee_name, employee_email, employee_password, "Funcionário");
  206 | 
  207 |         await adminusers_page.Click_CriarNovoUsuario_AddNewUser_button();
  208 | 
  209 |         const Table_newUserEmployee = await adminusers_page.Table_GetUserRow(employee_name);
  210 |         await expect(Table_newUserEmployee).toBeVisible();
  211 |     });
  212 | 
  213 | 
  214 |     test('Editar Usuário na Tabela (Sucesso)', async ({ page }) => {
  215 |         const login_page = new Login_page(page);
  216 |         const dashboard_page = new Dashboard_page(page);
  217 |         const adminusers_page = new Admin_AdminUsers_page(page);
  218 | 
  219 | 
  220 |         const ValidUserStudent = {
  221 |             "nome": faker.person.fullName(),
  222 |             "email": faker.internet.email(),
  223 |             "senha": faker.internet.password(),
  224 |             "tipo": 1
  225 |         }
  226 | 
  227 |         const ValidUserEmployee = {
  228 |             "nome": faker.person.fullName(),
  229 |             "email": faker.internet.email(),
  230 |             "senha": faker.internet.password(),
  231 |             "tipo": 2
  232 |         }
  233 | 
  234 |         let responsePOSTnewUserEmployee = await page.request.post('/registro',
  235 |             {
  236 |                 data: ValidUserEmployee
  237 |             });
  238 | 
  239 |         let response2POSTnewUserStudent = await page.request.post('/registro',
  240 |             {
  241 |                 data: ValidUserStudent
  242 |             });
  243 | 
  244 |         expect(responsePOSTnewUserEmployee.status()).toBe(201);
  245 |         let newUserEmployee = await responsePOSTnewUserEmployee.json();
  246 |         expect(newUserEmployee.usuario).toHaveProperty('id');
  247 |         expect(newUserEmployee.usuario).toHaveProperty('nome');
  248 |         expect(newUserEmployee.usuario.nome).toBe(ValidUserEmployee.nome);
  249 |         expect(newUserEmployee.usuario).toHaveProperty('email');
  250 |         expect(newUserEmployee.usuario.email).toBe(ValidUserEmployee.email);
  251 |         expect(newUserEmployee.usuario).toHaveProperty('tipo');
  252 | 
  253 |         expect(response2POSTnewUserStudent.status()).toBe(201);
  254 |         let newUserStudent = await response2POSTnewUserStudent.json();
  255 |         expect(newUserStudent.usuario).toHaveProperty('id');
  256 |         expect(newUserStudent.usuario).toHaveProperty('nome');
  257 |         expect(newUserStudent.usuario.nome).toBe(ValidUserStudent.nome);
  258 |         expect(newUserStudent.usuario).toHaveProperty('email');
  259 |         expect(newUserStudent.usuario.email).toBe(ValidUserStudent.email);
  260 |         expect(newUserStudent.usuario).toHaveProperty('tipo');
  261 | 
  262 | 
  263 | 
  264 | 
  265 |         await page.goto('http://localhost:3000/login.html');
  266 | 
  267 |         page.waitForEvent('dialog').then(async dialog => {
  268 |             if (dialog.message().includes('Login realizado com sucesso!')) {
  269 |                 console.log("dialog message 'Login realizado com sucesso!' aceite")
  270 |                 await dialog.accept();
  271 |             }
  272 |             else {
  273 |                 throw new Error('Dialog message 1 não aparece ou não contém o texto esperado.');
  274 |             }
  275 |         });
  276 | 
  277 |         await page.waitForTimeout(3000);
  278 | 
  279 |         await login_page.FillEmail_Password_InputFields("admin@biblioteca.com", "123456");
  280 | 
  281 |         await login_page.ClickEnterLogin_Button();
  282 | 
  283 |         await expect(page).toHaveURL('http://localhost:3000/dashboard.html');
  284 | 
  285 |         await dashboard_page.ClickAdmin_Usuarios_AdminUsers_button();
  286 | 
  287 |         await expect(page).toHaveURL('http://localhost:3000/admin-usuarios.html');
  288 | 
> 289 |         page.waitForEvent('dialog').then(async dialog => {
      |              ^ Error: page.waitForEvent: Test ended.
  290 |             if (dialog.message().includes('Usuário criado com sucesso!')) {
  291 |                 console.log("dialog message 'Usuário criado com sucesso!' aceite")
  292 |                 await dialog.accept();
  293 |             }
  294 |             else {
  295 |                 throw new Error('Dialog message 2 não aparece ou não contém o texto esperado.');
  296 |             }
  297 |         });
  298 | 
  299 |         await page.waitForTimeout(3000);
  300 | 
  301 | 
  302 | 
  303 |         const Table_newUserEmployee = await adminusers_page.Table_GetUserRow(newUserEmployee.usuario.nome);
  304 |         await expect(Table_newUserEmployee).toBeVisible();
  305 | 
  306 |         const Table_newUserStudent = await adminusers_page.Table_GetUserRow(newUserStudent.usuario.nome);
  307 |         await expect(Table_newUserStudent).toBeVisible();
  308 | 
  309 | 
  310 | 
  311 | 
  312 |     });
  313 | 
  314 | 
  315 | })
```