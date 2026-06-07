# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: API_test_suite6_Compras.spec.js >> Compras >> Aprovar Compra (Sucesso)
- Location: tests\API_test_suite6_Compras.spec.js:131:9

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 1
Received: 2
```

# Test source

```ts
  123 | 
  124 |         let body2POSTbuy = await response2POSTbuy.json();
  125 | 
  126 |         expect(body2POSTbuy).toHaveProperty("mensagem");
  127 |         expect(body2POSTbuy.mensagem).toBe("Estoque insuficiente");
  128 |     });
  129 | 
  130 | 
  131 |     test('Aprovar Compra (Sucesso)', async ({ page }) => {
  132 |         let response3GETusers = await page.request.get('/usuarios');
  133 |         let response3GETbooks = await page.request.get('/livros');
  134 | 
  135 |         expect(response3GETusers.status()).toBe(200);
  136 |         expect(response3GETbooks.status()).toBe(200);
  137 | 
  138 |         let body3GETusers = await response3GETusers.json();
  139 |         let body3GETbooks = await response3GETbooks.json();
  140 | 
  141 |         expect(Array.isArray(body3GETusers)).toBe(true);
  142 |         expect(body3GETusers.length).toBeGreaterThan(0);
  143 |         expect(Array.isArray(body3GETbooks)).toBe(true);
  144 |         expect(body3GETbooks.length).toBeGreaterThan(0);
  145 | 
  146 |         console.log(body3GETbooks);
  147 |         let randomUser3 = faker.helpers.arrayElement(body3GETusers).id;
  148 | 
  149 |         let randomBook3 = faker.helpers.arrayElement(body3GETbooks.filter(book => book.estoque > 0)).id;
  150 | 
  151 |         let response3GETbookID = await page.request.get(`/livros/${randomBook3}`);
  152 | 
  153 |         expect(response3GETbookID.status()).toBe(200);
  154 | 
  155 |         let body3GETbookID = await response3GETbookID.json();
  156 | 
  157 |         expect(body3GETbookID).toHaveProperty("estoque");
  158 |         expect(body3GETbookID.estoque).toBeGreaterThan(0);
  159 |         expect(body3GETbookID).toHaveProperty("preco");
  160 |         expect(body3GETbookID.preco).toBeGreaterThan(0);
  161 | 
  162 |         let buyQuantity3 = faker.number.int({ min: 1, max: body3GETbookID.estoque });
  163 | 
  164 |         console.log("User ID usado:" + randomUser3);
  165 |         console.log("Book ID usado:" + randomBook3);
  166 |         console.log("Book Stock:" + body3GETbookID.estoque);
  167 |         console.log("Book Price:" + body3GETbookID.preco);
  168 |         console.log("Buy order Quantity:" + buyQuantity3);
  169 | 
  170 |         let PreviousDate3 = new Date();
  171 | 
  172 |         let response3POSTbuy = await page.request.post('/compras', {
  173 |             data: {
  174 |                 "usuarioId": randomUser3,
  175 |                 "livroId": randomBook3,
  176 |                 "quantidade": buyQuantity3
  177 |             }
  178 |         });
  179 | 
  180 |         expect(response3POSTbuy.status()).toBe(201);
  181 | 
  182 |         let body3POSTbuy = await response3POSTbuy.json();
  183 | 
  184 |         expect(body3POSTbuy).toHaveProperty("id");
  185 |         expect(body3POSTbuy).toHaveProperty("usuarioId");
  186 |         expect(body3POSTbuy.usuarioId).toBe(randomUser3);
  187 |         expect(body3POSTbuy).toHaveProperty("livroId");
  188 |         expect(body3POSTbuy.livroId).toBe(randomBook3);
  189 |         expect(body3POSTbuy).toHaveProperty("quantidade");
  190 |         expect(body3POSTbuy.quantidade).toBe(buyQuantity3);
  191 |         expect(body3POSTbuy).toHaveProperty("total");
  192 |         expect(body3POSTbuy.total).toBe(buyQuantity3 * body3GETbookID.preco);
  193 |         expect(body3POSTbuy).toHaveProperty("status");
  194 |         expect(body3POSTbuy.status).toBe("PENDENTE");
  195 |         expect(body3POSTbuy).toHaveProperty("criadoEm");
  196 |         let PostDate3 = new Date(body3POSTbuy.criadoEm);
  197 |         expect(PreviousDate3.getTime()).toBeLessThan(PostDate3.getTime());
  198 | 
  199 |         console.log("Order ID: " + body3POSTbuy.id);
  200 | 
  201 |         let response3PUTbuy = await page.request.put(`/compras/${body3POSTbuy.id}/status`, {
  202 |             data: {
  203 |                 "status": "APROVADA"
  204 |             }
  205 |         });
  206 | 
  207 |         expect(response3PUTbuy.status()).toBe(200);
  208 | 
  209 |         let body3PUTbuy = await response3PUTbuy.json();
  210 | 
  211 |         expect(body3PUTbuy).toHaveProperty("status");
  212 |         expect(body3PUTbuy.status).toBe("APROVADA");
  213 | 
  214 |         let response3GETbookID2 = await page.request.get(`/livros/${randomBook3}`);
  215 | 
  216 |         expect(response3GETbookID2.status()).toBe(200);
  217 | 
  218 |         let body3GETbookID2 = await response3GETbookID2.json();
  219 | 
  220 |         expect(body3GETbookID2).toHaveProperty("estoque");
  221 | 
  222 |         console.log("Book Stock after buy:" + body3GETbookID2.estoque);
> 223 |         expect(body3GETbookID2.estoque).toBe(body3GETbookID2.estoque - buyQuantity3);
      |                                         ^ Error: expect(received).toBe(expected) // Object.is equality
  224 | 
  225 |     });
  226 | })
```