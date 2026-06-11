# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: FRONTEND_test_suite6_Arrendamentos.spec.js >> Arrendamentos >> Aprovar Arrendamento (Sucesso)
- Location: tests\FRONTEND_test_suite6_Arrendamentos.spec.js:122:9

# Error details

```
ReferenceError: responsePOSTrent is not defined
```

# Test source

```ts
  93  |         await expect(page).toHaveURL('http://localhost:3000/arrendamentos.html');
  94  | 
  95  |         page.waitForEvent('dialog').then(async dialog => {
  96  |             if (dialog.message().includes('Arrendamento solicitado com sucesso!')) {
  97  |                 console.log("dialog message 'Arrendamento solicitado com sucesso!' aceite")
  98  |                 await dialog.accept();
  99  |             }
  100 |             else {
  101 |                 throw new Error('Dialog message 1 não aparece ou não contém o texto esperado.');
  102 |             }
  103 |         });
  104 | 
  105 |         await page.waitForTimeout(3000);
  106 | 
  107 |         const newRandomBook_name_author = `${newBook_random.nome} (${newBook_random.autor})`;
  108 |         await rents_page.Select_Book_dropdown(newRandomBook_name_author);
  109 |         await rents_page.Select_StartDate_datepicker(null);
  110 |         await rents_page.Select_EndDate_datepicker(null);
  111 |         await rents_page.ClickSolicitarArrendamento_RequestRent_button();
  112 | 
  113 |         await expect(page).toHaveURL('http://localhost:3000/arrendamentos.html');
  114 | 
  115 |         const CreatedRentCard = await rents_page.SelectArrendamento_RentCard_grid(`Livro ID: ${newBook_random.id}`);
  116 |         await expect(CreatedRentCard).toBeVisible();
  117 | 
  118 |     });
  119 | 
  120 | 
  121 | 
  122 |     test('Aprovar Arrendamento (Sucesso)', async ({ page }) => {
  123 |         const login_page = new Login_page(page);
  124 |         const dashboard_page = new Dashboard_page(page);
  125 |         const rents_page = new Rents_page(page);
  126 |         const admin_approvals_page = new Admin_Approvals_page(page);
  127 | 
  128 |         const ValidUser = {
  129 |             "nome": faker.person.fullName(),
  130 |             "email": faker.internet.email(),
  131 |             "senha": faker.internet.password(),
  132 |             "tipo": 2
  133 |         }
  134 | 
  135 |         const newBook = {
  136 |             "nome": faker.book.title(),
  137 |             "autor": faker.person.fullName(),
  138 |             "paginas": faker.number.int({ min: 10, max: 2000 }),
  139 |             "descricao": faker.lorem.paragraph(2),
  140 |             "imagemUrl": faker.image.url(),
  141 |             "estoque": faker.number.int({ min: 0, max: 1000 }),
  142 |             "preco": parseFloat(faker.commerce.price({ min: 5, max: 200 }))
  143 |         };
  144 | 
  145 | 
  146 |         let responsePOSTnewUser = await page.request.post('/registro',
  147 |             {
  148 |                 data: ValidUser
  149 |             });
  150 | 
  151 |         let responsePOSTnewBook_Random = await page.request.post('/livros',
  152 |             {
  153 |                 data: newBook
  154 |             }
  155 |         );
  156 | 
  157 | 
  158 |         expect(responsePOSTnewUser.status()).toBe(201);
  159 |         let newUser = await responsePOSTnewUser.json();
  160 |         expect(newUser.usuario).toHaveProperty('id');
  161 |         expect(newUser.usuario).toHaveProperty('nome');
  162 |         expect(newUser.usuario.nome).toBe(ValidUser.nome);
  163 |         expect(newUser.usuario).toHaveProperty('email');
  164 |         expect(newUser.usuario.email).toBe(ValidUser.email);
  165 |         expect(newUser.usuario).toHaveProperty('tipo');
  166 | 
  167 |         expect(responsePOSTnewBook_Random.status()).toBe(201);
  168 |         let newBook_random = await responsePOSTnewBook_Random.json();
  169 |         expect(newBook_random).toHaveProperty('id');
  170 |         expect(newBook_random).toHaveProperty('nome');
  171 |         expect(newBook_random.nome).toBe(newBook.nome);
  172 |         expect(newBook_random).toHaveProperty('autor');
  173 |         expect(newBook_random.autor).toBe(newBook.autor);
  174 |         expect(newBook_random).toHaveProperty('paginas');
  175 |         expect(newBook_random.paginas).toBe(newBook.paginas);
  176 | 
  177 | 
  178 |         const datainicio = faker.date.between({ from: '2020-01-01', to: '2030-12-31' });
  179 |         const datafim = faker.date.future({ refDate: datainicio });
  180 |         const newRent = {
  181 |             "usuarioId": newUser.usuario.id,
  182 |             "livroId": newBook_random.id,
  183 |             "dataInicio": datainicio,
  184 |             "dataFim": datafim
  185 |         };
  186 | 
  187 |         let responsePOSTnewRent = await page.request.post('/arrendamentos',
  188 |             {
  189 |                 data: newRent
  190 |             }
  191 |         );
  192 | 
> 193 |         expect(responsePOSTrent.status()).toBe(201);
      |                ^ ReferenceError: responsePOSTrent is not defined
  194 |         let bodyPOSTrent = await responsePOSTrent.json();
  195 |         expect(bodyPOSTrent).toHaveProperty('id');
  196 |         expect(bodyPOSTrent).toHaveProperty('usuarioId');
  197 |         expect(bodyPOSTrent).toHaveProperty('livroId');
  198 |         expect(bodyPOSTrent).toHaveProperty('status');
  199 |         expect(bodyPOSTrent.status).toBe('PENDENTE');
  200 |         expect(bodyPOSTrent).toHaveProperty('criadoEm');
  201 | 
  202 | 
  203 |         await page.goto('http://localhost:3000/login.html');
  204 | 
  205 |         await expect(page).toHaveURL('http://localhost:3000/login.html');
  206 | 
  207 |         page.waitForEvent('dialog').then(async dialog => {
  208 |             if (dialog.message().includes('Login realizado com sucesso!')) {
  209 |                 console.log("dialog message 'Login realizado com sucesso!' aceite")
  210 |                 await dialog.accept();
  211 |             }
  212 |             else {
  213 |                 throw new Error('Dialog message 1 não aparece ou não contém o texto esperado.');
  214 |             }
  215 |         });
  216 | 
  217 |         await page.waitForTimeout(3000);
  218 | 
  219 |         await login_page.FillEmail_Password_InputFields(newUser.usuario.email, ValidUser.senha);
  220 | 
  221 |         await login_page.ClickEnterLogin_Button();
  222 | 
  223 |         await expect(page).toHaveURL('http://localhost:3000/dashboard.html');
  224 | 
  225 |         await dashboard_page.ClickAdmin_Aprovacoes_Approvals_button();
  226 | 
  227 |         await expect(page).toHaveURL('http://localhost:3000/aprovacoes.html');
  228 | 
  229 |         page.waitForEvent('dialog').then(async dialog => {
  230 |             if (dialog.message().includes('Confirmar aprovação do arrendamento')) {
  231 |                 console.log("dialog message 'Confirmar aprovação do arrendamento?' aceite")
  232 |                 await dialog.accept();
  233 |             }
  234 |             else {
  235 |                 throw new Error('Dialog message 2 não aparece ou não contém o texto esperado.');
  236 |             }
  237 |         });
  238 | 
  239 |         const PendingRentCard = await admin_approvals_page.SelectPending_Rent_gridCard(`Usuário ID: ${newUser.usuario.id}`, `Livro ID: ${newBook_random.id}`);
  240 |         await expect(PendingRentCard).toBeVisible();
  241 | 
  242 |         await admin_approvals_page.AprovarArrendamento_ApproveRent(`Usuário ID: ${newUser.usuario.id}`, `Livro ID: ${newBook_random.id}`);
  243 | 
  244 |         page.waitForEvent('dialog').then(async dialog => {
  245 |             if (dialog.message().includes('Arrendamento aprovado com sucesso!')) {
  246 |                 console.log("dialog message 'Arrendamento aprovado com sucesso!' aceite")
  247 |                 await dialog.accept();
  248 |             }
  249 |             else {
  250 |                 throw new Error('Dialog message 3 não aparece ou não contém o texto esperado.');
  251 |             }
  252 |         });
  253 | 
  254 |         await page.waitForTimeout(3000);
  255 | 
  256 |         await expect(PendingRentCard).not.toBeVisible();
  257 | 
  258 |         const ApprovedRentCard = await admin_approvals_page.Select_Rent_gridCard(`Usuário ID: ${newUser.usuario.id}`, `Livro ID: ${newBook_random.id}`, 'APROVADO');
  259 |         await expect(ApprovedRentCard).toBeVisible();
  260 | 
  261 | 
  262 | 
  263 |     });
  264 | })
```