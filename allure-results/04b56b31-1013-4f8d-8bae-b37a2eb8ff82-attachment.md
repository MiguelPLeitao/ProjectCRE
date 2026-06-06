# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: API_test_suite5_Arrendamentos.spec.js >> Arrendamentos >> Atualizar Status de Arrendamento para APROVADO (Sucesso)
- Location: tests\API_test_suite5_Arrendamentos.spec.js:107:9

# Error details

```
Error: expect(received).toHaveProperty(path)

Expected path: "status"
Received path: []

Received value: [{"criadoEm": "2026-06-06T16:04:22.317Z", "dataFim": "2027-05-25T08:36:17.883Z", "dataInicio": "2027-04-24T07:05:56.868Z", "id": 1, "livroId": 2, "status": "APROVADO", "usuarioId": 1}, {"criadoEm": "2026-06-06T16:05:50.003Z", "dataFim": "2027-03-18T17:33:06.094Z", "dataInicio": "2026-08-29T19:04:56.677Z", "id": 2, "livroId": 1, "status": "PENDENTE", "usuarioId": 2}, {"criadoEm": "2026-06-06T16:05:50.682Z", "dataFim": "2030-02-02T13:25:28.639Z", "dataInicio": "2029-06-04T07:14:59.854Z", "id": 3, "livroId": 1, "status": "APROVADO", "usuarioId": 11}, {"criadoEm": "2026-06-06T16:05:59.348Z", "dataFim": "2022-08-04T06:18:40.124Z", "dataInicio": "2022-07-26T01:03:13.058Z", "id": 4, "livroId": 1, "status": "APROVADO", "usuarioId": 2}, {"criadoEm": "2026-06-06T16:07:43.074Z", "dataFim": "2025-06-03T23:56:10.402Z", "dataInicio": "2025-02-20T17:30:08.010Z", "id": 5, "livroId": 2, "status": "PENDENTE", "usuarioId": 14}, {"criadoEm": "2026-06-06T16:16:24.684Z", "dataFim": "2026-07-24T13:25:39.088Z", "dataInicio": "2025-12-29T14:18:43.690Z", "id": 6, "livroId": 1, "status": "PENDENTE", "usuarioId": 6}, {"criadoEm": "2026-06-06T16:16:24.816Z", "dataFim": "2025-07-12T14:50:06.325Z", "dataInicio": "2024-11-24T08:24:40.698Z", "id": 7, "livroId": 2, "status": "APROVADO", "usuarioId": 3}, {"criadoEm": "2026-06-06T16:16:28.371Z", "dataFim": "2025-05-02T10:25:28.599Z", "dataInicio": "2024-06-28T05:01:02.746Z", "id": 8, "livroId": 7, "status": "PENDENTE", "usuarioId": 11}, {"criadoEm": "2026-06-06T16:16:28.805Z", "dataFim": "2022-11-02T22:47:03.755Z", "dataInicio": "2022-09-23T15:33:32.779Z", "id": 9, "livroId": 1, "status": "APROVADO", "usuarioId": 11}, {"criadoEm": "2026-06-06T16:16:40.313Z", "dataFim": "2028-05-08T19:06:50.114Z", "dataInicio": "2027-07-16T03:28:30.438Z", "id": 10, "livroId": 1, "status": "PENDENTE", "usuarioId": 7}, …]
```

# Test source

```ts
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
  124 |         let randomBook3 = faker.helpers.arrayElement(body3GETbooks.filter(book => book.estoque > 0)).id;
  125 | 
  126 |         console.log("User ID usado:" + randomUser3);
  127 |         console.log("Book ID usado:" + randomBook3);
  128 | 
  129 |         let datainicio3 = faker.date.between({ from: '2020-01-01', to: '2030-12-31' });
  130 |         let datafim3 = faker.date.future({ refDate: datainicio3 });
  131 | 
  132 |         console.log(datainicio3);
  133 |         console.log(datafim3);
  134 | 
  135 |         let response3GETbook = await page.request.get('/livros/' + randomBook3);
  136 | 
  137 |         expect(response3GETbook.status()).toBe(200);
  138 | 
  139 |         let body3GETbook = await response3GETbook.json();
  140 | 
  141 |         expect(body3GETbook.estoque).toBeGreaterThan(0);
  142 |         let randomBook3_stock = body3GETbook.estoque;
  143 | 
  144 |         let responsePOSTrent = await page.request.post('/arrendamentos', {
  145 |             data: {
  146 |                 "usuarioId": randomUser3,
  147 |                 "livroId": randomBook3,
  148 |                 "dataInicio": datainicio3,
  149 |                 "dataFim": datafim3
  150 |             }
  151 |         });
  152 | 
  153 |         expect(responsePOSTrent.status()).toBe(201);
  154 | 
  155 |         let bodyPOSTrent = await responsePOSTrent.json();
  156 |         expect(bodyPOSTrent).toHaveProperty('id');
  157 |         expect(bodyPOSTrent).toHaveProperty('usuarioId');
  158 |         expect(bodyPOSTrent).toHaveProperty('livroId');
  159 |         expect(bodyPOSTrent).toHaveProperty('status');
  160 |         expect(bodyPOSTrent.status).toBe('PENDENTE');
  161 |         expect(bodyPOSTrent).toHaveProperty('criadoEm');
  162 | 
  163 | 
  164 |         let responsePUTrent = await page.request.put(`/arrendamentos/${bodyPOSTrent.id}/status`, {
  165 |             data: {
  166 |                 "status": "APROVADO"
  167 |             }
  168 |         });
  169 | 
  170 |         expect(responsePUTrent.status()).toBe(200);
  171 | 
  172 |         let response3GETrent = await page.request.get(`/arrendamentos/`);
  173 | 
  174 |         expect(response3GETrent.status()).toBe(200);
  175 | 
  176 |         let body3GETrent = await response3GETrent.json();
  177 | console.log(body3GETrent);
> 178 |         expect(body3GETrent).toHaveProperty('status');
      |                              ^ Error: expect(received).toHaveProperty(path)
  179 |         expect(body3GETrent.status).toBe('APROVADO');
  180 | 
  181 |         let response4GETbook = await page.request.get(`/livros/${randomBook3}`);
  182 | 
  183 |         expect(response4GETbook.status()).toBe(200);
  184 | 
  185 |         let body4GETbook = await response4GETbook.json();
  186 | 
  187 |         expect(body4GETbook).toHaveProperty('estoque');
  188 |         expect(body4GETbook.estoque).toBe(randomBook3_stock - 1);
  189 |         expect(body4GETbook.estoque).toBeGreaterThanOrEqual(0);
  190 | 
  191 | 
  192 | 
  193 |     });
  194 | })
```