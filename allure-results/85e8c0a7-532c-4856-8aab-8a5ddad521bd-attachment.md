# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: API_test_suite3_Estatisticas.spec.js >> Estatísticas >> Obter Estatísticas da Biblioteca
- Location: tests\API_test_suite3_Estatisticas.spec.js:5:9

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 8759
Received: 8769
```

# Test source

```ts
  1  | // @ts-check
  2  | import { test, expect } from '@playwright/test';
  3  | 
  4  | test.describe('Estatísticas', () => {
  5  |     test('Obter Estatísticas da Biblioteca', async ({ request }) => {
  6  |         let responseGETbooks = await request.get('/livros');
  7  |         let responseGETavailablebooks = await request.get('/livros/disponiveis');
  8  |         let responseGETusers = await request.get('/usuarios');
  9  |         let responseGETbookloans = await request.get('/arrendamentos');
  10 |         let responseGETorders = await request.get('/compras');
  11 | 
  12 |         expect(responseGETbooks.status()).toBe(200);
  13 |         expect(responseGETavailablebooks.status()).toBe(200);
  14 |         expect(responseGETusers.status()).toBe(200);
  15 |         expect(responseGETbookloans.status()).toBe(200);
  16 |         expect(responseGETorders.status()).toBe(200);
  17 | 
  18 |         let bodyGETusers = await responseGETusers.json();
  19 |         let bodyGETbooks = await responseGETbooks.json();
  20 |         let bodyGETavailablebooks = await responseGETavailablebooks.json();
  21 |         let bodyGETbookloans = await responseGETbookloans.json();
  22 |         let bodyGETorders = await responseGETorders.json();
  23 | 
  24 |         let totalBooks = bodyGETbooks.length;
  25 |         let totalPages = 0;
  26 |         for (const book of bodyGETbooks) {
  27 |             totalPages += book.paginas;
  28 |         }
  29 |         let totalUsers = bodyGETusers.length;
  30 |         let totalType1Users = bodyGETusers.filter(user => user.tipo === 1).length;
  31 |         let totalType2Users = bodyGETusers.filter(user => user.tipo === 2).length;
  32 |         let totalType3Users = bodyGETusers.filter(user => user.tipo === 3).length;
  33 | 
  34 |         let totalAvailableBooks = bodyGETavailablebooks.length;
  35 | 
  36 |         /* Outra forma de fazer o loop e contar em vez de usar função filter
  37 |         let totalavailablebooks2 = 0
  38 |         for (const book of bodyGETbooks) {
  39 |             if (book.disponivel === true) {
  40 |                 totalavailablebooks2 = totalavailablebooks2 + 1;
  41 |             }
  42 |         };
  43 |         */
  44 | 
  45 |         let totalPendingLoans = bodyGETbookloans.filter(loan => loan.status === 'PENDENTE').length;
  46 | 
  47 |         let totalPendingOrders = bodyGETorders.filter(order => order.status === 'PENDENTE').length;
  48 | 
  49 | 
  50 |         let responseGETstatistics = await request.get('/estatisticas');
  51 | 
  52 |         expect(responseGETstatistics.status()).toBe(200);
  53 | 
  54 |         let bodyGETstatistics = await responseGETstatistics.json();
  55 | 
  56 |         expect(bodyGETstatistics.totalLivros).toBe(totalBooks);
  57 |         expect(Number.isInteger(bodyGETstatistics.totalLivros)).toBe(true);
  58 |         expect(bodyGETstatistics.totalLivros).toBeGreaterThanOrEqual(0);
> 59 |         expect(bodyGETstatistics.totalPaginas).toBe(totalPages);
     |                                                ^ Error: expect(received).toBe(expected) // Object.is equality
  60 |         expect(Number.isInteger(bodyGETstatistics.totalPaginas)).toBe(true);
  61 |         expect(bodyGETstatistics.totalPaginas).toBeGreaterThanOrEqual(0);
  62 |         expect(bodyGETstatistics.totalUsuarios).toBe(totalUsers);
  63 |         expect(Number.isInteger(bodyGETstatistics.totalUsuarios)).toBe(true);
  64 |         expect(bodyGETstatistics.totalUsuarios).toBeGreaterThanOrEqual(0);
  65 |         expect(bodyGETstatistics.usuariosPorTipo.alunos).toBe(totalType1Users);
  66 |         expect(Number.isInteger(bodyGETstatistics.usuariosPorTipo.alunos)).toBe(true);
  67 |         expect(bodyGETstatistics.usuariosPorTipo.alunos).toBeGreaterThanOrEqual(0);
  68 |         expect(bodyGETstatistics.usuariosPorTipo.funcionarios).toBe(totalType2Users);
  69 |         expect(Number.isInteger(bodyGETstatistics.usuariosPorTipo.funcionarios)).toBe(true);
  70 |         expect(bodyGETstatistics.usuariosPorTipo.funcionarios).toBeGreaterThanOrEqual(0);
  71 |         expect(bodyGETstatistics.usuariosPorTipo.admins).toBe(totalType3Users);
  72 |         expect(Number.isInteger(bodyGETstatistics.usuariosPorTipo.admins)).toBe(true);
  73 |         expect(bodyGETstatistics.usuariosPorTipo.admins).toBeGreaterThanOrEqual(0);
  74 |         expect(bodyGETstatistics.livrosDisponiveis).toBe(totalAvailableBooks);
  75 |         expect(Number.isInteger(bodyGETstatistics.livrosDisponiveis)).toBe(true);
  76 |         expect(bodyGETstatistics.livrosDisponiveis).toBeGreaterThanOrEqual(0);
  77 |         expect(bodyGETstatistics.arrendamentosPendentes).toBe(totalPendingLoans);
  78 |         expect(Number.isInteger(bodyGETstatistics.arrendamentosPendentes)).toBe(true);
  79 |         expect(bodyGETstatistics.arrendamentosPendentes).toBeGreaterThanOrEqual(0);
  80 |         expect(bodyGETstatistics.comprasPendentes).toBe(totalPendingOrders);
  81 |         expect(Number.isInteger(bodyGETstatistics.comprasPendentes)).toBe(true);
  82 |         expect(bodyGETstatistics.comprasPendentes).toBeGreaterThanOrEqual(0);
  83 |         expect(bodyGETstatistics.totalUsuarios).toBe(totalType1Users + totalType2Users + totalType3Users);
  84 |     });
  85 | 
  86 | })
```