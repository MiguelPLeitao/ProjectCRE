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
  289 |         page.waitForEvent('dialog').then(async dialog => {
  290 |             if (dialog.message().includes('Usuário atualizado com sucesso!')) {
  291 |                 console.log("dialog message 'Usuário atualizado com sucesso!' aceite")
  292 |                 await dialog.accept();
  293 |             }
  294 |             else {
  295 |                 throw new Error('Dialog message 2 não aparece ou não contém o texto esperado.');
  296 |             }
  297 |         });
  298 | 
  299 |         await page.waitForTimeout(3000);
  300 | 
  301 |         const Table_newUserEmployee = await adminusers_page.Table_GetUserRow(newUserEmployee.usuario.nome);
  302 |         await expect(Table_newUserEmployee).toBeVisible();
  303 |         const userEmployeeID = await adminusers_page.Table_GetUserId(Table_newUserEmployee);
  304 |         await adminusers_page.Table_EditUserName(Table_newUserEmployee, `${newUserEmployee.usuario.nome} EDITADO`);
  305 |         await adminusers_page.Table_ClickSaveChanges(Table_newUserEmployee);
  306 |         await page.reload();
  307 | 
  308 |         const Table_newUserEmployeeEdited = await adminusers_page.Table_GetUserRow(userEmployeeID);
  309 |         await expect(Table_newUserEmployeeEdited).toBeVisible();
  310 |         const userEmployeeEditedName = await adminusers_page.Table_GetUserName(Table_newUserEmployeeEdited);
  311 |         await expect(userEmployeeEditedName).toBe(`${newUserEmployee.usuario.nome} EDITADO`);
  312 | 
  313 | 
> 314 |         page.waitForEvent('dialog').then(async dialog => {
      |              ^ Error: page.waitForEvent: Test ended.
  315 |             if (dialog.message().includes('Usuário atualizado com sucesso!')) {
  316 |                 console.log("dialog message 'Usuário atualizado com sucesso!' aceite")
  317 |                 await dialog.accept();
  318 |             }
  319 |             else {
  320 |                 throw new Error('Dialog message 3 não aparece ou não contém o texto esperado.');
  321 |             }
  322 |         });
  323 | 
  324 |         await page.waitForTimeout(3000);
  325 | 
  326 |         const Table_newUserStudent = await adminusers_page.Table_GetUserRow(newUserStudent.usuario.nome);
  327 |         await expect(Table_newUserStudent).toBeVisible();
  328 |         const userStudentID = await adminusers_page.Table_GetUserId(Table_newUserStudent);
  329 |         await adminusers_page.Table_EditUserName(Table_newUserStudent, `${newUserStudent.usuario.nome} EDITADO`);
  330 |         await adminusers_page.Table_ClickSaveChanges(Table_newUserStudent);
  331 |         await page.reload();
  332 | 
  333 |         const Table_newUserStudentEdited = await adminusers_page.Table_GetUserRow(userStudentID);
  334 |         await expect(Table_newUserStudentEdited).toBeVisible();
  335 |         const userStudentEditedName = await adminusers_page.Table_GetUserName(Table_newUserStudentEdited);
  336 |         await expect(userStudentEditedName).toBe(`${newUserStudent.usuario.nome} EDITADO`);
  337 |     });
  338 | 
  339 | 
  340 |     test('Excluir Usuário (Sucesso)', async ({ page }) => {
  341 |         const login_page = new Login_page(page);
  342 |         const dashboard_page = new Dashboard_page(page);
  343 |         const adminusers_page = new Admin_AdminUsers_page(page);
  344 | 
  345 | 
  346 |         const ValidUserStudent = {
  347 |             "nome": faker.person.fullName(),
  348 |             "email": faker.internet.email(),
  349 |             "senha": faker.internet.password(),
  350 |             "tipo": 1
  351 |         }
  352 | 
  353 |         const ValidUserEmployee = {
  354 |             "nome": faker.person.fullName(),
  355 |             "email": faker.internet.email(),
  356 |             "senha": faker.internet.password(),
  357 |             "tipo": 2
  358 |         }
  359 | 
  360 |         let responsePOSTnewUserEmployee = await page.request.post('/registro',
  361 |             {
  362 |                 data: ValidUserEmployee
  363 |             });
  364 | 
  365 |         let response2POSTnewUserStudent = await page.request.post('/registro',
  366 |             {
  367 |                 data: ValidUserStudent
  368 |             });
  369 | 
  370 |         expect(responsePOSTnewUserEmployee.status()).toBe(201);
  371 |         let newUserEmployee = await responsePOSTnewUserEmployee.json();
  372 |         expect(newUserEmployee.usuario).toHaveProperty('id');
  373 |         expect(newUserEmployee.usuario).toHaveProperty('nome');
  374 |         expect(newUserEmployee.usuario.nome).toBe(ValidUserEmployee.nome);
  375 |         expect(newUserEmployee.usuario).toHaveProperty('email');
  376 |         expect(newUserEmployee.usuario.email).toBe(ValidUserEmployee.email);
  377 |         expect(newUserEmployee.usuario).toHaveProperty('tipo');
  378 | 
  379 |         expect(response2POSTnewUserStudent.status()).toBe(201);
  380 |         let newUserStudent = await response2POSTnewUserStudent.json();
  381 |         expect(newUserStudent.usuario).toHaveProperty('id');
  382 |         expect(newUserStudent.usuario).toHaveProperty('nome');
  383 |         expect(newUserStudent.usuario.nome).toBe(ValidUserStudent.nome);
  384 |         expect(newUserStudent.usuario).toHaveProperty('email');
  385 |         expect(newUserStudent.usuario.email).toBe(ValidUserStudent.email);
  386 |         expect(newUserStudent.usuario).toHaveProperty('tipo');
  387 | 
  388 | 
  389 | 
  390 | 
  391 |         await page.goto('http://localhost:3000/login.html');
  392 | 
  393 |         page.waitForEvent('dialog').then(async dialog => {
  394 |             if (dialog.message().includes('Login realizado com sucesso!')) {
  395 |                 console.log("dialog message 'Login realizado com sucesso!' aceite")
  396 |                 await dialog.accept();
  397 |             }
  398 |             else {
  399 |                 throw new Error('Dialog message 1 não aparece ou não contém o texto esperado.');
  400 |             }
  401 |         });
  402 | 
  403 |         await page.waitForTimeout(3000);
  404 | 
  405 |         await login_page.FillEmail_Password_InputFields("admin@biblioteca.com", "123456");
  406 | 
  407 |         await login_page.ClickEnterLogin_Button();
  408 | 
  409 |         await expect(page).toHaveURL('http://localhost:3000/dashboard.html');
  410 | 
  411 |         await dashboard_page.ClickAdmin_Usuarios_AdminUsers_button();
  412 | 
  413 |         await expect(page).toHaveURL('http://localhost:3000/admin-usuarios.html');
  414 | 
```