# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: FRONTEND_test_suite7_Compras.spec.js >> Compras >> Aprovar Compra (Admin/Funcionário) (Sucesso)
- Location: tests\FRONTEND_test_suite7_Compras.spec.js:145:9

# Error details

```
ReferenceError: newUser is not defined
```

# Page snapshot

```yaml
- generic [ref=e2]:
  - generic [ref=e3]:
    - heading "📦 Compras - Administração" [level=1] [ref=e4]
    - generic [ref=e5]:
      - generic [ref=e6]: Maynard MayertFUNCIONÁRIO
      - button "Sair" [ref=e7] [cursor=pointer]
  - generic [ref=e8]:
    - link "Dashboard" [ref=e9] [cursor=pointer]:
      - /url: dashboard.html
    - link "Livros" [ref=e10] [cursor=pointer]:
      - /url: livros.html
    - link "Favoritos" [ref=e11] [cursor=pointer]:
      - /url: favoritos.html
    - link "Meus Arrendamentos" [ref=e12] [cursor=pointer]:
      - /url: arrendamentos.html
    - link "Aprovações" [ref=e13] [cursor=pointer]:
      - /url: aprovacoes.html
    - link "Compras Admin" [ref=e14] [cursor=pointer]:
      - /url: compras-admin.html
  - heading "Compras Registradas" [level=2] [ref=e15]
  - generic [ref=e16]:
    - generic [ref=e17] [cursor=pointer]:
      - 'heading "Compra #1" [level=3] [ref=e18]'
      - paragraph [ref=e19]:
        - strong [ref=e20]: "Usuário ID:"
        - text: "5"
      - paragraph [ref=e21]:
        - strong [ref=e22]: "Livro ID:"
        - text: "1"
      - paragraph [ref=e23]:
        - strong [ref=e24]: "Quantidade:"
        - text: "2"
      - paragraph [ref=e25]:
        - strong [ref=e26]: "Total:"
        - text: € 99.80
      - paragraph [ref=e27]:
        - strong [ref=e28]: "Status:"
        - text: APROVADA
      - paragraph [ref=e29]:
        - strong [ref=e30]: "Data:"
        - text: 11/06/2026, 21:23:30
    - generic [ref=e31] [cursor=pointer]:
      - 'heading "Compra #2" [level=3] [ref=e32]'
      - paragraph [ref=e33]:
        - strong [ref=e34]: "Usuário ID:"
        - text: "4"
      - paragraph [ref=e35]:
        - strong [ref=e36]: "Livro ID:"
        - text: "1"
      - paragraph [ref=e37]:
        - strong [ref=e38]: "Quantidade:"
        - text: "2"
      - paragraph [ref=e39]:
        - strong [ref=e40]: "Total:"
        - text: € 99.80
      - paragraph [ref=e41]:
        - strong [ref=e42]: "Status:"
        - text: PENDENTE
      - paragraph [ref=e43]:
        - strong [ref=e44]: "Data:"
        - text: 11/06/2026, 21:24:39
      - generic [ref=e45]:
        - button "Aprovar" [ref=e46]
        - button "Cancelar" [ref=e47]
    - generic [ref=e48] [cursor=pointer]:
      - 'heading "Compra #3" [level=3] [ref=e49]'
      - paragraph [ref=e50]:
        - strong [ref=e51]: "Usuário ID:"
        - text: "6"
      - paragraph [ref=e52]:
        - strong [ref=e53]: "Livro ID:"
        - text: "3"
      - paragraph [ref=e54]:
        - strong [ref=e55]: "Quantidade:"
        - text: "60"
      - paragraph [ref=e56]:
        - strong [ref=e57]: "Total:"
        - text: € 10123.20
      - paragraph [ref=e58]:
        - strong [ref=e59]: "Status:"
        - text: PENDENTE
      - paragraph [ref=e60]:
        - strong [ref=e61]: "Data:"
        - text: 11/06/2026, 21:37:41
      - generic [ref=e62]:
        - button "Aprovar" [ref=e63]
        - button "Cancelar" [ref=e64]
    - generic [ref=e65] [cursor=pointer]:
      - 'heading "Compra #4" [level=3] [ref=e66]'
      - paragraph [ref=e67]:
        - strong [ref=e68]: "Usuário ID:"
        - text: "7"
      - paragraph [ref=e69]:
        - strong [ref=e70]: "Livro ID:"
        - text: "4"
      - paragraph [ref=e71]:
        - strong [ref=e72]: "Quantidade:"
        - text: "59"
      - paragraph [ref=e73]:
        - strong [ref=e74]: "Total:"
        - text: € 9920.85
      - paragraph [ref=e75]:
        - strong [ref=e76]: "Status:"
        - text: PENDENTE
      - paragraph [ref=e77]:
        - strong [ref=e78]: "Data:"
        - text: 11/06/2026, 21:37:53
      - generic [ref=e79]:
        - button "Aprovar" [ref=e80]
        - button "Cancelar" [ref=e81]
    - generic [ref=e82] [cursor=pointer]:
      - 'heading "Compra #5" [level=3] [ref=e83]'
      - paragraph [ref=e84]:
        - strong [ref=e85]: "Usuário ID:"
        - text: "8"
      - paragraph [ref=e86]:
        - strong [ref=e87]: "Livro ID:"
        - text: "5"
      - paragraph [ref=e88]:
        - strong [ref=e89]: "Quantidade:"
        - text: "35"
      - paragraph [ref=e90]:
        - strong [ref=e91]: "Total:"
        - text: € 3412.15
      - paragraph [ref=e92]:
        - strong [ref=e93]: "Status:"
        - text: PENDENTE
      - paragraph [ref=e94]:
        - strong [ref=e95]: "Data:"
        - text: 11/06/2026, 21:38:06
      - generic [ref=e96]:
        - button "Aprovar" [ref=e97]
        - button "Cancelar" [ref=e98]
    - generic [ref=e99] [cursor=pointer]:
      - 'heading "Compra #6" [level=3] [ref=e100]'
      - paragraph [ref=e101]:
        - strong [ref=e102]: "Usuário ID:"
        - text: "1"
      - paragraph [ref=e103]:
        - strong [ref=e104]: "Livro ID:"
        - text: "1"
      - paragraph [ref=e105]:
        - strong [ref=e106]: "Quantidade:"
        - text: "1"
      - paragraph [ref=e107]:
        - strong [ref=e108]: "Total:"
        - text: € 49.90
      - paragraph [ref=e109]:
        - strong [ref=e110]: "Status:"
        - text: PENDENTE
      - paragraph [ref=e111]:
        - strong [ref=e112]: "Data:"
        - text: 11/06/2026, 21:51:08
      - generic [ref=e113]:
        - button "Aprovar" [ref=e114]
        - button "Cancelar" [ref=e115]
    - generic [ref=e116] [cursor=pointer]:
      - 'heading "Compra #7" [level=3] [ref=e117]'
      - paragraph [ref=e118]:
        - strong [ref=e119]: "Usuário ID:"
        - text: "12"
      - paragraph [ref=e120]:
        - strong [ref=e121]: "Livro ID:"
        - text: "7"
      - paragraph [ref=e122]:
        - strong [ref=e123]: "Quantidade:"
        - text: "76"
      - paragraph [ref=e124]:
        - strong [ref=e125]: "Total:"
        - text: € 1622.60
      - paragraph [ref=e126]:
        - strong [ref=e127]: "Status:"
        - text: PENDENTE
      - paragraph [ref=e128]:
        - strong [ref=e129]: "Data:"
        - text: 11/06/2026, 22:11:45
      - generic [ref=e130]:
        - button "Aprovar" [ref=e131]
        - button "Cancelar" [ref=e132]
```

# Test source

```ts
  192 |         expect(responsePOSTnewUserEmployee.status()).toBe(201);
  193 |         let newUserEmployee = await responsePOSTnewUserEmployee.json();
  194 |         expect(newUserEmployee.usuario).toHaveProperty('id');
  195 |         expect(newUserEmployee.usuario).toHaveProperty('nome');
  196 |         expect(newUserEmployee.usuario.nome).toBe(ValidUser.nome);
  197 |         expect(newUserEmployee.usuario).toHaveProperty('email');
  198 |         expect(newUserEmployee.usuario.email).toBe(ValidUser.email);
  199 |         expect(newUserEmployee.usuario).toHaveProperty('tipo');
  200 | 
  201 |         expect(response2POSTnewUserStudent.status()).toBe(201);
  202 |         let newUserStudent = await response2POSTnewUserStudent.json();
  203 |         expect(newUserStudent.usuario).toHaveProperty('id');
  204 |         expect(newUserStudent.usuario).toHaveProperty('nome');
  205 |         expect(newUserStudent.usuario).toHaveProperty('email');
  206 |         expect(newUserStudent.usuario).toHaveProperty('tipo');
  207 | 
  208 |         expect(responsePOSTnewBook_Random.status()).toBe(201);
  209 |         let newBook_random = await responsePOSTnewBook_Random.json();
  210 |         expect(newBook_random).toHaveProperty('id');
  211 |         expect(newBook_random).toHaveProperty('nome');
  212 |         expect(newBook_random.nome).toBe(newBook.nome);
  213 |         expect(newBook_random).toHaveProperty('autor');
  214 |         expect(newBook_random.autor).toBe(newBook.autor);
  215 |         expect(newBook_random).toHaveProperty('paginas');
  216 |         expect(newBook_random.paginas).toBe(newBook.paginas);
  217 | 
  218 | 
  219 |         let responsePOSTbuy = await page.request.post('/compras', {
  220 |             data: {
  221 |                 "usuarioId": newUserStudent.usuario.id,
  222 |                 "livroId": newBook_random.id,
  223 |                 "quantidade": faker.number.int({ min: 1, max: newBook_random.estoque })
  224 |             }
  225 |         });
  226 | 
  227 |         expect(responsePOSTbuy.status()).toBe(201);
  228 |         let newBuyOrder = await responsePOSTbuy.json();
  229 |         expect(newBuyOrder).toHaveProperty('id');
  230 |         expect(newBuyOrder).toHaveProperty('usuarioId');
  231 |         expect(newBuyOrder).toHaveProperty('livroId');
  232 |         expect(newBuyOrder).toHaveProperty('quantidade');
  233 |         expect(newBuyOrder).toHaveProperty('total');
  234 |         expect(newBuyOrder).toHaveProperty('status');
  235 |         expect(newBuyOrder.status).toBe('PENDENTE');
  236 |         expect(newBuyOrder).toHaveProperty('criadoEm');
  237 | 
  238 | 
  239 |         await page.goto('http://localhost:3000/login.html');
  240 | 
  241 |         await expect(page).toHaveURL('http://localhost:3000/login.html');
  242 | 
  243 |         page.waitForEvent('dialog').then(async dialog => {
  244 |             if (dialog.message().includes('Login realizado com sucesso!')) {
  245 |                 console.log("dialog message 'Login realizado com sucesso!' aceite")
  246 |                 await dialog.accept();
  247 |             }
  248 |             else {
  249 |                 throw new Error('Dialog message 1 não aparece ou não contém o texto esperado.');
  250 |             }
  251 |         });
  252 | 
  253 |         await page.waitForTimeout(3000);
  254 | 
  255 |         await login_page.FillEmail_Password_InputFields(newUserEmployee.usuario.email, ValidUser.senha);
  256 | 
  257 |         await login_page.ClickEnterLogin_Button();
  258 | 
  259 |         await expect(page).toHaveURL('http://localhost:3000/dashboard.html');
  260 | 
  261 |         await dashboard_page.ClickAdmin_Compras_BuyOrders_button();
  262 | 
  263 |         await expect(page).toHaveURL('http://localhost:3000/compras-admin.html');
  264 | 
  265 |         let approvalDialogCount = 0;
  266 | 
  267 |         page.on('dialog', async dialog => {
  268 |             approvalDialogCount++;
  269 | 
  270 |             if (
  271 |                 approvalDialogCount === 1 &&
  272 |                 dialog.message().includes('Confirmar alteração da compra')
  273 |             ) {
  274 |                 console.log("dialog message 'Confirmar alteração da compra?' aceite");
  275 |                 await dialog.accept();
  276 |             }
  277 |             else if (
  278 |                 approvalDialogCount === 2 &&
  279 |                 dialog.message().includes('Status atualizado com sucesso!')
  280 |             ) {
  281 |                 console.log("dialog message 'Status atualizado com sucesso!' aceite");
  282 |                 await dialog.accept();
  283 |             }
  284 |             else {
  285 |                 throw new Error(`Dialog inesperado: ${dialog.message()}`);
  286 |             }
  287 |         });
  288 | 
  289 |         await page.waitForTimeout(3000);
  290 | 
  291 |         const PendingBuyOrderCard = await admin_buyorders_page.SelectBuyOrder_gridCard(
> 292 |             `Usuário ID: ${newUser.usuario.id}`,
      |                            ^ ReferenceError: newUser is not defined
  293 |             `Livro ID: ${newBook_random.id}`,
  294 |             `Quantidade: ${newBuyOrder.quantidade}`,
  295 |             `Status: ${newBuyOrder.status}`
  296 |         );
  297 | 
  298 |         await expect(PendingBuyOrderCard).toBeVisible();
  299 | 
  300 |         await admin_buyorders_page.AprovarCompra_ApproveBuyOrder(
  301 |             `Usuário ID: ${newUser.usuario.id}`,
  302 |             `Livro ID: ${newBook_random.id}`,
  303 |             `Quantidade: ${newBuyOrder.quantidade}`,
  304 |             `Status: ${newBuyOrder.status}`
  305 |         );
  306 | 
  307 |         const ApprovedBuyOrderCard = await admin_buyorders_page.SelectBuyOrder_gridCard(
  308 |             `Usuário ID: ${newUser.usuario.id}`,
  309 |             `Livro ID: ${newBook_random.id}`,
  310 |             `Quantidade: ${newBuyOrder.quantidade}`,
  311 |             `Status: APROVADA`
  312 |         );
  313 | 
  314 |         await expect(ApprovedBuyOrderCard).toBeVisible();
  315 | 
  316 |     });
  317 | })
```