# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: FRONTEND_test_suite6_Arrendamentos.spec.js >> Arrendamentos >> Aprovar Arrendamento (Sucesso)
- Location: tests\FRONTEND_test_suite6_Arrendamentos.spec.js:122:9

# Error details

```
Error: Dialog message 3 não aparece ou não contém o texto esperado.
```

# Page snapshot

```yaml
- generic [ref=e2]:
  - generic [ref=e3]:
    - heading "✅ Aprovação de Arrendamentos" [level=1] [ref=e4]
    - generic [ref=e5]:
      - generic [ref=e6]: Dayna WeberFUNCIONÁRIO
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
  - heading "Arrendamentos Pendentes" [level=2] [ref=e15]
  - generic [ref=e16]:
    - generic [ref=e17] [cursor=pointer]:
      - 'heading "Arrendamento #2" [level=3] [ref=e18]'
      - paragraph [ref=e19]:
        - strong [ref=e20]: "Usuário ID:"
        - text: "16"
      - paragraph [ref=e21]:
        - strong [ref=e22]: "Livro ID:"
        - text: "13"
      - paragraph [ref=e23]:
        - strong [ref=e24]: "Início:"
        - text: 26/01/2027
      - paragraph [ref=e25]:
        - strong [ref=e26]: "Fim:"
        - text: 07/07/2027
      - paragraph [ref=e27]:
        - strong [ref=e28]: "Status:"
        - text: PENDENTE
      - generic [ref=e29]:
        - button "Aprovar" [ref=e30]
        - button "Rejeitar" [ref=e31]
    - generic [ref=e32] [cursor=pointer]:
      - 'heading "Arrendamento #3" [level=3] [ref=e33]'
      - paragraph [ref=e34]:
        - strong [ref=e35]: "Usuário ID:"
        - text: "17"
      - paragraph [ref=e36]:
        - strong [ref=e37]: "Livro ID:"
        - text: "14"
      - paragraph [ref=e38]:
        - strong [ref=e39]: "Início:"
        - text: 03/02/2027
      - paragraph [ref=e40]:
        - strong [ref=e41]: "Fim:"
        - text: 14/12/2027
      - paragraph [ref=e42]:
        - strong [ref=e43]: "Status:"
        - text: PENDENTE
      - generic [ref=e44]:
        - button "Aprovar" [ref=e45]
        - button "Rejeitar" [ref=e46]
    - generic [ref=e47] [cursor=pointer]:
      - 'heading "Arrendamento #4" [level=3] [ref=e48]'
      - paragraph [ref=e49]:
        - strong [ref=e50]: "Usuário ID:"
        - text: "18"
      - paragraph [ref=e51]:
        - strong [ref=e52]: "Livro ID:"
        - text: "15"
      - paragraph [ref=e53]:
        - strong [ref=e54]: "Início:"
        - text: 16/05/2027
      - paragraph [ref=e55]:
        - strong [ref=e56]: "Fim:"
        - text: 13/05/2028
      - paragraph [ref=e57]:
        - strong [ref=e58]: "Status:"
        - text: PENDENTE
      - generic [ref=e59]:
        - button "Aprovar" [ref=e60]
        - button "Rejeitar" [ref=e61]
    - generic [ref=e62] [cursor=pointer]:
      - 'heading "Arrendamento #5" [level=3] [ref=e63]'
      - paragraph [ref=e64]:
        - strong [ref=e65]: "Usuário ID:"
        - text: "19"
      - paragraph [ref=e66]:
        - strong [ref=e67]: "Livro ID:"
        - text: "16"
      - paragraph [ref=e68]:
        - strong [ref=e69]: "Início:"
        - text: 19/12/2026
      - paragraph [ref=e70]:
        - strong [ref=e71]: "Fim:"
        - text: 30/08/2027
      - paragraph [ref=e72]:
        - strong [ref=e73]: "Status:"
        - text: PENDENTE
      - generic [ref=e74]:
        - button "Aprovar" [ref=e75]
        - button "Rejeitar" [ref=e76]
    - generic [ref=e77] [cursor=pointer]:
      - 'heading "Arrendamento #6" [level=3] [ref=e78]'
      - paragraph [ref=e79]:
        - strong [ref=e80]: "Usuário ID:"
        - text: "20"
      - paragraph [ref=e81]:
        - strong [ref=e82]: "Livro ID:"
        - text: "17"
      - paragraph [ref=e83]:
        - strong [ref=e84]: "Início:"
        - text: 14/05/2027
      - paragraph [ref=e85]:
        - strong [ref=e86]: "Fim:"
        - text: 07/06/2027
      - paragraph [ref=e87]:
        - strong [ref=e88]: "Status:"
        - text: PENDENTE
      - generic [ref=e89]:
        - button "Aprovar" [ref=e90]
        - button "Rejeitar" [ref=e91]
    - generic [ref=e92] [cursor=pointer]:
      - 'heading "Arrendamento #7" [level=3] [ref=e93]'
      - paragraph [ref=e94]:
        - strong [ref=e95]: "Usuário ID:"
        - text: "21"
      - paragraph [ref=e96]:
        - strong [ref=e97]: "Livro ID:"
        - text: "18"
      - paragraph [ref=e98]:
        - strong [ref=e99]: "Início:"
        - text: 26/12/2026
      - paragraph [ref=e100]:
        - strong [ref=e101]: "Fim:"
        - text: 06/09/2027
      - paragraph [ref=e102]:
        - strong [ref=e103]: "Status:"
        - text: PENDENTE
      - generic [ref=e104]:
        - button "Aprovar" [ref=e105]
        - button "Rejeitar" [ref=e106]
    - generic [ref=e107] [cursor=pointer]:
      - 'heading "Arrendamento #8" [level=3] [ref=e108]'
      - paragraph [ref=e109]:
        - strong [ref=e110]: "Usuário ID:"
        - text: "24"
      - paragraph [ref=e111]:
        - strong [ref=e112]: "Livro ID:"
        - text: "20"
      - paragraph [ref=e113]:
        - strong [ref=e114]: "Início:"
        - text: 06/11/2028
      - paragraph [ref=e115]:
        - strong [ref=e116]: "Fim:"
        - text: 02/05/2029
      - paragraph [ref=e117]:
        - strong [ref=e118]: "Status:"
        - text: PENDENTE
      - generic [ref=e119]:
        - button "Aprovar" [ref=e120]
        - button "Rejeitar" [ref=e121]
  - heading "Todos os Arrendamentos" [level=2] [ref=e122]
  - generic [ref=e123]:
    - generic [ref=e124] [cursor=pointer]:
      - 'heading "Arrendamento #1" [level=3] [ref=e125]'
      - paragraph [ref=e126]:
        - strong [ref=e127]: "Usuário ID:"
        - text: "5"
      - paragraph [ref=e128]:
        - strong [ref=e129]: "Livro ID:"
        - text: "1"
      - paragraph [ref=e130]:
        - strong [ref=e131]: "Início:"
        - text: 11/06/2026
      - paragraph [ref=e132]:
        - strong [ref=e133]: "Fim:"
        - text: 19/06/2026
      - paragraph [ref=e134]:
        - strong [ref=e135]: "Status:"
        - text: APROVADO
    - generic [ref=e136] [cursor=pointer]:
      - 'heading "Arrendamento #2" [level=3] [ref=e137]'
      - paragraph [ref=e138]:
        - strong [ref=e139]: "Usuário ID:"
        - text: "16"
      - paragraph [ref=e140]:
        - strong [ref=e141]: "Livro ID:"
        - text: "13"
      - paragraph [ref=e142]:
        - strong [ref=e143]: "Início:"
        - text: 26/01/2027
      - paragraph [ref=e144]:
        - strong [ref=e145]: "Fim:"
        - text: 07/07/2027
      - paragraph [ref=e146]:
        - strong [ref=e147]: "Status:"
        - text: PENDENTE
      - generic [ref=e148]:
        - button "Aprovar" [ref=e149]
        - button "Rejeitar" [ref=e150]
    - generic [ref=e151] [cursor=pointer]:
      - 'heading "Arrendamento #3" [level=3] [ref=e152]'
      - paragraph [ref=e153]:
        - strong [ref=e154]: "Usuário ID:"
        - text: "17"
      - paragraph [ref=e155]:
        - strong [ref=e156]: "Livro ID:"
        - text: "14"
      - paragraph [ref=e157]:
        - strong [ref=e158]: "Início:"
        - text: 03/02/2027
      - paragraph [ref=e159]:
        - strong [ref=e160]: "Fim:"
        - text: 14/12/2027
      - paragraph [ref=e161]:
        - strong [ref=e162]: "Status:"
        - text: PENDENTE
      - generic [ref=e163]:
        - button "Aprovar" [ref=e164]
        - button "Rejeitar" [ref=e165]
    - generic [ref=e166] [cursor=pointer]:
      - 'heading "Arrendamento #4" [level=3] [ref=e167]'
      - paragraph [ref=e168]:
        - strong [ref=e169]: "Usuário ID:"
        - text: "18"
      - paragraph [ref=e170]:
        - strong [ref=e171]: "Livro ID:"
        - text: "15"
      - paragraph [ref=e172]:
        - strong [ref=e173]: "Início:"
        - text: 16/05/2027
      - paragraph [ref=e174]:
        - strong [ref=e175]: "Fim:"
        - text: 13/05/2028
      - paragraph [ref=e176]:
        - strong [ref=e177]: "Status:"
        - text: PENDENTE
      - generic [ref=e178]:
        - button "Aprovar" [ref=e179]
        - button "Rejeitar" [ref=e180]
    - generic [ref=e181] [cursor=pointer]:
      - 'heading "Arrendamento #5" [level=3] [ref=e182]'
      - paragraph [ref=e183]:
        - strong [ref=e184]: "Usuário ID:"
        - text: "19"
      - paragraph [ref=e185]:
        - strong [ref=e186]: "Livro ID:"
        - text: "16"
      - paragraph [ref=e187]:
        - strong [ref=e188]: "Início:"
        - text: 19/12/2026
      - paragraph [ref=e189]:
        - strong [ref=e190]: "Fim:"
        - text: 30/08/2027
      - paragraph [ref=e191]:
        - strong [ref=e192]: "Status:"
        - text: PENDENTE
      - generic [ref=e193]:
        - button "Aprovar" [ref=e194]
        - button "Rejeitar" [ref=e195]
    - generic [ref=e196] [cursor=pointer]:
      - 'heading "Arrendamento #6" [level=3] [ref=e197]'
      - paragraph [ref=e198]:
        - strong [ref=e199]: "Usuário ID:"
        - text: "20"
      - paragraph [ref=e200]:
        - strong [ref=e201]: "Livro ID:"
        - text: "17"
      - paragraph [ref=e202]:
        - strong [ref=e203]: "Início:"
        - text: 14/05/2027
      - paragraph [ref=e204]:
        - strong [ref=e205]: "Fim:"
        - text: 07/06/2027
      - paragraph [ref=e206]:
        - strong [ref=e207]: "Status:"
        - text: PENDENTE
      - generic [ref=e208]:
        - button "Aprovar" [ref=e209]
        - button "Rejeitar" [ref=e210]
    - generic [ref=e211] [cursor=pointer]:
      - 'heading "Arrendamento #7" [level=3] [ref=e212]'
      - paragraph [ref=e213]:
        - strong [ref=e214]: "Usuário ID:"
        - text: "21"
      - paragraph [ref=e215]:
        - strong [ref=e216]: "Livro ID:"
        - text: "18"
      - paragraph [ref=e217]:
        - strong [ref=e218]: "Início:"
        - text: 26/12/2026
      - paragraph [ref=e219]:
        - strong [ref=e220]: "Fim:"
        - text: 06/09/2027
      - paragraph [ref=e221]:
        - strong [ref=e222]: "Status:"
        - text: PENDENTE
      - generic [ref=e223]:
        - button "Aprovar" [ref=e224]
        - button "Rejeitar" [ref=e225]
    - generic [ref=e226] [cursor=pointer]:
      - 'heading "Arrendamento #8" [level=3] [ref=e227]'
      - paragraph [ref=e228]:
        - strong [ref=e229]: "Usuário ID:"
        - text: "24"
      - paragraph [ref=e230]:
        - strong [ref=e231]: "Livro ID:"
        - text: "20"
      - paragraph [ref=e232]:
        - strong [ref=e233]: "Início:"
        - text: 06/11/2028
      - paragraph [ref=e234]:
        - strong [ref=e235]: "Fim:"
        - text: 02/05/2029
      - paragraph [ref=e236]:
        - strong [ref=e237]: "Status:"
        - text: PENDENTE
      - generic [ref=e238]:
        - button "Aprovar" [ref=e239]
        - button "Rejeitar" [ref=e240]
    - generic [ref=e241] [cursor=pointer]:
      - 'heading "Arrendamento #9" [level=3] [ref=e242]'
      - paragraph [ref=e243]:
        - strong [ref=e244]: "Usuário ID:"
        - text: "25"
      - paragraph [ref=e245]:
        - strong [ref=e246]: "Livro ID:"
        - text: "21"
      - paragraph [ref=e247]:
        - strong [ref=e248]: "Início:"
        - text: 07/02/2025
      - paragraph [ref=e249]:
        - strong [ref=e250]: "Fim:"
        - text: 24/06/2025
      - paragraph [ref=e251]:
        - strong [ref=e252]: "Status:"
        - text: APROVADO
    - generic [ref=e253] [cursor=pointer]:
      - 'heading "Arrendamento #10" [level=3] [ref=e254]'
      - paragraph [ref=e255]:
        - strong [ref=e256]: "Usuário ID:"
        - text: "26"
      - paragraph [ref=e257]:
        - strong [ref=e258]: "Livro ID:"
        - text: "22"
      - paragraph [ref=e259]:
        - strong [ref=e260]: "Início:"
        - text: 23/07/2029
      - paragraph [ref=e261]:
        - strong [ref=e262]: "Fim:"
        - text: 05/10/2029
      - paragraph [ref=e263]:
        - strong [ref=e264]: "Status:"
        - text: APROVADO
```

# Test source

```ts
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
  193 |         expect(responsePOSTnewRent.status()).toBe(201);
  194 |         let bodyPOSTnewRent = await responsePOSTnewRent.json();
  195 |         expect(bodyPOSTnewRent).toHaveProperty('id');
  196 |         expect(bodyPOSTnewRent).toHaveProperty('usuarioId');
  197 |         expect(bodyPOSTnewRent).toHaveProperty('livroId');
  198 |         expect(bodyPOSTnewRent).toHaveProperty('status');
  199 |         expect(bodyPOSTnewRent.status).toBe('PENDENTE');
  200 |         expect(bodyPOSTnewRent).toHaveProperty('criadoEm');
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
  239 |         page.waitForEvent('dialog').then(async dialog => {
  240 |             if (dialog.message().includes('Arrendamento aprovado com sucesso!')) {
  241 |                 console.log("dialog message 'Arrendamento aprovado com sucesso!' aceite")
  242 |                 await dialog.accept();
  243 |             }
  244 |             else {
> 245 |                 throw new Error('Dialog message 3 não aparece ou não contém o texto esperado.');
      |                       ^ Error: Dialog message 3 não aparece ou não contém o texto esperado.
  246 |             }
  247 |         });
  248 | 
  249 |         await page.waitForTimeout(3000);
  250 |         const PendingRentCard = await admin_approvals_page.SelectPending_Rent_gridCard(`Usuário ID: ${newUser.usuario.id}`, `Livro ID: ${newBook_random.id}`);
  251 |         await expect(PendingRentCard).toBeVisible();
  252 | 
  253 |         await admin_approvals_page.AprovarArrendamento_ApproveRent(`Usuário ID: ${newUser.usuario.id}`, `Livro ID: ${newBook_random.id}`);
  254 | 
  255 | 
  256 | 
  257 | 
  258 | 
  259 |         await expect(PendingRentCard).not.toBeVisible();
  260 | 
  261 |         const ApprovedRentCard = await admin_approvals_page.Select_Rent_gridCard(`Usuário ID: ${newUser.usuario.id}`, `Livro ID: ${newBook_random.id}`, 'APROVADO');
  262 |         await expect(ApprovedRentCard).toBeVisible();
  263 | 
  264 | 
  265 | 
  266 |     });
  267 | })
```