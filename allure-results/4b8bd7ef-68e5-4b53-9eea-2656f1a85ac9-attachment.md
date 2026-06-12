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
  306 |         await page.removeAllListeners('dialog');
  307 |         await page.reload();
  308 |         
  309 | 
  310 |         const Table_newUserEmployeeEdited = await adminusers_page.Table_GetUserRow(userEmployeeID);
  311 |         await expect(Table_newUserEmployeeEdited).toBeVisible();
  312 |         const userEmployeeEditedName = await adminusers_page.Table_GetUserName(Table_newUserEmployeeEdited);
  313 |         await expect(userEmployeeEditedName).toBe(`${newUserEmployee.usuario.nome} EDITADO`);
  314 | 
  315 | 
> 316 |         page.waitForEvent('dialog').then(async dialog => {
      |              ^ Error: page.waitForEvent: Test ended.
  317 |             if (dialog.message().includes('Usuário atualizado com sucesso!')) {
  318 |                 console.log("dialog message 'Usuário atualizado com sucesso!' aceite")
  319 |                 await dialog.accept();
  320 |             }
  321 |             else {
  322 |                 throw new Error('Dialog message 3 não aparece ou não contém o texto esperado.');
  323 |             }
  324 |         });
  325 | 
  326 |         await page.waitForTimeout(3000);
  327 | 
  328 |         const Table_newUserStudent = await adminusers_page.Table_GetUserRow(newUserStudent.usuario.nome);
  329 |         await expect(Table_newUserStudent).toBeVisible();
  330 |         const userStudentID = await adminusers_page.Table_GetUserId(Table_newUserStudent);
  331 |         await adminusers_page.Table_EditUserName(Table_newUserStudent, `${newUserStudent.usuario.nome} EDITADO`);
  332 |         await adminusers_page.Table_ClickSaveChanges(Table_newUserStudent);
  333 |         await page.removeAllListeners('dialog');
  334 |         await page.reload();
  335 |         
  336 | 
  337 |         const Table_newUserStudentEdited = await adminusers_page.Table_GetUserRow(userStudentID);
  338 |         await expect(Table_newUserStudentEdited).toBeVisible();
  339 |         const userStudentEditedName = await adminusers_page.Table_GetUserName(Table_newUserStudentEdited);
  340 |         await expect(userStudentEditedName).toBe(`${newUserStudent.usuario.nome} EDITADO`);
  341 |     });
  342 | 
  343 | 
  344 |     test('Excluir Usuário (Sucesso)', async ({ page }) => {
  345 |         const login_page = new Login_page(page);
  346 |         const dashboard_page = new Dashboard_page(page);
  347 |         const adminusers_page = new Admin_AdminUsers_page(page);
  348 | 
  349 | 
  350 |         const ValidUserStudent = {
  351 |             "nome": faker.person.fullName(),
  352 |             "email": faker.internet.email(),
  353 |             "senha": faker.internet.password(),
  354 |             "tipo": 1
  355 |         }
  356 | 
  357 |         const ValidUserEmployee = {
  358 |             "nome": faker.person.fullName(),
  359 |             "email": faker.internet.email(),
  360 |             "senha": faker.internet.password(),
  361 |             "tipo": 2
  362 |         }
  363 | 
  364 |         let responsePOSTnewUserEmployee = await page.request.post('/registro',
  365 |             {
  366 |                 data: ValidUserEmployee
  367 |             });
  368 | 
  369 |         let response2POSTnewUserStudent = await page.request.post('/registro',
  370 |             {
  371 |                 data: ValidUserStudent
  372 |             });
  373 | 
  374 |         expect(responsePOSTnewUserEmployee.status()).toBe(201);
  375 |         let newUserEmployee = await responsePOSTnewUserEmployee.json();
  376 |         expect(newUserEmployee.usuario).toHaveProperty('id');
  377 |         expect(newUserEmployee.usuario).toHaveProperty('nome');
  378 |         expect(newUserEmployee.usuario.nome).toBe(ValidUserEmployee.nome);
  379 |         expect(newUserEmployee.usuario).toHaveProperty('email');
  380 |         expect(newUserEmployee.usuario.email).toBe(ValidUserEmployee.email);
  381 |         expect(newUserEmployee.usuario).toHaveProperty('tipo');
  382 | 
  383 |         expect(response2POSTnewUserStudent.status()).toBe(201);
  384 |         let newUserStudent = await response2POSTnewUserStudent.json();
  385 |         expect(newUserStudent.usuario).toHaveProperty('id');
  386 |         expect(newUserStudent.usuario).toHaveProperty('nome');
  387 |         expect(newUserStudent.usuario.nome).toBe(ValidUserStudent.nome);
  388 |         expect(newUserStudent.usuario).toHaveProperty('email');
  389 |         expect(newUserStudent.usuario.email).toBe(ValidUserStudent.email);
  390 |         expect(newUserStudent.usuario).toHaveProperty('tipo');
  391 | 
  392 | 
  393 | 
  394 | 
  395 |         await page.goto('http://localhost:3000/login.html');
  396 | 
  397 |         page.waitForEvent('dialog').then(async dialog => {
  398 |             if (dialog.message().includes('Login realizado com sucesso!')) {
  399 |                 console.log("dialog message 'Login realizado com sucesso!' aceite")
  400 |                 await dialog.accept();
  401 |             }
  402 |             else {
  403 |                 throw new Error('Dialog message 1 não aparece ou não contém o texto esperado.');
  404 |             }
  405 |         });
  406 | 
  407 |         await page.waitForTimeout(3000);
  408 | 
  409 |         await login_page.FillEmail_Password_InputFields("admin@biblioteca.com", "123456");
  410 | 
  411 |         await login_page.ClickEnterLogin_Button();
  412 | 
  413 |         await expect(page).toHaveURL('http://localhost:3000/dashboard.html');
  414 | 
  415 |         await dashboard_page.ClickAdmin_Usuarios_AdminUsers_button();
  416 | 
```