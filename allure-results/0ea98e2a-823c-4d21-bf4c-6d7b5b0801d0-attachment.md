# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: API_test_suite2_Livros.spec.js >> Livros >> Atualizar Livro Existente (Sucesso)
- Location: tests\API_test_suite2_Livros.spec.js:189:9

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 404
```

# Test source

```ts
  110 |             {
  111 |                 data: newBook
  112 |             }
  113 |         );
  114 | 
  115 |         expect(responsePOSTnewBook_Random.status()).toBe(201);
  116 | 
  117 |         let bodyPOSTnewBook_Random = await responsePOSTnewBook_Random.json();
  118 | 
  119 |         expect(bodyPOSTnewBook_Random).toHaveProperty('id');
  120 |         expect(Number.isInteger(bodyPOSTnewBook_Random.id)).toBe(true);
  121 |         expect(bodyPOSTnewBook_Random.id).toBeGreaterThanOrEqual(0);
  122 |         expect(bodyPOSTnewBook_Random).toHaveProperty('dataCadastro');
  123 |         const date = new Date(bodyPOSTnewBook_Random.dataCadastro);
  124 |         expect(date.toISOString()).toBe(bodyPOSTnewBook_Random.dataCadastro);
  125 |         expect(bodyPOSTnewBook_Random.nome).toBe(newBook.nome);
  126 |         expect(bodyPOSTnewBook_Random.autor).toBe(newBook.autor);
  127 |         expect(bodyPOSTnewBook_Random.paginas).toBe(newBook.paginas);
  128 |         expect(bodyPOSTnewBook_Random.descricao).toBe(newBook.descricao);
  129 |         expect(bodyPOSTnewBook_Random.imagemUrl).toBe(newBook.imagemUrl);
  130 |         expect(bodyPOSTnewBook_Random.estoque).toBe(newBook.estoque);
  131 |         expect(bodyPOSTnewBook_Random.preco).toBe(newBook.preco);
  132 |         console.log("Livro aleatório criado com sucesso");
  133 |     });
  134 | 
  135 | 
  136 |     test.describe('Adicionar Livro sem Campos Obrigatórios (Falha)', () => {
  137 |         test('Livro Sem nome', async ({ page }) => {
  138 |             let response1POSTinvalidBook_NoName = await page.request.post('/livros',
  139 |                 {
  140 |                     data: {
  141 |                         "nome": "",
  142 |                         "autor": faker.person.fullName(),
  143 |                         "paginas": faker.number.int({ min: 10, max: 2000 }),
  144 |                     }
  145 |                 });
  146 | 
  147 |             expect(response1POSTinvalidBook_NoName.status()).toBe(400);
  148 | 
  149 |             let body1POSTinvalidBook_NoName = await response1POSTinvalidBook_NoName.json();
  150 | 
  151 |             expect(body1POSTinvalidBook_NoName.mensagem).toBe("Nome, autor e páginas são obrigatórios");
  152 |         });
  153 | 
  154 |         test('Livro Sem autor', async ({ page }) => {
  155 |             let response2POSTinvalidBook_NoAuthor = await page.request.post('/livros',
  156 |                 {
  157 |                     data: {
  158 |                         "nome": faker.book.title(),
  159 |                         "autor": "",
  160 |                         "paginas": faker.number.int({ min: 10, max: 2000 }),
  161 |                     }
  162 |                 });
  163 | 
  164 |             expect(response2POSTinvalidBook_NoAuthor.status()).toBe(400);
  165 | 
  166 |             let body2POSTinvalidBook_NoAuthor = await response2POSTinvalidBook_NoAuthor.json();
  167 | 
  168 |             expect(body2POSTinvalidBook_NoAuthor.mensagem).toBe("Nome, autor e páginas são obrigatórios");
  169 |         });
  170 | 
  171 |         test('Livro Sem páginas', async ({ page }) => {
  172 |             let response3POSTinvalidBook_NoPages = await page.request.post('/livros',
  173 |                 {
  174 |                     data: {
  175 |                         "nome": faker.book.title(),
  176 |                         "autor": faker.person.fullName(),
  177 |                         "paginas": ""
  178 |                     }
  179 |                 });
  180 | 
  181 |             expect(response3POSTinvalidBook_NoPages.status()).toBe(400);
  182 | 
  183 |             let body3POSTinvalidBook_NoPages = await response3POSTinvalidBook_NoPages.json();
  184 | 
  185 |             expect(body3POSTinvalidBook_NoPages.mensagem).toBe("Nome, autor e páginas são obrigatórios");
  186 |         });
  187 |     });
  188 | 
  189 |     test('Atualizar Livro Existente (Sucesso)', async ({ page }) => {
  190 |         let response3GETbooks = await page.request.get('/livros');
  191 | 
  192 |         expect(response3GETbooks.status()).toBe(200);
  193 |         expect(Array.isArray(await response3GETbooks.json())).toBe(true);
  194 | 
  195 |         let randombook = faker.helpers.arrayElement(await response3GETbooks.json());
  196 | 
  197 |         let responsePUTupdateBook = await page.request.put(`/livros/${randombook.id}`,
  198 |             {
  199 |                 data: {
  200 |                     "nome": randombook.nome + " - Editado",
  201 |                     "autor": randombook.autor + " - Editado",
  202 |                     "paginas": randombook.paginas + 10,
  203 |                     "descricao": randombook.descricao + " - Editado",
  204 |                     "imagemUrl": "Editado",
  205 |                     "estoque": 0,
  206 |                     "preco": 0
  207 |                 }
  208 |             });
  209 | 
> 210 |         expect(responsePUTupdateBook.status()).toBe(200);
      |                                                ^ Error: expect(received).toBe(expected) // Object.is equality
  211 | 
  212 |         let bodyPUTupdateBook = await responsePUTupdateBook.json();
  213 | 
  214 |         expect(bodyPUTupdateBook.id).toBe(randombook.id);
  215 |         expect(bodyPUTupdateBook.nome).toBe(randombook.nome + " - Editado");
  216 |         expect(bodyPUTupdateBook.autor).toBe(randombook.autor + " - Editado");
  217 |         expect(bodyPUTupdateBook.paginas).toBe(randombook.paginas + 10);
  218 |         expect(bodyPUTupdateBook.descricao).toBe(randombook.descricao + " - Editado");
  219 |         expect(bodyPUTupdateBook.imagemUrl).toBe("Editado");
  220 |         expect(bodyPUTupdateBook.estoque).toBe(0);
  221 |         expect(bodyPUTupdateBook.preco).toBe(0);
  222 |         console.log("Livro aleatório atualizado com sucesso");
  223 |     })
  224 | 
  225 |     test('Apagar Livro (Sucesso)', async ({ page }) => {
  226 |         const newBook2 = {
  227 |             "nome": faker.book.title(),
  228 |             "autor": faker.person.fullName(),
  229 |             "paginas": faker.number.int({ min: 10, max: 2000 })
  230 |         };
  231 | 
  232 |         let response2POSTnewBook = await page.request.post('/livros',
  233 |             {
  234 |                 data: newBook2
  235 |             }
  236 |         );
  237 | 
  238 |         expect(response2POSTnewBook.status()).toBe(201);
  239 |         let body2POSTnewBook = await response2POSTnewBook.json();
  240 |         expect(body2POSTnewBook).toHaveProperty('id');
  241 |         expect(Number.isInteger(body2POSTnewBook.id)).toBe(true);
  242 |         expect(body2POSTnewBook.id).toBeGreaterThanOrEqual(0);
  243 | 
  244 |         let responseDELETEnewbook = await page.request.delete(`/livros/${body2POSTnewBook.id}`);
  245 |         expect(responseDELETEnewbook.status()).toBe(200);
  246 |         let bodyDELETEnewbook = await responseDELETEnewbook.json();
  247 |         expect(bodyDELETEnewbook.mensagem).toBe('Livro removido');
  248 | 
  249 |         let responseGETdeletednewbook = await page.request.get(`/livros/${body2POSTnewBook.id}`);
  250 |         expect(responseGETdeletednewbook.status()).toBe(404);
  251 | 
  252 |     })
  253 | 
  254 | })
```