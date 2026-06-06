# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: API_test_suite5_Arrendamentos.spec.js >> Arrendamentos >> Atualizar Status de Arrendamento para APROVADO (Sucesso)
- Location: tests\API_test_suite5_Arrendamentos.spec.js:107:9

# Error details

```
Error: Cannot get value from empty dataset.
```

# Test source

```ts
  25  | 
  26  |         console.log("User ID usado:" + randomUser);
  27  |         console.log("Book ID usado:" + randomBook);
  28  | 
  29  |         let datainicio = faker.date.between({ from: '2020-01-01', to: '2030-12-31' });
  30  |         let datafim = faker.date.future({ refDate: datainicio });
  31  | 
  32  |         console.log(datainicio);
  33  |         console.log(datafim);
  34  | 
  35  |         let responsePOSTrent = await page.request.post('/arrendamentos', {
  36  |             data: {
  37  |                 "usuarioId": randomUser,
  38  |                 "livroId": randomBook,
  39  |                 "dataInicio": datainicio,
  40  |                 "dataFim": datafim
  41  |             }
  42  |         });
  43  | 
  44  |         expect(responsePOSTrent.status()).toBe(201);
  45  | 
  46  |         let bodyPOSTrent = await responsePOSTrent.json();
  47  |         expect(bodyPOSTrent).toHaveProperty('id');
  48  |         expect(bodyPOSTrent).toHaveProperty('usuarioId');
  49  |         expect(bodyPOSTrent).toHaveProperty('livroId');
  50  |         expect(bodyPOSTrent).toHaveProperty('status');
  51  |         expect(bodyPOSTrent.status).toBe('PENDENTE');
  52  |         expect(bodyPOSTrent).toHaveProperty('criadoEm');
  53  | 
  54  |     });
  55  | 
  56  | 
  57  |     test('Criar Arrendamento sem Estoque (Falha)', async ({ page }) => {
  58  |         const newBook = {
  59  |             "nome": faker.book.title(),
  60  |             "autor": faker.person.fullName(),
  61  |             "paginas": faker.number.int({ min: 10, max: 2000 }),
  62  |             "descricao": faker.lorem.paragraph(2),
  63  |             "imagemUrl": faker.image.url(),
  64  |             "estoque": 0,
  65  |             "preco": parseFloat(faker.commerce.price({ min: 5, max: 200 }))
  66  |         };
  67  | 
  68  |         let responsePOSTnewBook_Random = await page.request.post('/livros',
  69  |             {
  70  |                 data: newBook
  71  |             }
  72  |         );
  73  | 
  74  |         expect(responsePOSTnewBook_Random.status()).toBe(201);
  75  | 
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
> 125 |         let randomBook3 = faker.helpers.arrayElement(body3GETbooks.filter(book => book.estoque > 0)).id;
      |                                         ^ Error: Cannot get value from empty dataset.
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
  158 |         expect(bodyPOSTrent).toHaveProperty('usuarioId');
  159 |         expect(bodyPOSTrent).toHaveProperty('livroId');
  160 |         expect(bodyPOSTrent).toHaveProperty('status');
  161 |         expect(bodyPOSTrent.status).toBe('PENDENTE');
  162 |         expect(bodyPOSTrent).toHaveProperty('criadoEm');
  163 | 
  164 | 
  165 |         let responsePUTrent = await page.request.put(`/arrendamentos/${bodyPOSTrent.id}/status`, {
  166 |             data: {
  167 |                 "status": "APROVADO"
  168 |             }
  169 |         });
  170 | 
  171 |         expect(responsePUTrent.status()).toBe(200);
  172 | 
  173 |         let response3GETrent = await page.request.get(`/arrendamentos/${bodyPOSTrent.id}`);
  174 | 
  175 |         expect(response3GETrent.status()).toBe(200);
  176 | 
  177 |         let body3GETrent = await response3GETrent.json();
  178 | 
  179 |         expect(body3GETrent).toHaveProperty('status');
  180 |         expect(body3GETrent.status).toBe('APROVADO');
  181 | 
  182 |         let response4GETbook = await page.request.get(`/livros/${randomBook3}`);
  183 | 
  184 |         expect(response4GETbook.status()).toBe(200);
  185 | 
  186 |         let body4GETbook = await response4GETbook.json();
  187 | 
  188 |         expect(body4GETbook).toHaveProperty('estoque');
  189 |         expect(body4GETbook.estoque).toBe(randomBook3_stock - 1);
  190 |         expect(body4GETbook.estoque).toBeGreaterThanOrEqual(0);
  191 | 
  192 | 
  193 | 
  194 |     });
  195 | })
```