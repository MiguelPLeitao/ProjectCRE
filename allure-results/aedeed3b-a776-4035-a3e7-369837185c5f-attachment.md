# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: API_test_suite5_Arrendamentos.spec.js >> Arrendamentos >> Atualizar Status de Arrendamento para APROVADO (Sucesso)
- Location: tests\API_test_suite5_Arrendamentos.spec.js:107:9

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 404
```

# Test source

```ts
  76  |         let bodyPOSTnewBook_Random = await responsePOSTnewBook_Random.json();
  77  | 
  78  |         expect(bodyPOSTnewBook_Random).toHaveProperty('id');
  79  | 
  80  |         let response2GETusers = await page.request.get('/usuarios');
  81  | 
  82  |         expect(response2GETusers.status()).toBe(200);
  83  | 
  84  |         let bodyGETusers = await response2GETusers.json();
  85  | 
  86  |         let randomUser2 = faker.helpers.arrayElement(bodyGETusers).id;
  87  | 
  88  |         let datainicio2 = faker.date.between({ from: '2020-01-01', to: '2030-12-31' });
  89  |         let datafim2 = faker.date.future({ refDate: datainicio2 });
  90  | 
  91  |         let responsePOSTinvalidrent = await page.request.post('/arrendamentos', {
  92  |             data: {
  93  |                 "usuarioId": randomUser2,
  94  |                 "livroId": bodyPOSTnewBook_Random.id,
  95  |                 "dataInicio": datainicio2,
  96  |                 "dataFim": datafim2
  97  |             }
  98  |         });
  99  | 
  100 |         expect(responsePOSTinvalidrent.status()).toBe(400);
  101 | 
  102 |         let bodyPOSTinvalidrent = await responsePOSTinvalidrent.json();
  103 |         expect(bodyPOSTinvalidrent.mensagem).toBe('Livro sem estoque para arrendamento');
  104 |     });
  105 | 
  106 | 
  107 |     test('Atualizar Status de Arrendamento para APROVADO (Sucesso)', async ({ page }) => {
  108 |         let response3GETusers = await page.request.get('/usuarios');
  109 |         let response3GETbooks = await page.request.get('/livros');
  110 | 
  111 |         expect(response3GETusers.status()).toBe(200);
  112 |         expect(response3GETbooks.status()).toBe(200);
  113 | 
  114 |         let body3GETusers = await response3GETusers.json();
  115 |         let body3GETbooks = await response3GETbooks.json();
  116 | 
  117 |         expect(Array.isArray(body3GETusers)).toBe(true);
  118 |         expect(body3GETusers.length).toBeGreaterThan(0);
  119 |         expect(Array.isArray(body3GETbooks)).toBe(true);
  120 |         expect(body3GETbooks.length).toBeGreaterThan(0);
  121 | 
  122 |         let randomUser3 = faker.helpers.arrayElement(body3GETusers).id;
  123 | 
  124 |         console.log(body3GETbooks);
  125 |         let randomBook3 = faker.helpers.arrayElement(body3GETbooks.filter(book => book.estoque > 0)).id;
  126 | 
  127 |         console.log("User ID usado:" + randomUser3);
  128 |         console.log("Book ID usado:" + randomBook3);
  129 | 
  130 |         let datainicio3 = faker.date.between({ from: '2020-01-01', to: '2030-12-31' });
  131 |         let datafim3 = faker.date.future({ refDate: datainicio3 });
  132 | 
  133 |         console.log(datainicio3);
  134 |         console.log(datafim3);
  135 | 
  136 |         let response3GETbook = await page.request.get('/livros/' + randomBook3);
  137 | 
  138 |         expect(response3GETbook.status()).toBe(200);
  139 | 
  140 |         let body3GETbook = await response3GETbook.json();
  141 | 
  142 |         expect(body3GETbook.estoque).toBeGreaterThan(0);
  143 |         let randomBook3_stock = body3GETbook.estoque;
  144 | 
  145 |         let responsePOSTrent = await page.request.post('/arrendamentos', {
  146 |             data: {
  147 |                 "usuarioId": randomUser3,
  148 |                 "livroId": randomBook3,
  149 |                 "dataInicio": datainicio3,
  150 |                 "dataFim": datafim3
  151 |             }
  152 |         });
  153 | 
  154 |         expect(responsePOSTrent.status()).toBe(201);
  155 | 
  156 |         let bodyPOSTrent = await responsePOSTrent.json();
  157 |         expect(bodyPOSTrent).toHaveProperty('id');
  158 |         console.log(bodyPOSTrent.id);
  159 |         expect(bodyPOSTrent).toHaveProperty('usuarioId');
  160 |         expect(bodyPOSTrent).toHaveProperty('livroId');
  161 |         expect(bodyPOSTrent).toHaveProperty('status');
  162 |         expect(bodyPOSTrent.status).toBe('PENDENTE');
  163 |         expect(bodyPOSTrent).toHaveProperty('criadoEm');
  164 | 
  165 | 
  166 |         let responsePUTrent = await page.request.put(`/arrendamentos/${bodyPOSTrent.id}/status`, {
  167 |             data: {
  168 |                 "status": "APROVADO"
  169 |             }
  170 |         });
  171 | 
  172 |         expect(responsePUTrent.status()).toBe(200);
  173 | console.log(bodyPOSTrent.id);
  174 |         let response3GETrent = await page.request.get(`/arrendamentos/${bodyPOSTrent.id}/status`);
  175 | 
> 176 |         expect(response3GETrent.status()).toBe(200);
      |                                           ^ Error: expect(received).toBe(expected) // Object.is equality
  177 | 
  178 |         let body3GETrent = await response3GETrent.json();
  179 | 
  180 |         expect(body3GETrent).toHaveProperty('status');
  181 |         expect(body3GETrent.status).toBe('APROVADO');
  182 | 
  183 |         let response4GETbook = await page.request.get(`/livros/${randomBook3}`);
  184 | 
  185 |         expect(response4GETbook.status()).toBe(200);
  186 | 
  187 |         let body4GETbook = await response4GETbook.json();
  188 | 
  189 |         expect(body4GETbook).toHaveProperty('estoque');
  190 |         expect(body4GETbook.estoque).toBeGreaterThan(randomBook3_stock - 1);
  191 |         expect(body4GETbook.estoque).toBeGreaterThanOrEqual(0);
  192 | 
  193 | 
  194 | 
  195 |     });
  196 | })
```